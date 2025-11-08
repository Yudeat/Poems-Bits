'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Poem {
  id: string;
  content: string;
  tags: string[];
  createdAt: string;
}

export default function PoemPage() {
  const { id } = useParams();
  const [poem, setPoem] = useState<Poem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchPoem = async () => {
      try {
        const res = await fetch(`/api/poems/${id}`);
        const data = await res.json();
        setPoem(data);
      } catch (err) {
        console.error("Failed to fetch poem:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPoem();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!poem) return <p className="text-center mt-10 text-red-500">Poem not found.</p>;

  return (
    <div className="min-h-screen flex flex-col justify-start items-center py-10 px-4 bg-[#faf6f0]">
      <h1 className="text-3xl font-bold mb-6 text-center font-serif">Your Poem</h1>

      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <p className="whitespace-pre-line text-lg font-serif">{poem.content}</p>

        {poem.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {poem.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <p className="text-right text-sm text-gray-500 mt-4">
          Created at: {new Date(poem.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
