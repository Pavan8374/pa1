import type { Metadata } from 'next';
import { Outfit, Orbitron } from 'next/font/google';
import { NavigationProvider } from '@/components/NavigationContext';
import './globals.css';

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
});

export const metadata: Metadata = {
  title: 'Pavan Kumar | Portfolio',
  description: 'Full Stack Developer & Creative Technologist',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${orbitron.variable} font-sans bg-black text-white`}>
        <NavigationProvider>
          {children}
        </NavigationProvider>
      </body>
    </html>
  );
}