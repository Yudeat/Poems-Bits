"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { FaBold, FaItalic, FaSave, FaSun, FaMoon } from "react-icons/fa";

// Dynamic imports to avoid SSR issues
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });
const Markdown = dynamic(
  () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
  { ssr: false }
);

export default function WritePage() {
  const [text, setText] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [saving, setSaving] = useState(false);

  // Load draft + theme from localStorage
  useEffect(() => {
    const savedText = localStorage.getItem("write_content");
    if (savedText) setText(savedText);

    const savedTags = localStorage.getItem("write_tags");
    if (savedTags) setTags(JSON.parse(savedTags));

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);
  }, []);

  // Auto-save draft locally every 500ms
  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem("write_content", text);
      localStorage.setItem("write_tags", JSON.stringify(tags));
    }, 500);
    return () => clearTimeout(timeout);
  }, [text, tags]);

  // Theme toggle
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Toolbar actions
  const applyBold = () => setText((prev) => prev + " **bold** ");
  const applyItalic = () => setText((prev) => prev + " *italic* ");

  // Add tag
  const addTag = () => {
    const trimmed = newTag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setNewTag("");
  };

  // Remove tag
  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  // Save to Prisma API
  const handleSave = async () => {
    if (!text.trim()) {
      alert("Content cannot be empty!");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/poem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text, tags }),
      });

      const data = await res.json();
      console.log("API response:", data);

      if (!res.ok) throw new Error(data.error || "Failed to save");

      alert("Saved to database!");
    } catch (err: any) {
      console.error("Save error:", err.message);
      alert("Failed to save: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className={`min-h-screen w-full py-10 px-4 transition-all ${
        theme === "light" ? "bg-white text-black" : "bg-[#0b0b0b] text-white"
      }`}
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Editor Panel */}
        <div className="flex-1">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-4xl font-bold mb-6 text-center"
          >
            Write
          </motion.h1>

          {/* Toolbar */}
          <div className="sticky top-4 z-10 flex flex-wrap items-center gap-2 mb-4 p-3 rounded-xl border border-gray-600 bg-black/20 dark:bg-black/30">
            <button
              onClick={applyBold}
              className="p-2 hover:bg-gray-600/40 rounded-lg"
              title="Bold"
            >
              <FaBold />
            </button>
            <button
              onClick={applyItalic}
              className="p-2 hover:bg-gray-600/40 rounded-lg"
              title="Italic"
            >
              <FaItalic />
            </button>
            <button
              onClick={handleSave}
              className="p-2 hover:bg-gray-600/40 rounded-lg flex items-center gap-2"
              disabled={saving}
            >
              <FaSave />
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={toggleTheme}
              className="ml-auto p-2 rounded-lg hover:bg-gray-600/40"
              title="Toggle Theme"
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>
          </div>

          {/* Tag Input */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <div
                key={tag}
                className="flex items-center gap-1 px-2 py-1 bg-gray-600/30 rounded-full cursor-pointer hover:bg-gray-500/50"
                onClick={() => removeTag(tag)}
                title="Click to remove"
              >
                {tag} ×
              </div>
            ))}
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTag()}
              placeholder="Add tag and press Enter"
              className="px-2 py-1 rounded-lg text-black dark:text-white bg-white/80 dark:bg-gray-700/70 focus:outline-none"
            />
            <button
              onClick={addTag}
              className="px-2 py-1 rounded-lg bg-green-600 hover:bg-green-500 text-white"
            >
              Add
            </button>
          </div>

          {/* Markdown Editor */}
          <div data-color-mode={theme}>
            <MDEditor value={text} onChange={(v) => setText(v || "")} height={500} />
          </div>
        </div>

        {/* Preview Panel */}
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-xl border border-gray-700 bg-white/5 backdrop-blur-md min-h-[500px] overflow-auto"
            data-color-mode={theme}
          >
            <Markdown source={text} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
