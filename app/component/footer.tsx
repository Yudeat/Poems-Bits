
"use client";

import React from "react";

interface FooterProps {
  theme: "light" | "dark";
}

export default function Footer({ theme }: FooterProps) {
  const isLight = theme === "light";

  return (
    <footer
      className={`
        relative w-full overflow-hidden py-20 px-6
        ${isLight ? "bg-white/25 text-black" : "bg-gray-900/35 text-white border border-white/20"}
        backdrop-blur-lg
      `}
    >
      
      <div className="absolute top-0 left-0 w-[250px] h-[250px] bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-900/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-semibold mb-3">About Us</h3>
          <p className="text-sm opacity-80 leading-relaxed">
       Poems Bits is a curated collection of original poems, essays, and creative experiments 
      designed to inspire, provoke, and connect.
          </p>
          <div className="flex gap-3 mt-4">
            {["⧉", "✦", "⌘", "∞"].map((icon, idx) => (
              <div
                key={idx}
                className={`
                  w-10 h-10 rounded-xl flex items-center justify-center transition
                  ${isLight ? "bg-black/10 hover:bg-blue-600/40" : "bg-white/10 hover:bg-blue-600/40"}
                `}
              >
                {icon}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Navigation</h3>
          <ul className="space-y-2 text-sm opacity-80">
            {["Home", "Services", "Projects", "Blog", "Contact"].map((item, idx) => (
              <li
                key={idx}
                className="hover:opacity-100 hover:translate-x-1 transition cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-sm opacity-80">
            {["Docs", "API", "Community", "Partners"].map((item, idx) => (
              <li
                key={idx}
                className="hover:opacity-100 hover:translate-x-1 transition cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        
      </div>

      <p className="relative z-10 text-center text-sm opacity-60 mt-14">
        © Copyright 2025  — All Rights Reserved by Poems Bits.
      </p>
    </footer>
  );
}
