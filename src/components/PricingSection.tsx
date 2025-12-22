import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Check, X, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const PricingSection = () => {
  const plans = [
    {
      number: "01",
      price: "$499",
      title: "Starter Plan",
      description: "Our basic pricing plan is designed to offer extraordinary value and core security features.",
      features: [
        { text: "All templates unlocked", included: true },
        { text: "Unlimited requests", included: true },
        { text: "Project management", included: true },
        { text: "Access to all services", included: false },
      ]
    },
    {
      number: "02",
      price: "$799",
      title: "Growth Plan",
      pro: true,
      description: "Our pro pricing plan is designed for businesses needing advanced features and scale.",
      features: [
        { text: "All templates unlocked", included: true },
        { text: "Unlimited requests & revisions", included: true },
        { text: "Dedicated Project Manager", included: true },
        { text: "Access to all services", included: true },
      ]
    },
    {
      number: "03",
      price: "$1299",
      title: "Premium Plan",
      description: "Our plus pricing plan is designed for corporate entities requiring premium support.",
      features: [
        { text: "All templates unlocked", included: true },
        { text: "Unlimited requests (Priority)", included: true },
        { text: "Senior Project Manager", included: true },
        { text: "Access to all services & API", included: true },
      ]
    },
  ];

  const delays = ["0.3s", "0.4s", "0.5s"];
  const ref = useScrollAnimation();

  return (
    <section id="pricing" className="lg:py-32 border-[#d02030]/15 overflow-hidden bg-[#030303] border-b pt-24 pb-24 relative">
      {/* Vertical Background Lines */}
      <div className="absolute inset-0 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 pointer-events-none flex justify-between z-0">
        <div className="w-px h-full bg-[#d02030]/10"></div>
        <div className="hidden md:block w-px h-full bg-[#d02030]/10 absolute left-1/2 -translate-x-1/2"></div>
        <div className="hidden lg:block w-px h-full bg-[#d02030]/10 absolute left-[33.33%]"></div>
        <div className="hidden lg:block w-px h-full bg-[#d02030]/10 absolute left-[66.66%]"></div>
        <div className="w-px h-full bg-[#d02030]/10"></div>
      </div>

      <div className="z-10 md:px-12 lg:px-24 max-w-[1440px] mr-auto ml-auto pr-6 pl-6 relative">
        {/* Header */}
        <div ref={ref} className="mb-20 text-center animate-on-scroll">
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-serif italic tracking-tight font-light mb-8">
            Choose the <span className="text-[#f52b43] font-serif not-italic">closure model.</span>
          </h2>
          
          {/* Toggle */}
          <div className="inline-flex items-center gap-4 p-1 rounded-lg border border-[#d02030]/20 bg-[#d02030]/8 backdrop-blur-sm">
            <span className="text-[10px] font-medium tracking-widest text-white/60 uppercase pl-4">Monthly</span>
            <button className="relative w-12 h-6 rounded-full bg-[#260508] border border-[#d02030]/30 transition-colors focus:outline-none">
              <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-[#f52b43] shadow-sm transition-transform duration-300"></span>
            </button>
            <span className="text-[10px] font-medium tracking-widest text-white/40 uppercase pr-4">Annual</span>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan, idx) => (
            <SpotlightCard
              key={idx}
              className={`p-8 flex flex-col h-full relative overflow-hidden animate-on-scroll ${plan.pro ? 'border border-[#d02030]/35 bg-[#d02030]/8' : ''}`}
              style={{ animationDelay: delays[idx] } as React.CSSProperties}
            >
              <div className="absolute top-0 right-0 p-6 opacity-50 group-hover:opacity-100 transition-opacity">
                <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all">
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl text-white font-light">{plan.price}</span>
                  <span className="text-xs text-white/40 uppercase tracking-widest">/month</span>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-sm font-semibold text-white uppercase tracking-[0.2em]">{plan.title}</div>
                  {plan.pro && (
                    <span className="px-2 py-0.5 bg-[#d02030] text-white text-[9px] font-bold uppercase tracking-wider rounded-sm">Pro</span>
                  )}
                </div>
                <p className="text-[13px] text-white/50 leading-relaxed min-h-[60px]">
                  {plan.description}
                </p>
              </div>

              <div className="border-t border-white/[0.06] pt-8 mt-auto">
                <div className="text-[10px] text-white/30 uppercase tracking-widest mb-6">What's included</div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-[13px] text-white/70">
                      {feature.included ? (
                        <Check className="text-[#ff5a66] w-4 h-4" />
                      ) : (
                        <X className="text-white/20 w-4 h-4" />
                      )}
                      {feature.text}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-600">{plan.number}</span>
                  <Link 
                    to="/compliance-check"
                    className="text-[11px] uppercase tracking-widest text-[#ff5a66]/80 hover:text-[#ff5a66] transition-colors border-b border-transparent hover:border-[#ff5a66]/50 pb-0.5"
                  >
                    Subscribe
                  </Link>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
