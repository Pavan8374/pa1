// app/page.tsx
"use client"
import React, { useRef } from 'react';
import Hero3D from '@/components/Hero3D';
import SectionWrapper from '@/components/SectionWrapper';
import SpaceBackground from '@/components/SpaceBackground';
import { NavigationProvider } from '@/components/NavigationContext';
import DestinationLauncher from '@/components/DestinationLauncher';
import About from '@/components/about';
import Experience from '@/components/experience';
import Skills from '@/components/skills';
import Projects from '@/components/projects';
import Contact from '@/components/contact';
import Station from '@/components/station';
import AudioManager from '@/components/AudioManager';

import { useNavigation } from '@/components/NavigationContext';

const MainContent = () => {
  const { isWarping } = useNavigation();
  return (
    <section 
      className={`relative z-20 transition-all duration-[3000ms] ease-in-out ${
        isWarping 
          ? 'opacity-0 scale-90 blur-2xl pointer-events-none' 
          : 'opacity-100 scale-100 blur-0'
      }`}
    >
      <Hero3D />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Station />
      <Contact />
      <AudioManager />
    </section>
  );
};

export default function Home() {
  return (
    <main className="relative z-10 bg-black min-h-screen">
        <NavigationProvider>
        <SpaceBackground />
        <DestinationLauncher />
        <MainContent />
      </NavigationProvider>
    </main>
  );
}