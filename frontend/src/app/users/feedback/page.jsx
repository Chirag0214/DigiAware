'use client';
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'http://localhost:5000/feedback';

const FeedbackForm = ({ onSuccess }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      let userId = '';
      if (token) {
        try {
          const decoded = jwtDecode(token);
          userId = decoded._id || decoded.id || '';
        } catch (err) {
          setError('Invalid user token. Please login again.');
          setLoading(false);
          return;
        }
      } else {
        setError('User not logged in. Please login to submit feedback.');
        setLoading(false);
        return;
      }
      const res = await fetch(`${API_URL}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, message, user: userId, userId })
      });
      if (!res.ok) throw new Error('Failed to submit feedback');
      setSuccess('Thank you for your feedback!');
      setSubject('');
      setMessage('');
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-[60vh] gap-10 bg-gradient-to-br from-blue-900 via-zinc-900 to-zinc-950 rounded-xl shadow-2xl p-8">
      <div className="flex-1 flex flex-col items-center justify-center">
        <img src="/feedback.jpeg" alt="Feedback" className="w-80 h-40 object-cover mb-4 rounded-lg shadow-lg hidden md:block" />
        <h2 className="text-3xl font-extrabold mb-2 text-blue-300 text-center drop-shadow">We Value Your Feedback</h2>
        <p className="text-zinc-300 text-center mb-6 max-w-md">Help us improve your experience! Share your thoughts, suggestions, or report any issues you faced while using our platform.</p>
      </div>
      <form onSubmit={handleSubmit} className="flex-1 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 space-y-6 w-full max-w-lg">
        <div>
          <label className="block font-bold text-blue-200 mb-1">Subject</label>
          <input
            type="text"
            className="w-full border-2 border-blue-400/30 rounded-lg px-4 py-2 text-zinc-900 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-zinc-400"
            value={subject}
            minLength={5}
            maxLength={100}
            required
            placeholder="Feedback subject..."
            onChange={e => setSubject(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-bold text-blue-200 mb-1">Message</label>
          <textarea
            className="w-full border-2 border-blue-400/30 rounded-lg px-4 py-2 text-zinc-900 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-zinc-400 min-h-[120px]"
            value={message}
            minLength={20}
            maxLength={500}
            required
            placeholder="Describe your feedback in detail..."
            onChange={e => setMessage(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3 rounded-lg font-bold text-lg shadow-lg hover:from-blue-700 hover:to-blue-500 transition"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Send Feedback'}
        </button>
        {success && <div className="text-green-500 text-center font-semibold animate-pulse">{success}</div>}
        {error && <div className="text-red-500 text-center font-semibold">{error}</div>}
      </form>
    </div>
  );
};

const FeedbackList = ({ refresh }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteMsg, setDeleteMsg] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(4);

  let userId = '';
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        userId = decoded._id || decoded.id || '';
      } catch {}
    }
  }

  const fetchFeedbacks = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/getall`);
      if (!res.ok) throw new Error('Failed to fetch feedbacks');
      const data = await res.json();
      setFeedbacks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
    // eslint-disable-next-line
  }, [refresh]);

  const totalPages = Math.ceil(feedbacks.length / pageSize);
  const paginatedFeedbacks = feedbacks.slice((page - 1) * pageSize, page * pageSize);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this feedback?')) return;
    try {
      const res = await fetch(`${API_URL}/delete/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete feedback');
      setDeleteMsg('Feedback deleted successfully!');
      setTimeout(() => setDeleteMsg(''), 2000);
      fetchFeedbacks();
    } catch (err) {
      setDeleteMsg('Error deleting feedback.');
      setTimeout(() => setDeleteMsg(''), 2000);
    }
  };

  if (loading) return <div className="text-center mt-10 text-blue-400 text-lg animate-pulse">Loading feedbacks...</div>;
  if (error) return <div className="text-red-600 text-center mt-10 text-lg">{error}</div>;
  if (!feedbacks.length) return <div className="text-center mt-10 text-zinc-400">No feedbacks found.</div>;

  return (
    <div className="max-w-4xl mx-auto mt-14 p-6 bg-gradient-to-br from-blue-950 via-zinc-900 to-zinc-950 rounded-2xl shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-blue-200 text-center tracking-wide">Your Previous Feedback</h2>
      {deleteMsg && <div className="text-green-400 font-semibold mb-2 text-center animate-pulse">{deleteMsg}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paginatedFeedbacks.map((f) => (
          <div key={f._id} className="bg-white/10 backdrop-blur rounded-xl shadow p-5 flex flex-col gap-2 border border-blue-400/20 hover:shadow-xl transition">
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              <span className="font-bold text-blue-300">{f.subject}</span>
            </div>
            <div className="text-zinc-100 mb-2">{f.message}</div>
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Created: {new Date(f.createdAt).toLocaleString()}</span>
              {f.user === userId && (
                <button
                  className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded text-xs font-semibold shadow-sm transition"
                  onClick={() => handleDelete(f._id)}
                >Delete</button>
              )}
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 gap-3">
          <button
            className="px-4 py-2 bg-blue-700 text-white rounded disabled:opacity-50 font-semibold"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >Prev</button>
          <span className="text-blue-200 px-3 text-base">Page {page} of {totalPages}</span>
          <button
            className="px-4 py-2 bg-blue-700 text-white rounded disabled:opacity-50 font-semibold"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >Next</button>
        </div>
      )}
    </div>
  );
};

const FeedbackPage = () => {
  const [refresh, setRefresh] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-zinc-950 to-zinc-900 pb-10">
      <FeedbackForm onSuccess={() => setRefresh(r => !r)} />
      {/* <FeedbackList refresh={refresh} /> */}
    </div>
  );
};

export default FeedbackPage;
