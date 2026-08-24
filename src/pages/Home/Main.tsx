"use client";

import { useEffect, useRef, useState } from "react";
import Artists from "@/components/first-light/Artists";
import Hero from "@/components/first-light/Hero";
import SetTimes from "@/components/first-light/SetTimes";
import Revealing from "@/components/first-light/Revealing";
import ImpactStats from "@/components/first-light/ImpactStats";
import Tickets from "@/components/first-light/Tickets/index";
import TicketPolicies from "@/components/first-light/TicketPolicies";
import DosAndDonts from "@/components/first-light/DosAndDonts";
import Faqs from "@/components/first-light/Faqs";
import Newsletter from "@/components/first-light/Newsletter";
import CountdownIntroModal from "@/components/first-light/CountdownIntroModal";
import Footer from "@/components/first-light/Footer";
import Map2 from "@/components/first-light/Map2";
import TopBanner from "@/components/common/TopBanner";

const INTRO_ANIM_MS = 450;
const SITE_REVEAL_MS = 700;

const Main = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [introActive, setIntroActive] = useState(false);
  const [siteRevealed, setSiteRevealed] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const openTimer = window.setTimeout(() => setIntroActive(true), 80);
    return () => window.clearTimeout(openTimer);
  }, []);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0, rootMargin: "0px 0px -50% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = showIntro ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showIntro]);

  const scrollToHero = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const closeIntro = () => {
    setIntroActive(false);
    window.setTimeout(() => {
      setShowIntro(false);
      scrollToHero();
      window.setTimeout(() => {
        setSiteRevealed(true);
        scrollToHero();
      }, 40);
    }, INTRO_ANIM_MS);
  };

  return (
    <>
      {showIntro && (
        <CountdownIntroModal active={introActive} onClose={closeIntro} />
      )}

      <div
        className={`site-reveal ${siteRevealed ? "site-revealed" : ""}`}
        style={{ transitionDuration: `${SITE_REVEAL_MS}ms` }}
        aria-hidden={showIntro && !siteRevealed}
      >
        <TopBanner />
        <Hero />
        <Revealing />
        <ImpactStats />
        <Artists />
        <SetTimes />
        <Map2 />
        <Tickets />
        <DosAndDonts />
        <TicketPolicies />
        <Faqs />
        <Newsletter />
        <div ref={footerRef} />
        <Footer />
      </div>

      {!showIntro && (
        <a
          href="/production-and-media"
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-full border border-[#0FB6AE]/30 bg-white/10 px-6 py-2.5 text-xs font-medium uppercase tracking-wider text-white/70 backdrop-blur-xl transition-all duration-500 hover:bg-[#0FB6AE]/20 w-58 mx-auto text-center hover:text-[#0FB6AE] hover:scale-97 hover:border-[#0FB6AE]/50 hover:shadow-[0_0_30px_rgba(15,182,174,0.25)] ${
            footerVisible
              ? "translate-y-20 opacity-0 pointer-events-none"
              : "translate-y-0 opacity-100"
          }`}
        >
          Go To OP Productions
        </a>
      )}
    </>
  )
}

export default Main;
