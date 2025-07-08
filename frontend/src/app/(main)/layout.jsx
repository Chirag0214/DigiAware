import Navbar from '@/components/Navbar';
import React from 'react';

export default function AdminLayout({ children }) {
  return (
    <>
     <Navbar/>
      <main>{children}</main>
    </>
  );
}
