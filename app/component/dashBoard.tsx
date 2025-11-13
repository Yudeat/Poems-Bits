'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoArrowUpRight } from 'react-icons/go';
import { FaSun, FaMoon } from 'react-icons/fa';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export type CardNavLink = {
  label: string;
  href: string;
  ariaLabel: string;
};

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

export interface CardNavProps {
  logo: string;
  logoAlt?: string;
  items: CardNavItem[];
  className?: string;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onLinkClick?: (label: string) => void; // new callback
}

const CardNav: React.FC<CardNavProps> = ({
  logo,
  logoAlt = 'Logo',
  items,
  className = '',
  theme,
  toggleTheme,
  onLinkClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`card-nav-container fixed left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] z-[999] top-[1.2em] md:top-[2em] ${className}`}
    >
      <motion.nav
        ref={navRef}
        className="card-nav block p-0 rounded-xl relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
        style={{
          backgroundColor: theme === 'light' ? 'rgba(255,255,255,0.25)' : 'rgba(20,20,20,0.35)',
          color: theme === 'light' ? '#000' : '#fff',
          border: theme === 'dark' ? '1px solid rgba(255,255,255,0.2)' : 'none',
          backdropFilter: 'blur(10px)',
        }}
        layout
      >
        <div className="card-nav-top relative z-[2] h-[60px] flex items-center justify-between p-2 pl-[1.1rem]">
          {/* Hamburger */}
          <div
            onClick={() => setIsExpanded(prev => !prev)}
            className="hamburger group flex flex-col gap-[6px] cursor-pointer"
            style={{ color: theme === 'light' ? '#000' : '#fff' }}
          >
            <span
              className={`block w-[30px] h-[2px] bg-current transition-transform duration-300 ${
                isExpanded ? 'translate-y-[4px] rotate-45' : ''
              }`}
            />
            <span
              className={`block w-[30px] h-[2px] bg-current transition-transform duration-300 ${
                isExpanded ? '-translate-y-[4px] -rotate-45' : ''
              }`}
            />
          </div>

          {/* Logo */}
          <div className="logo-container flex items-center justify-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
            <img
              src={logo}
              alt={logoAlt}
              className={`h-[28px] transition-all duration-500 ${
                theme === 'dark' ? 'invert brightness-200' : ''
              }`}
            />
          </div>

          {/* Right-side buttons */}
          <div className="flex items-center gap-4 pr-2 md:pr-3">
            <motion.button
              onClick={toggleTheme}
              className="rounded-full p-2 border transition-all duration-300 hover:scale-110"
              style={{
                backgroundColor: theme === 'light' ? '#f0f0f0' : '#333',
                color: theme === 'light' ? '#000' : '#fff',
                borderColor: theme === 'light' ? '#ccc' : '#555',
              }}
              aria-label="Toggle dark mode"
              layout
            >
              {theme === 'light' ? <FaMoon /> : <FaSun />}
            </motion.button>

            <SignedOut>
              <SignInButton mode="modal">
                <motion.button
                  className="hidden md:inline-flex border-0 rounded-lg px-4 py-2 font-medium cursor-pointer transition-all duration-300 relative group"
                  style={{
                    backgroundColor: theme === 'light' ? '#111' : '#fff',
                    color: theme === 'light' ? '#fff' : '#000',
                  }}
                  layout
                >
                  <span className="absolute inset-0 rounded-lg bg-[conic-gradient(from_0deg,#ff0080,#7928ca,#2af598,#ff0080)] opacity-0 group-hover:opacity-60 blur-[10px] transition-opacity duration-500"></span>
                  <span className="relative z-10">Log In</span>
                </motion.button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>

        {/* Animated Menu */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              key="menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="card-nav-content flex flex-col md:flex-row gap-2 p-2 overflow-hidden"
            >
              {items.map((item, idx) => (
                <motion.div
                  key={`${item.label}-${idx}`}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 30, opacity: 0 }}
                  transition={{
                    delay: 0.1 * idx,
                    type: 'spring',
                    stiffness: 80,
                    damping: 20,
                  }}
                  className="nav-card flex flex-col gap-2 p-[12px_16px] rounded-lg flex-1 min-h-[100px] hover:scale-[1.03] transition-transform duration-300"
                  style={{
                    backgroundColor: item.bgColor,
                    color: item.textColor,
                  }}
                >
                  <div className="text-[18px] md:text-[22px] font-semibold">{item.label}</div>
                  <motion.div
                    className="flex flex-col gap-[2px] mt-auto"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: { transition: { staggerChildren: 0.08 } },
                      hidden: {},
                    }}
                  >
                    {item.links.map((lnk, i) => (
                      <motion.a
                        key={`${lnk.label}-${i}`}
                        href={lnk.href}
                        aria-label={lnk.ariaLabel}
                        className="flex items-center gap-[6px] text-[15px] md:text-[16px] hover:opacity-75 transition-opacity cursor-pointer"
                        onClick={e => {
                          e.preventDefault(); // prevent default link navigation
                          setIsExpanded(false); // close menu
                          if (onLinkClick) onLinkClick(lnk.label); // trigger callback
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3, type: 'spring', stiffness: 80, damping: 20 }}
                      >
                        <GoArrowUpRight className="shrink-0" aria-hidden="true" />
                        {lnk.label}
                      </motion.a>
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </motion.div>
  );
};

export default CardNav;
