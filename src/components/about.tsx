import SectionWrapper from "@/components/SectionWrapper";
import { useRef } from "react";

const About = () => {
    const aboutRef = useRef<HTMLDivElement>(null);

    return (
        <SectionWrapper id="about" title="Captain’s Log" ref={aboutRef}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <p className="text-xl mb-6 leading-relaxed">
                        I’m a full-stack developer who believes code is not just logic, it's a lifestyle. With solid experience in .NET, React, and system design,
                        I build apps that are not only scalable, but also *meme-worthy*. 😄
                    </p>
                    <p className="text-xl mb-6 leading-relaxed">
                        My dev journey started with simple curiosity, and now I’m obsessed with crafting performant APIs, real-time systems, and platforms that actually solve pain points.
                    </p>
                    <p className="text-xl leading-relaxed">
                        Whether it’s boring repetitive apps, event systems, or local discovery apps — I love building stuff that people use and enjoy.
                    </p>
                </div>
                <div className="bg-gray-900 rounded-2xl p-8 border border-cyan-500/30">
                    <h3 className="text-2xl font-bold mb-4">Philosophy</h3>
                    <p className="text-lg mb-4 italic">
                        “Build fast. Break less. Write clean code. Repeat.”
                    </p>
                    <div className="mt-8">
                        <h3 className="text-xl font-bold mb-3">Education</h3>
                        <p className="mb-2">B.Tech in Computer Science — Not from MIT or Stanford 😅, but built projects that speak louder than degrees.</p>
                        <p>Constant learner, Open Source contributor, and AI/ML enthusiast.</p>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};

export default About;
