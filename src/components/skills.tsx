import SectionWrapper from "@/components/SectionWrapper";
import { useRef } from "react";

const Skills = () => {
  const skillsref = useRef<HTMLDivElement>(null);

  return (
    <SectionWrapper id="skills" title="Stellar Stack" ref={skillsref} className="bg-transparent">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            category: "Core Backend Systems",
            skills: [
              "C#", "ASP.NET Core", "Entity Framework Core",
              "Azure Functions", "gRPC", "GraphQL"
            ]
          },
          {
            category: "Architecture & Infra",
            skills: [
              "Microservices", "Event-Driven Architecture", "CQRS", "DDD", 
              "Clean Architecture", "Docker", "Azure", "Azure DevOps", "Azure AI Studio"
            ]
          },
          {
            category: "Data & Communication",
            skills: [
              "SQL Server", "PostgreSQL", "Redis", 
              "RabbitMQ", "REST", "GraphQL", "gRPC"
            ]
          },
          {
            category: "Frontend & UI",
            skills: [
              "React", "Next.js", "TypeScript",
              "Three.js", "Tailwind CSS"
            ]
          },
          {
            category: "Testing & Tools",
            skills: [
              "NUnit", "Mocking Frameworks", 
              "Postman", "Visual Studio", "VS Code", "CI/CD Pipelines"
            ]
          }
        ].map((section, index) => (
          <div key={index} className="bg-black/50 p-6 rounded-xl border border-purple-500/30">
            <h3 className="text-2xl font-bold mb-4 text-purple-400">{section.category}</h3>
            <ul className="space-y-3">
              {section.skills.map((skill, i) => (
                <li key={i} className="flex items-center">
                  <span className="text-cyan-400 mr-2">✦</span>
                  <span className="text-lg text-gray-200">{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Skills;
