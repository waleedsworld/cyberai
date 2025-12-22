import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Cpu, ArrowUpRight, Zap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Link } from "react-router-dom";

const MetricsSection = () => {
  const ref1 = useScrollAnimation();
  
  return (
    <section className="p-6 md:p-12 lg:p-24 bg-white dark:bg-[#050202] border-b border-zinc-200 dark:border-[#d02030]/15 transition-colors">
      <div ref={ref1} className="mb-16 animate-on-scroll">
        <h2 className="leading-tight md:text-5xl lg:text-6xl text-4xl italic text-zinc-950 dark:text-white tracking-tight">
          <span className="font-light text-zinc-500 dark:text-white/50">Threat Closure</span> System Metrics
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-auto text-zinc-950 dark:text-white gap-x-4 gap-y-4">
        {/* Top Left: Hero Image Card */}
        <div className="col-span-1 md:col-span-12 lg:col-span-4 row-span-1 lg:row-span-2 relative h-[300px] lg:h-auto overflow-hidden rounded-sm bg-zinc-900 group spotlight-card">
          <img 
            src="/pointblank/protected-infrastructure.png"
            alt="Protected enterprise infrastructure"
            className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#4a070d]/80 to-transparent mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          
          <div className="absolute top-6 left-6 text-[10px] font-mono text-[#ff5a66]/70 tracking-widest uppercase">(001)</div>
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
            <div className="bg-black/80 backdrop-blur border border-white/10 p-3 rounded-sm w-full max-w-[160px]">
              <div className="text-[9px] text-white/40 uppercase tracking-widest mb-2 font-medium">Security Core V4.0</div>
              <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#d02030] w-[94%]"></div>
              </div>
              <div className="flex justify-between text-[9px] mt-2 font-mono text-[#ff5a66]">
                <span>Verified</span>
                <span>94.2% Closed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Right: Header Block */}
        <div className="col-span-1 md:col-span-12 lg:col-span-8 bg-zinc-900/30 p-8 lg:p-10 rounded-sm flex flex-col justify-between min-h-[240px] spotlight-card group">
          <div className="flex justify-between items-start">
            <h3 className="text-3xl md:text-5xl lg:text-5xl text-white tracking-tight leading-[1.1] font-serif font-light">
              Scalable <span className="text-white/50 font-light">Threat Closure</span> Architecture
            </h3>
            <span className="text-[10px] font-mono text-zinc-500 tracking-widest">[LIVE MONITOR]</span>
          </div>
          <div className="flex justify-between items-end mt-8">
            <p className="text-xs text-zinc-500 max-w-sm font-medium tracking-wide leading-relaxed uppercase">
              SCAN, PROVE, PATCH, AND VERIFY ENTERPRISE SECURITY WORKFLOWS WITH MACHINE-SPEED DECISIONING.
            </p>
            <div className="border border-white/10 w-10 h-10 rounded-full flex items-center justify-center text-white/80">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Middle Row: Stats */}
        <div className="col-span-1 md:col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Stat 1 */}
          <SpotlightCard className="bg-zinc-900/30 p-6 rounded-sm flex flex-col justify-between gap-6 group transition-colors">
            <div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2 font-medium">Detection</div>
              <div className="text-3xl text-white font-serif font-light">12ms</div>
            </div>
            <div className="space-y-2">
              <div className="flex gap-0.5 h-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-1.5 h-full bg-emerald-500/80 skew-x-[-12deg]"></div>
                ))}
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="w-1.5 h-full bg-emerald-500/20 skew-x-[-12deg]"></div>
                ))}
              </div>
              <div className="flex justify-between text-[9px] text-zinc-600 font-mono uppercase">
                <span>Peak</span><span>Optimal</span>
              </div>
            </div>
          </SpotlightCard>

          {/* Stat 2 */}
          <SpotlightCard className="bg-zinc-900/30 p-6 rounded-sm flex flex-col justify-between gap-6 group transition-colors">
            <div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2 font-medium">Verified Closure</div>
              <div className="text-3xl text-white font-serif font-light">99.99%</div>
            </div>
            <div className="space-y-2">
              <div className="flex gap-0.5 h-2">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-1.5 h-full bg-[#d02030] skew-x-[-12deg]"></div>
                ))}
              </div>
              <div className="flex justify-between text-[9px] text-zinc-600 font-mono uppercase">
                <span>Degraded</span><span>Stable</span>
              </div>
            </div>
          </SpotlightCard>

          {/* Stat 3 */}
          <SpotlightCard className="bg-zinc-900/30 p-6 rounded-sm flex flex-col justify-between gap-6 group transition-colors">
            <div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2 font-medium">Risk Decisions</div>
              <div className="text-3xl text-white font-serif font-light">850T</div>
            </div>
            <div className="space-y-2">
              <div className="flex gap-0.5 h-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-1.5 h-full bg-[#ff5a66]/80 skew-x-[-12deg]"></div>
                ))}
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-1.5 h-full bg-[#ff5a66]/20 skew-x-[-12deg]"></div>
                ))}
              </div>
              <div className="flex justify-between text-[9px] text-zinc-600 font-mono uppercase">
                <span>Idle</span><span>Max</span>
              </div>
            </div>
          </SpotlightCard>
        </div>

        {/* Right Column Block */}
        <div className="col-span-1 md:col-span-12 lg:col-span-4 lg:row-start-3 lg:col-start-9 lg:row-span-2 flex flex-col min-h-[300px] bg-zinc-900 h-[400px] rounded-sm pt-8 pr-8 pb-8 pl-8 justify-between spotlight-card group">
          <div className="flex justify-between">
            <div className="text-[10px] font-mono text-zinc-500 tracking-widest">[005]</div>
            <div className="border border-white/10 w-8 h-8 rounded-full flex items-center justify-center text-white/60 bg-white/5">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-3xl md:text-3xl text-white tracking-tight leading-tight mb-6 font-serif font-light">
              Designed For Infinite <span className="text-white/50 font-light">Scale</span>
            </h3>
            <p className="text-[11px] uppercase leading-relaxed text-sm font-medium text-zinc-500 tracking-wide border-white/10 border-t mb-6 pt-4">
              PointBlank serves as the foundational security layer for enterprise automation and threat detection architecture.
            </p>
            <div className="border border-white/10 bg-black/40 p-3 rounded-sm">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <Zap className="w-3 h-3 text-[#f52b43]" />
                  <span className="text-white text-sm font-mono font-bold">98.2%</span>
                </div>
                <span className="text-[9px] text-zinc-600 uppercase tracking-widest">Efficiency</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#d02030] to-[#ff5a66] w-[98%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Left: Growth Projection Chart */}
        <div className="col-span-1 md:col-span-12 lg:col-span-4 min-h-[300px] flex flex-col text-white bg-[#080808] h-full rounded-sm pt-8 pr-8 pb-8 pl-8 justify-between h-[400px] spotlight-card group">
          <div>
            <div className="text-[10px] text-zinc-500 mb-2 font-mono tracking-widest">(004)</div>
            <h3 className="text-3xl md:text-3xl tracking-tight mb-6 leading-tight font-serif font-light">
              Security <span className="text-white/50 font-light">Velocity</span>
            </h3>
            <div className="text-[10px] uppercase leading-tight text-base font-medium text-zinc-500 tracking-wide max-w-[180px]">
              Turning threat data into exponential security value generation.
            </div>
          </div>
          
          <div className="mt-8">
            <div className="flex h-[120px] border-zinc-800 border-b pt-1 pb-6 relative gap-x-3 gap-y-3 items-end">
              <div className="flex-1 flex flex-col justify-end gap-2 group cursor-pointer">
                <div className="text-[9px] font-mono text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity text-center">5M</div>
                <div className="w-full bg-zinc-800 h-[25%] rounded-sm"></div>
              </div>
              <div className="flex-1 flex flex-col justify-end gap-2 group cursor-pointer">
                <div className="text-[9px] font-mono text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity text-center">12M</div>
                <div className="w-full bg-zinc-700 h-[40%] rounded-sm"></div>
              </div>
              <div className="flex-1 flex flex-col justify-end gap-2 group cursor-pointer">
                <div className="text-[9px] font-mono text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity text-center">25M</div>
                <div className="w-full bg-zinc-600 h-[65%] rounded-sm bg-gradient-to-t from-zinc-700 to-zinc-600"></div>
              </div>
              <div className="flex-1 flex flex-col justify-end gap-2 group cursor-pointer">
                <div className="text-[9px] font-mono text-[#ff5a66] opacity-100 text-center font-bold">80M</div>
                <div className="w-full bg-[#d02030] h-[100%] rounded-sm shadow-xl shadow-[#d02030]/20"></div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-3 text-[10px] font-bold tracking-tight">
              <span className="text-zinc-500">©2025</span>
              <span className="font-mono text-zinc-600 font-normal tracking-wider">FORECAST</span>
            </div>
          </div>
        </div>

        {/* Bottom Middle: Global Adoption */}
        <div className="col-span-1 md:col-span-12 lg:col-span-4 flex flex-col min-h-[300px] bg-zinc-900 h-full rounded-sm pt-8 pr-8 pb-8 pl-8 justify-between spotlight-card group">
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="text-[10px] font-mono text-zinc-500 tracking-widest">(006)</div>
              <div className="text-[10px] font-mono text-zinc-500 tracking-widest">[PROJECTION]</div>
            </div>
            <h3 className="text-3xl md:text-3xl text-white tracking-tight leading-tight mb-8 font-serif font-light">
              Universal <span className="text-white/50 font-light">Deployment</span> Network
            </h3>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-black border border-white/10 p-3 h-24 rounded-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#d02030]/20 via-transparent to-transparent"></div>
              <div className="relative z-10 text-2xl text-white tracking-tighter font-serif font-light">1M</div>
              <div className="text-[9px] text-zinc-500 uppercase mt-1 relative z-10 font-medium tracking-wide">Active Nodes</div>
              <div className="absolute bottom-0 left-0 right-0 h-10 opacity-20" style={{
                backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                backgroundSize: '3px 3px'
              }}></div>
            </div>
            <Link
              to="/compliance-check"
              className="bg-[#d02030] p-3 h-24 rounded-sm relative overflow-hidden flex items-center justify-center group cursor-pointer hover:bg-[#f52b43] transition-colors"
            >
              <div className="text-center relative z-10">
                <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center mx-auto mb-2 bg-white/10">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
                <div className="text-[9px] text-white/90 uppercase font-bold tracking-widest">Connect</div>
              </div>
            </Link>
          </div>
          
          <div className="mt-4 pt-4 border-t border-white/10 flex gap-1.5">
            <div className="bg-[#d02030] h-1 w-8 rounded-full"></div>
            <div className="bg-zinc-800 h-1 w-4 rounded-full"></div>
            <div className="bg-zinc-800 h-1 w-2 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
