"use client";
import React, { useEffect, useState } from "react";
import { getArticleById } from "@/utils/articleApi";
import { useParams } from "next/navigation";

const ViewArticle = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("No article ID provided.");
      setLoading(false);
      return;
    }
    getArticleById(id)
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch article");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading article...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!article) return null;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">{article.title}</h1>
      <div className="bg-white rounded-lg shadow p-6">
        {article.image && (
          <img src={article.image} alt={article.title} className="w-full h-64 object-cover rounded mb-4" />
        )}
        <p className="text-gray-800 mb-4 whitespace-pre-line">{article.content}</p>
        <span className="text-xs text-gray-500 block text-right">
          {article.createdAt ? new Date(article.createdAt).toLocaleString() : ""}
        </span>
      </div>
    </div>
  );
};

export default ViewArticle;
