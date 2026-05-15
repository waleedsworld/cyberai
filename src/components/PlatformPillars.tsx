import { useState } from "react";
import { ArrowRight } from "lucide-react";

const VIDEO_URL =
  "https://dev.heyharoon.io/cyberai-sidewave/media/Home_Intro_PurpleAI_WEB_LOOP.mp4";
const POSTER = "/sentinel-assets/Home_Intro_PurpleAI_Poster.jpg";

const pillars = [
  {
    id: "stop",
    eyebrow: "01",
    title: "Stop threats\nbefore they start.",
    body: "AI compresses weeks of analyst toil into hours of evidence-backed action.",
    visual: { type: "video" as const, src: VIDEO_URL, poster: POSTER },
    cta: { label: "Explore the platform", href: "#architecture" },
  },
  {
    id: "amplify",
    eyebrow: "02",
    title: "Amplify humans.\nEmpower teams.",
    body: "Every analyst, force-multiplied. Experts keep decisions in hand.",
    visual: { type: "image" as const, src: "/sentinel-assets/Home_Intro_02_M@2x.png" },
    cta: { label: "See the operating model", href: "#architecture" },
  },
  {
    id: "simplify",
    eyebrow: "03",
    title: "Simplify\nsecurity operations.",
    body: "One loop. Signal to closure. End to end.",
    visual: { type: "image" as const, src: "/sentinel-assets/Home_Intro_03_M@2x.png" },
    cta: { label: "Tour the workflow", href: "#categories" },
  },
];

const PlatformPillars = () => {
  const [activeId, setActiveId] = useState(pillars[0].id);
  const active = pillars.find((p) => p.id === activeId) ?? pillars[0];

  return (
    <section
      id="categories"
      className="relative border-b border-white/10 bg-[#050202]"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1100px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(208,32,48,0.18),transparent_60%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 py-16 md:py-24">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff8a96] mb-4">
              The Platform
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.05] text-white max-w-3xl">
              Three pillars.<br />One unified defense.
            </h2>
          </div>
          <span className="font-mono text-[11px] tracking-[0.22em] text-white/40">
            CYBERAI / PLATFORM
          </span>
        </div>

        {/* Visual */}
        <div className="relative aspect-[16/7] md:aspect-[16/6] rounded-2xl overflow-hidden border border-white/10 bg-[#0a0606] mb-10">
          {active.visual.type === "video" ? (
            <video
              key={active.id}
              autoPlay
              muted
              loop
              playsInline
              poster={active.visual.poster}
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src={active.visual.src} type="video/mp4" />
            </video>
          ) : (
            <img
              key={active.id}
              src={active.visual.src}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
            />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,3,3,0)_30%,rgba(3,3,3,0.85)_100%)]" />
          <a
            href={active.cta.href}
            className="absolute bottom-6 right-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#d02030] hover:bg-[#f52b43] text-white font-semibold text-sm transition-colors shadow-[0_0_30px_rgba(208,32,48,0.5)]"
          >
            {active.cta.label}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Pillar selector */}
        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
          {pillars.map((p) => {
            const isActive = p.id === activeId;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveId(p.id)}
                onMouseEnter={() => setActiveId(p.id)}
                className={`group text-left p-8 md:p-10 transition-colors ${
                  isActive
                    ? "bg-[#0c0606]"
                    : "bg-[#050202] hover:bg-[#080404]"
                }`}
              >
                <div
                  className={`font-mono text-[11px] tracking-[0.22em] mb-5 transition-colors ${
                    isActive ? "text-[#ff8a96]" : "text-white/35"
                  }`}
                >
                  /{p.eyebrow}
                </div>
                <h3
                  className={`text-2xl md:text-[1.65rem] font-semibold leading-tight whitespace-pre-line mb-4 transition-colors ${
                    isActive ? "text-white" : "text-white/40"
                  }`}
                >
                  {p.title}
                </h3>
                <p
                  className={`text-[14px] leading-relaxed transition-colors ${
                    isActive ? "text-white/70" : "text-white/35"
                  }`}
                >
                  {p.body}
                </p>
                <div className="mt-7 h-1 w-full rounded-full bg-white/8 overflow-hidden">
                  <span
                    className={`block h-full rounded-full bg-[#d02030] transition-all duration-500 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PlatformPillars;
