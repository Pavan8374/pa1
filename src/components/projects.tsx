import SectionWrapper from "@/components/SectionWrapper";
import { useRef } from "react";

const projects = () => {
    const projectsRef = useRef<HTMLDivElement>(null);

    return (
        <SectionWrapper id="projects" title="Cosmic Creations" ref={projectsRef}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((project) => (
                    <div key={project} className="bg-gray-900/50 p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300">
                        <div className="bg-gray-800 rounded-lg h-48 mb-4 flex items-center justify-center">
                            <div className="bg-gradient-to-br from-cyan-500 to-purple-600 w-full h-full rounded-lg opacity-70" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-cyan-300">Project Nebula {project}</h3>
                        <p className="text-gray-300 mb-4">
                            Revolutionary web platform that transforms how users interact with cosmic data.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {['React', 'Node.js', 'WebGL', 'GraphQL'].map((tech, i) => (
                                <span key={i} className="px-3 py-1 bg-cyan-900/30 text-cyan-300 rounded-full text-xs">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    )
}

export default projects;

