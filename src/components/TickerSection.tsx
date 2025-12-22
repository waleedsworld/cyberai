import { Database, Sliders, TrendingUp, ShieldCheck, Zap } from "lucide-react";

const TickerSection = () => {
  const items = [
    { icon: Database, text: "ATTACK SURFACE" },
    { icon: Sliders, text: "AI THREAT DETECTION" },
    { icon: TrendingUp, text: "EXPLOITABILITY PROOF" },
    { icon: ShieldCheck, text: "VERIFIED CLOSURE" },
    { icon: Zap, text: "AUTOMATED PATCHING" },
  ];

  return (
    <section className="border-zinc-200 dark:border-[#d02030]/15 overflow-hidden bg-gradient-to-r from-zinc-50 to-white dark:from-[#070303] dark:to-[#030303] border-b py-6 backdrop-blur transition-colors">
      <div className="flex w-max animate-scroll">
        <div className="flex items-center gap-16 px-8">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-3 text-zinc-500 dark:text-white/48 text-[11px] tracking-[0.2em] uppercase font-semibold">
                <Icon className="w-4 h-4 text-[#d02030] dark:text-[#f52b43]/70" />
                {item.text}
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-16 px-8">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-3 text-zinc-500 dark:text-white/48 text-[11px] tracking-[0.2em] uppercase font-semibold">
                <Icon className="w-4 h-4 text-[#d02030] dark:text-[#f52b43]/70" />
                {item.text}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TickerSection;
