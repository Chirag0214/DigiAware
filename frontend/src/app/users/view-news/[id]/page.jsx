"use client";
import React, { useEffect, useState } from "react";
import { getNewsById } from "@/utils/newsApi";
import { useParams } from "next/navigation";

const ViewNews = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("No news ID provided.");
      setLoading(false);
      return;
    }
    getNewsById(id)
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch news");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading news...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!news) return null;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">{news.title}</h1>
      <div className="bg-white rounded-lg shadow p-6">
        {news.image && (
          <img src={news.image} alt={news.title} className="w-full h-64 object-cover rounded mb-4" />
        )}
        <p className="text-gray-800 mb-4 whitespace-pre-line">{news.content}</p>
        <span className="text-xs text-gray-500 block text-right">
          {news.createdAt ? new Date(news.createdAt).toLocaleString() : ""}
        </span>
      </div>
    </div>
  );
};

export default ViewNews;
