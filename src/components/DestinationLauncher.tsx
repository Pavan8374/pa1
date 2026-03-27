"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from './NavigationContext';

const destinations = [
  { name: 'Home', id: 'home', icon: '🏠', desc: 'Command Center' },
  { name: 'About', id: 'about', icon: '🌌', desc: 'Captain\'s Log' },
  { name: 'Skills', id: 'skills', icon: '⚡', desc: 'Stellar Stack' },
  { name: 'Projects', id: 'projects', icon: '🚀', desc: 'Deep Space' },
  { name: 'Experience', id: 'experience', icon: '🌟', desc: 'Professional Orbit' },
  { name: 'Station', id: 'station', icon: '🛰️', desc: 'Orbital Habitat' },
  { name: 'Contact', id: 'contact', icon: '📡', desc: 'Subspace Comms' },
];

const DestinationLauncher: React.FC = () => {
  const { navigateTo, targetPage, isWarping } = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const [isTeleporting, setIsTeleporting] = useState(false);
  const [launcherPos, setLauncherPos] = useState({ x: 50, y: 90 }); // position in %
  const [showHint, setShowHint] = useState(true);
  
  // Fade out hint after second or interaction
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleTeleport = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (isTeleporting || isWarping) return;
    
    setIsTeleporting(true);
    setShowHint(false);
    
    // Random teleport effect
    const newX = 15 + Math.random() * 70;
    const newY = 15 + Math.random() * 70;
    
    setTimeout(() => {
      setLauncherPos({ x: newX, y: newY });
      navigateTo(id);
      setIsOpen(false);
      setTimeout(() => setIsTeleporting(false), 500);
    }, 400);
  };

  const toggleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
    setShowHint(false);
  };

  return (
    <>
      {/* Navigation Hint Banner */}
      <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-[10001] transition-all duration-1000 ${showHint ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
        <div className="relative group p-[1px] rounded-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent">
          <div className="bg-black/80 backdrop-blur-2xl px-8 py-3 rounded-full border border-white/5 flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_#06b6d4]" />
            <span className="text-[10px] sm:text-xs font-black tracking-[0.3em] text-white uppercase italic">
              System Alert: <span className="text-cyan-400">Deploy Launcher for Subspace Jumps</span>
            </span>
          </div>
        </div>
      </div>

      <div 
        className={`fixed transition-all duration-700 ease-in-out ${isTeleporting ? 'scale-0 opacity-0 blur-xl rotate-180' : 'scale-100 opacity-100 rotate-0'}`}
        style={{ left: `${launcherPos.x}%`, top: `${launcherPos.y}%`, transform: 'translate(-50%, -50%)', zIndex: 9999 }}
      >
        {/* Main Orb */}
        <div 
          onClick={toggleOpen}
          className={`relative group cursor-pointer w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 pointer-events-auto
            ${isOpen ? 'bg-cyan-500 shadow-[0_0_80px_rgba(6,182,212,0.9)]' : 'bg-black/60 backdrop-blur-xl border-2 border-cyan-500/50 hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(6,182,212,0.7)]'}
          `}
        >
          {/* Constant Attention Pulse */}
          {!isOpen && (
            <div className="absolute inset-0 rounded-full animate-[ping_3s_infinite] bg-cyan-400/30 scale-125" />
          )}
          <div className="absolute inset-0 rounded-full animate-ping bg-cyan-500/10 group-hover:bg-cyan-500/20" />
          
          <span className="text-3xl z-10 select-none drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
            {isOpen ? '✖' : '🛸'}
          </span>
          
          {/* Permanent Glow Tooltip (Until interaction) */}
          {showHint && !isOpen && (
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap animate-bounce">
                <div className="text-[10px] font-black tracking-widest text-cyan-400 uppercase bg-cyan-950/20 px-3 py-1 rounded border border-cyan-500/30 backdrop-blur-sm">
                    Initiate Sequence ↓
                </div>
            </div>
          )}

          {/* Regular Hover Label */}
          {!isOpen && !showHint && (
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-2 bg-black/80 backdrop-blur-md border border-cyan-500/40 rounded-lg text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase opacity-0 group-hover:opacity-100 transition-opacity">
              Jump Controls
            </div>
          )}
        </div>

        {/* Destinations Menu */}
        <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 pointer-events-none ${isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-75'}`}>
          {destinations.map((dest, i) => {
            const angle = (i / destinations.length) * Math.PI * 2 - Math.PI / 2;
            const radius = i % 2 === 0 ? 160 : 130;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            return (
              <div 
                key={dest.id}
                onClick={(e) => handleTeleport(e, dest.id)}
                className={`absolute flex flex-col items-center group cursor-pointer transition-all duration-300 pointer-events-auto
                  ${targetPage === dest.id ? 'opacity-100' : 'opacity-80 hover:opacity-100'}
                `}
                style={{ 
                  left: `calc(50% + ${x}px)`, 
                  top: `calc(50% + ${y}px)`,
                  transform: 'translate(-50%, -50%) scale(1)',
                  transitionDelay: isOpen ? `${i * 30}ms` : '0ms',
                  zIndex: 10000
                }}
              >
                <div className="absolute inset-0 bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className={`relative w-14 h-14 rounded-2xl flex items-center justify-center bg-black/80 backdrop-blur-2xl border border-white/10 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] group-hover:rotate-12 transition-all duration-500
                  ${targetPage === dest.id ? 'border-cyan-400 bg-cyan-900/50 shadow-[0_0_20px_rgba(6,182,212,0.4)]' : ''}
                `}>
                  <span className="text-2xl drop-shadow-md select-none">{dest.icon}</span>
                </div>
                
                <div className="mt-3 text-center">
                  <div className={`text-[12px] font-black tracking-widest uppercase transition-colors select-none ${targetPage === dest.id ? 'text-cyan-400' : 'text-gray-400 group-hover:text-white'}`}>
                    {dest.name}
                  </div>
                </div>
                
                <div 
                  className={`absolute w-[2px] bg-gradient-to-t from-cyan-500/0 via-cyan-500/60 to-cyan-500/0 transition-all duration-700
                    ${isOpen ? 'h-24 origin-bottom' : 'h-0'}
                  `}
                  style={{ 
                    transform: `rotate(${angle + Math.PI/2}rad)`,
                    bottom: '70px',
                    opacity: isOpen ? 0.4 : 0,
                    zIndex: -1
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DestinationLauncher;
