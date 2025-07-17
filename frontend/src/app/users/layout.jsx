import React from 'react';
import UserNavbar from './UserNavbar';

export default function AdminLayout({ children }) {
  return (
    <>
      <UserNavbar />
      <main className='py bg-zinc-950'>
        {children}
      </main>
    </>
  );
}
