import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NavigationProvider } from '@/components/NavigationContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={`${inter.className} bg-black text-white`}>
        <NavigationProvider>
          {children}
        </NavigationProvider>
      </body>
    </html>
  );
}