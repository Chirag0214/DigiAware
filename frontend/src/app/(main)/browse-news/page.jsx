'use client';
import React, { useEffect, useState } from 'react';

const ViewNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Change the URL below to match your backend server address and port
        const res = await fetch('http://localhost:5000/news/getall');
        if (!res.ok) throw new Error('Failed to fetch news');
        const data = await res.json();
        setNews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading news...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Latest News</h1>
      {news.length === 0 ? (
        <div className="text-center text-gray-500">No news available.</div>
      ) : (
        <ul className="space-y-6">
          {news.map((item) => (
            <li key={item._id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="mb-2 max-h-60 w-full object-cover rounded"
                />
              )}
              <p className="text-gray-700 mb-2">{item.content}</p>
              <div className="text-sm text-gray-400">{new Date(item.createdAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewNews;
