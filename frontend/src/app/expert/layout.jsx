'use client';

import React from 'react';
import ExpertNavbar from './ExpertNavbar';

export default function ExpertLayout({ children }) {
  return (
    <>
      <ExpertNavbar/>
      <main>{children}</main>
    </>
  );
}
