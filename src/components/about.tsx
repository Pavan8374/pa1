import SectionWrapper from "@/components/SectionWrapper";
import { useRef } from "react";


const about = () => {
    const aboutRef = useRef<HTMLDivElement>(null);
    return (
        <SectionWrapper id="about" title="About Me" ref={aboutRef}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <p className="text-xl mb-6 leading-relaxed">
                        Passionate full-stack developer with 5+ years of experience creating
                        innovative web solutions. Specializing in React, Node.js, and modern
                        cloud architectures.
                    </p>
                    <p className="text-xl mb-6 leading-relaxed">
                        My journey began with a fascination for how technology can solve
                        real-world problems, leading me to pursue a career where I can
                        bridge the gap between creativity and functionality.
                    </p>
                </div>
                <div className="bg-gray-900 rounded-2xl p-8 border border-cyan-500/30">
                    <h3 className="text-2xl font-bold mb-4">Philosophy</h3>
                    <p className="text-lg mb-4">
                        "Build solutions that not only function flawlessly but also
                        inspire and delight users."
                    </p>
                    <div className="mt-8">
                        <h3 className="text-xl font-bold mb-3">Education</h3>
                        <p className="mb-2">MSc in Computer Science - Stanford University</p>
                        <p>BSc in Software Engineering - MIT</p>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}

export default about;

