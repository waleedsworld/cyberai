import { useEffect, useState } from "react";
import { ShieldCheck, ShieldAlert, FileSearch } from "lucide-react";

/**
 * ScanResultsSummary — a premium at-a-glance header for compliance results.
 *
 * Computes pass / fail counts from the raw report and renders an animated
 * compliance-score ring plus stat tiles. Falls back to a friendly empty
 * state when a completed scan produced no findings.
 */

type Finding = { status?: string };
type Page = { findings?: Finding[] };

const useCountUp = (target: number, duration = 900) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
};

const ScanResultsSummary = ({ pages }: { pages?: Page[] }) => {
  const findings = (pages ?? []).flatMap((p) => p.findings ?? []);
  const total = findings.length;
  const passed = findings.filter(
    (f) => String(f.status).toLowerCase() === "pass"
  ).length;
  const failed = total - passed;
  const score = total === 0 ? 0 : Math.round((passed / total) * 100);

  const animatedScore = useCountUp(score);
  const animatedPass = useCountUp(passed);
  const animatedFail = useCountUp(failed);

  // Ring geometry
  const R = 52;
  const CIRC = 2 * Math.PI * R;
  const dash = (animatedScore / 100) * CIRC;

  const tone =
    score >= 80 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#d02030";

  if (total === 0) {
    return (
      <div className="mx-auto mb-8 max-w-xl rounded-2xl border border-white/10 bg-white/[0.02] p-10 text-center">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-white/5 ring-1 ring-white/10">
          <FileSearch className="h-7 w-7 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">No findings returned</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          The scan completed but produced no evaluated laws for these URLs. Try
          a different page or region.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto mb-10 grid max-w-4xl items-center gap-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-6 sm:grid-cols-[auto_1fr] sm:p-8">
      {/* Score ring */}
      <div className="relative mx-auto h-32 w-32">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle
            cx="60"
            cy="60"
            r={R}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="8"
          />
          <circle
            cx="60"
            cy="60"
            r={R}
            fill="none"
            stroke={tone}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${CIRC}`}
            style={{ transition: "stroke 0.4s ease" }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <div className="text-3xl font-bold tabular-nums">
              {animatedScore}
              <span className="text-lg text-muted-foreground">%</span>
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Compliant
            </div>
          </div>
        </div>
      </div>

      {/* Stat tiles */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <div className="text-2xl font-bold tabular-nums text-white">
            {total}
          </div>
          <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Laws checked
          </div>
        </div>
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] p-4">
          <div className="flex items-center gap-1.5 text-2xl font-bold tabular-nums text-emerald-400">
            <ShieldCheck className="h-5 w-5" />
            {animatedPass}
          </div>
          <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-emerald-400/70">
            Passing
          </div>
        </div>
        <div className="rounded-xl border border-primary/25 bg-primary/[0.07] p-4">
          <div className="flex items-center gap-1.5 text-2xl font-bold tabular-nums text-primary">
            <ShieldAlert className="h-5 w-5" />
            {animatedFail}
          </div>
          <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-primary/70">
            Needs work
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanResultsSummary;
