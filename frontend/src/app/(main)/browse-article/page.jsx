'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const ViewArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Change the URL below to match your backend server address and port
        const res = await fetch('http://localhost:5000/article/getall');
        if (!res.ok) throw new Error('Failed to fetch articles');
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading articles...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-black/70 rounded-xl shadow-lg mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-400">Latest Articles</h1>
      {articles.length === 0 ? (
        <div className="text-center text-gray-400">No articles available.</div>
      ) : (
        <ul className="space-y-6">
          {articles.map((item) => (
            <li key={item._id} className="border border-gray-700 rounded-lg p-4 shadow hover:shadow-2xl transition bg-neutral-900/80 hover:bg-neutral-800/90">
              <Link href={`/users/view-articles/${item._id}`} className="block hover:underline">
                <h2 className="text-xl font-semibold mb-2 text-white">{item.title}</h2>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="mb-2 max-h-60 w-full object-cover rounded"
                  />
                )}
                <p className="text-gray-300 mb-2 break-words line-clamp-4">{item.content}</p>
                <div className="text-sm text-gray-500">{new Date(item.createdAt).toLocaleString()}</div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewArticles;
