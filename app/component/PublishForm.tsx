'use client';

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";

interface PublishFormProps {
  colors: any;
  page: number;
  mutate: () => void;
}

const PublishForm = ({ colors, page, mutate }: PublishFormProps) => {
  const { isSignedIn } = useUser();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [loading, setLoading] = useState(false);

  const handlePublish = async () => {
    if (!isSignedIn) return alert("You must be signed in!");
    if (!title || !text || !name) return alert("All fields required!");
    setLoading(true);

    try {
      const res = await fetch("/api/poem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content: text, name, published: true }),
      });
      if (res.ok) {
        alert("Poem published successfully!");
        setTitle("");
        setText("");
        setName("");
        mutate(); // refresh poems
      } else {
        alert("Failed to publish poem!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: "sticky",
      top: 0,
      backgroundColor: colors.cardBg,
      padding: "1rem",
      border: `1px solid ${colors.border}`,
      borderRadius: "12px",
      marginBottom: "2rem",
      zIndex: 10
    }}>
      <input
        type="text"
        placeholder="Your display name"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{
          width: "100%",
          marginBottom: "0.5rem",
          padding: "0.5rem",
          borderRadius: "8px",
          border: `1px solid ${colors.border}`,
          backgroundColor: colors.inputBg,
          color: colors.text
        }}
      />
      <input
        type="text"
        placeholder="Poem Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{
          width: "100%",
          marginBottom: "0.5rem",
          padding: "0.5rem",
          borderRadius: "8px",
          border: `1px solid ${colors.border}`,
          backgroundColor: colors.inputBg,
          color: colors.text
        }}
      />
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
        <button onClick={() => setIsBold(p => !p)} style={{ fontWeight: "bold" }}>B</button>
        <button onClick={() => setIsItalic(p => !p)} style={{ fontStyle: "italic" }}>I</button>
        <button onClick={() => setIsUnderline(p => !p)} style={{ textDecoration: "underline" }}>U</button>
        <button onClick={() => setFontSize(s => s + 2)}>A+</button>
        <button onClick={() => setFontSize(s => Math.max(s - 2, 10))}>A-</button>
      </div>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Write your poem..."
        style={{
          width: "100%",
          padding: "0.5rem",
          borderRadius: "8px",
          border: `1px solid ${colors.border}`,
          backgroundColor: colors.inputBg,
          color: colors.text,
          fontWeight: isBold ? 700 : 400,
          fontStyle: isItalic ? "italic" : "normal",
          textDecoration: isUnderline ? "underline" : "none",
          fontSize,
          minHeight: "100px"
        }}
      />
      <button
        onClick={handlePublish}
        disabled={loading}
        style={{
          marginTop: "0.5rem",
          padding: "0.5rem 1rem",
          borderRadius: "8px",
          backgroundColor: colors.btnBg,
          color: colors.btnText,
          border: "none",
          cursor: "pointer"
        }}
      >
        {loading ? "Publishing..." : "Publish"}
      </button>
    </div>
  );
};

export default PublishForm;
