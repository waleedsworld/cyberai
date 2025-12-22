const trustLogos = [
  { short: "RYD", name: "Riyadh Bank" },
  { short: "SCA", name: "Saudi Cloud Alliance" },
  { short: "NEO", name: "Neom Health" },
  { short: "ARP", name: "Aramco Partners" },
  { short: "STC", name: "STC Group" },
  { short: "FNT", name: "Finetech KSA" },
  { short: "MJD", name: "Majid Industries" },
];

const stats = [
  { value: "20+", label: "Services Delivered" },
  { value: "1.2M", label: "Findings Triaged" },
  { value: "48h", label: "Average Time-to-Plan" },
  { value: "100%", label: "Expert-Verified" },
];

const CapabilityTicker = () => {
  return (
    <section
      aria-label="Trusted by leading teams"
      className="relative border-y border-white/10 bg-[#070303]"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        {/* Logos row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 items-center gap-px border-b border-white/10">
          {trustLogos.map((l) => (
            <div
              key={l.short}
              title={l.name}
              className="group flex items-center justify-center h-20 border-r border-white/10 last:border-r-0 hover:bg-white/[0.02] transition-colors"
            >
              <span className="text-[15px] font-mono tracking-[0.18em] text-white/35 group-hover:text-white/85 transition-colors">
                {l.short}
              </span>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-2 py-8 md:py-10 ${
                i < stats.length - 1 ? "md:border-r border-white/10" : ""
              } ${i < 2 ? "border-b md:border-b-0 border-white/10" : ""}`}
            >
              <div className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
                {s.value}
              </div>
              <div className="mt-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/45">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapabilityTicker;
