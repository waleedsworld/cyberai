import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import {
  ShieldCheck,
  RotateCcw,
  Printer,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Gauge,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import {
  READINESS_DOMAINS,
  MATURITY_OPTIONS,
  MAX_PER_QUESTION,
  ATTENTION_THRESHOLD,
  TOTAL_QUESTIONS,
  tierForScore,
  type MaturityLevel,
  type DomainScore,
} from "@/data/readiness";

const STORAGE_KEY = "pointblank_readiness_answers_v1";

type Answers = Record<string, MaturityLevel>;

const readAnswers = (): Answers => {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Answers;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
};

const ReadinessScorecard = () => {
  const [answers, setAnswers] = useState<Answers>(readAnswers);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch {
      /* ignore quota / private-mode errors */
    }
  }, [answers]);

  const setAnswer = (questionId: string, value: MaturityLevel) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const answeredCount = Object.keys(answers).length;
  const progressPct = Math.round((answeredCount / TOTAL_QUESTIONS) * 100);

  const domainScores: DomainScore[] = useMemo(() => {
    return READINESS_DOMAINS.map((domain) => {
      const answered = domain.questions.filter((q) => q.id in answers);
      const earned = answered.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);
      const possible = domain.questions.length * MAX_PER_QUESTION;
      const percent = possible === 0 ? 0 : Math.round((earned / possible) * 100);
      return {
        domain,
        percent,
        answered: answered.length,
        total: domain.questions.length,
      };
    });
  }, [answers]);

  const overall = useMemo(() => {
    if (answeredCount === 0) return 0;
    // Average of domain percentages that have at least one answer, so a partial
    // fill still reads sensibly rather than being dragged down by empty domains.
    const scored = domainScores.filter((d) => d.answered > 0);
    if (scored.length === 0) return 0;
    return Math.round(
      scored.reduce((sum, d) => sum + d.percent, 0) / scored.length
    );
  }, [domainScores, answeredCount]);

  const tier = tierForScore(overall);
  const isComplete = answeredCount === TOTAL_QUESTIONS;

  const radarData = domainScores.map((d) => ({
    axis: d.domain.axis,
    value: d.percent,
  }));

  const focusAreas = domainScores
    .filter((d) => d.answered > 0 && d.percent <= ATTENTION_THRESHOLD)
    .sort((a, b) => a.percent - b.percent);

  const reset = () => {
    setAnswers({});
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-[#d02030]/40 selection:text-white overflow-x-hidden">
      <Seo
        title="Compliance Readiness Scorecard | PointBlank"
        description="Score your organisation's security and GCC compliance readiness across six domains in two minutes — free, private, and entirely in your browser."
        path="/readiness"
      />
      <Header />

      <main className="pt-[108px]">
        {/* Hero */}
        <section className="relative border-b border-white/10">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 h-[420px] w-[720px] rounded-full bg-[radial-gradient(ellipse,rgba(208,32,48,0.16),transparent_65%)] blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-[1100px] px-5 md:px-10 py-14 text-center">
            <Badge
              variant="outline"
              className="mb-5 border-[#d02030]/40 bg-[#d02030]/10 text-[#ff8a96]"
            >
              Free · Private · No sign-up
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5">
              Compliance Readiness Scorecard
            </h1>
            <p className="mx-auto max-w-2xl text-base md:text-lg text-white/60">
              Answer {TOTAL_QUESTIONS} quick questions across six security domains
              and get an instant readiness score with a visual profile and
              targeted next steps. Everything runs in your browser — nothing is
              sent anywhere.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-[1100px] px-5 md:px-10 py-12">
          {/* Score summary panel */}
          <section
            aria-label="Readiness summary"
            className="gradient-border rounded-2xl bg-[#0a0608]/70 p-6 md:p-8 mb-12"
          >
            <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_360px] items-center">
              {/* Left: score + tier */}
              <div>
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45 mb-4">
                  <Gauge className="h-4 w-4 text-[#ff8a96]" />
                  Overall Readiness
                </div>
                <div className="flex items-end gap-4">
                  <span
                    className="text-6xl md:text-7xl font-bold tabular-nums leading-none"
                    data-testid="overall-score"
                  >
                    {overall}
                    <span className="text-2xl text-white/40">/100</span>
                  </span>
                  <span
                    className={`mb-2 text-lg font-semibold ${tier.accent}`}
                    data-testid="tier-label"
                  >
                    {tier.label}
                  </span>
                </div>

                {/* progress track */}
                <div className="mt-5 h-2.5 w-full rounded-full bg-white/8 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#d02030,#f52b43)] transition-all duration-500"
                    style={{ width: `${overall}%` }}
                  />
                </div>
                <p className="mt-4 text-sm text-white/55 max-w-md">
                  {answeredCount === 0
                    ? "Answer the questions below to generate your readiness profile."
                    : tier.description}
                </p>

                <div className="mt-5 text-[12px] font-mono uppercase tracking-[0.18em] text-white/40">
                  {answeredCount} / {TOTAL_QUESTIONS} answered · {progressPct}% complete
                </div>
              </div>

              {/* Right: radar profile */}
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} outerRadius="72%">
                    <PolarGrid stroke="rgba(255,255,255,0.12)" />
                    <PolarAngleAxis
                      dataKey="axis"
                      tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 11 }}
                    />
                    <PolarRadiusAxis
                      domain={[0, 100]}
                      tick={false}
                      axisLine={false}
                    />
                    <Radar
                      dataKey="value"
                      stroke="#f52b43"
                      fill="#d02030"
                      fillOpacity={0.35}
                      isAnimationActive
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={reset}
                className="border-white/15 bg-transparent text-white/80 hover:bg-white/5 hover:text-white"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
                className="border-white/15 bg-transparent text-white/80 hover:bg-white/5 hover:text-white"
              >
                <Printer className="mr-2 h-4 w-4" />
                Print / Save PDF
              </Button>
              <Link
                to="/compliance-check"
                className="ml-auto inline-flex items-center gap-2 rounded-lg bg-[#d02030] px-5 py-2.5 text-[13px] font-semibold text-white transition-all hover:bg-[#f52b43] shadow-[0_0_24px_rgba(208,32,48,0.35)]"
              >
                Run a full compliance scan
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          {/* Focus areas — only once something is scored */}
          {focusAreas.length > 0 && (
            <section aria-label="Focus areas" className="mb-12">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
                Recommended focus areas
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {focusAreas.map((d) => (
                  <div
                    key={d.domain.id}
                    className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{d.domain.title}</span>
                      <span className="text-sm font-semibold text-amber-400 tabular-nums">
                        {d.percent}%
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-white/60">
                      {d.domain.recommendation}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Questionnaire */}
          <section aria-label="Assessment" className="space-y-6">
            {READINESS_DOMAINS.map((domain) => {
              const score = domainScores.find((d) => d.domain.id === domain.id)!;
              const done = score.answered === score.total;
              return (
                <div
                  key={domain.id}
                  className="rounded-2xl border border-white/10 bg-[#0a0608]/60 p-6 md:p-7"
                >
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="flex items-center gap-2 text-xl font-semibold">
                        <ShieldCheck className="h-5 w-5 text-[#ff8a96]" />
                        {domain.title}
                      </h3>
                      <p className="mt-1 text-sm text-white/55">{domain.blurb}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      {done && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      )}
                      <span className="text-sm font-semibold tabular-nums text-white/70">
                        {score.answered > 0 ? `${score.percent}%` : "—"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-5">
                    {domain.questions.map((q) => {
                      const current = answers[q.id];
                      return (
                        <fieldset key={q.id}>
                          <legend className="mb-2.5 text-sm font-medium text-white/85">
                            {q.prompt}
                          </legend>
                          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                            {MATURITY_OPTIONS.map((opt) => {
                              const active = current === opt.value;
                              return (
                                <button
                                  key={opt.value}
                                  type="button"
                                  aria-pressed={active}
                                  onClick={() => setAnswer(q.id, opt.value)}
                                  className={`rounded-lg border px-3 py-2.5 text-left text-[12.5px] leading-snug transition-all ${
                                    active
                                      ? "border-[#d02030] bg-[#d02030]/15 text-white shadow-[0_0_18px_rgba(208,32,48,0.25)]"
                                      : "border-white/10 bg-white/[0.02] text-white/60 hover:border-white/25 hover:text-white"
                                  }`}
                                >
                                  <span className="block font-mono text-[10px] uppercase tracking-wider text-white/40">
                                    Level {opt.value}
                                  </span>
                                  {opt.label}
                                </button>
                              );
                            })}
                          </div>
                        </fieldset>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </section>

          {/* Completion nudge */}
          <section className="mt-12 rounded-2xl border border-white/10 bg-[#0a0608]/60 p-8 text-center">
            <h2 className="text-2xl font-semibold">
              {isComplete
                ? "Your scorecard is complete"
                : "Want an expert to verify this?"}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-white/60">
              This self-assessment is a starting point. PointBlank's analysts can
              validate your controls with evidence-backed testing and map findings
              to the regulations that apply to you.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                to="/compliance-check"
                className="inline-flex items-center gap-2 rounded-lg bg-[#d02030] px-6 py-3 text-[14px] font-semibold text-white transition-all hover:bg-[#f52b43]"
              >
                Free website compliance check
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="/#book"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-6 py-3 text-[14px] font-semibold text-white/85 transition-all hover:border-white/30 hover:text-white"
              >
                Book a review
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReadinessScorecard;
