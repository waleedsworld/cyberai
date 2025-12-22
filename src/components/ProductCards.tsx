import { Link } from "react-router-dom";
import { ArrowUpRight, Crosshair, Eye, Scale, Cloud, Siren, BarChart3 } from "lucide-react";

const products = [
  {
    Icon: Crosshair,
    title: "AI Offensive Security",
    teaser: "Pen testing, red teaming, application security.",
    href: "/services/penetration-testing",
  },
  {
    Icon: Eye,
    title: "AI Defensive Operations",
    teaser: "SOC, managed detection, threat hunting.",
    href: "/services/security-operations-center",
  },
  {
    Icon: Scale,
    title: "AI Compliance & Governance",
    teaser: "vCISO, policy mapping, evidence.",
    href: "/services/virtual-ciso",
  },
  {
    Icon: Cloud,
    title: "AI Cloud Security",
    teaser: "Posture, workloads, secure hosting.",
    href: "/services/secure-cloud-hosting",
  },
  {
    Icon: Siren,
    title: "AI Incident Response",
    teaser: "Breach response, forensics, compromise.",
    href: "/services/data-breach-response",
  },
  {
    Icon: BarChart3,
    title: "AI Risk Intelligence",
    teaser: "Attack surface, scoring, discovery.",
    href: "/services/discovery",
  },
];

const ProductCards = () => {
  return (
    <section
      id="categories"
      className="relative border-b border-white/10 bg-[#050202]"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 py-24 md:py-32">
        <div className="flex items-end justify-between gap-6 mb-14 flex-wrap">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff8a96] mb-4">
              Categories
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-white">
              The service stack.
            </h2>
          </div>
          <span className="font-mono text-[11px] tracking-[0.22em] text-white/40">
            06 DISCIPLINES
          </span>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {products.map(({ Icon, title, teaser, href }, idx) => (
            <Link
              key={title}
              to={href}
              className="group relative bg-[#070303] p-7 md:p-8 hover:bg-[#0c0606] transition-colors"
            >
              <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-[#d02030]/0 group-hover:bg-[#d02030]/15 blur-3xl transition-colors" />

              <div className="relative flex items-start justify-between mb-10">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#d02030]/25 bg-[#d02030]/8">
                  <Icon className="h-4 w-4 text-[#ff8a96]" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.22em] text-white/30">
                  /{String(idx + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="relative text-xl font-semibold text-white mb-2 group-hover:text-[#ff8a96] transition-colors">
                {title}
              </h3>
              <p className="relative text-[13px] text-white/50 mb-8">{teaser}</p>

              <div className="relative pt-5 border-t border-white/10 flex items-center justify-between">
                <span className="text-[12px] uppercase tracking-[0.18em] font-semibold text-white/55 group-hover:text-white transition-colors">
                  Explore
                </span>
                <ArrowUpRight className="h-4 w-4 text-white/45 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCards;
