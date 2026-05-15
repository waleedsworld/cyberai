import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const outcomes = [
  {
    label: "Unify Your Defense",
    body: "Endpoint, cloud, identity, and email — collapsed into a single operational picture.",
    image: "/sentinel-assets/Module8_3UpCards_01@2x.jpg",
    href: "/services/security-operations-center",
  },
  {
    label: "Outpace Threats",
    body: "AI-led detection, validated by experts. Adversaries lose the time advantage.",
    image: "/sentinel-assets/Module8_3UpCards_02@2x.jpg",
    href: "/services/threat-hunting",
  },
  {
    label: "Enhance Your Teams",
    body: "Every analyst, force-multiplied. Reports, evidence, and playbooks at AI speed.",
    image: "/sentinel-assets/Module8_3UpCards_03@2x.jpg",
    href: "/services/virtual-ciso",
  },
];

const OutcomesPanel = () => {
  return (
    <section id="outcomes" className="relative bg-[#030303] border-b border-white/10">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff8a96] mb-4">
              Outcomes
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.05] text-white max-w-3xl">
              Built for the outcomes<br />that actually matter.
            </h2>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {outcomes.map((o) => (
            <Link
              key={o.label}
              to={o.href}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0606]"
            >
              <img
                src={o.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,3,3,0.1)_30%,rgba(3,3,3,0.85)_75%,rgba(3,3,3,0.95)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(208,32,48,0)_60%,rgba(208,32,48,0)_100%)] group-hover:bg-[radial-gradient(circle_at_60%_40%,rgba(208,32,48,0.32)_0%,rgba(208,32,48,0)_70%)] transition-all duration-500" />

              <div className="relative h-full flex flex-col justify-end p-7 md:p-8">
                <h3 className="text-2xl md:text-3xl font-semibold text-white leading-tight">
                  {o.label}
                </h3>
                <p className="text-[14px] leading-relaxed text-white/70 mt-3 max-w-xs opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  {o.body}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] font-semibold text-white/75 group-hover:text-white transition-colors">
                  Explore
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OutcomesPanel;
