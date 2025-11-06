'use client';
import React, { useState } from 'react';
import CardNav, { CardNavItem } from './component/dashBoard';
import Threads from './component/paragraph';


const Page = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const isDark = theme === 'dark';

  const toggleTheme = () => setTheme(isDark ? 'light' : 'dark');

  const items: CardNavItem[] = [
    {
      label: 'About',
      bgColor: '#0D0716',
      textColor: '#fff',
      links: [
        { label: 'Company', ariaLabel: 'About Company', href: '/company' },
        { label: 'Careers', ariaLabel: 'About Careers', href: '/careers' },
      ],
    },
    {
      label: 'Projects',
      bgColor: '#170D27',
      textColor: '#fff',
      links: [
        { label: 'Featured', ariaLabel: 'Featured Projects', href: '/projects/featured' },
        { label: 'Case Studies', ariaLabel: 'Project Case Studies', href: '/projects/case-studies' },
      ],
    },
    {
      label: 'Contact',
      bgColor: '#271E37',
      textColor: '#fff',
      links: [
        { label: 'Email', ariaLabel: 'Email us', href: 'mailto:poemsbits@gmail.com' },
        { label: 'Twitter', ariaLabel: 'Twitter', href: 'https://twitter.com/example' },
        { label: 'LinkedIn', ariaLabel: 'LinkedIn', href: 'https://linkedin.com/company/example' },
      ],
    },
  ];

  return (
    <main
      className={`relative min-h-screen transition-colors duration-500 ${
        isDark ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      <div className="absolute inset-0 z-0">
        <Threads
          enableMouseInteraction
          color={isDark ? [1, 1, 1] : [0.05, 0.05, 0.05]}
        />
      </div>

      <div className="sticky top-0 z-20 bg-transparent backdrop-blur-md">
        <CardNav
          logo="logo.png"
          items={items}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      </div>

      {/* Page Content */}
      <section className="relative z-10 flex items-center justify-center italic h-[80vh]">
        <div className="text-center px-4">
          <h1 className="text-5xl font-bold">Welcome,
 <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
    Poems Bits
  </span>            </h1>
          <p className="text-lg mt-8  opacity-80">
            Poems Bits is a curated collection of original poems, essays, and creative experiments — designed to inspire, provoke, and connect. Explore featured pieces, project case studies, and ways to get in touch.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Page;
