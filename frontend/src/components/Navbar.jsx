'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/browse-news', label: 'News' },
  { href: '/browse-article', label: 'Articles' },
];

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/30 dark:bg-neutral-900/60 backdrop-blur-lg shadow-lg border-b border-gray-200 dark:border-neutral-700">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Left: Logo & Brand */}
        <Link href="/" className="flex items-center gap-2 mr-8" aria-label="Digi Aware Home">
          <Image src="/logo.png" alt="Digi Aware Logo" width={48} height={48} className="rounded-full shadow-md" />
          <span className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white font-[Raleway,Montserrat,sans-serif]">Digi Aware</span>
        </Link>
        {/* Center: Nav Links */}
        <div className="flex-1 flex justify-center">
          <nav className="hidden md:flex gap-8 items-center">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 text-lg font-medium text-gray-800 dark:text-gray-100 transition-colors duration-200
                  ${pathname === link.href ? 'after:absolute after:left-0 after:bottom-0 after:w-full after:h-1 after:bg-blue-500 after:rounded-full after:content-[" "] text-blue-600 dark:text-blue-400' : 'hover:text-blue-500 dark:hover:text-blue-300'}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        {/* Right: Actions */}
        <div className="hidden md:flex gap-3 items-center">
          <Link href="/contact" className="px-5 py-2 rounded-full bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-white font-semibold hover:bg-gray-200 dark:hover:bg-neutral-700 transition shadow focus:outline-none focus:ring-2 focus:ring-blue-400">Contact</Link>
          <Link href="/user-login" className="px-5 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow focus:outline-none focus:ring-2 focus:ring-blue-400">Login</Link>
          <Link href="/user-signup" className="px-5 py-2 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition shadow focus:outline-none focus:ring-2 focus:ring-green-400">Signup</Link>
        </div>
        {/* Hamburger for mobile */}
        <button
          className="md:hidden ml-2 p-2 rounded-lg bg-white/40 dark:bg-neutral-800/60 shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="block w-7 h-1 bg-gray-800 dark:bg-white mb-1 rounded"></span>
          <span className="block w-7 h-1 bg-gray-800 dark:bg-white mb-1 rounded"></span>
          <span className="block w-7 h-1 bg-gray-800 dark:bg-white rounded"></span>
        </button>
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white/95 dark:bg-neutral-900/95 shadow-lg flex flex-col items-center gap-4 py-6 animate-slideDown z-50">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-lg font-medium px-4 py-2 rounded transition-colors duration-200 w-full text-center ${pathname === link.href ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'hover:bg-blue-50 dark:hover:bg-neutral-800'}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className="px-5 py-2 rounded-full bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-white font-semibold hover:bg-gray-200 dark:hover:bg-neutral-700 transition shadow w-4/5 text-center" onClick={() => setMenuOpen(false)}>Contact</Link>
            <Link href="/user-login" className="px-5 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow w-4/5 text-center" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link href="/user-signup" className="px-5 py-2 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition shadow w-4/5 text-center" onClick={() => setMenuOpen(false)}>Signup</Link>
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown { animation: slideDown 0.25s ease; }
      `}</style>
    </header>
  );
};

export default Navbar;