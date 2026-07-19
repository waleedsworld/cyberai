import { useEffect, useState } from "react";
import { Globe, ShieldCheck, ScanLine } from "lucide-react";

/**
 * ScanProgress — a premium, animated status surface used while the
 * compliance workflow is fetching laws or scanning URLs.
 *
 * It replaces a bare <Loader2/> spinner with a branded radar sweep, an
 * indeterminate progress bar, and a rotating log of the work currently
 * happening. Purely presentational — the parent still owns the async flow.
 */

type Props = {
  title: string;
  /** Rotating phase lines shown one at a time under the title. */
  phases: string[];
  /** Optional list of target URLs to render as animated scan rows. */
  urls?: string[];
  /** Small mono label at the very top (e.g. "STEP 3 / SCANNING"). */
  eyebrow?: string;
};

const ScanProgress = ({ title, phases, urls, eyebrow }: Props) => {
  const [phaseIndex, setPhaseIndex] = useState(0);

  useEffect(() => {
    if (phases.length <= 1) return;
    const id = window.setInterval(() => {
      setPhaseIndex((i) => (i + 1) % phases.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, [phases.length]);

  return (
    <div className="mx-auto max-w-2xl">
      {eyebrow && (
        <div className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-primary/80">
          {eyebrow}
        </div>
      )}

      {/* Radar */}
      <div className="relative mx-auto mb-10 h-40 w-40">
        {/* Expanding rings */}
        <span className="absolute inset-0 rounded-full border border-primary/30 ring-expand" />
        <span
          className="absolute inset-0 rounded-full border border-primary/20 ring-expand"
          style={{ animationDelay: "2s" }}
        />
        {/* Static dial */}
        <div className="absolute inset-4 rounded-full border border-primary/25" />
        <div className="absolute inset-10 rounded-full border border-primary/15" />
        {/* Sweep */}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <div className="scan-radar absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(208,32,48,0.35)_40deg,transparent_80deg)]" />
        </div>
        {/* Core */}
        <div className="absolute inset-0 grid place-items-center">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-primary/10 orb-pulse ring-1 ring-primary/40 backdrop-blur">
            <ScanLine className="h-7 w-7 text-primary" />
          </div>
        </div>
      </div>

      <h2 className="text-center text-2xl font-bold sm:text-3xl">{title}</h2>

      {/* Rotating phase line */}
      <div className="mt-3 flex min-h-[24px] items-center justify-center gap-2 text-center">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </span>
        <span
          key={phaseIndex}
          className="fade-up text-sm text-muted-foreground"
          style={{ animationDuration: "0.5s" }}
        >
          {phases[phaseIndex]}
        </span>
      </div>

      {/* Indeterminate progress bar */}
      <div className="mx-auto mt-6 h-1 w-full max-w-md overflow-hidden rounded-full bg-white/[0.06]">
        <div className="progress-indeterminate h-full w-1/3 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>

      {/* Per-URL scan rows */}
      {urls && urls.length > 0 && (
        <div className="mx-auto mt-8 max-w-md space-y-2">
          {urls.map((u, i) => (
            <div
              key={u + i}
              className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2.5 fade-up"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <Globe className="h-4 w-4 shrink-0 text-primary/80" />
              <span className="flex-1 truncate text-sm text-white/70">{u}</span>
              <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-primary/70">
                <ShieldCheck className="h-3.5 w-3.5 animate-pulse" />
                Scanning
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScanProgress;
