// app/components/Hero3D.tsx
"use client";
import React from "react";
import { useNavigation } from './NavigationContext';

const Hero3D: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden">
      {/* Hero Content */}
      <div className="absolute top-24 left-1/2 z-20 w-full max-w-5xl -translate-x-1/2 px-6 text-center sm:px-8">
        <div className="relative space-y-6">
          <div className="relative">
            <h1 className="animate-[gradient_4s_ease-in-out_infinite] animate-pulse bg-gradient-to-r from-cyan-400 via-pink-400 via-purple-400 to-green-400 bg-[length:400%_400%] bg-clip-text text-6xl font-black text-transparent md:text-8xl lg:text-9xl font-display tracking-[0.2em] uppercase">
              PAVAN
            </h1>
            <h1 className="absolute inset-0 -z-10 text-6xl font-black text-cyan-400/10 blur-xl md:text-8xl lg:text-9xl font-display tracking-[0.2em] uppercase">
              PAVAN
            </h1>
          </div>

          <h2 className="animate-[fadeInUp_1s_ease-out_0.5s_forwards] text-lg font-light text-gray-400 opacity-0 sm:text-xl lg:text-2xl tracking-[0.3em] uppercase">
            <span className="bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
              Full Stack Architect
            </span>
          </h2>
          
          <div className="flex items-center justify-center gap-4 animate-[fadeIn_2s_ease-out_1s_forwards] opacity-0 text-[10px] text-cyan-500/50 font-bold tracking-widest uppercase">
            <span>Systems</span>
            <span className="w-8 h-px bg-cyan-500/20" />
            <span>Engines</span>
            <span className="w-8 h-px bg-cyan-500/20" />
            <span>Worlds</span>
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="absolute bottom-40 left-1/2 z-20 -translate-x-1/2 transform">
        <div className="flex animate-[fadeInUp_1s_ease-out_1.5s_forwards] flex-col items-center justify-center gap-6 opacity-0 sm:flex-row">
          <button 
            onClick={() => navigateTo('projects')} 
            className="group relative transform overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 px-12 py-6 text-sm font-bold text-white transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/30 uppercase tracking-[0.2em] font-display"
          >
            <span className="relative z-10">Initiate Warp</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </button>

          <button 
            onClick={() => navigateTo('contact')} 
            className="group relative transform rounded-full border border-white/20 bg-white/5 px-12 py-6 text-sm font-bold text-white backdrop-blur-md transition-all duration-500 hover:scale-110 hover:bg-white hover:text-black hover:shadow-2xl hover:shadow-white/30 uppercase tracking-[0.2em] font-display"
          >
            Connect
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 transform animate-[fadeInUp_1s_ease-out_2s_forwards] flex-col items-center gap-3 text-xs text-cyan-500/40 opacity-0">
        <span className="font-bold tracking-[0.4em] uppercase">Descent</span>
        <div className="relative">
          <div className="h-16 w-[1px] bg-gradient-to-b from-cyan-500/50 to-transparent" />
          <div className="absolute top-0 h-4 w-[1px] animate-[slideDown_3s_infinite] bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes slideDown {
          0% { transform: translateY(0); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(64px); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Hero3D;