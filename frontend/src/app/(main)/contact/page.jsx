'use client';
import React, { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to send message');
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
      <div style={{ background: '#fff', color: '#111', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: 40, maxWidth: 500, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Stylish Contact Heading with Divider and Gradient Text */}
        <div style={{ width: '100%', textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10
          }}>
            <div style={{ flex: 1, height: 2, background: 'linear-gradient(90deg, #00bcd4 0%, #2196f3 100%)', borderRadius: 2, maxWidth: 60 }} />
            <span style={{
              margin: '0 18px',
              fontSize: 34,
              fontWeight: 900,
              background: 'linear-gradient(90deg, #00bcd4, #2196f3)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: 2,
              textTransform: 'uppercase',
              display: 'inline-block',
              lineHeight: 1.1,
              color: '#111', // fallback for browsers that don't support gradient text
            }}>
              Contact
            </span>
            <div style={{ flex: 1, height: 2, background: 'linear-gradient(90deg, #2196f3 0%, #00bcd4 100%)', borderRadius: 2, maxWidth: 60 }} />
          </div>
          <div style={{ color: '#111', fontSize: 18, fontWeight: 500, marginTop: 4, marginBottom: 0 }}>
            Reach out to us anytime. We're happy to help!
          </div>
        </div>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '12px 16px', marginBottom: 16, borderRadius: 8, border: '1px solid #bcd0e5', fontSize: 16, color: '#111', background: '#fff' }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '12px 16px', marginBottom: 16, borderRadius: 8, border: '1px solid #bcd0e5', fontSize: 16, color: '#111', background: '#fff' }}
          />
          <textarea
            name="message"
            placeholder="Message"
            value={form.message}
            onChange={handleChange}
            required
            rows={4}
            style={{ width: '100%', padding: '12px 16px', marginBottom: 24, borderRadius: 8, border: '1px solid #bcd0e5', fontSize: 16, resize: 'none', color: '#111', background: '#fff' }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', background: '#00bcd4', color: '#fff', padding: '12px 0', border: 'none', borderRadius: 24, fontSize: 18, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 2px 8px rgba(0,188,212,0.08)' }}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
        {error && <div style={{ marginTop: 16, color: '#f44336', fontWeight: 500 }}>{error}</div>}
        {submitted && <div style={{ marginTop: 20, color: '#4caf50', fontWeight: 500 }}>Thank you for contacting us!</div>}
      </div>
    </div>
  );
}
