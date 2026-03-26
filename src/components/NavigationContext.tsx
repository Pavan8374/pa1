"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';

interface NavigationContextProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  isWarping: boolean;
  targetPage: string;
  navigateTo: (page: string) => void;
}

const NavigationContext = createContext<NavigationContextProps>({
  currentPage: 'home',
  setCurrentPage: () => {},
  isMenuOpen: false,
  setIsMenuOpen: () => {},
  isWarping: false,
  targetPage: 'home',
  navigateTo: () => {}
});

export const NavigationProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const sections = ['home', 'about', 'skills', 'projects', 'experience', 'station', 'contact'];
  const [currentPage, setCurrentPage] = useState('home');
  const [targetPage, setTargetPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWarping, setIsWarping] = useState(false);
  const lastScrollTime = useRef(0);
  const touchStart = useRef(0);

  const navigateTo = (page: string) => {
    if (isWarping || currentPage === page) return; // Prevent multiple warps
    setTargetPage(page);
    setIsWarping(true);
    
    // 3s wormhole jump effect
    setTimeout(() => {
      setCurrentPage(page);
      
      const target = document.getElementById(page);
      if (target) {
        target.scrollIntoView({ behavior: 'instant' });
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
      
      // Let the dust settle
      setTimeout(() => {
        setIsWarping(false);
      }, 300);
    }, 3000);
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isWarping) return;
      
      const now = Date.now();
      if (now - lastScrollTime.current < 2000) return; // 2s debounce for "flicking"
      
      const currentIndex = sections.indexOf(currentPage);
      if (e.deltaY > 50 && currentIndex < sections.length - 1) {
        lastScrollTime.current = now;
        navigateTo(sections[currentIndex + 1]);
      } else if (e.deltaY < -50 && currentIndex > 0) {
        lastScrollTime.current = now;
        navigateTo(sections[currentIndex - 1]);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
        touchStart.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: any) => {
        if (isWarping) return;
        const touchEnd = e.changedTouches[0].clientY;
        const delta = touchStart.current - touchEnd;
        
        const now = Date.now();
        if (now - lastScrollTime.current < 2000) return;

        const currentIndex = sections.indexOf(currentPage);
        if (Math.abs(delta) > 50) {
            if (delta > 0 && currentIndex < sections.length - 1) {
                lastScrollTime.current = now;
                navigateTo(sections[currentIndex + 1]);
            } else if (delta < 0 && currentIndex > 0) {
                lastScrollTime.current = now;
                navigateTo(sections[currentIndex - 1]);
            }
        }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart as any);
    window.addEventListener('touchend', handleTouchEnd as any);
    return () => {
        window.removeEventListener('wheel', handleWheel);
        window.removeEventListener('touchstart', handleTouchStart as any);
        window.removeEventListener('touchend', handleTouchEnd as any);
    };
  }, [currentPage, isWarping]);

  return (
    <NavigationContext.Provider value={{ currentPage, setCurrentPage, isMenuOpen, setIsMenuOpen, isWarping, targetPage, navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);