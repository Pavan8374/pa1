import SectionWrapper from "@/components/SectionWrapper";
import { useRef } from "react";

const experience = () => {
  const experienceRef = useRef<HTMLDivElement>(null);

  return (
<SectionWrapper id="experience" title="Professional Orbit" ref={experienceRef} className="bg-transparent">
          <div className="space-y-8">
            {[
              { 
                company: 'Stellar Innovations', 
                role: 'Senior Full Stack Developer', 
                period: '2020 - Present',
                description: 'Led development of next-gen SaaS platform serving 50k+ users. Implemented microservices architecture reducing latency by 40%.'
              },
              { 
                company: 'Nova Systems', 
                role: 'Frontend Architect', 
                period: '2018 - 2020',
                description: 'Designed and implemented component library used across 15+ products. Mentored junior developers in React best practices.'
              },
              { 
                company: 'Quantum Leap Technologies', 
                role: 'Full Stack Developer', 
                period: '2016 - 2018',
                description: 'Developed real-time analytics dashboard processing 1M+ events daily. Optimized database queries improving performance by 300%.'
              }
            ].map((job, index) => (
              <div key={index} className="p-6 bg-black/30 rounded-xl border border-purple-500/20">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-cyan-300">{job.company}</h3>
                    <p className="text-xl text-purple-300">{job.role}</p>
                  </div>
                  <span className="px-3 py-1 bg-cyan-900/30 text-cyan-300 rounded-full">
                    {job.period}
                  </span>
                </div>
                <p className="mt-4 text-gray-300">{job.description}</p>
              </div>
            ))}
          </div>
        </SectionWrapper>
)
}

export default experience;

    