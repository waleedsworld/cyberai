import { useRef } from "react";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";

const testimonials = [
  {
    quote:
      "Innovation is king and we have to move fast. PointBlank gives us the confidence to move quickly, knowing it has our back.",
    author: "Lou Senko",
    role: "Chief Availability Officer, Q2",
    image: "/sentinel-assets/home_mercury_Q2@2x.jpg",
  },
  {
    quote:
      "We can focus on what matters — racing — because the security operations loop runs itself.",
    author: "Brian Fulmer",
    role: "Senior Director of IT, Aston Martin F1",
    image: "/sentinel-assets/home_mercury_AstonMartin@2x.jpg",
  },
  {
    quote:
      "From discovery to closure, every signal carries proof. Our analysts finally trust the alerts they see.",
    author: "Anya Larsen",
    role: "VP of Security, Norwegian Cruise Line",
    image: "/sentinel-assets/home_mercury_Norwegian@2x.jpg",
  },
  {
    quote:
      "We replaced three tools with one. Our SOC ships findings in hours, not weeks — and the board sees it in real time.",
    author: "Daniel Cho",
    role: "Head of Security, Flex",
    image: "/sentinel-assets/home_mercury_Flex@2x.jpg",
  },
];

const TestimonialsCarousel = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const cardW = el.querySelector<HTMLElement>("[data-card]")?.offsetWidth ?? 400;
    el.scrollBy({ left: dir * (cardW + 24), behavior: "smooth" });
  };

  return (
    <section className="relative bg-[#030303] border-b border-white/10 overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff8a96] mb-4">
              Customers
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.05] text-white max-w-3xl">
              Securing the best of the best.
            </h2>
            <p className="text-white/55 mt-5 max-w-xl">
              Industry leaders choose PointBlank for the clarity, control, and confidence
              to stay ahead in a world that won't slow down.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 hover:border-white/40 hover:bg-white/5 transition-colors"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="h-4 w-4 text-white" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 hover:border-white/40 hover:bg-white/5 transition-colors"
              aria-label="Next testimonial"
            >
              <ArrowRight className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-24 left-0 w-24 bg-gradient-to-r from-[#030303] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-24 right-0 w-24 bg-gradient-to-l from-[#030303] to-transparent z-10" />

      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto px-6 md:px-12 lg:px-20 pb-16 snap-x snap-mandatory scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        {testimonials.map((t) => (
          <article
            key={t.author}
            data-card
            className="group relative shrink-0 snap-start w-[88vw] sm:w-[440px] md:w-[520px] aspect-[5/6] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0606]"
          >
            <img
              src={t.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,3,3,0.15)_30%,rgba(3,3,3,0.85)_100%)]" />

            <button
              type="button"
              className="absolute bottom-7 right-7 flex h-12 w-12 items-center justify-center rounded-full bg-white/95 hover:bg-white text-[#030303] transition-colors shadow-lg"
              aria-label="Play testimonial video"
            >
              <Play className="h-5 w-5 fill-current" />
            </button>

            <div className="relative h-full p-7 md:p-9 flex flex-col justify-end">
              <div className="text-[#ff8a96] text-4xl font-serif leading-none mb-3">"</div>
              <p className="text-white text-[19px] md:text-[22px] leading-snug font-medium max-w-md">
                {t.quote}
              </p>
              <div className="mt-6">
                <div className="text-white font-semibold">{t.author}</div>
                <div className="text-white/60 text-sm">{t.role}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
