"use client";

import { useEffect, useState, useRef, useCallback } from "react";

type Poem = {
  title: string;
  author: string;
  lines: string[];
};

export default function ReadingPage() {
  const [Read, setRead] = useState(false);
  const [userPoems, setUserPoems] = useState<Poem[]>([
  
  ]);

  const [fetchedPoems, setFetchedPoems] = useState<Poem[]>([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchPoems = async (query = "") => {
    setLoading(true);
    try {
      let url = "";
      if (query.trim()) {
        url = `https://poetrydb.org/title/${encodeURIComponent(query)}`;
      } else {
        url = "https://poetrydb.org/random/50";
      }
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch poems");
      const data = await res.json();
      setFetchedPoems(data);
      setVisibleCount(5); // show initial batch
    } catch (err) {
      console.error(err);
      setFetchedPoems([]);
    } finally {
      setLoading(false);
    }
  };

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      // Near bottom, show more
      setVisibleCount((prev) => Math.min(prev + 5, fetchedPoems.length));
    }
  }, [fetchedPoems.length]);

  useEffect(() => {
    if (Read && containerRef.current) {
      const div = containerRef.current;
      div.addEventListener("scroll", handleScroll);
      return () => div.removeEventListener("scroll", handleScroll);
    }
  }, [Read, handleScroll]);

  return (
    <div className="    flex flex-col">
   <button
  onClick={() => setRead(!Read)}
  className="px-4 py-1.5 rounded-lg font-medium transition-all duration-300 
  bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow
  hover:shadow-md hover:scale-[1.04] active:scale-[0.97] mb-4 w-fit"
>
  {Read ? "Hide" : "Read"}
</button>


      {Read && (
        <div
          ref={containerRef}
          className="flex-1 overflow-auto space-y-6"
          style={{ maxHeight: "calc(100vh - 100px)" }}
        >
          {/* User Poems */}
          <section>
            <h2 className="text-xl font-bold mb-2">Your Poems</h2>
            {userPoems.map((poem, idx) => (
              <div key={idx} className="mb-4 p-4 border rounded shadow-sm">
                <h3 className="font-semibold">{poem.title}</h3>
                <p className="text-sm text-gray-500 mb-2">by {poem.author}</p>
                {poem.lines.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            ))}
          </section>

          {/* Fetched Poems */}
          <section>
            <div className="flex items-center mb-4 space-x-2">
              <h2 className="text-xl font-bold">Poems</h2>
              <input
                type="text"
                placeholder="Search title..."
                className="border px-2 py-1 rounded"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="px-3 py-1 bg-green-600 text-white rounded"
                onClick={() => fetchPoems(searchQuery)}
              >
                Search
              </button>
              <button
                className="px-3 py-1 bg-gray-600 text-white rounded"
                onClick={() => fetchPoems()}
              >
                Refresh
              </button>
            </div>

            {loading && <p>Loading poems...</p>}

            {fetchedPoems.slice(0, visibleCount).map((poem, idx) => (
              <div key={idx} className="mb-4 p-4 border rounded shadow-sm">
                <h3 className="font-semibold">{poem.title}</h3>
                <p className="text-sm text-gray-500 mb-2">by {poem.author}</p>
                {poem.lines.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            ))}

            {visibleCount < fetchedPoems.length && !loading && (
              <p className="text-center text-gray-500">Scroll down to load more...</p>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
