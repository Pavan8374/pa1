import SectionWrapper from "@/components/SectionWrapper";
import { useRef } from "react";

const Skills = () => {
  const skillsRef = useRef<HTMLDivElement>(null);

  const skillCategories = [
    {
      category: "Core Engine",
      icon: "⚙️",
      color: "from-cyan-500 to-blue-600",
      skills: ["C#", "ASP.NET Core", "Entity Framework", "Azure Functions", "gRPC", "GraphQL"]
    },
    {
      category: "Infrastructure",
      icon: "🛰️",
      color: "from-purple-500 to-indigo-600",
      skills: ["Microservices", "Docker", "Azure", "CI/CD", "Event-Driven", "CQRS"]
    },
    {
      category: "Data Matrix",
      icon: "💾",
      color: "from-blue-500 to-cyan-600",
      skills: ["SQL Server", "PostgreSQL", "Redis", "RabbitMQ", "NoSQL"]
    },
    {
      category: "Visual Suite",
      icon: "🖥️",
      color: "from-pink-500 to-purple-600",
      skills: ["React", "Next.js", "TypeScript", "Three.js", "Tailwind"]
    },
    {
      category: "Testing Bay",
      icon: "🧪",
      color: "from-emerald-500 to-teal-600",
      skills: ["NUnit", "Moq", "Postman", "Playwright", "Jest"]
    }
  ];

  return (
    <SectionWrapper id="skills" title="Stellar Stack" ref={skillsRef} className="bg-transparent">
      <div className="flex flex-wrap justify-center gap-8">
        {skillCategories.map((section, index) => (
          <div 
            key={index} 
            className="group relative w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)] min-h-[300px] transition-all duration-500 hover:-translate-y-2"
          >
            {/* Background Glow */}
            <div className={`absolute -inset-0.5 bg-gradient-to-br ${section.color} rounded-2xl opacity-10 group-hover:opacity-30 blur-lg transition-opacity`} />
            
            <div className="relative h-full bg-black/60 backdrop-blur-xl border border-white/5 rounded-2xl p-8 overflow-hidden group-hover:border-white/20 transition-colors">
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center text-2xl shadow-lg shadow-black/50`}>
                  {section.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-wide">{section.category}</h3>
                  <div className="h-0.5 w-12 bg-white/20 mt-1 rounded-full overflow-hidden">
                    <div className={`h-full w-2/3 bg-gradient-to-r ${section.color}`} />
                  </div>
                </div>
              </div>

              {/* Skills List */}
              <div className="flex flex-wrap gap-2">
                {section.skills.map((skill, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs font-medium text-gray-300 hover:bg-white/10 hover:border-white/20 hover:text-cyan-400 transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Decorative Schematic Elements */}
              <div className="absolute bottom-4 right-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                <svg width="60" height="60" viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-white">
                  <circle cx="50" cy="50" r="40" strokeDasharray="10 5" />
                  <path d="M50 10 L50 90 M10 50 L90 50" strokeWidth="0.5" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Skills;
