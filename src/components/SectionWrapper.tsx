// app/components/SectionWrapper.tsx
import React, { forwardRef } from 'react';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const SectionWrapper = forwardRef<HTMLDivElement, SectionProps>(({ 
  id, 
  title, 
  children, 
  className = '' 
}, ref) => {
  return (
    <section 
      id={id} 
      ref={ref}
      className={`min-h-screen py-20 px-4 md:px-8 ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
});

SectionWrapper.displayName = 'SectionWrapper';

export default SectionWrapper;