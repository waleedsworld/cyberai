import { ArrowRight } from "lucide-react";
import AnimatedOrb from "./AnimatedOrb";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#030303]">
      {/* Background ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-1/3 -right-1/4 w-[1100px] h-[1100px] rounded-full bg-[radial-gradient(circle,rgba(208,32,48,0.2),transparent_55%)] blur-3xl" />
        <div className="absolute -bottom-1/3 -left-1/4 w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle,rgba(102,0,8,0.55),transparent_60%)] blur-3xl" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(245,43,67,0.08),transparent_70%)] blur-3xl float-y" />
      </div>

      {/* Faint masked grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,43,67,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(245,43,67,0.08) 1px,transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse at 65% 50%, #000 25%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at 65% 50%, #000 25%, transparent 75%)",
        }}
      />

      {/* Diagonal light streaks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-1/3 w-px h-full opacity-30"
          style={{
            background:
              "linear-gradient(180deg, transparent, rgba(255,90,102,0.5) 40%, rgba(255,90,102,0.5) 60%, transparent)",
            transform: "rotate(8deg) translateY(-20%)",
          }}
        />
        <div
          className="absolute top-0 right-1/4 w-px h-full opacity-25"
          style={{
            background:
              "linear-gradient(180deg, transparent, rgba(208,32,48,0.6) 45%, transparent)",
            transform: "rotate(-6deg) translateY(-10%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 pt-16 pb-24 md:pt-20 md:pb-32 lg:pt-24 lg:pb-40">
        <div className="grid gap-10 lg:gap-6 lg:grid-cols-12 items-center min-h-[640px]">
          {/* Left: tight copy */}
          <div className="lg:col-span-6 flex flex-col gap-7 fade-up relative z-20">
            <div>
              <span className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-[#d02030]/40 bg-[#d02030]/10 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#ff8a96]">
                <span className="relative inline-flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#f52b43] opacity-70 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#f52b43]" />
                </span>
                PointBlank
              </span>
            </div>

            <h1 className="font-bold leading-[0.98] tracking-tight text-white text-6xl sm:text-7xl lg:text-[5.5rem] xl:text-[6.5rem]">
              Security,
              <br />
              <span className="bg-gradient-to-r from-[#ffd4d9] via-[#ff8a96] to-[#d02030] bg-clip-text text-transparent">
                redefined.
              </span>
            </h1>

            <p className="max-w-md text-lg leading-relaxed text-white/65">
              AI accelerates. Experts verify. Every finding shipped with proof.
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href="#services"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#d02030] hover:bg-[#f52b43] text-white font-semibold rounded-lg transition-all shadow-[0_0_40px_rgba(208,32,48,0.45)]"
              >
                Explore Services
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/15 hover:border-white/30 text-white font-semibold rounded-lg hover:bg-white/5 transition-colors glass-dark"
              >
                Book Review
              </a>
            </div>
          </div>

          {/* Right: hero orb (positioned to bleed beyond container slightly) */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[420px] lg:min-h-[640px]">
            <div className="relative">
              <AnimatedOrb size={680} className="hidden xl:block" />
              <AnimatedOrb size={580} className="hidden lg:block xl:hidden" />
              <AnimatedOrb size={420} className="hidden md:block lg:hidden mx-auto" />
              <AnimatedOrb size={320} className="block md:hidden mx-auto" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom thin red edge */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-[linear-gradient(90deg,transparent,rgba(245,43,67,0.7),transparent)]" />
    </section>
  );
};

export default HeroSection;
