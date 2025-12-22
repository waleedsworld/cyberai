import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { services, type Service } from "@/data/services";

const categoryOrder: Service["category"][] = [
  "Offensive Security",
  "Defensive Operations",
  "Governance & Compliance",
  "Incident & Investigation",
  "Infrastructure & Cloud",
];

const ServicesGrid = () => {
  return (
    <section id="services" className="relative bg-[#030303] border-b border-white/10">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 py-24 md:py-32">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff8a96] mb-4">
              Service Catalog
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-white">
              Every service, AI-augmented.
            </h2>
          </div>
          <span className="font-mono text-[11px] tracking-[0.22em] text-white/40">
            20 SERVICES
          </span>
        </div>

        {/* Categories */}
        <div className="space-y-20">
          {categoryOrder.map((category, catIdx) => {
            const categoryServices = services.filter((s) => s.category === category);
            return (
              <div key={category}>
                <div className="flex items-end justify-between gap-6 mb-8 pb-5 border-b border-white/10">
                  <div className="flex items-baseline gap-5">
                    <span className="font-mono text-[11px] tracking-[0.22em] text-white/35">
                      /0{catIdx + 1}
                    </span>
                    <h3 className="text-xl md:text-2xl font-semibold text-white">
                      {category}
                    </h3>
                  </div>
                  <span className="font-mono text-[11px] tracking-[0.22em] text-white/40">
                    {String(categoryServices.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryServices.map((service) => (
                    <Link
                      key={service.slug}
                      to={`/services/${service.slug}`}
                      className="group relative bg-[#070303] p-7 hover:bg-[#0c0606] transition-colors"
                    >
                      <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[#d02030]/0 group-hover:bg-[#d02030]/12 blur-3xl transition-colors" />

                      <div className="relative flex h-full flex-col">
                        <h4 className="text-[15px] font-semibold text-white mb-2 leading-snug group-hover:text-[#ff8a96] transition-colors min-h-[2.6rem]">
                          {service.aiTitle}
                        </h4>
                        <p className="text-[13px] leading-relaxed text-white/50 mb-7 flex-grow">
                          {service.shortDescription}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                          <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-white/55 group-hover:text-white transition-colors">
                            View
                          </span>
                          <ArrowUpRight className="h-4 w-4 text-white/45 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
