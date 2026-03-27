import SectionWrapper from "@/components/SectionWrapper";
import { useRef } from "react";

const About = () => {
    const aboutRef = useRef<HTMLDivElement>(null);

    return (
        <SectionWrapper id="about" title="Captain’s Log" ref={aboutRef} className="relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full -z-10" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 space-y-8 animate-[fadeInLeft_1s_ease-out]">
                    <div className="relative p-6 bg-black/40 backdrop-blur-xl rounded-3xl border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.1)] hover:border-cyan-500/40 transition-all duration-500">
                        <div className="absolute top-0 right-0 p-3 text-[10px] text-cyan-500/40 font-mono">ID: PV-8374-LOG</div>
                        <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-200">
                            I’m a <span className="text-cyan-400 font-bold">Full-Stack Explorer</span> who believes code is the ultimate frontier. 
                            With a trajectory through <span className="text-purple-400 font-medium">.NET</span>, <span className="text-blue-400 font-medium">React</span>, and <span className="text-pink-400 font-medium">System Design</span>, 
                            I craft digital vessels that are high-performance and future-proof.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-cyan-950/20 backdrop-blur-md rounded-2xl border border-cyan-500/10 hover:bg-cyan-900/10 transition-colors">
                            <h4 className="text-cyan-400 font-bold uppercase tracking-widest text-xs mb-3">Mission Priority</h4>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Building scalable architectures that don't just work—they excel under pressure. Obsessed with performance and clean code.
                            </p>
                        </div>
                        <div className="p-6 bg-purple-950/20 backdrop-blur-md rounded-2xl border border-purple-500/10 hover:bg-purple-900/10 transition-colors">
                            <h4 className="text-purple-400 font-bold uppercase tracking-widest text-xs mb-3">Navigation Method</h4>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Data-driven decisions, agile maneuvers, and a constant thirst for the next breakthrough technology.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-5 animate-[fadeInRight_1s_ease-out]">
                    <div className="group relative">
                        {/* Animated Border */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                        
                        <div className="relative bg-black/80 backdrop-blur-2xl rounded-2xl p-8 border border-white/5 overflow-hidden">
                            {/* Terminal Elements */}
                            <div className="flex gap-2 mb-6">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            </div>

                            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent italic">
                                “Build fast. Break less. Write clean. Orbit higher.”
                            </h3>
                            
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-bold text-cyan-500 uppercase tracking-tighter">Academic Status</span>
                                        <div className="h-1 w-24 bg-cyan-500/20 rounded-full overflow-hidden">
                                            <div className="h-full w-full bg-cyan-500 animate-[pulse_2s_infinite]" />
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-400 leading-snug">
                                        B.Tech in Computer Science — Learning via building, breaking, and improving. Constant learner of the digital arts.
                                    </p>
                                </div>

                                <div className="pt-6 border-t border-white/5 flex gap-4">
                                    <div className="flex-1 text-center py-3 bg-cyan-500/5 rounded-lg border border-cyan-500/20 hover:bg-cyan-500/10 transition-all cursor-default group/stat">
                                        <div className="text-cyan-400 font-bold text-xl group-hover/stat:scale-110 transition-transform">0+</div>
                                        <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Years Orbiting</div>
                                    </div>
                                    <div className="flex-1 text-center py-3 bg-purple-500/5 rounded-lg border border-purple-500/20 hover:bg-purple-900/10 transition-all cursor-default group/stat">
                                        <div className="text-purple-400 font-bold text-xl group-hover/stat:scale-110 transition-transform">∞</div>
                                        <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Coffee Consumed</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};

export default About;
