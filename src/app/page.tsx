// app/page.tsx
"use client"
import React, { useRef } from 'react';
import Hero3D from '@/components/Hero3D';
import SectionWrapper from '@/components/SectionWrapper';
import SpaceBackground from '@/components/SpaceBackground';
import { NavigationProvider } from '@/components/NavigationContext';
import NavigationMenu from '@/components/NavigationMenu';
import About from '@/components/about';
import Experience from '@/components/experience';
import Skills from '@/components/skills';
import Projects from '@/components/projects';
import Contact from '@/components/contact';

export default function Home() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  return (
    <main className="relative z-10">
      <NavigationProvider>
        <SpaceBackground />
        <NavigationMenu sectionRefs={{}}          />
        <section className="relative z-20">
          <Hero3D />
          <About />
          <Experience/>
          <Skills />
          <Projects/>
          <Contact/>
        </section>
      </NavigationProvider>
    </main>

  );
}