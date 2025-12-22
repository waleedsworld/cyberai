import { ArrowUpRight, Boxes, MonitorPlay } from "lucide-react";

const references = [
  {
    title: "Onyx AI Sandbox",
    description: "Local interactive Onyx build for motion, layout, and product-page reference.",
    href: "http://127.0.0.1:4175/s/onyx-ai-react/",
    detail: "127.0.0.1:4175",
    icon: Boxes,
  },
  {
    title: "SentinelOne Mirror",
    description: "Local SentinelOne homepage mirror for nav, footer, media, and section rhythm review.",
    href: "http://127.0.0.1:4176/",
    detail: "127.0.0.1:4176",
    icon: MonitorPlay,
  },
];

const LiveReferencesSection = () => {
  return (
    <section className="border-b border-[#d02030]/15 bg-[#050202] px-6 py-8 md:px-12 lg:px-24">
      <div className="mx-auto grid max-w-[1440px] gap-4 md:grid-cols-2">
        {references.map((reference) => {
          const Icon = reference.icon;

          return (
            <a
              key={reference.title}
              href={reference.href}
              target="_blank"
              rel="noreferrer"
              className="group grid grid-cols-[auto_1fr_auto] items-start gap-4 rounded-lg border border-[#d02030]/18 bg-black/28 p-5 text-white transition-colors hover:border-[#f52b43]/55 hover:bg-[#d02030]/8"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-sm border border-[#d02030]/30 bg-[#d02030]/10 text-[#ff5a66]">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-base font-semibold tracking-tight">{reference.title}</div>
                <p className="mt-1 max-w-xl text-sm leading-relaxed text-white/58">{reference.description}</p>
                <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[#ff5a66]/72">
                  {reference.detail}
                </div>
              </div>
              <ArrowUpRight className="mt-1 h-4 w-4 text-white/38 transition-colors group-hover:text-[#ff5a66]" />
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default LiveReferencesSection;
