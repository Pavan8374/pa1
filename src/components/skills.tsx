import SectionWrapper from "@/components/SectionWrapper";
import { useRef } from "react";


const skills = () => {
    const skillsref = useRef<HTMLDivElement>(null);
    return (
        <SectionWrapper id="skills" title="My Skills" ref={skillsref} className="bg-transparent">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { category: 'Frontend', skills: ['React', 'Next.js', 'TypeScript', 'Three.js', 'Tailwind CSS'] },
                    { category: 'Backend', skills: ['Node.js', 'Express', 'GraphQL', 'MongoDB', 'PostgreSQL'] },
                    { category: 'DevOps', skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Serverless'] }
                ].map((section, index) => (
                    <div key={index} className="bg-black/50 p-6 rounded-xl border border-purple-500/30">
                        <h3 className="text-2xl font-bold mb-4 text-purple-400">{section.category}</h3>
                        <ul className="space-y-3">
                            {section.skills.map((skill, i) => (
                                <li key={i} className="flex items-center">
                                    <span className="text-cyan-400 mr-2">▹</span>
                                    <span className="text-lg">{skill}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    )
}
export default skills;

