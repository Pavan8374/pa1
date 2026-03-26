"use client";
import React, { useEffect, useRef, useState } from 'react';

const AudioManager = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const startAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      const ctx = audioContextRef.current;
      const gain = ctx.createGain();
      gain.gain.value = 0.05; // Very low volume for base hum
      gainNodeRef.current = gain;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 80;
      filterRef.current = filter;

      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = 55; // Deep A hum
      oscillatorRef.current = osc;

      const noise = ctx.createOscillator();
      noise.type = 'sawtooth';
      noise.frequency.value = 0.5;
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
    }
    
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      startAudio();
      if (gainNodeRef.current) gainNodeRef.current.gain.setTargetAtTime(0.05, audioContextRef.current!.currentTime, 1);
    } else {
      if (gainNodeRef.current) gainNodeRef.current.gain.setTargetAtTime(0, audioContextRef.current!.currentTime, 1);
    }
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-8 left-8 z-50 flex items-center gap-4">
      <button 
        onClick={toggleMute}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md transition-all hover:scale-110 hover:border-white/40"
      >
        <span className="text-xl">{isMuted ? '🔇' : '🔊'}</span>
      </button>
      {!isMuted && (
        <div className="flex gap-1 h-3 items-center">
            {[1,2,3,4].map(i => (
                <div key={i} className="w-1 bg-blue-500 rounded-full animate-bounce" style={{ height: '100%', animationDelay: `${i * 0.2}s` }} />
            ))}
        </div>
      )}
    </div>
  );
};

export default AudioManager;
