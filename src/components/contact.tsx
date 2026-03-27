import SectionWrapper from "@/components/SectionWrapper";
import { useRef } from "react";

const Contact = () => { 
  const contactRef = useRef<HTMLDivElement>(null);

  return (
    <SectionWrapper id="contact" title="Subspace Transmission" ref={contactRef}>
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        {/* Contact Info Side */}
        <div className="w-full md:w-1/3 space-y-8 animate-[fadeInLeft_1s_ease-out]">
            <div className="p-6 bg-cyan-500/5 border border-cyan-500/10 rounded-2xl backdrop-blur-md">
                <h4 className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest mb-2">Comms Channel</h4>
                <p className="text-lg text-white font-medium">pavan@galaxy.dev</p>
            </div>
            <div className="p-6 bg-purple-500/5 border border-purple-500/10 rounded-2xl backdrop-blur-md">
                <h4 className="text-[10px] font-bold text-purple-500 uppercase tracking-widest mb-2">Current Coordinates</h4>
                <p className="text-lg text-white font-medium">Planet Earth, Sector 7</p>
            </div>
        </div>

        {/* Form Side */}
        <div className="w-full md:w-2/3 animate-[fadeInRight_1s_ease-out]">
          <div className="relative group p-1 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 group-hover:from-cyan-500/20 group-hover:to-purple-500/20 shadow-2xl transition-all duration-700">
            <div className="bg-black/80 backdrop-blur-3xl p-8 lg:p-12 rounded-3xl border border-white/5 relative overflow-hidden">
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-cyan-400">
                        <circle cx="50" cy="50" r="1" />
                        <circle cx="50" cy="50" r="20" strokeDasharray="2 4" />
                        <circle cx="50" cy="50" r="40" strokeDasharray="1 8" />
                    </svg>
                </div>

                <h3 className="text-3xl font-black text-white mb-8 tracking-tighter uppercase italic">Establish Connection</h3>
                
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Identity</label>
                            <input
                                type="text"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-white transition-all placeholder:text-gray-700 font-medium"
                                placeholder="Captain Name"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Frequency</label>
                            <input
                                type="email"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-white transition-all placeholder:text-gray-700 font-medium"
                                placeholder="your@email.com"
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Payload</label>
                        <textarea
                            rows={4}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-white transition-all placeholder:text-gray-700 font-medium resize-none"
                            placeholder="Type your cosmic message here..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="group relative w-full overflow-hidden bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] py-5 rounded-xl transition-all hover:scale-[1.02] active:scale-95"
                    >
                        <span className="relative z-10">Broadcast Message</span>
                        <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </button>
                    
                    <p className="text-center text-[8px] text-gray-600 uppercase tracking-widest mt-4">Safe connection via encrypted subspace</p>
                </form>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
export default Contact;

