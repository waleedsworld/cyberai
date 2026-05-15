import { useState } from "react";
import { Activity, GitBranch, Workflow } from "lucide-react";

type Tab = {
  id: string;
  eyebrow: string;
  title: string;
  bullets: [string, string];
  Icon: typeof Activity;
};

const tabs: Tab[] = [
  {
    id: "triage",
    eyebrow: "Triage",
    title: "Findings ranked by real exploitability.",
    bullets: ["Noise filtered ~70%", "Mapped to business impact"],
    Icon: Activity,
  },
  {
    id: "fix",
    eyebrow: "Remediate",
    title: "Each finding routed to an owner with a fix path.",
    bullets: ["Code-aware suggestions", "<48h to remediation plan"],
    Icon: GitBranch,
  },
  {
    id: "prove",
    eyebrow: "Prove",
    title: "Re-tested, documented, and audit-ready by default.",
    bullets: ["Reproducible evidence", "Quarterly attestation packs"],
    Icon: Workflow,
  },
];

const ProofStrip = () => {
  const [active, setActive] = useState(tabs[0].id);
  const tab = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <section className="relative border-b border-white/10 bg-[#050202]">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 py-14 md:py-20">
        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff8a96] mb-8">
          The Loop
        </div>

        <div className="grid gap-10 lg:grid-cols-12 items-start">
          {/* Tabs */}
          <ul className="lg:col-span-4 space-y-1">
            {tabs.map((t) => {
              const isActive = t.id === active;
              return (
                <li key={t.id}>
                  <button
                    onClick={() => setActive(t.id)}
                    className={`group w-full flex items-baseline gap-5 text-left py-5 border-b border-white/10 transition-colors ${
                      isActive ? "" : "hover:border-white/30"
                    }`}
                  >
                    <span
                      className={`font-mono text-[11px] tracking-[0.22em] ${
                        isActive ? "text-[#ff8a96]" : "text-white/35"
                      }`}
                    >
                      /0{tabs.indexOf(t) + 1}
                    </span>
                    <span
                      className={`text-2xl md:text-3xl font-semibold tracking-tight transition-colors ${
                        isActive ? "text-white" : "text-white/40 group-hover:text-white/70"
                      }`}
                    >
                      {t.eyebrow}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Visual panel */}
          <div className="lg:col-span-8 lg:pl-8">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#120406] via-[#0a0303] to-[#040101] aspect-[16/10] p-10 md:p-14">
              {/* Corner glow */}
              <div className="absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full bg-[#d02030]/15 blur-3xl" />

              {/* Icon stack */}
              <div className="relative flex items-start gap-5 mb-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#d02030]/30 bg-[#d02030]/10">
                  <tab.Icon className="h-5 w-5 text-[#ff8a96]" />
                </div>
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/45 mt-3">
                  {tab.eyebrow} · stage {tabs.indexOf(tab) + 1} of 3
                </div>
              </div>

              <h3 className="relative text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] text-white max-w-3xl mb-10">
                {tab.title}
              </h3>

              <div className="relative grid grid-cols-2 gap-4 pt-8 border-t border-white/10">
                {tab.bullets.map((b, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-2 h-1 w-1 rounded-full bg-[#d02030] flex-shrink-0" />
                    <span className="text-[14px] text-white/75 leading-snug">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProofStrip;
