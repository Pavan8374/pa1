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
        lastScrollTime.current = Date.now(); // Reset scroll time here
      }, 300);
    }, 3000);
  };

  useEffect(() => {
    // Scroll and touch-based teleportation has been removed at user request.
    // Natural scrolling now works normally, and teleportation is only triggered via menu items.
  }, []);

  return (
    <NavigationContext.Provider value={{ currentPage, setCurrentPage, isMenuOpen, setIsMenuOpen, isWarping, targetPage, navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);