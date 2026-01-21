'use client';

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
// type for poem
interface Poem {
  id: number;
  title: string;
  content: string;
  likes: number;
  author: { name: string };
}

interface Comment {
  id: number;
  content: string;
  author: { name: string };
  createdAt: string;
}

interface ReadingProps {
  theme: 'light' | 'dark';
}

const Reading = ({ theme }: ReadingProps) => {
  const { isSignedIn } = useUser();
  const [poems, setPoems] = useState<Poem[]>([]);
  const [expandedPoems, setExpandedPoems] = useState<{ [id: number]: boolean }>({});
  const [likedPoems, setLikedPoems] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Publish form
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [loading, setLoading] = useState(false);

  // Comments state
  const [commentInputs, setCommentInputs] = useState<{ [poemId: number]: string }>({});
  const [comments, setComments] = useState<{ [poemId: number]: Comment[] }>({});
  const [showComments, setShowComments] = useState<{ [poemId: number]: boolean }>({});
  const [loadingComments, setLoadingComments] = useState<{ [poemId: number]: boolean }>({});

  const fetchPoems = async (pageNum = 1) => {
    try {
      const res = await fetch(`/api/poem?page=${pageNum}&limit=5&sort=createdAt`);
      const data = await res.json();
      if (!res.ok) {
        console.error(data.error);
        return;
      }
      setPoems(data.poems);
      setTotalPages(data.totalPages);
      setLikedPoems(data.likedPoems || []);
    } catch (err) {
      console.error("Error fetching poems:", err);
    }
  };

  useEffect(() => {
    fetchPoems(page);
  }, [page]);

  const toggleReadMore = (id: number) => {
    setExpandedPoems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleComments = async (poemId: number) => {
    // If comments are already shown, just hide
    if (showComments[poemId]) {
      setShowComments(prev => ({ ...prev, [poemId]: false }));
      return;
    }

    // If comments are already loaded, just show
    if (comments[poemId]) {
      setShowComments(prev => ({ ...prev, [poemId]: true }));
      return;
    }

    // Fetch comments
    setLoadingComments(prev => ({ ...prev, [poemId]: true }));
    try {
      const res = await fetch(`/api/poem/comments?poemId=${poemId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load comments");

      setComments(prev => ({ ...prev, [poemId]: data.comments }));
      setShowComments(prev => ({ ...prev, [poemId]: true }));
    } catch (err) {
      console.error(err);
      alert("Failed to load comments");
    } finally {
      setLoadingComments(prev => ({ ...prev, [poemId]: false }));
    }
  };
  // handle like

  const handleLike = async (poemId: number) => {
    try {
      const res = await fetch("/api/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ poemId }),
      });
      const data = await res.json();
      if (data.success) {
        setPoems(prev =>
          prev.map(p =>
            p.id === poemId ? { ...p, likes: data.likes } : p
          )
        );
        setLikedPoems(prev =>
          data.liked
            ? [...prev, poemId]
            : prev.filter(id => id !== poemId)
        );
      }
    } catch (err) {
      console.error("Error liking/unliking poem:", err);
    }
  };

  // handle publish
  const handlePublish = async () => {
    if (!isSignedIn) return alert("You must be signed in to publish!");
    if (!title || !text) return alert("Title and content required!");
    if (!name) return alert("Please enter your display name!");

    setLoading(true);
    try {
      const res = await fetch("/api/poem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content: text, name, published: true }),
      });
      const data = await res.json();
      if (!res.ok) alert(data.error || "Failed to publish poem");
      else {
        alert("Poem published successfully!");
        setTitle("");
        setText("");
        setName("");
        fetchPoems(page);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
// handle comment
  const handleComment = async (poemId: number) => {
    if (!isSignedIn) return alert("Sign in to comment!");
    const content = commentInputs[poemId];
    if (!content) return alert("Comment cannot be empty");

    try {
      const res = await fetch(`/api/poem/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ poemId, content }),
      });
      const data = await res.json();
      if (!res.ok) return alert(data.error || "Failed to post comment");

      setCommentInputs(prev => ({ ...prev, [poemId]: "" }));
      setComments(prev => ({
        ...prev,
        [poemId]: [...(prev[poemId] || []), data.comment]
      }));
      setShowComments(prev => ({ ...prev, [poemId]: true }));
    } catch (err) {
      console.error(err);
      alert("Failed to post comment");
    }
  };
  // colors

  const colors = {
    bg: theme === "light" ? "#fefefe" : "#1a1a1a",
    text: theme === "light" ? "#111" : "#eee",
    cardBg: theme === "light" ? "#fff" : "#222",
    border: theme === "light" ? "#ccc" : "#444",
    btnBg: theme === "light" ? "#111" : "#fff",
    btnText: theme === "light" ? "#fff" : "#000",
    inputBg: theme === "light" ? "#fff" : "#333",
  };

  return (
    <div style={{ backgroundColor: colors.bg, minHeight: "100vh", padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: colors.text, marginBottom: "1.5rem" }}>
        📖 Explore & Publish Poems
      </h1>

      {/* Publish Form */}
      {isSignedIn && (
        <div style={{ position: "sticky", top: 0, backgroundColor: colors.cardBg, padding: "1rem", border: `1px solid ${colors.border}`, borderRadius: "12px", marginBottom: "2rem", zIndex: 10 }}>
          <input
            type="text"
            placeholder="Your display name"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem", borderRadius: "8px", border: `1px solid ${colors.border}`, backgroundColor: colors.inputBg, color: colors.text }}
          />
          <input
            type="text"
            placeholder="Poem Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem", borderRadius: "8px", border: `1px solid ${colors.border}`, backgroundColor: colors.inputBg, color: colors.text }}
          />
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <button onClick={() => setIsBold(prev => !prev)} style={{ fontWeight: "bold" }}>B</button>
            <button onClick={() => setIsItalic(prev => !prev)} style={{ fontStyle: "italic" }}>I</button>
            <button onClick={() => setIsUnderline(prev => !prev)} style={{ textDecoration: "underline" }}>U</button>
            <button onClick={() => setFontSize(prev => prev + 2)}>A+</button>
            <button onClick={() => setFontSize(prev => Math.max(prev - 2, 10))}>A-</button>
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
              minHeight: "100px",
            }}
          />
          <button onClick={handlePublish} disabled={loading} style={{ marginTop: "0.5rem", padding: "0.5rem 1rem", borderRadius: "8px", backgroundColor: colors.btnBg, color: colors.btnText, border: "none" }}>
            {loading ? "Publishing..." : "Publish"}
          </button>
        </div>
      )}

      {/* Poems List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {poems.map(poem => {
          const lines = poem.content.split("\n");
          const isExpanded = expandedPoems[poem.id] || false;
          const preview = lines.slice(0, 5).join("\n");
          const commentsVisible = showComments[poem.id] || false;
          const poemComments = comments[poem.id] || [];

          return (
            <motion.div
              key={poem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{ backgroundColor: colors.cardBg, padding: "1rem", borderRadius: "12px", border: `1px solid ${colors.border}` }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: colors.text }}>{poem.title}</h2>
                <span style={{ color: "#888" }}>by {poem.author.name}</span>
              </div>
              <p style={{ whiteSpace: "pre-wrap", color: colors.text }}>
                {isExpanded ? poem.content : preview}
              </p>
              {lines.length > 5 && (
                <button
                  onClick={() => toggleReadMore(poem.id)}
                  style={{ background: "transparent", border: "none", color: "#f87171", cursor: "pointer" }}
                >
                  {isExpanded ? "Read less" : "Read more"}
                </button>
              )}
              <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
                <button
                  onClick={() => handleLike(poem.id)}
                  style={{ background: "transparent", border: "none", cursor: "pointer", color: likedPoems.includes(poem.id) ? "#f87171" : colors.text }}
                >
                  {likedPoems.includes(poem.id) ? "❤️" : "🤍"}
                </button>
                <span style={{ color: colors.text }}>{poem.likes} likes</span>
                <button
                  onClick={() => toggleComments(poem.id)}
                  style={{ background: "transparent", border: "none", color: "#3b82f6", cursor: "pointer" }}
                >
                  {commentsVisible ? "Hide Comments" : "Show Comments"}
                </button>
              </div>

              {/* Comments Section */}
              {commentsVisible && (
                <div style={{ marginTop: "1rem" }}>
                  {loadingComments[poem.id] ? (
                    <p style={{ color: colors.text }}>Loading comments...</p>
                  ) : (
                    <>
                      {poemComments.map(c => (
                        <div key={c.id} style={{ borderTop: `1px solid ${colors.border}`, padding: "0.5rem 0" }}>
                          <span style={{ fontWeight: 500 }}>{c.author.name}: </span>
                          <span>{c.content}</span>
                        </div>
                      ))}

                      {isSignedIn && (
                        <div style={{ display: "flex", marginTop: "0.5rem", gap: "0.5rem" }}>
                          <input
                            type="text"
                            placeholder="Add a comment..."
                            value={commentInputs[poem.id] || ""}
                            onChange={e => setCommentInputs(prev => ({ ...prev, [poem.id]: e.target.value }))}
                            style={{
                              flex: 1,
                              padding: "0.5rem",
                              borderRadius: "8px",
                              border: `1px solid ${colors.border}`,
                              backgroundColor: colors.inputBg,
                              color: colors.text
                            }}
                          />
                          <button
                            onClick={() => handleComment(poem.id)}
                            style={{ padding: "0.5rem 1rem", borderRadius: "8px", backgroundColor: colors.btnBg, color: colors.btnText, border: "none" }}
                          >
                            Post
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Pagination */}
      <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span style={{ color: colors.text }}>Page {page} / {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default Reading;
