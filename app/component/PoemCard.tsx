'use client';

import React, { useState, memo } from "react";
import { motion } from "framer-motion";

interface Poem {
  id: number;
  title: string;
  content: string;
  likes: number;
  author: { name: string };
}

interface PoemCardProps {
  poem: Poem;
  liked: boolean;
  onLike: () => void;
  theme: 'light' | 'dark';
}

const PoemCard = memo(({ poem, liked, onLike, theme }: PoemCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const colors = {
    cardBg: theme === "light" ? "#fff" : "#222",
    text: theme === "light" ? "#111" : "#eee",
    border: theme === "light" ? "#ccc" : "#444",
  };

  const lines = poem.content.split("\n");
  const preview = lines.slice(0, 5).join("\n");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        backgroundColor: colors.cardBg,
        padding: "1rem",
        borderRadius: "12px",
        border: `1px solid ${colors.border}`,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: colors.text }}>{poem.title}</h2>
        <span style={{ color: "#888" }}>by {poem.author.name}</span>
      </div>
      <p style={{ whiteSpace: "pre-wrap", color: colors.text }}>
        {expanded ? poem.content : preview}
      </p>
      {lines.length > 5 && (
        <button
          onClick={() => setExpanded(!expanded)}
          style={{ background: "transparent", border: "none", color: "#f87171", cursor: "pointer" }}
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      )}
      <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
        <button
          onClick={onLike}
          style={{ background: "transparent", border: "none", cursor: "pointer", color: liked ? "#f87171" : colors.text }}
        >
          {liked ? "❤️" : "🤍"}
        </button>
        <span style={{ color: colors.text }}>{poem.likes} likes</span>
      </div>
    </motion.div>
  );
});

export default PoemCard;
