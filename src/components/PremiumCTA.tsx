import { ArrowUpRight } from "lucide-react";

const PremiumCTA = () => {
  return (
    <section id="contact" className="relative border-b border-white/10 bg-[#030303]">
      <div className="relative mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 py-24 md:py-32">
        <div className="grid gap-5 md:grid-cols-2">
          {/* Card A — Talk to Sales (red) */}
          <a
            href="#book"
            className="group relative overflow-hidden rounded-2xl border border-[#d02030]/40 bg-gradient-to-br from-[#1a0306] via-[#3b0004] to-[#660008] p-10 md:p-12 transition-all hover:border-[#d02030]/70"
          >
            <div className="absolute -top-40 -right-40 h-[400px] w-[400px] rounded-full bg-[#d02030]/35 blur-3xl group-hover:bg-[#d02030]/50 transition-colors" />
            <div className="absolute inset-0 opacity-50 pointer-events-none bg-[radial-gradient(circle_at_30%_40%,rgba(255,90,102,0.18),transparent_50%)]" />

            <div className="relative flex h-full flex-col">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffd4d9] mb-5">
                Start Engagement
              </div>
              <h3 className="text-4xl md:text-5xl font-semibold tracking-tight text-white leading-[1.05] mb-4 max-w-md">
                Talk to a security expert.
              </h3>
              <p className="text-[15px] text-white/70 mb-10 max-w-md">
                Scope your engagement and confirm next steps within one business day.
              </p>
              <div className="mt-auto flex items-center justify-between pt-8 border-t border-white/15">
                <span className="text-[13px] font-semibold uppercase tracking-[0.2em] text-white">
                  Book a Call
                </span>
                <ArrowUpRight className="h-5 w-5 text-white transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </div>
          </a>

          {/* Card B — Read research (dark glass) */}
          <a
            href="#research"
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0a0505] to-[#030303] p-10 md:p-12 transition-all hover:border-white/25"
          >
            <div className="absolute -top-32 -right-32 h-[380px] w-[380px] rounded-full bg-white/[0.05] blur-3xl" />

            <div className="relative flex h-full flex-col">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55 mb-5">
                Latest Research
              </div>
              <h3 className="text-4xl md:text-5xl font-semibold tracking-tight text-white leading-[1.05] mb-4 max-w-md">
                Read the 2026 threat brief.
              </h3>
              <p className="text-[15px] text-white/55 mb-10 max-w-md">
                AI-assisted findings, KSA threat trends, and quarterly remediation metrics.
              </p>
              <div className="mt-auto flex items-center justify-between pt-8 border-t border-white/10">
                <span className="text-[13px] font-semibold uppercase tracking-[0.2em] text-white">
                  Download Brief
                </span>
                <ArrowUpRight className="h-5 w-5 text-white/75 group-hover:text-white transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default PremiumCTA;
