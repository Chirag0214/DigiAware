'use client';
import React, { useEffect, useState } from 'react';
import { getAllArticles } from '@/utils/articleApi';
import Link from 'next/link';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllArticles()
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch articles');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className='p-8 text-center'>Loading articles...</div>;
  if (error) return <div className='p-8 text-center text-red-500'>{error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">Latest Articles</h1>
      <div className='p-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {articles.length === 0 ? (
          <div className='col-span-full text-center text-gray-500'>No articles found.</div>
        ) : (
          articles.map((item) => (
            <Link key={item._id} href={`/users/view-articles/${item._id}`} className='bg-white rounded-lg shadow p-4 flex flex-col hover:shadow-lg transition-shadow'>
              {item.image && (
                <img src={item.image} alt={item.title} className='w-full h-40 object-cover rounded mb-2' />
              )}
              <h2 className='text-xl text-black font-bold mb-2'>{item.title}</h2>
              <p className='text-gray-700 mb-2 break-words line-clamp-4'>{item.content}</p>
              <span className='text-xs text-gray-400 mt-auto'>
                {item.createdAt ? new Date(item.createdAt).toLocaleString() : ''}
              </span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Articles;
