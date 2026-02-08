'use client';

import React, { useEffect, useState, ReactNode } from 'react';
import CardNav, { CardNavItem } from './dashBoard';
import Footer from './footer';
import Poems from './profile';
import ReadingPage from './rating';
import YourPoems from './YourPoems'; 
import Newsletter from './Newsletter';

// nav items for the card navigation

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
      { label: 'You', href: '/you', ariaLabel: 'Poems By You' },
      { label: 'People', href: '/dev', ariaLabel: 'Development Services' },
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
  const [activePage, setActivePage] = useState<'home' | 'yourPoems'>('home');

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

  // Handle nav link clicks
  const handleNavClick = (label: string) => {
    if (label === 'You') setActivePage('yourPoems');
    else setActivePage('home');
  };

  if (!mounted) return null;

  return (
    <div
      className={`transition-colors duration-500 min-h-screen ${
        theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'
      }`}
    >
      <CardNav
        logo="/logo.png"
        items={navItems}
        theme={theme}
        toggleTheme={toggleTheme}
        onLinkClick={handleNavClick} // callback when nav link is clicked
      />

      {activePage === 'home' && (
        <>
          {children}
          <ReadingPage theme={theme} />
          <Poems />
        </>
      )}

      {activePage === 'yourPoems' && <YourPoems />}
      <Newsletter theme={theme} />

      <Footer theme={theme} />
    </div>
  );
};

export default NavbarWrapper;
