import SectionWrapper from "@/components/SectionWrapper";
import { useRef } from "react";
import Image from "next/image";

const projects = () => {
    const projectsRef = useRef<HTMLDivElement>(null);

    const projectData = [
        {
            name: "Taskflow",
            description: "Modern task management system with analytics & team coordination.",
            images: ["/projects/taskflow/1.png", "/projects/taskflow/2.png", "/projects/taskflow/3.png", "/projects/taskflow/4.png"],
            techStack: ["ASP.NET Core MVC", "C#", "SQL Server", "Azure", "jQuery", "AJAX", "Bootstrap"],
            url: "https://taskflow-cdeeg9g4gdhkcfat.indonesiacentral-01.azurewebsites.net/",
        },
        {
            name: "Admin Panel",
            description: "Admin dashboard for content moderation and detailed analytics.",
            images: ["/projects/admin/1.png", "/projects/admin/2.png"],
            techStack: ["React", "TypeScript", "MUI"],
            url: "https://admin-panel-seven-beryl.vercel.app/",
        },
        {
            name: "DevVerse – My Personal Universe",
            description: "A galaxy-themed interactive portfolio to showcase my skills, projects, and experience as a full-stack .NET developer and cosmic thinker.",
            images: ["/projects/devverse/1.png", "/projects/devverse/2.png" , "/projects/devverse/3.png", "/projects/devverse/4.png"],
            techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Three.js", "Framer Motion", "Vercel"],
            url: "https://rpa1k-portfolio.vercel.app/", 
        },

    ];

    return (
        <SectionWrapper id="projects" title="Cosmic Creations" ref={projectsRef}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projectData.map((project, index) => (
                    <div
                        key={index}
                        className="bg-gray-900/50 p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300"
                    >
                        {/* Auto-scrolling image carousel */}
                        <div className="overflow-hidden rounded-xl mb-4 relative">
                            <div className="flex animate-scroll-x gap-4 w-max">
                                {project.images.map((img, idx) => (
                                    <Image
                                        key={idx}
                                        src={img}
                                        alt={`${project.name} screenshot ${idx + 1}`}
                                        width={300}
                                        height={200}
                                        className="rounded-lg object-cover"
                                    />
                                ))}
                            </div>
                        </div>

                        <h3 className="text-xl font-bold mb-2 text-cyan-300">{project.name}</h3>
                        <p className="text-gray-300 mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.techStack.map((tech, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 bg-cyan-900/30 text-cyan-300 rounded-full text-xs"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                        <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-purple-400 hover:text-purple-200 underline"
                        >
                            🔗 View Project
                        </a>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
};

export default projects;
