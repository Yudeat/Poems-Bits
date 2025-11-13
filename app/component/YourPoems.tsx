'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';

interface Poem {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export default function MyPoems() {
  const { isSignedIn } = useUser();
  const [poems, setPoems] = useState<Poem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPoems = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/poem?mine=true'); // Use your API with query param to fetch only user's poems
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch poems');
      setPoems(data.poems);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this poem?')) return;
    try {
      const res = await fetch(`/api/poem?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete');
      setPoems((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  useEffect(() => {
    if (isSignedIn) fetchPoems();
  }, [isSignedIn]);

  if (!isSignedIn) return <p className="p-6 text-center">Please log in to see your poems.</p>;
  if (loading) return <p className="p-6 text-center">Loading your poems...</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;
  if (!poems.length) return <p className="p-6 text-center">You have not written any poems yet.</p>;

  return (
    <div className="p-6 space-y-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Poems</h2>
      <AnimatePresence>
        {poems.map((poem) => (
          <motion.div
            key={poem.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow flex flex-col gap-2"
          >
            <h3 className="font-semibold text-lg">{poem.title}</h3>
            <p className="text-gray-700 dark:text-gray-200 italic">{poem.content}</p>
            <div className="flex justify-between items-center text-sm mt-2">
              <span className="text-gray-500">{new Date(poem.createdAt).toLocaleDateString()}</span>
              <button
                onClick={() => handleDelete(poem.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
