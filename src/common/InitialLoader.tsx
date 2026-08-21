'use client';

import React, { useState, useEffect } from 'react';

const MIN_DISPLAY_MS = 400;
const MAX_WAIT_MS = 1200;

const InitialLoader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const start = Date.now();
    let hideTimer: ReturnType<typeof setTimeout>;
    let capTimer: ReturnType<typeof setTimeout>;

    const hide = () => {
      const elapsed = Date.now() - start;
      const wait = Math.max(0, MIN_DISPLAY_MS - elapsed);
      hideTimer = setTimeout(() => {
        setIsLoading(false);
        document.body.style.overflow = '';
        document.documentElement.classList.remove('is-loading');
      }, wait);
    };

    // Hide as soon as DOM is interactive — don't wait for heavy
    // media (videos/images) like window.load does.
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', hide, { once: true });
    } else {
      hide();
    }
    // Hard cap so loader can never hang
    capTimer = setTimeout(hide, MAX_WAIT_MS);

    return () => {
      document.removeEventListener('DOMContentLoaded', hide);
      clearTimeout(hideTimer);
      clearTimeout(capTimer);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-500 ease-in-out ${
        isLoading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="relative flex items-center justify-center">
        <div className="animate-glow-outer absolute h-52 w-52 rounded-full mix-blend-screen" style={{ backgroundColor: '#0FB6AE' }} />
        <div className="animate-glow-inner absolute h-36 w-36 rounded-full mix-blend-screen" style={{ backgroundColor: '#0FB6AE' }} />
        <div className="relative z-10">
          <img src="/images/logo.png" alt="Logo" width={150} height={150} className="object-contain" fetchPriority="high" />
        </div>
      </div>
    </div>
  );
};

export default InitialLoader;
