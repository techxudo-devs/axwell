"use client";

import { useEffect, useRef } from "react";
import {
  ExternalLink,
  MapPin,
  CalendarDays,
  Users,
  Building2,
  MapPinned,
  Radio,
  Car,
} from "lucide-react";

const MAP_LINK = "https://www.google.com/maps?q=Moin+Khan+Academy+Phase+8+Karachi";
const MAP_EMBED =
  "https://maps.google.com/maps?q=Moin+Khan+Academy+Phase+8+Karachi&hl=en&z=14&output=embed";

const venueDetails = [
  {
    icon: MapPinned,
    label: "Full Address",
    value: "DHA Golf Club (Moin Khan Academy), Zone B / Phase 8, Karachi, Pakistan",
    accent: "lime" as const,
  },
  {
    icon: CalendarDays,
    label: "Event Date",
    value: "19th September 2026",
    accent: "pink" as const,
  },
  {
    icon: Building2,
    label: "Produced By",
    value: "OP Productions",
    accent: "pink" as const,
  },
  {
    icon: Car,
    label: "Getting There",
    value:
      "On-site parking available. Ride-hailing drop-off at Gate A. Arrive early to avoid peak queues.",
    accent: "lime" as const,
  },
];

const accentStyles = {
  lime: {
    iconColor: "text-[#0FB6AE]",
    label: "text-white/40",
  },
  pink: {
    iconColor: "text-[#0FB6AE]",
    label: "text-white/40",
  },
};

const Venue = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useRevealOnScroll(rootRef);

  return (
    <div
      ref={rootRef}
      id="venue"
      className={`relative w-full max-w-[1240px] mt-24 z-10 scroll-mt-24 font-just`}
    >
      {/* Decorative ambient glows */}
      <div className="pointer-events-none absolute -top-10 -left-10 w-72 h-72 rounded-full bg-[#0FB6AE]/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#18060F]/10 blur-[110px]" />

      {/* Section heading */}
      <div className="venue-reveal flex flex-col items-center mb-14" data-reveal>
        <span className="text-[11px] uppercase tracking-wider text-white/40 font-semibold mb-2">
          Where it all happens
        </span>
        <h2
          className={`font-just text-[40px] md:text-[50px] lg:text-[56px] text-[#0FB6AE] text-center uppercase drop-shadow-[0_0_18px_rgba(15,182,174,0.35)]`}
        >
          The Venue
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
        {/* Left — concert-style venue panel */}
        <div>
          <div className="relative h-full overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0FB6AE]/35 via-[#18060F]/25 to-[#0FB6AE]/20 p-[1px] shadow-[0_0_40px_rgba(15,182,174,0.08)]">
            <div className="relative flex h-full flex-col overflow-hidden rounded-[31px] bg-gradient-to-br from-[#220a20] via-[#120114] to-[#08040c] p-6 md:p-8">
              {/* Static gradient overlays */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0FB6AE]/10 via-transparent to-[#18060F]/8" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#18060F]/5" />
              
              {/* Top badges */}
              <div className="relative z-10 mb-6 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-gradient-to-r from-white/15 to-white/5 px-4 py-1.5 text-[9px] md:text-[10px] font-medium uppercase tracking-wider text-white">
                  <Radio className="h-3 w-3" strokeWidth={2.5} />
                  Live Event
                </span>
                <span className="rounded-full border border-[#0FB6AE]/25 bg-gradient-to-r from-[#0FB6AE]/15 to-[#0FB6AE]/5 px-4 py-1.5 text-[9px] md:text-[10px] font-medium uppercase tracking-wider text-[#0FB6AE]/80">
                  Karachi, Pakistan
                </span>
                <span className="rounded-full border border-white/10 bg-gradient-to-r from-white/10 to-white/5 px-4 py-1.5 text-[9px] md:text-[10px] font-medium uppercase tracking-wider text-white/50">
                  Open Air
                </span>
              </div>

              {/* Title block */}
              <div className="relative z-10 mb-8">
                <h3
                  className={`font-just text-[30px] sm:text-[44px] md:text-[54px] leading-[0.9] uppercase`}
                >
                  <span className="bg-gradient-to-r from-white via-white to-[#0FB6AE] bg-clip-text text-transparent">
                    DHA GOLD CLUB (Moin{" "}
                  </span>
                  <span className="bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,255,255,0.25)]">
                    Khan Academy)
                  </span>
                </h3>

                <div className="mt-5 flex items-center gap-3">
                  <div className="h-[3px] w-16 rounded-full bg-gradient-to-r from-[#0FB6AE] to-[#18060F] shadow-[0_0_12px_rgba(15,182,174,0.6)]" />
                  <p className="text-[10px] md:text-[12px] uppercase tracking-wider text-white/40 font-medium">
                    Zone B · Phase 8
                  </p>
                </div>
              </div>

              {/* Detail cards */}
              <div className="relative z-10 flex flex-1 flex-col gap-1">
                {venueDetails.map((item) => {
                  const Icon = item.icon;
                  const style = accentStyles[item.accent];

                  return (
                    <div
                      key={item.label}
                      className="group flex items-start gap-3 py-4"
                    >
                      <Icon
                        className={`mt-0.5 h-4 w-4 shrink-0 ${style.iconColor}`}
                        strokeWidth={2.2}
                      />

                      <div className="min-w-0 flex-1">
                        <p
                          className={`mb-1.5 text-[10px] font-medium uppercase tracking-wider ${style.label}`}
                        >
                          {item.label}
                        </p>
                        <p className="text-[14px] leading-relaxed text-white/65 transition-colors duration-300 group-hover:text-white/80 md:text-[15px]">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom producer strip */}
              <div className="relative z-10 mt-6 flex items-center justify-between rounded-2xl border border-[#0FB6AE]/20 bg-gradient-to-r from-[#0FB6AE]/12 via-[#1a0518]/60 to-[#18060F]/10 px-5 py-4">
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-white/35 font-semibold mb-1">
                    Presented By
                  </p>
                  <p className={`font-just text-[28px]r text-white uppercase`}>
                    OP Productions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right — DARK THEMED map card */}
        <div className="venue-reveal flex flex-col gap-5" data-reveal>
          <div className="relative flex-1 min-h-[360px] rounded-[32px] overflow-hidden border border-[#0FB6AE]/20 bg-[#0a020a] shadow-[0_0_40px_rgba(15,182,174,0.08)] group">
            {/* Dark Mode Overlay for Iframe */}
            <div className="pointer-events-none absolute inset-0 rounded-[32px] ring-1 ring-inset ring-white/5 z-20" />

            <iframe
              title="DHA Golf Club (Moin Khan Academy) location map"
              src={MAP_EMBED}
              className="absolute inset-0 w-full h-full border-0 transition-all duration-700 scale-[1.02] group-hover:scale-[1.08]"
              style={{
                filter: "invert(90%) hue-rotate(180deg) brightness(0.7) contrast(1.2) saturate(0.5)",
                mixBlendMode: "lighten"
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />

            {/* Gradient to blend map into the card edges */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#120114] via-transparent to-[#120114]/60 pointer-events-none z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#120114]/40 via-transparent to-[#120114]/40 pointer-events-none z-10" />

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col items-center text-center pointer-events-none z-30">
              <div className="relative mb-4">
                <span className="absolute inset-0 rounded-full bg-[#0FB6AE]/30 animate-ping" />
                <div className="relative w-12 h-12 rounded-full bg-[#120114] border border-[#0FB6AE]/40 flex items-center justify-center backdrop-blur-sm">
                  <MapPin className="w-5 h-5 text-[#0FB6AE]" strokeWidth={2.5} />
                </div>
              </div>
              <p className={`font-just text-[22px] text-gray-300 uppercase drop-shadow-md`}>
                DHA Golf Club (Moin Khan Academy)
              </p>
              <p className="text-[12px] uppercase tracking-wider text-white/60 mt-1">
                Zone B, Phase 8 · Karachi, Pakistan
              </p>
            </div>
          </div>

          <a
            href={MAP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn inline-flex items-center justify-center gap-2 self-center rounded-full border border-[#0FB6AE]/30 bg-[#0FB6AE]/5 px-7 py-3.5 text-[12px] uppercase tracking-wider font-medium text-[#0FB6AE] transition-all duration-300 hover:bg-[#0FB6AE] hover:text-[#0E010E] hover:shadow-[0_0_25px_rgba(15,182,174,0.4)] active:scale-95"
          >
            View on Google Maps
            <ExternalLink
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
              strokeWidth={2.5}
            />
          </a>

          <p className="text-[11px] text-center text-white/35 leading-relaxed max-w-[420px] mx-auto">
            Security screening required at all entry points. Gates subject to change — check
            confirmation email on the day.
          </p>
        </div>
      </div>
    </div>
  );
};

// ... keep useRevealOnScroll function exactly as it was
function useRevealOnScroll(rootRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveal = (el: HTMLElement) => { el.classList.add("venue-visible"); };
    if (prefersReducedMotion) {
      root.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-item], [data-reveal-accent]").forEach(reveal);
      return;
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target as HTMLElement);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
    root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => observer.observe(el));
    root.querySelectorAll<HTMLElement>("[data-reveal-item]").forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.1}s`;
      observer.observe(el);
    });
    root.querySelectorAll<HTMLElement>("[data-reveal-accent]").forEach((el) => { observer.observe(el); });
    const fallback = window.setTimeout(() => {
      root.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-item], [data-reveal-accent]").forEach(reveal);
    }, 2000);
    return () => { window.clearTimeout(fallback); observer.disconnect(); };
  }, [rootRef]);
}

export default Venue;