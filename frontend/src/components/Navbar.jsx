'use client';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black dark:bg-neutral-900/90 backdrop-blur border-b border-gray-200 dark:border-neutral-700 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-3 md:py-4">

        <div className="flex items-center mb-2 md:mb-0">
          <Link href="/">
            <Image src="/logo.png" alt="Digi Aware Logo" width={48} height={48} className="mr-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-200" />
          </Link>
          <h1 className="text-2xl font-bold text-white dark:text-white ml-2">Digi Aware</h1>
        </div>
        
        <nav className="flex gap-4 md:gap-8 mb-2 md:mb-0">
          <Link href="/" className={`text-white dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition ${pathname === '/' ? 'underline underline-offset-8 decoration-2 text-blue-700 dark:text-blue-400' : ''}`}>Home</Link>
          <Link href="/browse-news" className={`text-white dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition ${pathname === '/users/news' ? 'underline underline-offset-8 decoration-2 text-blue-700 dark:text-blue-400' : ''}`}>News</Link>
          <Link href="/browse-artical" className={`text-white dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition ${pathname === '/users/articles' ? 'underline underline-offset-8 decoration-2 text-blue-700 dark:text-blue-400' : ''}`}>Article</Link>
          
        </nav>
        
        <div className="flex gap-2">
          <Link href="/contact" className="py-2 px-4 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 font-semibold transition">Contact</Link>
          <Link href="/user-login" className="py-2 px-4 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition text-center">Login</Link>
          <Link href="/user-signup" className="py-2 px-4 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition text-center">Signup</Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;