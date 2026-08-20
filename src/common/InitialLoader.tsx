'use client';

import React, { useState, useEffect } from 'react';

const InitialLoader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.classList.remove('is-loading');
    }

    const handleLoad = () => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [isLoading]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-1000 ease-in-out ${
        isLoading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="relative flex items-center justify-center">
        <div className="animate-glow-outer absolute h-52 w-52 rounded-full mix-blend-screen" style={{ backgroundColor: '#0FB6AE' }} />
        <div className="animate-glow-inner absolute h-36 w-36 rounded-full mix-blend-screen" style={{ backgroundColor: '#0FB6AE' }} />
        <div className="relative z-10">
          <img src="/images/logo.png" alt="Logo" width={150} height={150} className="object-contain" />
        </div>
      </div>
    </div>
  );
};

export default InitialLoader;
