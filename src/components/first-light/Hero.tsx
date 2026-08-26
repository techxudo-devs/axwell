"use client";

import {
  Ticket,
  ChevronRight,
  MapPin,
  Music2,
  HelpCircle,
} from "lucide-react";
import Image from "next/image";

// Desktop configuration
const HERO_DESKTOP = {
  src: "/heroimage.png",
  width: 1600,
  height: 874,
} as const;

// Mobile configuration
const HERO_MOBILE = {
  src: "/heromobile.png",
  width: 768,
  height: 1024,
} as const;

const NAV_LINKS = [
  { label: "Lineup", href: "#artists", icon: Music2 },
  { label: "Tickets", href: "#tickets", icon: Ticket },
  { label: "Venue", href: "#venue", icon: MapPin },
  { label: "FAQs", href: "#faqs", icon: HelpCircle },
];

const Hero = () => {
  return (
    <section
      id="hero"
      className={`relative flex w-full flex-col overflow-hidden bg-[#0E010E] text-white font-just`}
    >
      {/* Top bar */}
      <header className="relative z-30 w-full shrink-0 bg-[#000]/95 backdrop-blur-2xl">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#18060F] via-[#0FB6AE] to-[#18060F] opacity-90" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0FB6AE]/[0.04] via-transparent to-[#18060F]/[0.04]" />

        <div className="relative mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:py-3.5">
          <a href="https://axwell.vercel.app/production-and-media" target="_blank" rel="noopener noreferrer" className="group flex shrink-0 flex-col">
            <span
              className={`font-just whitespace-nowrap text-[16px] leading-none transition-colors group-hover:text-[#0FB6AE]/90 sm:text-[18px] lg:text-[20px]`}
            >
              OP{" "}
              <span className="text-[#0FB6AE] drop-shadow-[0_0_10px_rgba(15,182,174,0.35)]">
                PRODUCTIONS
              </span>
            </span>
            <span
              className={`font-just mt-0.5 whitespace-nowrap text-[13px] uppercase leading-none text-white/80 sm:text-[14px] lg:text-[15px]`}
            >
              First Light
            </span>
          </a>

          {/* Premium nav */}
          <nav className="hero-nav-shell hidden lg:block">
            <div className="flex items-center gap-0.5 rounded-full bg-[#0a0010]/80 p-1 backdrop-blur-xl">
              {NAV_LINKS.map((link, i) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="hero-nav-item group relative flex items-center gap-2 rounded-full px-4 py-2.5 transition-all duration-300"
                  >
                    <Icon
                      size={13}
                      strokeWidth={2.5}
                      className="text-white/40 transition-colors duration-300 group-hover:text-[#0FB6AE]"
                    />
                    <span className="text-[10px] font-medium uppercase tracking-wider text-white/55 transition-colors duration-300 group-hover:text-[#0FB6AE]">
                      {link.label}
                    </span>
                    {i < NAV_LINKS.length - 1 && (
                      <span className="absolute -right-0.5 top-1/2 h-3 w-px -translate-y-1/2 bg-white/8" />
                    )}
                  </a>
                );
              })}
            </div>
          </nav>

          <div className="flex shrink-0 items-center">
            <a
              href="https://ticketwala.pk/event/first-light-axwell-6005"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta-shine group relative flex shrink-0 items-center gap-1.5 overflow-hidden rounded-full bg-gradient-to-r from-[#0FB6AE] to-[#0FB6AE] px-4 py-2 text-[10px] font-medium uppercase tracking-wider text-[#0E010E] shadow-[0_0_20px_rgba(15,182,174,0.25)] transition-all duration-300 hover:from-[#18060F] hover:to-[#18060F] hover:text-white hover:shadow-[0_0_28px_rgba(24,6,15,0.4)] active:scale-95 sm:px-5 sm:py-2.5 sm:text-[11px]"
            >
              <Ticket size={14} strokeWidth={2.5} />
              Get Tickets
              <ChevronRight size={14} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="flex items-center justify-center gap-2 border-t border-white/5 px-4 py-3 lg:hidden">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-[9px] font-medium uppercase tracking-wider text-white/55 transition-all hover:border-[#0FB6AE]/30 hover:bg-[#0FB6AE]/8 hover:text-[#0FB6AE]"
              >
                <Icon size={10} strokeWidth={2.5} />
                {link.label}
              </a>
            );
          })}
        </div>
      </header>

      {/* Hero image container */}
      <div className="relative w-full shrink-0 leading-[0]">
        
        {/* Desktop Version: Visible from "md" screen widths and up */}
        <div className="hidden md:block">
          <Image
            src={HERO_DESKTOP.src}
            alt="First Light featuring Axwell — OP Productions"
            width={HERO_DESKTOP.width}
            height={HERO_DESKTOP.height}
            priority
            draggable={false}
            className="h-auto w-full"
            sizes="100vw"
          />
        </div>

        {/* Mobile Version: Visible below "md" screen widths */}
        <div className="block md:hidden">
          <Image
            src={HERO_MOBILE.src}
            alt="First Light featuring Axwell — OP Productions"
            width={HERO_MOBILE.width}
            height={HERO_MOBILE.height}
            priority
            draggable={false}
            className="h-full w-full"
            sizes="100vw"
          />
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#02010A] to-transparent" />
      </div>
    </section>
  );
};

export default Hero;