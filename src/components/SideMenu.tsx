"use client";

import React from 'react';
import Link from 'next/link';
import { useNavigation } from "./NavigationContext";

const SideMenu = () => {
  const { setCurrentPage } = useNavigation();

  return (
    <div className="absolute right-8 top-1/2 z-20 -translate-y-1/2 transform">
      <div className="animate-[fadeInRight_1s_ease-out_1s_forwards] opacity-0">
        <div className="flex flex-col gap-4">
          {[
            { 
              icon: '🎯', 
              label: 'Portfolio', 
              key:'portfolio', 
              color: 'from-cyan-500 to-blue-500',
              action: () => setCurrentPage('home')
            },
            { 
              icon: '💼', 
              label: 'Resume', 
              key:'resume', 
              color: 'from-purple-500 to-pink-500',
              href: '/resume/Rambhukta_Pavan_Kumar.pdf'
            },
            { 
              icon: '🎨', 
              label: 'Gallery', 
              key:'gallery', 
              color: 'from-green-500 to-emerald-500',
              href: '/gallery'
            },
            { 
              icon: '📝', 
              label: 'Blog', 
              key:'blog', 
              color: 'from-orange-500 to-red-500',
              href: '/blog'
            }
          ].map((item, index) => (
            <div
              key={item.label}
              className="group relative cursor-pointer"
              style={{
                animationDelay: `${1.2 + index * 0.1}s`
              }}
            >
              {item.href ? (
                <Link href={item.href}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/20 backdrop-blur-lg transition-all duration-300 hover:scale-110 hover:border-white/40">
                    <span className="text-xl">{item.icon}</span>
                  </div>
                </Link>
              ) : (
                <div 
                  onClick={item.action}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/20 backdrop-blur-lg transition-all duration-300 hover:scale-110 hover:border-white/40"
                >
                  <span className="text-xl">{item.icon}</span>
                </div>
              )}
              
              <div className={`absolute right-16 top-1/2 -translate-y-1/2 transform whitespace-nowrap rounded-lg bg-gradient-to-r ${item.color} px-3 py-2 text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0`}>
                {item.label}
                <div className={`absolute right-0 top-1/2 h-0 w-0 -translate-y-1/2 transform border-l-8 border-t-4 border-b-4 border-l-current border-t-transparent border-b-transparent`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SideMenu;