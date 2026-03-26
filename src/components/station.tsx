import SectionWrapper from './SectionWrapper';

const Station = () => {
  return (
    <SectionWrapper id="station" title="Orbital Station">
      <div className="flex flex-col items-center justify-center p-8 bg-black/40 backdrop-blur-md rounded-2xl border border-blue-500/30 w-full max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">
          Command Module
        </h3>
        <p className="text-gray-300 text-center max-w-2xl text-lg leading-relaxed">
          Welcome to the Orbital Command Station. This module is designated for future expansions, communications, and monitoring system diagnostics over the planetary sphere.
          <br /><br />
          Feel free to navigate the interconnected systems of this portfolio.
        </p>
        <div className="mt-8 flex gap-4">
          <div className="flex items-center gap-2 text-cyan-400 border border-cyan-400/30 px-4 py-2 rounded-full bg-cyan-400/10">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            Systems Online
          </div>
          <div className="flex items-center gap-2 text-blue-400 border border-blue-400/30 px-4 py-2 rounded-full bg-blue-400/10">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            Orbit Stable
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Station;
