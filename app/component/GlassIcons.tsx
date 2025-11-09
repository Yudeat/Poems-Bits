"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaBook, FaPen } from "react-icons/fa";

interface GlassIconsItem {
  icon: React.ReactElement;
  color: string;
  label: string;
  href?: string;
  count?: number;
  customClass?: string;
}

interface GlassIconsProps {
  className?: string;
}

const gradientMapping: Record<string, string> = {
  blue: "linear-gradient(hsl(223, 90%, 50%), hsl(208, 90%, 50%))",
  purple: "linear-gradient(hsl(283, 90%, 50%), hsl(268, 90%, 50%))",
  red: "linear-gradient(hsl(3, 90%, 50%), hsl(348, 90%, 50%))",
  indigo: "linear-gradient(hsl(253, 90%, 50%), hsl(238, 90%, 50%))",
  orange: "linear-gradient(hsl(43, 90%, 50%), hsl(28, 90%, 50%))",
  green: "linear-gradient(hsl(123, 90%, 40%), hsl(108, 90%, 40%))",
};

const GlassIconsDashboard: React.FC<GlassIconsProps> = ({ className }) => {
  const router = useRouter();
  const [poemCount, setPoemCount] = useState<number>(0);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // Fetch poems safely
  useEffect(() => {
    const fetchPoems = async () => {
      try {
        const res = await fetch("/api/poem");
        if (!res.ok) throw new Error("Failed to fetch poems");

        const text = await res.text();
        const data = text ? JSON.parse(text) : [];
        setPoemCount(data.length);
      } catch (err) {
        console.error("Failed to fetch poems:", err);
        setPoemCount(0);
      }
    };
    fetchPoems();
  }, []);

  const items: GlassIconsItem[] = [
    { icon: <FaPen />, color: "blue", label: "Notes", href: "/write" },
    { icon: <FaBook />, color: "green", label: "Books", href: "/books", count: poemCount },
  ];

  const getBackgroundStyle = (color: string): React.CSSProperties => {
    if (gradientMapping[color]) return { background: gradientMapping[color] };
    return { background: color };
  };

  const handleClick = (item: GlassIconsItem) => {
    if (item.href) router.push(item.href);
  };

  return (
    <div
      className={`min-h-screen transition-colors ${
        theme === "light" ? "bg-white text-black" : "bg-[#0b0b0b] text-white"
      } ${className || ""}`}
    >
      <div className="grid gap-[5em] grid-cols-2 md:grid-cols-3 mx-auto py-[3em] overflow-visible">
        {items.map((item, index) => (
          <button
            key={index}
            type="button"
            aria-label={item.label}
            onClick={() => handleClick(item)}
            className="relative bg-transparent outline-none w-[4.5em] h-[4.5em] [perspective:24em] [transform-style:preserve-3d] group hover:scale-105 transition-transform"
          >
            <span
              className="absolute top-0 left-0 w-full h-full rounded-[1.25em] block transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[100%_100%] rotate-[15deg] group-hover:[transform:rotate(25deg)_translate3d(-0.5em,-0.5em,0.5em)]"
              style={{
                ...getBackgroundStyle(item.color),
                boxShadow: "0.5em -0.5em 0.75em hsla(223, 10%, 10%, 0.15)",
              }}
            ></span>

            <span
              className="absolute top-0 left-0 w-full h-full rounded-[1.25em] bg-[hsla(0,0%,100%,0.15)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[80%_50%] flex backdrop-blur-[0.75em] [-webkit-backdrop-filter:blur(0.75em)] transform group-hover:[transform:translateZ(2em)]"
              style={{ boxShadow: "0 0 0 0.1em hsla(0,0%,100%,0.3) inset" }}
            >
              <span className="m-auto w-[1.5em] h-[1.5em] flex items-center justify-center">
                {item.icon}
              </span>
            </span>

            <span className="absolute top-full left-0 right-0 text-center whitespace-nowrap leading-[2] text-base opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] translate-y-0 group-hover:opacity-100 group-hover:[transform:translateY(20%)]">
              {item.label}
              {item.count !== undefined && (
                <span className="ml-1 text-sm text-gray-300">({item.count})</span>
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GlassIconsDashboard;
