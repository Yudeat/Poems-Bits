"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoArrowUpRight } from "react-icons/go";

type CardNavLink = {
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
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
}

const CardNav: React.FC<CardNavProps> = ({
  logo,
  logoAlt = "Logo",
  items,
  className = "",
  baseColor = "#fff",
  menuColor = "#000",
  buttonBgColor = "#1a73e8",
  buttonTextColor = "#fff",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);

 
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`card-nav-container absolute left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] z-[99] top-[1.2em] md:top-[2em] ${className}`}
    >
      <nav
        ref={navRef}
        className={`card-nav block p-0 rounded-xl shadow-md relative overflow-hidden`}
        style={{ backgroundColor: baseColor }}
      >
       
        <div className="card-nav-top relative z-[2] h-[60px] flex items-center justify-between p-2 pl-[1.1rem]">
         
          <div
            onClick={() => setIsExpanded((prev) => !prev)}
            className="hamburger group flex flex-col gap-[6px] cursor-pointer "
            style={{ color: menuColor }}
          >
            <span
              className={`block w-[30px] h-[2px] bg-current transition-transform duration-300 ${
                isExpanded ? "translate-y-[4px] rotate-45" : ""
              }`}
            />
            <span
              className={`block w-[30px] h-[2px] bg-current transition-transform duration-300 ${
                isExpanded ? "-translate-y-[4px] -rotate-45" : ""
              }`}
            />
          </div>

          {/* Logo */}
          <div className="logo-container flex items-center justify-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
            <img src={logo} alt={logoAlt} className="h-[28px]" />
          </div>

          {/* CTA Button */}
          <button
            className="hidden md:inline-flex border-0 rounded-lg px-4 py-2 font-medium cursor-pointer transition-colors duration-300"
            style={{
              backgroundColor: buttonBgColor,
              color: buttonTextColor,
            }}
          >
            Log In 
          </button>
        </div>

        {/* 🔹 Animated menu */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              key="menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="card-nav-content flex flex-col md:flex-row gap-2 p-2 overflow-hidden"
            >
              {items.slice(0, 3).map((item, idx) => (
                <motion.div
                  key={`${item.label}-${idx}`}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 30, opacity: 0 }}
                  transition={{
                    delay: 0.1 * idx,
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                  className="nav-card flex flex-col gap-2 p-[12px_16px] rounded-lg flex-1 min-h-[100px]"
                  style={{
                    backgroundColor: item.bgColor,
                    color: item.textColor,
                  }}
                >
                  <div className="text-[18px] md:text-[22px] font-semibold">
                    {item.label}
                  </div>
                  <div className="flex flex-col gap-[2px] mt-auto">
                    {item.links.map((lnk, i) => (
                      <a
                        key={`${lnk.label}-${i}`}
                        href={lnk.href}
                        aria-label={lnk.ariaLabel}
                        className="flex items-center gap-[6px] text-[15px] md:text-[16px] hover:opacity-75 transition-opacity"
                      >
                        <GoArrowUpRight
                          className="shrink-0"
                          aria-hidden="true"
                        />
                        {lnk.label}
                      </a>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default CardNav;
