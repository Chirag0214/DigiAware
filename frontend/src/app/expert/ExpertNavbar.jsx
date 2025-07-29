'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';

const ExpertNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleLogout = () => {
    // Remove token or session info (adjust as needed)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token'); // Change 'token' to your actual key if different
    }
    window.location.href = '/expert-login'; // Redirect to expert login page
  };
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        <Link href="/" className="flex items-center gap-4 font-bold text-xl tracking-wide hover:underline">
          <Image src="/logo.png" alt="Logo" width={40} height={40} className="rounded-full object-cover" />
          DigiAware
        </Link>
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Toggle navigation"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg className={`w-6 h-6 ${mobileOpen ? 'hidden' : 'block'}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg className={`w-6 h-6 ${mobileOpen ? 'block' : 'hidden'}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className={`flex-col md:flex-row md:flex items-center gap-4 md:gap-6 absolute md:static left-0 right-0 bg-slate-900 md:bg-transparent px-4 md:px-0 transition-all duration-300 ease-in-out ${mobileOpen ? 'flex top-full' : 'hidden md:flex'}`}>
          <Link href="/expert/profile" className="hover:underline py-2 md:py-0">Profile</Link>
          <Link href="/expert/add-article" className="hover:underline py-2 md:py-0">Add Article</Link>
          <Link href="/expert/manage-article" className="hover:underline py-2 md:py-0">Manage Articles</Link>
          <Link href="/expert/handle-query" className="hover:underline py-2 md:py-0">Handle Queries</Link>
          <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-semibold transition ml-0 md:ml-2 mt-2 md:mt-0" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default ExpertNavbar;
