// Trust strip — infinite horizontal scroll of brand logos.
// Pattern adapted from the user's reference (digitalsoftwaremarkett snippet):
// grayscale by default, snap to full colour on hover; track is duplicated
// once so the loop reads as seamless.

const BASE = "/sidewave/images";

const LOGOS: { src: string; alt: string }[] = [
  { src: `${BASE}/partners/Nike.svg`, alt: "Nike" },
  { src: `${BASE}/partners/Ferrari trento.svg`, alt: "Ferrari Trento" },
  { src: `${BASE}/partners/Brembo.svg`, alt: "Brembo" },
  { src: `${BASE}/partners/Philips.svg`, alt: "Philips" },
  { src: `${BASE}/partners/Reebok.svg`, alt: "Reebok" },
  { src: `${BASE}/partners/Omron.svg`, alt: "Omron" },
  { src: `${BASE}/partners/Grana padano.svg`, alt: "Grana Padano" },
  { src: `${BASE}/clients/001.svg`, alt: "Client" },
  { src: `${BASE}/clients/004.svg`, alt: "Client" },
  { src: `${BASE}/clients/007.svg`, alt: "Client" },
  { src: `${BASE}/clients/012.svg`, alt: "Client" },
  { src: `${BASE}/clients/015.svg`, alt: "Client" },
  { src: `${BASE}/clients/018.svg`, alt: "Client" },
  { src: `${BASE}/clients/023.svg`, alt: "Client" },
  { src: `${BASE}/clients/030.svg`, alt: "Client" },
];

interface Props {
  /** Tone of the section; "dark" sits inline on dark pages, "subtle" softens with a lighter band. */
  variant?: "dark" | "subtle";
  heading?: string;
}

const TrustedBrands = ({ variant = "dark", heading = "Trusted by leading brands" }: Props) => {
  const bg = variant === "subtle" ? "bg-[#080404]" : "bg-[#030303]";
  const bgColor = variant === "subtle" ? "#080404" : "#030303";
  const track = [...LOGOS, ...LOGOS];

  // A thin band, not a section. ~88px tall on desktop so it reads as a
  // transition between large sections rather than its own scroll stop.
  return (
    <section className={`relative overflow-hidden border-y border-white/[0.06] ${bg}`}>
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 py-5 md:py-6">
        <div className="flex items-center gap-6 md:gap-10">
          <h3 className="hidden md:block flex-shrink-0 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/40 max-w-[140px] leading-tight">
            {heading}
          </h3>
          <div className="relative flex-1 min-w-0">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r to-transparent"
              style={{ background: `linear-gradient(to right, ${bgColor}, transparent)` }}
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l to-transparent"
              style={{ background: `linear-gradient(to left, ${bgColor}, transparent)` }}
            />
            <div className="trust-marquee flex items-center gap-10 md:gap-12">
              {track.map((logo, idx) => (
                <div
                  key={`${logo.src}-${idx}`}
                  className="flex-shrink-0 h-12 md:h-9 w-[130px] md:w-[110px] flex items-center justify-center"
                  aria-hidden={idx >= LOGOS.length}
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain opacity-60 md:opacity-50 grayscale brightness-150 hover:opacity-95 hover:grayscale-0 hover:brightness-100 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;
