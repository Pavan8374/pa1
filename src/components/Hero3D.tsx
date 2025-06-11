// app/components/Hero3D.tsx
"use client";
import React from "react";
import NavigationMenu from "@/components/NavigationMenu";
import SideMenu from "./SideMenu";
import InfoCards from "./InfoCards";
import { useNavigation } from './NavigationContext';

const Hero3D: React.FC = () => {
  const { setCurrentPage } = useNavigation();

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    document.getElementById(page)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden">
      {/* Hero Content */}
      <div className="absolute top-16 left-1/2 z-20 w-full max-w-5xl -translate-x-1/2 px-6 text-center sm:px-8">
        <div className="relative space-y-4">
          <div className="relative">
            <h1 className="animate-[gradient_4s_ease-in-out_infinite] animate-pulse bg-gradient-to-r from-cyan-400 via-pink-400 via-purple-400 to-green-400 bg-[length:400%_400%] bg-clip-text text-5xl font-black text-transparent sm:text-6xl lg:text-7xl">
              Pavan Kumar
            </h1>
            <h1 className="absolute inset-0 -z-10 text-5xl font-black text-cyan-400/20 blur-md sm:text-6xl lg:text-7xl">
              Pavan Kumar
            </h1>
          </div>

          <h2 className="animate-[fadeInUp_1s_ease-out_0.5s_forwards] text-lg font-light text-gray-300 opacity-0 sm:text-xl lg:text-2xl">
            <span className="bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
              Full Stack Developer & Creative Technologist
            </span>
          </h2>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="absolute bottom-32 left-1/2 z-20 -translate-x-1/2 transform">
        <div className="flex animate-[fadeInUp_1s_ease-out_1.5s_forwards] flex-col items-center justify-center gap-6 opacity-0 sm:flex-row">
          <button 
            onClick={() => handleNavigation('projects')} 
            className="group relative transform overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 px-10 py-5 text-lg font-bold text-white transition-all duration-500 hover:rotate-2 hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/30"
          >
            <span className="relative z-10 flex items-center gap-2">
              🚀 Explore My Universe
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-0 origin-left scale-x-0 transform bg-white/20 transition-transform duration-500 group-hover:scale-x-100" />
          </button>

          <button 
            onClick={() => handleNavigation('contact')} 
            className="group relative transform rounded-full border-2 border-cyan-400 bg-black/20 px-10 py-5 text-lg font-bold text-cyan-400 backdrop-blur-sm transition-all duration-500 hover:-rotate-2 hover:scale-110 hover:bg-cyan-400 hover:text-black hover:shadow-2xl hover:shadow-cyan-400/30"
          >
            <span className="flex items-center gap-2">💫 Let's Connect</span>
          </button>
        </div>
      </div>

      {/* Floating Side Menu */}
      <SideMenu />

      {/* Floating Info Cards */}
      <InfoCards />

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 transform animate-[fadeInUp_1s_ease-out_2s_forwards] flex-col items-center gap-3 text-sm text-gray-400 opacity-0">
        <span className="font-medium text-cyan-400">Discover More</span>
        <div className="relative">
          <div className="h-12 w-0.5 animate-pulse bg-gradient-to-b from-cyan-400 via-purple-400 to-transparent" />
          <div className="absolute top-0 h-4 w-0.5 animate-[slideDown_2s_ease-in-out_infinite] bg-cyan-400" />
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
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes slideDown {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(32px);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero3D;