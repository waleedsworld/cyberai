import { Search, FileCode, BarChart2, Network, RefreshCw, Lock } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const FeaturesGrid = () => {
  const features = [
    {
      number: "01",
      icon: Search,
      title: "Scan Attack Surface",
      description: "Map apps, APIs, codebases, cloud assets, and exposed workflows before risk turns into an incident.",
    },
    {
      number: "02",
      icon: FileCode,
      title: "Prove Exploitability",
      description: "Use AI-assisted testing to separate theoretical alerts from security issues that can actually be abused.",
    },
    {
      number: "03",
      icon: BarChart2,
      title: "Patch Root Cause",
      description: "Turn findings into precise remediation steps for code, configuration, identity, and infrastructure owners.",
    },
    {
      number: "04",
      icon: Network,
      title: "Verify Closure",
      description: "Retest fixed issues and produce evidence that risk was eliminated, not just marked as accepted.",
    },
    {
      number: "05",
      icon: RefreshCw,
      title: "Run Security Loop",
      description: "Continuously feed detection, response, and compliance data back into the next security decision.",
    },
    {
      number: "06",
      icon: Lock,
      title: "Protect Sovereign Data",
      description: "Keep sensitive security and business data governed while AI accelerates investigation and closure.",
    },
  ];

  const delays = ["0.2s", "0.3s", "0.4s", "0.5s", "0.6s", "0.7s"];

  return (
    <section id="features" className="grid border-zinc-200 dark:border-[#d02030]/15 md:grid-cols-2 lg:grid-cols-3 md:p-12 lg:p-24 bg-white dark:bg-[#030303] border-b px-6 py-6 gap-x-6 gap-y-6 transition-colors">
      {features.map((feature, idx) => {
        const Icon = feature.icon;
        return (
          <SpotlightCard
            key={idx}
            className={`p-8 lg:p-12 group animate-on-scroll`}
            style={{ animationDelay: delays[idx] } as React.CSSProperties}
          >
            <span className="absolute top-8 right-8 text-[11px] font-mono text-[#d02030]/50 dark:text-[#f52b43]/42">{feature.number}</span>
            <div className="relative z-10 flex flex-col h-full justify-between gap-16">
              <div className="w-12 h-12 bg-[#d02030]/10 border border-[#d02030]/24 dark:border-[#d02030]/24 flex items-center justify-center text-[#d02030] dark:text-[#ff5a66] rounded-sm transition-colors duration-200 group-hover:bg-[#d02030]/18">
                <Icon className="w-6 h-6 stroke-[1.5]" />
              </div>
              <div>
                <h3 className="text-xl text-zinc-950 dark:text-white mb-3 font-semibold tracking-tight">{feature.title}</h3>
                <p className="text-[14px] text-zinc-600 dark:text-white/50 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          </SpotlightCard>
        );
      })}
    </section>
  );
};

export default FeaturesGrid;
