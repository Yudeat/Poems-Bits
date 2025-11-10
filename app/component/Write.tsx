"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

interface Props {
  theme: "light" | "dark";
}

export default function WritingStudioButton({ theme }: Props) {
  const [open, setOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState("");
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const aiPromptRef = useRef<HTMLTextAreaElement>(null);

  const saveText = () => {
    const content = textareaRef.current?.value || "";
    localStorage.setItem("writingStudioContent", content);
    alert("Saved!");
  };

  const runAI = async (prompt: string) => {
    const writing = textareaRef.current?.value || "";

    setAiLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ writing, request: prompt }),
      });

      const data = await res.json();
      setAiResult(data.reply);
    } catch (err) {
      console.error(err);
      alert("AI failed");
    }

    setAiLoading(false);
  };

  const insertAIText = () => {
    if (!textareaRef.current) return;
    textareaRef.current.value += "\n\n" + aiResult;
  };

  return (
    <>
      <motion.button
        className=" md:inline-flex border-0 rounded-lg px-4 py-2 font-medium cursor-pointer transition-all duration-300 relative group"
        style={{
          backgroundColor: theme === "light" ? "#111" : "#fff",
          color: theme === "light" ? "#fff" : "#000",
        }}
        onClick={() => setOpen(true)}
      >
        <span className="absolute inset-0 rounded-lg bg-[conic-gradient(from_0deg,#ff0080,#7928ca,#2af598,#ff0080)]
         opacity-0 group-hover:opacity-60 blur-[10px] transition-opacity duration-500"></span>
        <span className="relative z-10">Writing Studio</span>
      </motion.button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="relative w-full max-w-6xl h-full md:h-[90%] bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg p-6 overflow-auto">

            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              Close
            </button>

            <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              Writing Studio
            </h1>

            <textarea
              ref={textareaRef}
              defaultValue={localStorage.getItem("writingStudioContent") || ""}
              className="w-full h-[65vh] p-4 border border-gray-300 dark:border-gray-600 rounded resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Start writing your poem..."
            />

            <div className="mt-4 flex gap-2">
              <button onClick={saveText} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Save
              </button>
              <button
                onClick={() => (textareaRef.current!.value = "")}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Clear
              </button>
              <button onClick={() => setAiOpen(true)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                AI Tools
              </button>
            </div>

            {aiOpen && (
              <div className="mt-6 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800">
                <div className="flex justify-between">
                  <h2 className="text-lg font-semibold">AI Writing Assistant</h2>
                  <button onClick={() => setAiOpen(false)} className="text-red-500 font-bold">
                    ✕
                  </button>
                </div>

                {/* AI TEXTBOX */}
                <textarea
                  ref={aiPromptRef}
                  className="mt-2 w-full h-24 p-3 rounded border bg-white dark:bg-gray-900 dark:text-gray-100"
                  placeholder="Ask anything: 'Continue my poem', 'fix grammar', 'improve tone'..."
                />

                <button
                  onClick={() => runAI(aiPromptRef.current?.value || "")}
                  className="mt-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  {aiLoading ? "Thinking..." : "Generate"}
                </button>

                {/* AI PRESETS */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
                  <button onClick={() => runAI("Make this more emotional")} className="ai-btn">💗 Emotional</button>
                  <button onClick={() => runAI("Rewrite this in a more poetic style")} className="ai-btn">🌙 Poetic</button>
                  <button onClick={() => runAI("Rewrite in Shakespearean style")} className="ai-btn">📜 Shakespeare</button>
                  <button onClick={() => runAI("Fix grammar and flow")} className="ai-btn">🧹 Grammar</button>
                  <button onClick={() => runAI("Continue the poem for 4 lines")} className="ai-btn">✨ Autocomplete</button>
                  <button onClick={() => runAI("Generate a beautiful title for this writing")} className="ai-btn">🏷 Title</button>
                  <button onClick={() => runAI("Explain the meaning and theme of this poem")} className="ai-btn">📘 Explain</button>
                  <button onClick={() => runAI("Give a score and improvements for this poem")} className="ai-btn">📊 Score</button>
                </div>

                {/* AI RESULT */}
                {aiResult && (
                  <div className="mt-4 p-3 bg-white dark:bg-gray-700 rounded border">
                    <h3 className="font-semibold mb-1">AI Result:</h3>
                    <p className="whitespace-pre-line">{aiResult}</p>
                    <button
                      onClick={insertAIText}
                      className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Insert Into Writing
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
