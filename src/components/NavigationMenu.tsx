import React from 'react';
import { useNavigation } from './NavigationContext';

interface NavigationMenuProps {
  sectionRefs: {
    [key: string]: React.RefObject<HTMLDivElement>;
  };
}

const NavigationMenu = ({ sectionRefs }: NavigationMenuProps) => {
  const { setCurrentPage } = useNavigation();

  const handleClick = (key: string) => {
    setCurrentPage(key);
    sectionRefs[key]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="animate-[fadeInDown_1s_ease-out_0.3s_forwards] opacity-0">
      <div className="flex items-center gap-8 rounded-full border border-cyan-400/20 bg-black/10 px-8 py-4 backdrop-blur-lg">
        {[
          { name: '🌌 About', key: 'about', desc: 'Discover my journey' },
          { name: '⚡ Skills', key: 'skills', desc: 'Tech arsenal' },
          { name: '🚀 Projects', key: 'projects', desc: 'Cosmic creations' },
          { name: '🌟 Experience', key: 'experience', desc: 'Professional orbit' },
          { name: '📡 Contact', key: 'contact', desc: 'Connect across space' }
        ].map((item, index) => (
          <div
            key={item.name}
            className="group relative cursor-pointer"
            onClick={() => handleClick(item.key)}
            style={{ animationDelay: `${0.5 + index * 0.1}s` }}
          >
            <div className="animate-[fadeInUp_0.8s_ease-out_forwards] opacity-0 transition-all duration-300 hover:scale-110">
              <span className="block text-sm font-medium text-cyan-300 group-hover:text-white">
                {item.name}
              </span>
              <span className="mt-1 block text-xs text-gray-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {item.desc}
              </span>
            </div>
            <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </div>
  );
};
export default NavigationMenu;