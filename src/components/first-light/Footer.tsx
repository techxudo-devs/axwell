"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import EventCountdown from "./EventCountdown";

const FOOTER_LINKS = [
  { label: "Lineup", href: "#artists" },
  { label: "Tickets", href: "#tickets" },
  { label: "Venue", href: "#venue" },
  { label: "FAQ", href: "#faqs" },
  { label: "Ticketwala", href: "https://ticketwala.pk/event/first-light-axwell-6005" },
  { label: "Terms & Conditions", href: "/event-terms-and-conditions" },
] as const;

const MARQUEE_ITEMS = [
  "FIRST LIGHT",
  "Axwell LIVE",
  "22 AUG 2026",
  "DHA Golf Club (MOIN KHAN ACADEMY)",
  "KARACHI",
  "GATES FROM 4:00 PM",
];

const MarqueeRow = () => (
  <div className="footer-marquee relative flex overflow-hidden border-y border-white/10 bg-[#0a0010] py-3">
    <div className="footer-marquee-track">
      {[...Array(2)].map((_, dup) => (
        <span key={dup} className="flex items-center">
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={`${dup}-${i}`} className="flex items-center">
              <span
                className={`font-just px-4 text-sm sm:text-xl sm:px-6 md:text-2xl ${
                  i % 2 === 0 ? "text-[#0FB6AE]" : "text-white"
                }`}
              >
                {item === "AXWELL LIVE" ? (
                  <span className="relative inline-block">
                    <span className="blur-[3.5px] select-none pointer-events-none opacity-40">
                      AXWELL
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center text-sm sm:text-2xl mr-10 md:mr-16 text-white/90 font-medium tracking-normal whitespace-nowrap">
                      Axwell
                    </span>
                    {" LIVE"}
                  </span>
                ) : (
                  item
                )}
              </span>
              <span className="text-[#0FB6AE] text-sm sm:text-base">✦</span>
            </span>
          ))}
        </span>
      ))}
    </div>
  </div>
);

const Footer = () => {
  return (
    <footer
      className={`relative flex w-full flex-col overflow-hidden bg-black text-white font-just`}
    >
      {/* Animated neon top edge */}
      <div className="relative h-[3px] w-full overflow-hidden">
        <div className="footer-neon-sweep absolute inset-0 bg-linear-to-r from-[#18060F] via-[#0FB6AE] to-[#18060F]" />
      </div>

      {/* Scrolling festival marquee */}
      <MarqueeRow />

      {/* Ambient glow orbs */}
      <div className="pointer-events-none absolute -left-32 top-24 h-56 w-56 sm:h-72 sm:w-72 rounded-full bg-[#0FB6AE]/6 blur-[90px] sm:blur-[110px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 sm:h-80 sm:w-80 rounded-full bg-[#18060F]/8 blur-[100px] sm:blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-44 w-44 sm:h-56 sm:w-56 -translate-x-1/2 rounded-full bg-[#2A003A]/40 blur-[80px] sm:blur-[100px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-center px-4 pb-6 pt-8 sm:px-6 md:px-10">
        {/* Eyebrow */}
        <p className="text-center text-[9px] sm:text-[11px] uppercase tracking-wider sm:tracking-wider text-[#0FB6AE]/70">
          OP Productions
        </p>

        {/* Hero logo */}
        <h2
          className={`font-just footer-logo-glow mt-2 text-center text-[38px] min-[390px]:text-[46px] sm:text-[64px] md:text-[80px] lg:text-[88px] leading-none text-[#0FB6AE]`}
        >
          <span className="footer-logo-first-letter">F</span>IRST LIGHT
        </h2>

        {/* Subtitle line from poster */}
        <p className="mt-3 text-center text-[10px] min-[390px]:text-xs uppercase tracking-wider sm:tracking-wider text-white/60 md:text-sm max-w-xl sm:max-w-none mx-auto leading-relaxed">
          <span className="relative inline-block mr-1">
            <span className="blur-[3.5px] select-none pointer-events-none opacity-40">
              Axwell
            </span>
            <span className="absolute inset-0 flex items-center justify-center text-[8px] sm:text-sm mr-4 text-white/90 font-medium tracking-tight whitespace-nowrap mt-0.5 sm:mt-0">
              Axwell
            </span>
          </span>
          Live in Karachi
          <span className="mx-1.5 sm:mx-2 text-[#18060F]">•</span>
           22 August 2026
          <span className="mx-1.5 sm:mx-2 text-[#18060F]">•</span>
          DHA Golf Club (Moin Khan Academy)
        </p>

        {/* CTA + countdown */}
        <div className="mt-6 flex flex-col items-center justify-center gap-5 sm:flex-row sm:items-start sm:gap-6">
          <a
            href="#tickets"
            className={`font-just group relative flex h-10 min-[390px]:h-11 sm:h-12 shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-[#18060F] px-6 sm:px-8 text-sm sm:text-base uppercase text-white shadow-[0_0_30px_rgba(24,6,15,0.4)] transition-all duration-300 hover:shadow-[0_0_45px_rgba(24,6,15,0.6)] active:scale-95`}
          >
            <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            Grab Your Tickets
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:size-[18px]" />
          </a>
          <EventCountdown compact />
        </div>

        {/* Nav */}
        <nav className="mt-8 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2 sm:gap-x-3 sm:gap-y-3">
          {FOOTER_LINKS.map((link, i) => (
            <span key={link.label} className="flex items-center gap-2.5 sm:gap-3">
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`font-just text-xl sm:text-2xl uppercase text-white/70 transition-all duration-300 hover:text-[#0FB6AE] hover:drop-shadow-[0_0_12px_rgba(15,182,174,0.5)]`}
              >
                {link.label}
              </a>
              {i < FOOTER_LINKS.length - 1 && (
                <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-[#18060F]/60" />
              )}
            </span>
          ))}
        </nav>

        {/* Perforated divider */}
        <div className="my-6 flex items-center gap-2 sm:gap-3">
          <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#04040A] ring-1 ring-[#0FB6AE]/30" />
          <div className="h-px flex-1 bg-linear-to-r from-[#0FB6AE]/30 via-white/10 to-[#18060F]/30" />
          <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#04040A] ring-1 ring-[#18060F]/30" />
        </div>

        {/* Fine print from poster context */}
        <p className="mx-auto max-w-3xl text-center text-[10px] sm:text-[11px] leading-relaxed text-white/40 px-2">
          © 2026 OP Productions. All rights reserved. First Light is an OP Productions
          original event. Tickets issued and managed by Ticketwala on behalf of OP
          Productions. Unauthorised resale of tickets is prohibited.
        </p>

        <p className="mt-4 text-center text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-wider text-white/25">
          18+ Event · Valid ID required
        </p>

        <p className="mt-5 text-center text-[9px] sm:text-[10px] tracking-wider text-white/20">
          Website developed by{" "}
          <a href="https://prmedia.io/" target="_blank" rel="noopener noreferrer" className="font-medium text-white/35 hover:text-white/60 transition-colors">
            PR MEDIA LLC
          </a>
        </p>
      </div>

      {/* Giant watermark — absolute so it doesn't add bottom space */}
      <div
        className={`font-just pointer-events-none absolute inset-x-0 bottom-2 select-none text-center text-[clamp(2rem,8vw,6.5rem)] leading-none text-white/2.5`}
        aria-hidden="true"
      >
        SEE YOU THERE
      </div>
    </footer>
  );
};

export default Footer;