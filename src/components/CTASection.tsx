import { Link } from "react-router-dom";
import { Rocket, ShieldCheck, TrendingUp, Code2, Headphones, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const CTASection = () => {
  const reasons = [
    {
      icon: Rocket,
      title: "Velocity First",
      description: "Deploy production-ready security environments in minutes, not months. Our pre-configured stacks eliminate boilerplate fatigue."
    },
    {
      icon: ShieldCheck,
      title: "Sovereign Security",
      description: "SOC2 Type II compliant infrastructure with optional on-premise deployment for total data governance in GCC regions."
    },
    {
      icon: TrendingUp,
      title: "Infinite Scale",
      description: "Built on serverless architecture that scales from zero to millions of concurrent requests without manual intervention."
    },
    {
      icon: Code2,
      title: "Developer Native",
      description: "Comprehensive SDKs for Python, Node, and Go. Written by developers, for developers, with exceptional docs."
    },
    {
      icon: Headphones,
      title: "Human Support",
      description: "Direct access to core engineers via Slack. We don't hide behind chatbots when your critical systems are live."
    },
  ];

  const delays = ["0.2s", "0.3s", "0.4s", "0.5s", "0.6s", "0.7s"];
  const ref1 = useScrollAnimation();

  return (
    <section className="lg:py-32 border-zinc-200 dark:border-[#d02030]/15 overflow-hidden bg-white dark:bg-[#050202] border-b pt-24 pb-24 relative transition-colors">
      {/* Vertical Background Lines */}
      <div className="absolute inset-0 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 pointer-events-none flex justify-between z-0">
        <div className="w-px h-full dark:bg-[#d02030]/10 bg-zinc-200"></div>
        <div className="hidden md:block w-px h-full dark:bg-[#d02030]/10 bg-zinc-200 absolute left-1/2 -translate-x-1/2"></div>
        <div className="hidden lg:block w-px h-full dark:bg-[#d02030]/10 bg-zinc-200 absolute left-[33.33%]"></div>
        <div className="hidden lg:block w-px h-full dark:bg-[#d02030]/10 bg-zinc-200 absolute left-[66.66%]"></div>
        <div className="w-px h-full dark:bg-[#d02030]/10 bg-zinc-200"></div>
      </div>

      <div className="z-10 md:px-12 lg:px-24 max-w-[1440px] mr-auto ml-auto pr-6 pl-6 relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
          {/* Left CTA Content */}
          <div ref={ref1} className="lg:col-span-5 flex flex-col justify-between h-full animate-on-scroll">
            <div>
              <div className="inline-flex items-center gap-2 mb-8 border border-[#d02030]/30 rounded-lg px-3 py-1 bg-[#d02030]/10">
                <span className="text-[#f52b43] text-sm">■</span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/60 font-medium">Why PointBlank</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-5xl text-white font-serif italic tracking-tight font-light mb-6">
                Built for
                <span className="text-[#f52b43] font-serif not-italic"> verified closure</span>
              </h2>
              <p className="text-white/50 leading-relaxed max-w-sm mb-12">
                We don't just build software; we architect digital security systems that evolve with your enterprise needs.
              </p>
            </div>
            
            <Link
              to="/compliance-check"
              className="group inline-flex w-fit overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] rounded-sm pt-[1px] pr-[1px] pb-[1px] pl-[1px] relative items-center justify-center"
            >
              <span className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,#ff5a66_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              <span className="absolute inset-0 rounded-sm bg-[#d02030] transition-opacity duration-300 group-hover:opacity-0"></span>
              <span className="flex items-center justify-center gap-3 transition-colors duration-300 group-hover:text-white text-sm font-medium text-white tracking-tight bg-[#d02030] w-full h-full rounded-sm pt-4 pr-8 pb-4 pl-8 relative">
                <span className="relative z-10 uppercase tracking-widest text-xs">Start Integration</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>

          {/* Right 5 Reasons Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
            {reasons.map((reason, idx) => {
              const Icon = reason.icon;
              return (
                <div key={idx} className="group animate-on-scroll" style={{ animationDelay: delays[idx + 1] } as React.CSSProperties}>
                  <div className="w-10 h-10 border border-[#d02030]/30 rounded-sm flex items-center justify-center mb-6 bg-[#d02030]/10 group-hover:bg-[#d02030]/18 transition-colors">
                    <Icon className="text-[#ff5a66] w-5 h-5" />
                  </div>
                  <h3 className="text-white font-semibold text-xl mb-3">{reason.title}</h3>
                  <p className="text-[13px] text-white/50 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
