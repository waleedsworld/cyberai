import { Brain, Layers, ShieldCheck, Radio, FileCheck2 } from "lucide-react";

const ArchitectureSection = () => {
  return (
    <section
      id="architecture"
      className="relative border-b border-white/10 bg-[#030303]"
    >
      <div className="relative mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 py-16 md:py-24">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff8a96] mb-4">
              Operating Model
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.05] text-white max-w-3xl">
              One loop. Signal to closure.
            </h2>
          </div>
          <span className="font-mono text-[11px] tracking-[0.22em] text-white/40">
            6 STAGES
          </span>
        </div>

        {/* Bento grid */}
        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-6 md:grid-rows-2">
          {/* Big featured tile */}
          <div className="relative md:col-span-3 md:row-span-2 bg-gradient-to-br from-[#1a0306] via-[#0a0202] to-[#030303] p-10 md:p-12">
            <div className="absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full bg-[#d02030]/15 blur-3xl" />
            <div className="relative flex h-full flex-col">
              <div className="font-mono text-[11px] tracking-[0.22em] text-[#d02030] mb-6">
                /01
              </div>
              <div className="flex-grow">
                <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-5">
                  Discover
                </h3>
                <p className="text-[15px] leading-relaxed text-white/65 max-w-md">
                  AI maps the full attack surface — assets, exposure, operating context — in hours, not weeks.
                </p>
              </div>
              <div className="mt-12 flex items-center gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-1 ${i === 0 ? "w-10 bg-[#d02030]" : "w-4 bg-white/10"} rounded-full`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Smaller tiles */}
          {[
            { Icon: Brain, title: "Analyze", idx: "02" },
            { Icon: Layers, title: "Prioritize", idx: "03" },
            { Icon: ShieldCheck, title: "Validate", idx: "04" },
            { Icon: Radio, title: "Respond", idx: "05" },
            { Icon: FileCheck2, title: "Prove Closure", idx: "06" },
          ].map(({ Icon, title, idx }) => (
            <div
              key={title}
              className="relative bg-[#070303] p-7 hover:bg-[#0c0606] transition-colors group"
            >
              <div className="flex items-start justify-between mb-12">
                <Icon className="h-5 w-5 text-[#ff8a96]/75 group-hover:text-[#ff8a96] transition-colors" />
                <span className="font-mono text-[10px] tracking-[0.22em] text-white/30">
                  /{idx}
                </span>
              </div>
              <div className="text-xl font-semibold text-white">{title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArchitectureSection;
