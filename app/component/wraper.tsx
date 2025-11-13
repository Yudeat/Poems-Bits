'use client';

import React, { useEffect, useState, ReactNode } from 'react';
import dynamic from 'next/dynamic';
import Footer from './footer';
import Poems from './profile';
import ReadingPage from './rating';
import type { CardNavItem } from './dashBoard';

// Lazy-load CardNav to prevent Clerk context errors
const CardNav = dynamic(() => import('./dashBoard'), { ssr: false });

const navItems: CardNavItem[] = [
  {
    label: 'About',
    bgColor: '#1F2937',
    textColor: '#fff',
    links: [
      { label: 'Donation', href: '/company', ariaLabel: 'About Company' },
      { label: 'Poems', href: '/team', ariaLabel: 'Our Team' },
    ],
  },
  {
    label: 'Sources',
    bgColor: '#4B5563',
    textColor: '#fff',
    links: [
      { label: 'Company', href: '/design', ariaLabel: 'Design Services' },
      { label: 'People ', href: '/dev', ariaLabel: 'Development Services' },
    ],
  },
  {
    label: 'Contact',
    bgColor: '#6B7280',
    textColor: '#fff',
    links: [
      { label: 'Email', href: '/email', ariaLabel: 'Email Us' },
      { label: 'Phone', href: '/phone', ariaLabel: 'Call Us' },
    ],
  },
];

interface NavbarWrapperProps {
  children: ReactNode;
}

const NavbarWrapper: React.FC<NavbarWrapperProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) setTheme(savedTheme);
    setMounted(true);
  }, []);

  // Apply theme to body
  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', next);
      return next;
    });
  };

  if (!mounted) return null;

  return (
    <div className={`transition-colors duration-500 min-h-screen ${theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'}`}>
      {/* Lazy-loaded CardNav */}
      <CardNav logo="/logo.png" items={navItems} theme={theme} toggleTheme={toggleTheme} />

      {/* Children passed from pages */}
      {children}

      {/* Other sections */}
      <ReadingPage theme={theme} />
      <Poems />
      <Footer theme={theme} />
    </div>
  );
};

export default NavbarWrapper;
