import SectionWrapper from "@/components/SectionWrapper";
import { useRef } from "react";

const Experience = () => {
  const experienceRef = useRef<HTMLDivElement>(null);

  return (
    <SectionWrapper
      id="experience"
      title="Professional Orbit"
      ref={experienceRef}
      className="bg-transparent"
    >
      <div className="space-y-8">

        {[
          {
            company: "FriskaAI",
            role: "Backend Astronaut 🚀",
            period: "Jun 2025 - Present",
            description:
              "Docked into a healthcare galaxy! Building microservices, handling service discovery like space traffic control, and integrating with Azure planets. Boosting performance like giving steroids to rockets. Mission: Make health tech smarter & faster.",
          },
          {
            company: "Natrix Software Pvt Ltd",
            role: "Lead Dev Commander 👨‍🚀",
            period: "Jan 2023 - Jun 2025",
            description:
              "Co-piloted 'Dubfeed' – a galaxy for gamers to orbit, play, post, and vibe. Took backend from zero gravity to full orbit. Then launched ‘Rhode Side Assist’ – live location, tow services, real-time communication – like GPS on warp speed.",
          },
          
        ].map((job, index) => (
          <div
            key={index}
            className="p-6 bg-black/30 rounded-xl border border-purple-500/20"
          >
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
  );
};

export default Experience;
