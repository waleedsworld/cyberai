import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ArrowUpRight } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      number: "01",
      quote: "The AI-powered threat detection has reduced our false positives by 85%. The Arabic language support is exactly what we needed for GCC operations.",
      author: "Elena Rossi",
      role: "CTO, Vercel",
      company: "vercel",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
      statusColor: "bg-emerald-500"
    },
    {
      number: "02",
      quote: "Integrating PointBlank into our security infrastructure was seamless. The compliance automation saved us months of manual work.",
      author: "Marcus Chen",
      role: "AI Lead, Stripe",
      company: "stripe",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
      statusColor: "bg-[#f52b43]"
    },
    {
      number: "03",
      quote: "We needed a system that could scale with our enterprise. The neural threat detection handled 10x load without flinching.",
      author: "Sarah Jenkins",
      role: "Eng Dir, Linear",
      company: "linear",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=120&auto=format&fit=crop",
      statusColor: "bg-[#ff5a66]"
    },
    {
      number: "04",
      quote: "PointBlank transformed our compliance processes. Automated monitoring reduced audit preparation by 70%.",
      author: "David Okonjo",
      role: "VP Product, Shopify",
      company: "shopify",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop",
      statusColor: "bg-[#f52b43]"
    },
    {
      number: "05",
      quote: "The clarity of the API documentation and robustness of the SDKs made complex implementation seamless for our team.",
      author: "James Miller",
      role: "Architect, Raycast",
      company: "raycast",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=120&auto=format&fit=crop",
      statusColor: "bg-red-500"
    },
    {
      number: "06",
      quote: "Finally, a security partner that understands the nuance of ethical AI compliance and data sovereignty for GCC regulations.",
      author: "Anna Wei",
      role: "Data Lead, OpenAI",
      company: "openai",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=120&auto=format&fit=crop",
      statusColor: "bg-green-500"
    },
  ];

  const delays = ["0.3s", "0.4s", "0.5s", "0.6s", "0.7s", "0.8s"];

  return (
    <section id="case-studies" className="lg:py-32 border-[#d02030]/15 overflow-hidden bg-[#050202] border-b pt-24 pb-24 relative">
      {/* Vertical Background Lines */}
      <div className="absolute inset-0 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 pointer-events-none flex justify-between z-0">
        <div className="w-px h-full bg-[#d02030]/10"></div>
        <div className="hidden md:block w-px h-full bg-[#d02030]/10 absolute left-1/2 -translate-x-1/2"></div>
        <div className="hidden lg:block w-px h-full bg-[#d02030]/10 absolute left-[33.33%]"></div>
        <div className="hidden lg:block w-px h-full bg-[#d02030]/10 absolute left-[66.66%]"></div>
        <div className="w-px h-full bg-[#d02030]/10"></div>
      </div>

      <div className="z-10 md:px-12 lg:px-24 max-w-[1440px] mr-auto ml-auto pr-6 pl-6 relative">
        {/* Section Header */}
        <div className="mb-24 text-center animate-on-scroll">
          <div className="inline-flex items-center gap-2 mb-6 border border-white/10 rounded-full px-3 py-1 bg-white/[0.02]">
            <span className="text-[#f52b43] text-sm">■</span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-white/60 font-medium">Enterprise Validation</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-serif italic tracking-tight font-light">
            Trusted by <span className="text-[#f52b43] font-serif not-italic">security teams</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => {
            return (
              <SpotlightCard
                key={idx}
                className="p-8 group animate-on-scroll"
                style={{ animationDelay: delays[idx] } as React.CSSProperties}
              >
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-start justify-between border-b border-white/[0.06] pb-6 mb-8">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img 
                            src={testimonial.avatar} 
                            className="w-10 h-10 rounded-sm object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
                            alt={testimonial.author}
                          />
                          <div className={`absolute -bottom-1 -right-1 w-2 h-2 ${testimonial.statusColor} rounded-full border border-black`}></div>
                        </div>
                        <div>
                          <div className="text-[13px] font-semibold text-white">{testimonial.author}</div>
                          <div className="text-[9px] uppercase tracking-widest text-white/40 mt-1">{testimonial.role}</div>
                        </div>
                      </div>
                      <div className="text-white/30 group-hover:text-white transition-colors duration-500 text-lg font-bold">
                        {testimonial.company.toUpperCase()}
                      </div>
                    </div>
                    <p className="text-xl md:text-2xl font-light leading-snug text-white/80 font-serif italic mb-8">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.03]">
                    <span className="text-[10px] font-mono text-zinc-600">{testimonial.number}</span>
                    <ArrowUpRight className="text-[#f52b43]/65 w-4 h-4" />
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
