import React, { useMemo, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Eye,
  EyeOff,
  Copy,
  Check,
  RefreshCw,
  KeyRound,
  Clock,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

// ---------------------------------------------------------------------------
// Password analysis (fully client-side — nothing is ever sent to a server).
// ---------------------------------------------------------------------------

const COMMON_PASSWORDS = new Set([
  "password", "123456", "123456789", "12345678", "12345", "qwerty",
  "abc123", "password1", "111111", "1234567", "letmein", "welcome",
  "admin", "iloveyou", "monkey", "dragon", "sunshine", "princess",
  "football", "master", "login", "passw0rd", "qwerty123", "000000",
]);

type Analysis = {
  entropyBits: number;
  charsetSize: number;
  guessesPerSecond: number;
  crackSeconds: number;
  score: 0 | 1 | 2 | 3 | 4;
  label: string;
  suggestions: string[];
  checks: { label: string; ok: boolean }[];
};

// Offline, fast, ~50 billion guesses/sec (a well-funded attacker with GPUs
// against unsalted fast hashes). A deliberately conservative reference point.
const GUESSES_PER_SECOND = 5e10;

function estimateCharsetSize(pw: string): number {
  let size = 0;
  if (/[a-z]/.test(pw)) size += 26;
  if (/[A-Z]/.test(pw)) size += 26;
  if (/[0-9]/.test(pw)) size += 10;
  if (/[^a-zA-Z0-9]/.test(pw)) size += 33; // printable symbols
  return size;
}

function penaltyFactor(pw: string): number {
  // Reduce effective entropy for obvious weaknesses.
  let factor = 1;
  const lower = pw.toLowerCase();
  if (COMMON_PASSWORDS.has(lower)) factor *= 0.02;
  // Sequential runs (abc, 123) and repeats (aaaa)
  if (/(.)\1{2,}/.test(pw)) factor *= 0.6;
  if (/(0123|1234|2345|3456|4567|5678|6789|abcd|qwer|asdf)/i.test(pw)) factor *= 0.5;
  // Pure single-class passwords are weaker than raw entropy implies
  const classes = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].filter((r) =>
    r.test(pw)
  ).length;
  if (classes <= 1) factor *= 0.7;
  return factor;
}

function analyze(pw: string): Analysis {
  const charsetSize = estimateCharsetSize(pw);
  const rawBits = pw.length > 0 ? pw.length * Math.log2(Math.max(charsetSize, 1)) : 0;
  const entropyBits = rawBits * penaltyFactor(pw);

  const combos = Math.pow(2, entropyBits);
  // Average case: attacker finds it after searching half the space.
  const crackSeconds = combos / 2 / GUESSES_PER_SECOND;

  let score: Analysis["score"] = 0;
  if (entropyBits >= 28) score = 1;
  if (entropyBits >= 40) score = 2;
  if (entropyBits >= 60) score = 3;
  if (entropyBits >= 80) score = 4;

  const labels = ["Very weak", "Weak", "Fair", "Strong", "Fortress"];

  const checks = [
    { label: "At least 12 characters", ok: pw.length >= 12 },
    { label: "Upper & lower case", ok: /[a-z]/.test(pw) && /[A-Z]/.test(pw) },
    { label: "Contains a number", ok: /[0-9]/.test(pw) },
    { label: "Contains a symbol", ok: /[^a-zA-Z0-9]/.test(pw) },
    { label: "Not a known common password", ok: !COMMON_PASSWORDS.has(pw.toLowerCase()) },
    { label: "No obvious repeats or sequences", ok: !/(.)\1{2,}/.test(pw) && !/(0123|1234|abcd|qwer|asdf)/i.test(pw) },
  ];

  const suggestions: string[] = [];
  if (pw.length < 12) suggestions.push("Aim for 12+ characters — length beats complexity.");
  if (!/[A-Z]/.test(pw) || !/[a-z]/.test(pw)) suggestions.push("Mix upper and lower case letters.");
  if (!/[0-9]/.test(pw)) suggestions.push("Add at least one digit.");
  if (!/[^a-zA-Z0-9]/.test(pw)) suggestions.push("Add a symbol like ! @ # $.");
  if (COMMON_PASSWORDS.has(pw.toLowerCase())) suggestions.push("This is one of the most breached passwords — never use it.");
  if (/(.)\1{2,}/.test(pw)) suggestions.push("Avoid repeating the same character.");
  if (suggestions.length === 0) suggestions.push("Excellent — store this in a password manager and never reuse it.");

  return {
    entropyBits: Math.round(entropyBits),
    charsetSize,
    guessesPerSecond: GUESSES_PER_SECOND,
    crackSeconds,
    score,
    label: labels[score],
    suggestions,
    checks,
  };
}

function humanizeSeconds(s: number): string {
  if (!isFinite(s) || s <= 0) return "instantly";
  if (s < 1) return "instantly";
  const units: [number, string][] = [
    [60 * 60 * 24 * 365 * 100, "centuries"],
    [60 * 60 * 24 * 365, "years"],
    [60 * 60 * 24 * 30, "months"],
    [60 * 60 * 24, "days"],
    [60 * 60, "hours"],
    [60, "minutes"],
    [1, "seconds"],
  ];
  if (s >= 60 * 60 * 24 * 365 * 1e6) return "millions of years";
  for (const [secs, name] of units) {
    if (s >= secs) {
      const value = s / secs;
      const rounded = value >= 100 ? Math.round(value) : Math.round(value * 10) / 10;
      return `${rounded.toLocaleString()} ${name}`;
    }
  }
  return "instantly";
}

// ---------------------------------------------------------------------------
// Secure generator — uses window.crypto for real randomness.
// ---------------------------------------------------------------------------

const WORDS = [
  "cipher", "vector", "quantum", "falcon", "harbor", "granite", "nebula",
  "vertex", "cobalt", "signal", "phantom", "matrix", "orbit", "raptor",
  "titan", "willow", "zephyr", "ember", "onyx", "delta", "sable", "flux",
  "atlas", "cypher", "vault", "prism", "spark", "glyph", "north", "ridge",
];

function randInt(max: number): number {
  const arr = new Uint32Array(1);
  window.crypto.getRandomValues(arr);
  return arr[0] % max;
}

function generateRandom(length: number, opts: { upper: boolean; lower: boolean; digits: boolean; symbols: boolean }): string {
  let pool = "";
  if (opts.lower) pool += "abcdefghijkmnopqrstuvwxyz";
  if (opts.upper) pool += "ABCDEFGHJKLMNPQRSTUVWXYZ";
  if (opts.digits) pool += "23456789";
  if (opts.symbols) pool += "!@#$%^&*-_=+?";
  if (!pool) pool = "abcdefghijkmnopqrstuvwxyz";
  let out = "";
  for (let i = 0; i < length; i++) out += pool[randInt(pool.length)];
  return out;
}

function generatePassphrase(words: number): string {
  const parts: string[] = [];
  for (let i = 0; i < words; i++) parts.push(WORDS[randInt(WORDS.length)]);
  const sep = ["-", ".", "_"][randInt(3)];
  return parts.join(sep) + sep + randInt(100).toString().padStart(2, "0");
}

const scoreColor = (score: number) => {
  switch (score) {
    case 0: return "hsl(0 84% 60%)";
    case 1: return "hsl(24 90% 55%)";
    case 2: return "hsl(45 93% 55%)";
    case 3: return "hsl(140 65% 45%)";
    default: return "hsl(160 84% 45%)";
  }
};

const SecurityLab = () => {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const { toast } = useToast();

  // Generator state
  const [mode, setMode] = useState<"random" | "passphrase">("random");
  const [length, setLength] = useState(16);
  const [wordCount, setWordCount] = useState(4);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useDigits, setUseDigits] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [generated, setGenerated] = useState("");

  const analysis = useMemo(() => analyze(password), [password]);

  const handleCopy = useCallback(
    async (value: string, tag: string) => {
      if (!value) return;
      try {
        await navigator.clipboard.writeText(value);
        setCopied(tag);
        setTimeout(() => setCopied(null), 1500);
        toast({ title: "Copied to clipboard" });
      } catch {
        toast({ title: "Copy failed", variant: "destructive" });
      }
    },
    [toast]
  );

  const regenerate = useCallback(() => {
    const value =
      mode === "random"
        ? generateRandom(length, { upper: useUpper, lower: useLower, digits: useDigits, symbols: useSymbols })
        : generatePassphrase(wordCount);
    setGenerated(value);
  }, [mode, length, wordCount, useUpper, useLower, useDigits, useSymbols]);

  // Generate one on first interaction / mount-ish
  React.useEffect(() => {
    regenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const useGenerated = () => {
    setPassword(generated);
    setShow(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Password Security Lab — PointBlank"
        description="Analyze password strength and generate uncrackable passwords and passphrases. 100% offline — nothing you type ever leaves your browser."
        path="/security-lab"
      />
      <Header />

      <main className="container mx-auto px-4 pt-28 pb-20 md:pt-32">
        {/* Hero */}
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="mb-4" variant="secondary">
            <Shield className="mr-1 h-3.5 w-3.5" /> Free security tool
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            Password Security Lab
          </h1>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Test how long your password would survive a real attack, then generate
            one that never would fall. Everything runs locally in your browser —
            nothing you type is ever transmitted.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-2">
          {/* Analyzer */}
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-secondary" />
                Strength analyzer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="relative">
                <Input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Type or paste a password to test…"
                  className="pr-10"
                  autoComplete="off"
                  spellCheck={false}
                />
                <button
                  type="button"
                  aria-label={show ? "Hide password" : "Show password"}
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Strength meter */}
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 font-medium">
                    {analysis.score >= 3 ? (
                      <ShieldCheck className="h-4 w-4" style={{ color: scoreColor(analysis.score) }} />
                    ) : (
                      <ShieldAlert className="h-4 w-4" style={{ color: scoreColor(analysis.score) }} />
                    )}
                    <span style={{ color: scoreColor(analysis.score) }}>{password ? analysis.label : "—"}</span>
                  </span>
                  <span className="text-muted-foreground">{analysis.entropyBits} bits entropy</span>
                </div>
                <div className="mt-2 flex gap-1.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-2 flex-1 rounded-full transition-colors duration-300"
                      style={{
                        backgroundColor:
                          password && i <= analysis.score
                            ? scoreColor(analysis.score)
                            : "hsl(var(--muted))",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Crack time */}
              <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Estimated time to crack (offline, 50B guesses/sec)
                </div>
                <div
                  className="mt-1 text-2xl font-bold"
                  style={{ color: password ? scoreColor(analysis.score) : undefined }}
                >
                  {password ? humanizeSeconds(analysis.crackSeconds) : "—"}
                </div>
              </div>

              {/* Checks */}
              <ul className="space-y-2">
                {analysis.checks.map((c) => (
                  <li key={c.label} className="flex items-center gap-2 text-sm">
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full ${
                        c.ok ? "bg-secondary/20 text-secondary" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {c.ok ? <Check className="h-3 w-3" /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
                    </span>
                    <span className={c.ok ? "" : "text-muted-foreground"}>{c.label}</span>
                  </li>
                ))}
              </ul>

              {password && (
                <div className="rounded-lg border border-border/60 p-3 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Tip: </span>
                  {analysis.suggestions[0]}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Generator */}
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <KeyRound className="h-5 w-5 text-secondary" />
                Secure generator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Mode toggle */}
              <div className="grid grid-cols-2 gap-2 rounded-lg bg-muted/40 p-1">
                {(["random", "passphrase"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`rounded-md py-1.5 text-sm font-medium capitalize transition-colors ${
                      mode === m
                        ? "bg-secondary text-secondary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              {/* Output */}
              <div className="relative rounded-lg border border-border/60 bg-muted/30 p-4">
                <div className="break-all pr-16 font-mono text-lg">{generated || "—"}</div>
                <div className="absolute right-3 top-1/2 flex -translate-y-1/2 gap-1">
                  <button
                    aria-label="Regenerate"
                    onClick={regenerate}
                    className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                  <button
                    aria-label="Copy generated password"
                    onClick={() => handleCopy(generated, "gen")}
                    className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    {copied === "gen" ? <Check className="h-4 w-4 text-secondary" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Controls */}
              {mode === "random" ? (
                <div className="space-y-4">
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <Label>Length</Label>
                      <span className="font-mono text-muted-foreground">{length}</span>
                    </div>
                    <Slider
                      value={[length]}
                      min={8}
                      max={48}
                      step={1}
                      onValueChange={(v) => setLength(v[0])}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Lowercase", val: useLower, set: setUseLower },
                      { label: "Uppercase", val: useUpper, set: setUseUpper },
                      { label: "Digits", val: useDigits, set: setUseDigits },
                      { label: "Symbols", val: useSymbols, set: setUseSymbols },
                    ].map((o) => (
                      <div key={o.label} className="flex items-center justify-between rounded-lg border border-border/60 px-3 py-2">
                        <Label className="text-sm">{o.label}</Label>
                        <Switch checked={o.val} onCheckedChange={(c) => o.set(c)} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <Label>Words</Label>
                    <span className="font-mono text-muted-foreground">{wordCount}</span>
                  </div>
                  <Slider
                    value={[wordCount]}
                    min={3}
                    max={8}
                    step={1}
                    onValueChange={(v) => setWordCount(v[0])}
                  />
                  <p className="mt-3 text-sm text-muted-foreground">
                    Word-based passphrases are easier to remember and, when long
                    enough, far harder to crack than short complex strings.
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <Button onClick={regenerate} variant="outline" className="flex-1">
                  <RefreshCw className="mr-2 h-4 w-4" /> Generate
                </Button>
                <Button onClick={useGenerated} className="flex-1">
                  Test this one
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-muted-foreground">
          Privacy note: this tool performs all analysis and generation locally
          using your browser's cryptographic APIs. Nothing you enter here is
          logged, stored, or sent to PointBlank or any third party.
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default SecurityLab;
