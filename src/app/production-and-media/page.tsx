"use client";

import { useEffect, useRef, useState } from "react";
import Navbar2 from '@/components/landing/Navbar2'
import About from '@/components/landing/About'
import Contact from '@/components/landing/Contact'
import Hero from '@/components/landing/Hero'
import CardsStack from '@/components/landing/Services'
import Work from '@/components/landing/Work'
import Footer from '@/components/common/Footer'

const page = () => {
  const [visible, setVisible] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 2000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const el = contactRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(false);
        else setVisible(true);
      },
      { threshold: 0, rootMargin: "0px 0px -30% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div>
        <Navbar2 />
        <Hero />
        <About />
        <CardsStack />
        <Work />
        <div ref={contactRef} />
        <Contact />
        <Footer />
      </div>

      <a
        href="/first-light"
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-full border border-[#0FB6AE]/30 bg-white/10 px-6 py-2.5 text-xs font-medium uppercase tracking-wider text-white/70 backdrop-blur-xl transition-all duration-500 hover:scale-97 hover:bg-[#0FB6AE]/20 hover:text-[#0FB6AE] hover:border-[#0FB6AE]/50 hover:shadow-[0_0_30px_rgba(15,182,174,0.25)] ${
          visible
            ? "translate-y-0 opacity-100" 
            : "translate-y-20 opacity-0 pointer-events-none"
        }`}
      >
        Go To First Light
      </a>
    </>
  )
}

export default page