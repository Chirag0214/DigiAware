'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [stats, setStats] = useState([
    { label: 'Users', count: 0, link: '/admin/manage-user' },
    { label: 'Experts', count: 0, link: '/admin/manage-expert' },
    { label: 'News', count: 0, link: '/admin/manage-news' },
    { label: 'Articles', count: 0, link: '/expert/manage-article' },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await axios.get('http://localhost:5000/admin/stats');
        const data = res.data;
        setStats([
          { label: 'Users', count: data.users, link: '/admin/manage-user' },
          { label: 'Experts', count: data.experts, link: '/admin/manage-expert' },
          { label: 'News', count: data.news, link: '/admin/manage-news' },
          { label: 'Articles', count: data.articles, link: '/expert/manage-article' },
        ]);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-800">Admin Dashboard</h1>
      {loading ? (
        <div className="text-center text-gray-600">Loading stats...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat) => (
            <Link key={stat.label} href={stat.link}>
              <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl transition cursor-pointer">
                <div className="text-4xl font-extrabold text-blue-600 mb-2">{stat.count}</div>
                <div className="text-lg font-semibold text-gray-700">{stat.label}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link href="/admin/manage-news">
          <div className="bg-blue-100 p-6 rounded-lg shadow hover:bg-blue-200 transition cursor-pointer">
            <h2 className="text-xl font-bold text-blue-800 mb-2">Manage News</h2>
            <p className="text-gray-700">Add, update, or delete news articles.</p>
          </div>
        </Link>
        <Link href="/admin/manage-user">
          <div className="bg-green-100 p-6 rounded-lg shadow hover:bg-green-200 transition cursor-pointer">
            <h2 className="text-xl font-bold text-green-800 mb-2">Manage Users</h2>
            <p className="text-gray-700">View, edit, or remove users from the platform.</p>
          </div>
        </Link>
        <Link href="/admin/manage-expert">
          <div className="bg-yellow-100 p-6 rounded-lg shadow hover:bg-yellow-200 transition cursor-pointer">
            <h2 className="text-xl font-bold text-yellow-800 mb-2">Manage Experts</h2>
            <p className="text-gray-700">Approve, view, or remove expert accounts.</p>
          </div>
        </Link>
        <Link href="/admin/add-news">
          <div className="bg-purple-100 p-6 rounded-lg shadow hover:bg-purple-200 transition cursor-pointer">
            <h2 className="text-xl font-bold text-purple-800 mb-2">Add News</h2>
            <p className="text-gray-700">Quickly add a new news article.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
