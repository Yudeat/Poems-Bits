"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Poem {
  id: number;
  content: string;
  createdAt: string;
}

export default function BooksPage() {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // Load theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // Fetch poems
  useEffect(() => {
    const fetchPoems = async () => {
      try {
        const res = await fetch("/api/poem");
        if (!res.ok) throw new Error("Failed to fetch poems");

        const text = await res.text();
        const data: Poem[] = text ? JSON.parse(text) : [];
        setPoems(data);
      } catch (err) {
        console.error("Failed to fetch poems:", err);
        setPoems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPoems();
  }, []);

  return (
    <div
      className={`min-h-screen py-10 px-4 transition-colors ${
        theme === "light" ? "bg-white text-black" : "bg-[#0b0b0b] text-white"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-4xl font-bold mb-10 text-center"
        >
          Books
        </motion.h1>

        {loading ? (
          <p className="text-center text-gray-400">Loading poems...</p>
        ) : poems.length === 0 ? (
          <p className="text-center text-gray-400">No poems found.</p>
        ) : (
          <div className="grid gap-6">
            {poems.map((poem) => (
              <motion.div
                key={poem.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-6 rounded-xl border border-gray-700 bg-white/5 backdrop-blur-md break-words"
              >
                <p>{poem.content}</p>
                <p className="text-sm text-gray-400 mt-2">
                  {new Date(poem.createdAt).toLocaleString()}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
