import SectionWrapper from "@/components/SectionWrapper";
import { useRef } from "react";


const contacts = () => { 
const contactRef = useRef<HTMLDivElement>(null);

return (
  <SectionWrapper id="contact" title="Connect Across Space" ref={contactRef}>
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-900/50 p-8 rounded-2xl border border-cyan-500/30">
        <h3 className="text-2xl font-bold mb-6 text-cyan-300">Send Cosmic Message</h3>
        <form className="space-y-6">
          <div>
            <label className="block text-gray-400 mb-2">Your Name</label>
            <input
              type="text"
              className="w-full bg-gray-800/50 border border-cyan-500/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Stellar Email</label>
            <input
              type="email"
              className="w-full bg-gray-800/50 border border-cyan-500/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Message</label>
            <textarea
              rows={4}
              className="w-full bg-gray-800/50 border border-cyan-500/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
              placeholder="Your cosmic message..."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold py-4 rounded-full hover:opacity-90 transition-opacity"
          >
            Launch Message
          </button>
        </form>
      </div>
    </div>
  </SectionWrapper>
)
}
export default contacts;

