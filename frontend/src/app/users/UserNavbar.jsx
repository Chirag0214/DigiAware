'use client';
import Link from 'next/link';
import React, { useState } from 'react';

const UserNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        <div className="flex items-center gap-4">
          <span className="font-bold text-xl tracking-wide">DigiAware</span>
        </div>
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
          <Link href="/users/news" className="hover:underline py-2 md:py-0">News</Link>
          <Link href="/users/articles" className="hover:underline py-2 md:py-0">Articles</Link>
          <Link href="/users/querys" className="hover:underline py-2 md:py-0">Queries</Link>
          <Link href="/users/profile" className="hover:underline py-2 md:py-0">Profile</Link>
          <Link href="/user-login" className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-semibold transition ml-0 md:ml-2 mt-2 md:mt-0">Logout</Link>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
