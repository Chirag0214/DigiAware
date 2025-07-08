'use client';
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';

const FeedbackButton = () => {
    const pathname = usePathname();
    const router = useRouter();

    // Hide button on feedback page
    if (pathname && pathname.includes('/feedback')) return null;

    return (
        <div
            onClick={() => router.push('/users/feedback')}
            style={{
                position: 'fixed',
                bottom: '32px',
                right: '32px',
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#0070f3',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                cursor: 'pointer',
                zIndex: 1000,
                fontSize: '2rem',
                transition: 'background 0.2s',
            }}
            title="Give Feedback"
        >
            <span role="img" aria-label="feedback">💬</span>
        </div>
    );
};

export default FeedbackButton;