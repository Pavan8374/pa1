import SectionWrapper from "@/components/SectionWrapper";
import { useRef } from "react";

const Experience = () => {
  const experienceRef = useRef<HTMLDivElement>(null);

  const experiences = [
    {
      company: "FriskaAI",
      role: "Backend Astronaut 🚀",
      period: "2025 - PRESENT",
      location: "Remote Galaxy",
      description: "Docked into a healthcare galaxy! Building microservices, handling service discovery like space traffic control, and integrating with Azure planets. Boosting performance like giving steroids to rockets.",
      tech: [".NET Core", "Azure AI", "Microservices"]
    },
    {
      company: "Natrix Software Pvt Ltd",
      role: "Lead Dev Commander 👨‍🚀",
      period: "2023 - 2025",
      location: "Surat Sector",
      description: "Co-piloted 'Dubfeed' – a social gaming galaxy. Launched 'Rhode Side Assist' – a mission-critical real-time communication platform for emergency assistance. Managed fleet operations and backend scaling.",
      tech: [".NET", "Socket.io", "Redis", "SQL Server"]
    }
  ];

  return (
    <SectionWrapper id="experience" title="Professional Orbit" ref={experienceRef} className="bg-transparent">
      <div className="relative max-w-4xl mx-auto py-12">
        {/* Central Timeline Path */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/0 via-cyan-500/50 to-cyan-500/0 -translate-x-1/2 hidden md:block" />
        
        <div className="space-y-24">
          {experiences.map((job, index) => (
            <div key={index} className={`relative flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              
              {/* Timeline Orb */}
              <div className="absolute left-0 md:left-1/2 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)] z-10 hidden md:block">
                <div className="absolute inset-0 rounded-full animate-ping bg-cyan-500/40" />
              </div>

              {/* Content Card */}
              <div className="w-full md:w-[45%] group">
                <div className="relative p-1 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 transition-all duration-500 group-hover:from-cyan-500/20 group-hover:to-purple-500/20 shadow-xl">
                  <div className="bg-black/80 backdrop-blur-2xl rounded-2xl p-6 lg:p-8 border border-white/5 group-hover:border-white/20 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-cyan-400 text-[10px] font-bold tracking-[0.2em] uppercase">{job.period}</span>
                        <h3 className="text-2xl font-bold text-white mt-1 group-hover:text-cyan-300 transition-colors">{job.company}</h3>
                        <p className="text-purple-400 font-medium">{job.role}</p>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-gray-400 font-mono">
                        {job.location}
                      </div>
                    </div>
                    
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 italic">
                      "{job.description}"
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {job.tech.map((t, i) => (
                        <span key={i} className="px-2 py-1 rounded-md bg-cyan-500/5 border border-cyan-500/10 text-[10px] text-cyan-500/80 font-bold uppercase tracking-widest">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-20">
                      <div className="absolute top-4 right-4 w-4 h-[1px] bg-cyan-400" />
                      <div className="absolute top-4 right-4 w-[1px] h-4 bg-cyan-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Spacer for reverse layout */}
              <div className="hidden md:block w-[45%]" />
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Experience;
