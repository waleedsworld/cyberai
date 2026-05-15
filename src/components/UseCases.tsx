import { useState } from "react";
import { Quote } from "lucide-react";

type Story = {
  sector: string;
  pull: string;
  attribution: string;
  role: string;
  metricValue: string;
  metricLabel: string;
};

const stories: Story[] = [
  {
    sector: "Healthcare · KSA",
    pull: "PointBlank moved us from quarterly point tests to a continuous, evidence-backed assurance loop.",
    attribution: "CIO",
    role: "Tertiary care provider, Riyadh",
    metricValue: "62%",
    metricLabel: "Faster time to closure",
  },
  {
    sector: "Financial Services · GCC",
    pull: "The triage discipline replaced spreadsheets with a single, prioritized board everyone trusts.",
    attribution: "Head of Cyber",
    role: "Tier-1 commercial bank",
    metricValue: "3.4×",
    metricLabel: "More findings remediated",
  },
  {
    sector: "Cloud SaaS · MENA",
    pull: "AI-assisted testing fit our release cadence — and the expert sign-off kept regulators happy.",
    attribution: "VP Engineering",
    role: "Series-C cloud platform",
    metricValue: "11d",
    metricLabel: "Average engagement",
  },
];

const UseCases = () => {
  const [active, setActive] = useState(0);
  const story = stories[active];

  return (
    <section id="use-cases" className="relative border-b border-white/10 bg-[#030303]">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 py-24 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff8a96] mb-4">
              Customer Outcomes
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-white max-w-3xl">
              Built for teams that need proof.
            </h2>
          </div>
          <span className="font-mono text-[11px] tracking-[0.22em] text-white/40">
            CASE 0{active + 1} / 0{stories.length}
          </span>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#120406] via-[#0a0303] to-[#040101]">
          <div className="absolute -top-32 -right-32 h-[440px] w-[440px] rounded-full bg-[#d02030]/12 blur-3xl pointer-events-none" />

          <div className="relative grid lg:grid-cols-12 gap-10 p-10 md:p-14 lg:p-16">
            {/* Quote */}
            <div className="lg:col-span-8">
              <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-white/45 mb-8">
                {story.sector}
              </div>
              <Quote className="h-8 w-8 text-[#ff8a96]/60 mb-6" />
              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-medium leading-[1.25] text-white max-w-3xl mb-10">
                "{story.pull}"
              </blockquote>
              <div className="text-[13px] text-white/65">
                <span className="font-semibold text-white">{story.attribution}</span> · {story.role}
              </div>
            </div>

            {/* Metric */}
            <div className="lg:col-span-4 lg:border-l border-white/10 lg:pl-10 flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-white/45 mb-4">
                  Outcome
                </div>
                <div className="text-6xl md:text-7xl font-semibold tracking-tight text-white mb-3">
                  {story.metricValue}
                </div>
                <div className="text-[13px] text-white/55">{story.metricLabel}</div>
              </div>

              {/* Dots */}
              <div className="flex items-center gap-2 mt-10">
                {stories.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Story ${i + 1}`}
                    className={`h-1 rounded-full transition-all ${
                      i === active ? "w-10 bg-[#d02030]" : "w-4 bg-white/15 hover:bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;
