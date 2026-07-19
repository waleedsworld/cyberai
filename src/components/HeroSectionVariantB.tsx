import { ArrowRight, ShieldCheck } from "lucide-react";

/**
 * Landing hero — A/B variant B (activated via `?variant=b`).
 *
 * Deliberately distinct from the default {@link HeroSection}:
 *  - centered single-column layout instead of the split copy/orb grid
 *  - outcome-led headline ("Breach nothing. Prove everything.")
 *  - a proof-point stat row in place of the animated orb
 *  - primary CTA reframed around booking a review
 * Kept fully self-contained so it can be swapped in/out without touching
 * the shared HeroSection.
 */
const STATS = [
  { value: "0-day", label: "median triage to first proof" },
  { value: "100%", label: "findings verified by an expert" },
  { value: "24/7", label: "incident response on call" },
];

const HeroSectionVariantB = () => {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#030303]">
      {/* Background ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[1200px] h-[900px] rounded-full bg-[radial-gradient(ellipse,rgba(208,32,48,0.22),transparent_60%)] blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-[radial-gradient(ellipse,rgba(102,0,8,0.5),transparent_65%)] blur-3xl" />
      </div>

      {/* Faint masked grid, centered */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,43,67,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(245,43,67,0.08) 1px,transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse at 50% 40%, #000 20%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 40%, #000 20%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1000px] px-6 md:px-12 pt-20 pb-24 md:pt-28 md:pb-32 text-center">
        <div className="flex flex-col items-center gap-8 fade-up">
          <span className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-[#d02030]/40 bg-[#d02030]/10 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#ff8a96]">
            <ShieldCheck className="h-3.5 w-3.5" />
            AI-accelerated. Expert-verified.
          </span>

          <h1 className="font-bold leading-[0.98] tracking-tight text-white text-5xl sm:text-6xl lg:text-[5rem]">
            Breach nothing.
            <br />
            <span className="bg-gradient-to-r from-[#ffd4d9] via-[#ff8a96] to-[#d02030] bg-clip-text text-transparent">
              Prove everything.
            </span>
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-white/65">
            PointBlank pairs AI-driven testing with human verification, so every
            finding ships with reproducible proof — not just a score.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-1">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#d02030] hover:bg-[#f52b43] text-white font-semibold rounded-lg transition-all shadow-[0_0_40px_rgba(208,32,48,0.45)]"
            >
              Start a Security Review
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/15 hover:border-white/30 text-white font-semibold rounded-lg hover:bg-white/5 transition-colors glass-dark"
            >
              See how it works
            </a>
          </div>

          {/* Proof-point stat row (replaces the orb) */}
          <div className="mt-6 grid w-full max-w-2xl grid-cols-1 sm:grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/5">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 bg-[#060606] px-5 py-6"
              >
                <span className="text-3xl font-bold text-white">{stat.value}</span>
                <span className="text-xs leading-snug text-white/55">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom thin red edge */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-[linear-gradient(90deg,transparent,rgba(245,43,67,0.7),transparent)]" />
    </section>
  );
};

export default HeroSectionVariantB;
