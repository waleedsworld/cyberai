import { ArrowUpRight } from "lucide-react";

const cards = [
  {
    title: "A Leader.\nFive Years Running.",
    badge: "MITRE ENGENUITY",
    accent: "100% Detection, Zero Delays",
    bg: "/sentinel-assets/Module6_3UpCards_01@2x.jpg",
    href: "#proof",
  },
  {
    title: "Record-Breaking\nATT&CK Evaluation.",
    badge: "ATT&CK 2024",
    accent: "Top Analyst Coverage",
    bg: "/sentinel-assets/Module6_3UpCards_02@2x.jpg",
    href: "#proof",
  },
  {
    title: "Named a Leader\nin Growth & Innovation.",
    badge: "FROST RADAR 2025",
    accent: "Top-Performing Vendor",
    bg: "/sentinel-assets/mercury_home_Module6_3UpCards_03@2x.jpg",
    href: "#proof",
  },
];

const ExcellenceCards = () => {
  return (
    <section className="relative bg-[#050202] border-b border-white/10">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div className="text-center mb-14">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff8a96] mb-4">
            Validation
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.05] text-white">
            The standard in security excellence.
          </h2>
          <p className="text-white/55 mt-5 max-w-xl mx-auto">
            Trusted by the industry's leading authorities, analysts, and associations.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <a
              key={c.title}
              href={c.href}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0606]"
            >
              {/* Animated background */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                style={{ backgroundImage: `url(${c.bg})` }}
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(208,32,48,0.35),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,3,3,0.35)_0%,rgba(3,3,3,0.65)_100%)]" />

              {/* Sweeping light bar on hover */}
              <div className="pointer-events-none absolute -inset-x-1 top-1/2 h-32 -translate-y-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)] opacity-0 group-hover:opacity-100 translate-x-[-110%] group-hover:translate-x-[110%] transition-all duration-[1100ms] ease-out" />

              <div className="relative h-full p-7 md:p-8 flex flex-col">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-[10px] tracking-[0.22em] text-white/80 px-2.5 py-1 rounded-full border border-white/25 backdrop-blur-sm">
                    {c.badge}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-white/70 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </div>

                <div className="mt-auto">
                  <div className="inline-block mb-4 px-3 py-1.5 rounded-md bg-white/8 backdrop-blur-sm border border-white/15 text-[12px] font-semibold text-white/90">
                    {c.accent}
                  </div>
                  <h3 className="text-2xl md:text-[1.75rem] font-semibold text-white leading-tight whitespace-pre-line">
                    {c.title}
                  </h3>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExcellenceCards;
