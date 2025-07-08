'use client';
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'http://localhost:5000/query'; // Adjust if needed

const QueryForm = ({ onSuccess }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState('medium');
  const [status, setStatus] = useState('pending');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      // Get userId from JWT token
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
        setError('User not logged in. Please login to submit a query.');
        setLoading(false);
        return;
      }
      const res = await fetch(`${API_URL}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, message, priority, status, user: userId, userId })
      });
      if (!res.ok) throw new Error('Failed to submit query');
      setSuccess('Query submitted successfully!');
      setSubject('');
      setMessage('');
      setPriority('medium');
      setStatus('pending');
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-zinc-900 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center text-zinc-100">Submit a Query</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold text-zinc-300">Subject</label>
          <input
            type="text"
            className="w-full border border-zinc-700 rounded px-3 py-2 text-zinc-100 bg-zinc-800 placeholder-zinc-400"
            value={subject}
            minLength={5}
            maxLength={100}
            required
            placeholder="Enter your query subject"
            onChange={e => setSubject(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-semibold text-zinc-300">Message</label>
          <textarea
            className="w-full border border-zinc-700 rounded px-3 py-2 text-zinc-100 bg-zinc-800 placeholder-zinc-400"
            value={message}
            minLength={20}
            maxLength={100}
            required
            placeholder="Describe your query in detail"
            onChange={e => setMessage(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-semibold text-zinc-300">Priority</label>
          <select
            className="w-full border border-zinc-700 rounded px-3 py-2 text-zinc-100 bg-zinc-800"
            value={priority}
            onChange={e => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
        {/* Status is hidden, default to pending */}
        <button
          type="submit"
          className="w-full bg-zinc-700 text-white py-2 rounded hover:bg-zinc-800"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Query'}
        </button>
        {success && <div className="text-green-400 text-center">{success}</div>}
        {error && <div className="text-red-400 text-center">{error}</div>}
      </form>
    </div>
  );
};

const QueryList = ({ refresh }) => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteMsg, setDeleteMsg] = useState('');
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);

  // Get userId from JWT
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

  const fetchQueries = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/getall`);
      if (!res.ok) throw new Error('Failed to fetch queries');
      const data = await res.json();
      setQueries(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
    // eslint-disable-next-line
  }, [refresh]);

  // Filtering
  const filteredQueries = filter === 'all' ? queries : queries.filter(q => q.status === filter);
  // Pagination
  const totalPages = Math.ceil(filteredQueries.length / pageSize);
  const paginatedQueries = filteredQueries.slice((page - 1) * pageSize, page * pageSize);

  // Delete query
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this query?')) return;
    try {
      const res = await fetch(`${API_URL}/delete/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete query');
      setDeleteMsg('Query deleted successfully!');
      setTimeout(() => setDeleteMsg(''), 2000);
      fetchQueries();
    } catch (err) {
      setDeleteMsg('Error deleting query.');
      setTimeout(() => setDeleteMsg(''), 2000);
    }
  };

  // Helper for icons
  const statusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <span title="Pending" className="text-yellow-400">⏳</span>;
      case 'resolved':
        return <span title="Resolved" className="text-green-400">✔️</span>;
      case 'closed':
        return <span title="Closed" className="text-gray-400">✖️</span>;
      default:
        return null;
    }
  };
  const priorityIcon = (priority) => {
    switch (priority) {
      case 'low':
        return <span title="Low" className="text-green-400">●</span>;
      case 'medium':
        return <span title="Medium" className="text-yellow-400">●</span>;
      case 'high':
        return <span title="High" className="text-orange-400">●</span>;
      case 'urgent':
        return <span title="Urgent" className="text-red-500 animate-pulse">●</span>;
      default:
        return null;
    }
  };

  if (loading) return <div className="text-center mt-6">Loading queries...</div>;
  if (error) return <div className="text-red-600 text-center mt-6">{error}</div>;
  if (!queries.length) return <div className="text-center mt-6">No queries found.</div>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4 sm:p-6 bg-zinc-900 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center text-zinc-100">Your Queries</h2>
      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center justify-between">
        <div className="flex items-center gap-2">
          <label className="text-zinc-300 font-semibold">Filter by Status:</label>
          <select
            className="border border-zinc-700 rounded px-2 py-1 bg-zinc-800 text-zinc-100 focus:ring-2 focus:ring-zinc-600"
            value={filter}
            onChange={e => { setFilter(e.target.value); setPage(1); }}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        {deleteMsg && <div className="text-green-400 font-semibold">{deleteMsg}</div>}
        <div className="flex-1" />
        <div className="text-zinc-400 text-sm text-right hidden sm:block">
          Showing {paginatedQueries.length} of {filteredQueries.length} queries
        </div>
      </div>
      <div className="space-y-6">
        {paginatedQueries.map((q) => (
          <div key={q._id} className="bg-zinc-800 rounded-lg shadow p-4 flex flex-col md:flex-row md:items-start gap-4 border border-zinc-700">
            <div className="flex-1 space-y-2">
              <div><span className="font-semibold text-zinc-300">Subject:</span> <span className="text-zinc-100">{q.subject}</span></div>
              <div><span className="font-semibold text-zinc-300">Message:</span> <span className="text-zinc-100">{q.message}</span></div>
              <div><span className="font-semibold text-zinc-300">Priority:</span> <span className="text-zinc-100">{priorityIcon(q.priority)} <span className="ml-1 capitalize">{q.priority}</span></span></div>
            </div>
            <div className="flex flex-col gap-2 md:w-72 w-full">
              <div><span className="font-semibold text-zinc-300">Status:</span> <span className="text-zinc-100">{statusIcon(q.status)} <span className="ml-1 capitalize">{q.status}</span></span></div>
              <div><span className="font-semibold text-zinc-300">Reply:</span> <span className="text-zinc-100">{q.responses && q.responses.length > 0 ? q.responses[q.responses.length - 1].message : <span className="italic text-zinc-400">No reply yet</span>}</span></div>
              <div><span className="font-semibold text-zinc-300">Created:</span> <span className="text-zinc-100 whitespace-nowrap">{new Date(q.createdAt).toLocaleString()}</span></div>
              {q.user === userId && (
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-semibold shadow-sm transition mt-2"
                  onClick={() => handleDelete(q._id)}
                >Delete</button>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-center items-center mt-6 gap-2">
          <button
            className="px-3 py-1 bg-zinc-700 text-white rounded disabled:opacity-50 font-semibold"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >Prev</button>
          <span className="text-zinc-200 px-3 text-base">Page {page} of {totalPages}</span>
          <button
            className="px-3 py-1 bg-zinc-700 text-white rounded disabled:opacity-50 font-semibold"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >Next</button>
        </div>
      )}
    </div>
  );
};

const QueryPage = () => {
  const [refresh, setRefresh] = useState(false);
  return (
    <div className="min-h-screen bg-zinc-950 pb-10">
      <QueryForm onSuccess={() => setRefresh(r => !r)} />
      <QueryList refresh={refresh} />
    </div>
  );
};

export default QueryPage;