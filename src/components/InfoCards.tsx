import React from 'react';


const InfoCards = () => {

    return (
        <div className="absolute left-8 top-1/3 z-20 transform">
        <div className="animate-[fadeInLeft_1s_ease-out_1.5s_forwards] opacity-0">
          <div className="space-y-4">
            <div className="group cursor-pointer rounded-xl border border-cyan-400/30 bg-black/20 p-4 backdrop-blur-lg transition-all duration-300 hover:border-cyan-400/60 hover:bg-black/30">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 animate-pulse rounded-full bg-green-400"></div>
                <span className="text-sm text-gray-300">Available for Projects</span>
              </div>
            </div>
            
            <div className="group cursor-pointer rounded-xl border border-purple-400/30 bg-black/20 p-4 backdrop-blur-lg transition-all duration-300 hover:border-purple-400/60 hover:bg-black/30">
              <div className="text-xs text-gray-400">Current Focus</div>
              <div className="text-sm text-purple-300">AI & Web3 Integration</div>
            </div>
            
            <div className="group cursor-pointer rounded-xl border border-pink-400/30 bg-black/20 p-4 backdrop-blur-lg transition-all duration-300 hover:border-pink-400/60 hover:bg-black/30">
              <div className="text-xs text-gray-400">Latest Achievement</div>
              <div className="text-sm text-pink-300">🏆 Tech Innovation Award</div>
            </div>
          </div>
        </div>
      </div>
    );

}

export default InfoCards;