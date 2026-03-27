// app/components/Hero3D.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useNavigation } from './NavigationContext';

const Hero3D: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [latency, setLatency] = useState(12);

  // Fake live data update
  useEffect(() => {
    const interval = setInterval(() => {
        setLatency(Math.floor(Math.random() * 5) + 8);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden">
      {/* Background Central Radiant Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      {/* Holographic HUD Frames */}
      <div className="absolute inset-x-12 inset-y-24 z-10 pointer-events-none">
        {/* Top Left */}
        <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-cyan-500/20 rounded-tl-3xl">
            <div className="absolute top-4 left-4 flex flex-col gap-1 text-[8px] font-black text-cyan-500/40 tracking-[0.2em] uppercase">
                <span>Core: Stable</span>
                <span>Flux: 88.2%</span>
            </div>
        </div>
        {/* Bottom Right */}
        <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-purple-500/20 rounded-br-3xl">
             <div className="absolute bottom-4 right-4 text-right flex flex-col gap-1 text-[8px] font-black text-purple-500/40 tracking-[0.2em] uppercase">
                <span>Orbit: Synced</span>
                <span>Latency: {latency}ms</span>
            </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="absolute top-1/2 left-1/2 z-20 w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 px-6 text-center sm:px-8">
        <div className="relative space-y-8">
          
          {/* Animated System Scan Line */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-1 bg-cyan-400/10 blur-sm animate-[scan_4s_ease-in-out_infinite] pointer-events-none" />

          <div className="relative">
            <h1 className="animate-[gradient_4s_ease-in-out_infinite] bg-gradient-to-r from-cyan-400 via-white via-purple-400 to-cyan-400 bg-[length:400%_400%] bg-clip-text text-7xl font-black text-transparent md:text-9xl lg:text-[10rem] font-display tracking-[0.25em] uppercase italic group">
              PAVAN
            </h1>
            <h1 className="absolute inset-0 -z-10 text-7xl font-black text-cyan-400/20 blur-2xl md:text-9xl lg:text-[10rem] font-display tracking-[0.25em] uppercase italic animate-pulse">
              PAVAN
            </h1>
            
            {/* Sub-label Scan Line */}
            <div className="mt-4 flex items-center justify-center gap-6 animate-[fadeInUp_1.2s_ease-out_0.2s_forwards] opacity-0">
                <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-cyan-500/40" />
                <h2 className="text-xl font-black text-white tracking-[0.4em] uppercase">
                    Architecture <span className="text-cyan-400">&</span> Flow
                </h2>
                <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-cyan-500/40" />
            </div>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
              <p className="animate-[fadeInUp_1s_ease-out_0.5s_forwards] text-xs font-bold text-gray-500 opacity-0 tracking-[0.3em] uppercase leading-relaxed">
                  Engineering high-performance digital ecosystems <br/> across the stack and the stars.
              </p>

              <div className="flex items-center justify-center gap-8 animate-[fadeIn_2s_ease-out_1s_forwards] opacity-0">
                <div className="flex flex-col items-center">
                    <span className="text-[10px] text-cyan-500/60 font-black uppercase tracking-widest mb-1">Systems</span>
                    <div className="w-12 h-1 bg-cyan-500/20 rounded-full overflow-hidden">
                        <div className="h-full w-2/3 bg-cyan-500 animate-[progress_3s_ease-in-out_infinite]" />
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-[10px] text-purple-500/60 font-black uppercase tracking-widest mb-1">Engines</span>
                    <div className="w-12 h-1 bg-purple-500/20 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-purple-500 animate-[progress_3.5s_ease-in-out_infinite]" />
                    </div>
                </div>
              </div>
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="absolute bottom-24 left-1/2 z-20 -translate-x-1/2 transform">
        <div className="flex animate-[fadeInUp_1s_ease-out_1.5s_forwards] flex-col items-center justify-center gap-6 opacity-0 sm:flex-row">
          <button 
            onClick={() => navigateTo('projects')} 
            className="group relative transform overflow-hidden rounded-xl bg-white text-black px-12 py-5 text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-500 hover:scale-110 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] group"
          >
            <span className="relative z-10">Deploy Projects</span>
            <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>

          <button 
            onClick={() => navigateTo('contact')} 
            className="group relative transform rounded-xl border border-white/20 bg-white/5 px-12 py-5 text-[10px] font-black text-white hover:text-cyan-400 backdrop-blur-md transition-all duration-500 hover:scale-110 hover:border-cyan-500/50 uppercase tracking-[0.4em]"
          >
            Terminal View
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-12 z-20 hidden lg:flex flex-col items-end gap-3 animate-[fadeInRight_1s_ease-out_2s_forwards] opacity-0 text-[10px] font-black text-cyan-500/40 uppercase tracking-[0.3em]">
        <span>Scroll to Descent</span>
        <div className="w-24 h-[1px] bg-gradient-to-l from-cyan-500/40 to-transparent" />
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translate(-50%, -200px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translate(-50%, 200px); opacity: 0; }
        }
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
};

export default Hero3D;