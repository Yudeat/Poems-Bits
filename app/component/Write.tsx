'use client';

import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import { motion } from "framer-motion";

interface WriteProps {
  theme: 'light' | 'dark';
}

const Write = ({ theme }: WriteProps) => {
  const { isSignedIn } = useUser();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!isSignedIn) return alert("You must be signed in to submit a poem!");
    if (!title || !text) return alert("Title and content are required!");

    setLoading(true);
    try {
      const res = await fetch("/api/poem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content: text, published: true }),
      });
      const data = await res.json();
      if (!res.ok) alert(data.error || "Failed to save poem");
      else {
        alert("Poem saved successfully!");
        setTitle("");
        setText("");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Inline theme styles
  const colors = {
    mainBg: theme === 'light' ? '#fefefe' : '#1a1a1a',
    inputBg: theme === 'light' ? '#fff' : '#222',
    textColor: theme === 'light' ? '#111' : '#eee',
    borderColor: theme === 'light' ? '#ccc' : '#444',
    btnBg: theme === 'light' ? '#111' : '#fff',
    btnText: theme === 'light' ? '#fff' : '#000',
    previewBg: theme === 'light' ? '#fff' : '#222',
    toolbarBg: theme === 'light' ? '#fff' : '#222',
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%', backgroundColor: colors.mainBg }}>
      {/* Sidebar */}
      <nav style={{ width: '80px', borderRight: `2px solid ${colors.borderColor}`, padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#f87171' }}>
        <img src="/logo.png" alt="logo" style={{ marginBottom: '1rem' }} />
        <span style={{ borderTop: `2px solid ${colors.borderColor}`, width: '100%', marginTop: '1rem' }} />
      </nav>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '1rem', overflow: 'auto', position: 'relative' }}>
        {/* Toolbar */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{
            position: 'absolute',
            top: '1rem',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: colors.toolbarBg,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            borderRadius: '12px',
            padding: '0.5rem',
            display: 'flex',
            gap: '0.5rem',
            border: `1px solid ${colors.borderColor}`,
            zIndex: 20,
          }}
        >
          <button onClick={() => setIsBold(!isBold)} style={{ padding: '0.25rem 0.75rem', borderRadius: '6px', border: `1px solid ${colors.borderColor}`, fontWeight: 'bold', background: 'transparent', color: colors.textColor }}>B</button>
          <button onClick={() => setIsItalic(!isItalic)} style={{ padding: '0.25rem 0.75rem', borderRadius: '6px', border: `1px solid ${colors.borderColor}`, fontStyle: 'italic', background: 'transparent', color: colors.textColor }}>I</button>
          <button onClick={() => setIsUnderline(!isUnderline)} style={{ padding: '0.25rem 0.75rem', borderRadius: '6px', border: `1px solid ${colors.borderColor}`, textDecoration: 'underline', background: 'transparent', color: colors.textColor }}>U</button>
          <button onClick={() => setFontSize(fontSize + 2)} style={{ padding: '0.25rem 0.75rem', borderRadius: '6px', border: `1px solid ${colors.borderColor}`, background: 'transparent', color: colors.textColor }}>A+</button>
          <button onClick={() => setFontSize(fontSize > 10 ? fontSize - 2 : fontSize)} style={{ padding: '0.25rem 0.75rem', borderRadius: '6px', border: `1px solid ${colors.borderColor}`, background: 'transparent', color: colors.textColor }}>A-</button>
        </motion.div>

        {/* Title Input */}
        <input
          type="text"
          placeholder="Title of your poem"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            marginTop: '4rem',
            marginBottom: '0.5rem',
            borderRadius: '12px',
            border: `1px solid ${colors.borderColor}`,
            backgroundColor: colors.inputBg,
            color: colors.textColor,
            outline: 'none',
          }}
        />

        {/* Textarea */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write something..."
          style={{
            width: '100%',
            height: '160px',
            padding: '1rem',
            borderRadius: '12px',
            resize: 'none',
            border: `1px solid ${colors.borderColor}`,
            backgroundColor: colors.inputBg,
            color: colors.textColor,
            outline: 'none',
            fontWeight: isBold ? 700 : 400,
            fontStyle: isItalic ? 'italic' : 'normal',
            textDecoration: isUnderline ? 'underline' : 'none',
            fontSize,
          }}
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.75rem',
            marginTop: '1rem',
            borderRadius: '12px',
            fontWeight: '500',
            backgroundColor: colors.btnBg,
            color: colors.btnText,
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {loading ? "Saving..." : "Submit"}
        </button>

        {/* Live Preview */}
        <div
          style={{
            marginTop: '2rem',
            padding: '1rem',
            borderRadius: '12px',
            border: `1px solid ${colors.borderColor}`,
            backgroundColor: colors.previewBg,
            color: colors.textColor,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        >
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            {title || "Your Title Preview"}
          </h2>
          <p
            style={{
              fontWeight: isBold ? 700 : 400,
              fontStyle: isItalic ? 'italic' : 'normal',
              textDecoration: isUnderline ? 'underline' : 'none',
              fontSize,
              whiteSpace: 'pre-wrap',
            }}
          >
            {text || "Your poem preview will appear here..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Write;
