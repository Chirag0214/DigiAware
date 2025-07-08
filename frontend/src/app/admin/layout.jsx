import React from 'react';
import AdminNavbar from './AdminNavbar';

export default function AdminLayout({ children }) {
  return (
    <>
      <AdminNavbar />
      <main>{children}</main>
    </>
  );
}
