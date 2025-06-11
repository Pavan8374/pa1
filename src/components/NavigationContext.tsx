// app/components/NavigationContext.tsx
"use client";
import React, { createContext, useContext, useState } from 'react';

interface NavigationContextProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

const NavigationContext = createContext<NavigationContextProps>({
  currentPage: 'home',
  setCurrentPage: () => {},
  isMenuOpen: false,
  setIsMenuOpen: () => {}
});

export const NavigationProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <NavigationContext.Provider value={{ currentPage, setCurrentPage, isMenuOpen, setIsMenuOpen }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);