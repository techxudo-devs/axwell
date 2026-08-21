"use client";

import { useEffect, useRef } from "react";
import {
  Check,
  X,
  ShieldCheck,
  CreditCard,
  Clock,
  MailCheck,
  ShoppingCart,
  Users,
  GlassWater,
  Cigarette,
  Wine,
  Camera,
  Megaphone,
  Bomb,
  ShieldOff,
  Repeat,
  UserX,
  TicketCheck,
} from "lucide-react";

const dos = [
  { icon: CreditCard, text: "Carry a valid CNIC or Passport — strictly 18+" },
  { icon: TicketCheck, text: "Keep your QR e-ticket ready for scanning at the gate" },
  { icon: Clock, text: "Arrive early to clear security before your tier's gate time" },
  { icon: ShieldCheck, text: "Follow all staff and security instructions at all times" },
  { icon: ShoppingCart, text: "Buy only from official channels — Ticketwala" },
  { icon: Users, text: "Buy for your group in one go & share each person's QR" },
  { icon: MailCheck, text: "Check your confirmation email for your gate number & entry time" },
];

const donts = [
  { icon: GlassWater, text: "No outside food or drinks allowed inside" },
  { icon: Wine, text: "No alcohol or intoxication — entry will be denied" },
  { icon: Cigarette, text: "No smoking substances or illegal items" },
  { icon: Bomb, text: "No fireworks, flares, or laser pens" },
  { icon: Camera, text: "No professional cameras or recording rigs" },
  { icon: Megaphone, text: "No drones of any kind" },
  { icon: ShieldOff, text: "No large bags, weapons, or sharp objects" },
  // { icon: Repeat, text: "No unauthorized resale — ticket will be voided" },
  // { icon: UserX, text: "No entry without valid ID matching your ticket" },
];

const DosAndDonts = () => {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      root.querySelectorAll<HTMLElement>("[data-reveal-item]").forEach(
        (el) => el.classList.add("venue-visible")
      );
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("venue-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -5% 0px" }
    );

    root.querySelectorAll<HTMLElement>("[data-reveal-item]").forEach((el) =>
      observer.observe(el)
    );

    const fallback = window.setTimeout(() => {
      root.querySelectorAll<HTMLElement>("[data-reveal-item]").forEach(
        (el) => el.classList.add("venue-visible")
      );
    }, 2500);

    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative w-full overflow-hidden bg-[#04040A] px-4 py-10 md:px-12 font-just"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0FB6AE]/[0.03] blur-[140px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1100px]">
        {/* Heading */}
        <div
          data-reveal-item
          className="venue-reveal-item w-full flex flex-col items-center select-none pointer-events-none mb-16"
        >
          <h2 className="font-just text-[40px] md:text-[50px] lg:text-[56px] text-[#0FB6AE] text-center uppercase drop-shadow-[0_0_15px_rgba(15,182,174,0.3)] leading-none">
            Event Guide
          </h2>
          <p className="mt-3 text-[13px] md:text-[14px] text-white/30 tracking-wide text-center max-w-md">
            Know before you go — everything you need for a seamless First Light experience
          </p>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* DOs Column */}
          <div data-reveal-item className="venue-reveal-item" style={{ transitionDelay: "0ms" }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0FB6AE]/10 border border-[#0FB6AE]/25">
                <Check size={18} strokeWidth={3} className="text-[#0FB6AE]" />
              </div>
              <h3 className="font-just text-[22px] md:text-[26px] uppercase text-white/90 tracking-wide">
                Do&apos;s
              </h3>
              {/* <div className="flex-1 h-px bg-gradient-to-r from-[#0FB6AE]/20 to-transparent ml-2" /> */}
            </div>

            <div className="space-y-3">
              {dos.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    data-reveal-item
                    className="venue-reveal-item group flex items-center gap-4 rounded-2xl border border-white/[0.04] bg-white/[0.02] px-5 py-4 transition-all duration-300 hover:border-[#0FB6AE]/20 hover:bg-[#0FB6AE]/[0.04]"
                    style={{ transitionDelay: `${(i + 1) * 60}ms` }}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0FB6AE]/10 transition-colors duration-300 group-hover:bg-[#0FB6AE]/20">
                      <Icon size={17} strokeWidth={2} className="text-[#0FB6AE]" />
                    </div>
                    <span className="text-[13px] md:text-[14px] leading-[1.7] text-white/55 transition-colors duration-300 group-hover:text-white/75">
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* DON'Ts Column */}
          <div data-reveal-item className="venue-reveal-item" style={{ transitionDelay: "100ms" }}>
            <div className="flex items-center gap-3 mb-8 md:translate-y-0 translate-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#18060F]/80 border border-[#18060F]">
                <X size={18} strokeWidth={3} className="text-[#ff4d6a]" />
              </div>
              <h3 className="font-just text-[22px] md:text-[26px] uppercase text-white/90 tracking-wide">
                Don&apos;ts
              </h3>
              {/* <div className="flex-1 h-px bg-gradient-to-r from-[#18060F]/40 to-transparent ml-2" /> */}
            </div>

            <div className="space-y-3">
              {donts.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    data-reveal-item
                    className="venue-reveal-item group flex items-center gap-4 rounded-2xl border border-white/[0.04] bg-white/[0.02] px-5 py-4 transition-all duration-300 hover:border-[#ff4d6a]/15 hover:bg-[#ff4d6a]/[0.03]"
                    style={{ transitionDelay: `${(i + 1) * 60 + 100}ms` }}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#18060F]/60 transition-colors duration-300 group-hover:bg-[#18060F]">
                      <Icon size={17} strokeWidth={2} className="text-[#ff4d6a]/70 transition-colors duration-300 group-hover:text-[#ff4d6a]" />
                    </div>
                    <span className="text-[13px] md:text-[14px] leading-[1.7] text-white/55 transition-colors duration-300 group-hover:text-white/75">
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DosAndDonts;
