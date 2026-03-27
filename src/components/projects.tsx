import SectionWrapper from "@/components/SectionWrapper";
import { useRef } from "react";
import Image from "next/image";

const Projects = () => {
    const projectsRef = useRef<HTMLDivElement>(null);

    const projectData = [
        {
            name: "Taskflow",
            description: "Modern task management system with analytics & team coordination.",
            images: ["/projects/taskflow/1.png", "/projects/taskflow/2.png", "/projects/taskflow/3.png", "/projects/taskflow/4.png"],
            techStack: ["ASP.NET Core", "SQL Server", "Azure", "jQuery"],
            url: "https://taskflow-cdeeg9g4gdhkcfat.indonesiacentral-01.azurewebsites.net/",
        },
        {
            name: "DevVerse",
            description: "Interactive 3D portfolio showcase with immersive cosmic navigation.",
            images: ["/projects/devverse/1.png", "/projects/devverse/2.png" , "/projects/devverse/3.png", "/projects/devverse/4.png"],
            techStack: ["Next.js", "Three.js", "Tailwind CSS", "TypeScript"],
            url: "https://rpa1k-portfolio.vercel.app/", 
        },
    ];

    return (
        <SectionWrapper id="projects" title="Cosmic Creations" ref={projectsRef} className="bg-transparent">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {projectData.map((project, index) => (
                    <div
                        key={index}
                        className="group relative h-full flex flex-col"
                    >
                        {/* Interactive Card */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-purple-600/0 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-700" />
                        
                        <div className="relative flex-1 bg-black/60 backdrop-blur-2xl rounded-3xl border border-white/5 overflow-hidden transition-all duration-500 group-hover:border-cyan-500/30 group-hover:-translate-y-2 flex flex-col">
                            {/* Image Carousel Area */}
                            <div className="relative h-64 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
                                <div className="flex animate-[scroll_30s_linear_infinite] gap-4 w-max h-full items-center px-4">
                                    {(project.images.length > 0 ? project.images.concat(project.images) : []).map((img, idx) => (
                                        <div key={idx} className="relative w-72 h-44 flex-shrink-0 group-hover:scale-105 transition-transform duration-700">
                                            <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay rounded-xl" />
                                            <Image
                                                src={img}
                                                alt={`${project.name} preview`}
                                                fill
                                                className="rounded-xl object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-black text-white tracking-widest uppercase italic group-hover:text-cyan-400 transition-colors">
                                        {project.name}
                                    </h3>
                                    <span className="text-[10px] font-mono text-cyan-500/40">PRJ-202{index+4}</span>
                                </div>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                    {project.description}
                                </p>
                                
                                <div className="mt-auto">
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {project.techStack.map((tech, i) => (
                                            <span key={i} className="text-[9px] font-bold tracking-[0.2em] text-cyan-300 uppercase px-3 py-1 bg-cyan-900/20 border border-cyan-500/20 rounded-md">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 group/btn px-6 py-3 bg-white/5 border border-white/10 rounded-full text-xs font-bold tracking-widest text-white uppercase hover:bg-white hover:text-black transition-all duration-500"
                                    >
                                        Initiate Access
                                        <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <style jsx>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </SectionWrapper>
    );
};

export default Projects;
