import { useState } from "react";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    eyebrow: "Gartner Peer Insights",
    title: "Recognized as a Customer's Choice",
    body: "Gartner Peer Insights recognized PointBlank as a Customer's Choice for endpoint extended detection and response.",
    cta: "Read More Reviews",
  },
  {
    eyebrow: "Forrester Wave",
    title: "Leader in the Forrester XDR Wave",
    body: "PointBlank ranked among the highest scoring vendors for evidence-driven detection and unified response.",
    cta: "View the Report",
  },
  {
    eyebrow: "Frost Radar 2025",
    title: "Top-Performing Vendor in Frost Radar",
    body: "Recognized for innovation, growth, and operational impact across global enterprise security programs.",
    cta: "Explore the Findings",
  },
];

const CustomerChoice = () => {
  const [idx, setIdx] = useState(0);
  const slide = slides[idx];

  return (
    <section id="proof" className="relative bg-[#030303] border-b border-white/10">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 py-14 md:py-20">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#f5f3ef]">
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: "url(/sentinel-assets/industry_bg_gartner.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(245,243,239,0.95),rgba(245,243,239,0.7))]" />

          <div className="relative grid gap-6 md:grid-cols-[1fr_auto] items-center p-10 md:p-14">
            <div className="max-w-xl">
              <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#1f0d35]/65 mb-3">
                {slide.eyebrow}
              </div>
              <h3 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#0a0418] leading-[1.05]">
                {slide.title}
              </h3>
              <p className="text-[#0a0418]/70 mt-4 text-[15px] leading-relaxed">
                {slide.body}
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#3a1873] hover:bg-[#4a1f93] text-white font-semibold text-sm transition-colors"
            >
              {slide.cta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Dots */}
          <div className="relative flex items-center justify-center gap-2 pb-8">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIdx(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === idx ? "w-8 bg-[#3a1873]" : "w-2 bg-[#0a0418]/25"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerChoice;
