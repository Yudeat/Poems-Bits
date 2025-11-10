'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Poem {
  title: string;
  author: string;
  lines: string[];
}

export default function Poems() {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null);

  useEffect(() => {
    const fetchPoems = async () => {
      try {
        const res = await fetch('https://poetrydb.org/random/5');
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        setPoems(data);
      } catch (err: any) {
        console.error('Fetch error:', err);
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchPoems();
  }, []);

  if (loading) return <p className="p-6 text-center">Loading poems...</p>;
  if (error) return <p className="p-6 text-center text-red-500">Error: {error}</p>;
  if (!poems.length) return <p className="p-6 text-center">No poems found.</p>;

  return (
    <div className="p-6 mt-10">
      <h1 className="text-xl font-bold mb-3 ml-2">Top Poems</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {poems.map((poem, idx) => (
          <div
            key={idx}
            className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-1 text-gray-900 dark:text-gray-100">
              {poem.title}
            </h2>
            <p className="text-sm text-gray-500 mb-2">{poem.author}</p>
            <p className="text-gray-700 dark:text-gray-200 italic mb-3">
              {poem.lines.slice(0, 3).join(' ')}...
            </p>
            <button
              onClick={() => setSelectedPoem(poem)}
              className="text-blue-500 dark:text-blue-400 font-semibold hover:underline text-sm"
            >
              Read More
            </button>
          </div>
        ))}
      </div>

      {/* Animated Modal */}
      <AnimatePresence>
        {selectedPoem && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl max-w-md w-full relative shadow-lg flex flex-col"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setSelectedPoem(null)}
                className="absolute top-3 right-3 text-gray-500 dark:text-gray-300 text-xl font-bold"
              >
                ×
              </button>
              <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                {selectedPoem.title}
              </h2>
              <p className="text-sm text-gray-500 mb-4">{selectedPoem.author}</p>

              {/* Scrollable content */}
              <div className="overflow-y-auto max-h-80 space-y-2 text-gray-700 dark:text-gray-200">
                {selectedPoem.lines.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
