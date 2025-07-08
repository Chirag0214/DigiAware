"use client";
import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/query"; // Adjust if needed

const HandleQueryPage = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [replyMap, setReplyMap] = useState({});
  const [statusMap, setStatusMap] = useState({});

  const fetchQueries = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/getall`);
      if (!res.ok) throw new Error("Failed to fetch queries");
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
  }, []);

  const handleStatusChange = (id, value) => {
    setStatusMap((prev) => ({ ...prev, [id]: value }));
  };

  const handleReplyChange = (id, value) => {
    setReplyMap((prev) => ({ ...prev, [id]: value }));
  };

  const handleUpdate = async (id) => {
    setSuccess("");
    setError("");
    const reply = replyMap[id];
    let status = statusMap[id] || queries.find(q => q._id === id)?.status;
    // If reply is provided and status is still 'pending' or empty, set to 'in progress'
    if (reply && (!status || status === 'pending')) {
      status = 'in progress';
    }
    try {
      const res = await fetch(`${API_URL}/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          reply,
        }),
      });
      if (!res.ok) throw new Error("Failed to update query");
      setSuccess("Query updated successfully!");
      fetchQueries();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-center mt-6">Loading queries...</div>;
  if (error) return <div className="text-red-600 text-center mt-6">{error}</div>;
  if (!queries.length) return <div className="text-center mt-6">No queries found.</div>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4 sm:p-6 bg-zinc-900 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center text-zinc-100">Handle User Queries</h2>
      {success && <div className="text-green-400 text-center mb-2">{success}</div>}
      <div className="space-y-6">
        {queries.map((q) => (
          <div key={q._id} className="bg-zinc-800 rounded-lg shadow p-4 flex flex-col md:flex-row md:items-start gap-4 border border-zinc-700">
            <div className="flex-1 space-y-2">
              <div><span className="font-semibold text-zinc-300">Subject:</span> <span className="text-zinc-100">{q.subject}</span></div>
              <div><span className="font-semibold text-zinc-300">Message:</span> <span className="text-zinc-100">{q.message}</span></div>
              <div><span className="font-semibold text-zinc-300">Priority:</span> <span className="text-zinc-100">{q.priority}</span></div>
            </div>
            <div className="flex flex-col gap-2 md:w-72 w-full">
              <label className="font-semibold text-zinc-300">Status</label>
              <select
                className="bg-zinc-900 text-zinc-100 border border-zinc-700 rounded px-2 py-1"
                value={statusMap[q._id] || q.status}
                onChange={e => handleStatusChange(q._id, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="in progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="rejected">Rejected</option>
              </select>
              <label className="font-semibold text-zinc-300 mt-2">Reply</label>
              <textarea
                className="w-full bg-zinc-900 text-zinc-100 border border-zinc-700 rounded px-2 py-1 min-h-[48px] resize-y"
                value={replyMap[q._id] || q.reply || ""}
                onChange={e => handleReplyChange(q._id, e.target.value)}
                placeholder="Type your reply here..."
                rows={2}
              />
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded mt-2"
                onClick={() => handleUpdate(q._id)}
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HandleQueryPage;
