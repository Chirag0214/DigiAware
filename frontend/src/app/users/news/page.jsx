'use client';
import React, { useEffect, useState } from 'react';
import { getAllNews } from '@/utils/newsApi';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllNews()
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch news');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className='p-8 text-center'>Loading news...</div>;
  if (error) return <div className='p-8 text-center text-red-500'>{error}</div>;

  return (
    <div className='p-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      {news.length === 0 ? (
        <div className='col-span-full text-center text-gray-500'>No news found.</div>
      ) : (
        news.map((item) => (
          <div key={item._id} className='bg-white rounded-lg shadow p-4 flex flex-col'>
            {item.image && (
              <img src={item.image} alt={item.title} className='w-full h-40 object-cover rounded mb-2' />
            )}
            <h2 className='text-xl text-black font-bold mb-2'>{item.title}</h2>
            <p className='text-gray-700 mb-2'>{item.content}</p>
            <span className='text-xs text-gray-400 mt-auto'>
              {item.createdAt ? new Date(item.createdAt).toLocaleString() : ''}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default News;