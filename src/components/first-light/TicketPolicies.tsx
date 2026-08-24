"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";


const policies = [
  {
    title: "Refund & Postponement",
    body: [
      "If OP Productions cancels the event — or a force-majeure event prevents it — you're entitled to a full refund of the ticket face value, processed to your original payment method within 14 business days.",
      "If the event is postponed, your ticket automatically remains valid for the new date — no action needed. If you can't attend the rescheduled date, request a refund within 14 days of the new date being announced.",
      "No refunds for change of mind, personal circumstances, denied entry due to an invalid or duplicate QR, Wrong CNIC/Passport intoxication, or breach of venue rules.",
      "Any charges such as card processing fees, Merchant Discount Rate (MDR), payment gateway fees, bank transfer charges, delivery fees, platform fees, service fees, or taxes will be charged in addition to the ticket’s Face Value and are non-refundable.",
      "Booking / processing fees charged by Ticketwala may be non-refundable.",
      "Force majeure includes acts of God, natural disaster, government or security directives, curfew, public-health orders, artist unavailability beyond OP Productions' control, or any event outside OP Productions' reasonable control.",
    ],
  },
  {
    title: "Tickets, Resale & Transfer",
    body: [
      "Each ticket is a revocable licence to attend, valid for single entry only.",
      "Every QR code is single-use with real-time gate validation — the first valid scan admits; duplicates are rejected.",
      "Unauthorised or commercial resale, and resale above face value, is prohibited and voids the ticket without refund.",
      "Protect your QR. OP Productions is not responsible for tickets shared or duplicated by the holder.",
    ],
  },
  {
    title: "Entry, ID & Age",
    body: [
      "Strictly 18+. Valid government-issued ID (CNIC / passport) required.",
      "PLATINUM & VIP are ID-matched to the purchaser; Bronze is QR-scan entry.",
      "Security screening is mandatory at all gates. Arrive early to clear security before your tier's gate time.",
    ],
  },
  {
    title: "Secure Purchase",
    body: [
      "All purchases are processed securely via Ticketwala, the official ticketing partner.",
      "CAPTCHA on all checkout flows, per-ID quantity limits enforced, QR codes single-use with real-time validation.",
      "Buy only from official channels — tickets bought elsewhere may be invalid.",
    ],
  },
  {
    title: "Prohibited Items",
    body: [
      "No outside food or drink, weapons or sharp objects, fireworks / flares, laser pens, professional cameras or recording rigs, drones, illegal substances, or large bags.",
      "The full prohibited-items list is included in your confirmation email.",
    ],
  },
  {
    title: "After You Buy",
    body: [
      "A confirmation email with your QR e-ticket, venue map link, your tier's gate time and a what-to-bring guide is sent immediately after purchase.",
      "Add hello@opproductions.com to your contacts so it doesn't land in spam.",
    ],
  },
  {
    title: "Health, Safety & Conduct",
    body: [
      "This is a live open-air event with loud sound and lighting effects (including lasers, CO₂ and pyrotechnics). Attendees enter at their own risk.",
      "Follow all staff and security instructions at all times. Medical and fire teams are on site throughout.",
    ],
  },
  {
    title: "Media & Accessibility",
    body: [
      "By attending, you consent to being filmed or photographed for OP Productions and First Light promotional use.",
      "For accessibility assistance, contact hello@opproductions.com in advance so we can support your visit.",
    ],
  },
];

const TicketPolicies = () => {
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
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" }
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
      className={`relative w-full overflow-hidden bg-[#04040A] px-4 py-10 md:px-12 font-just`}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[60%] -translate-x-1/2 rounded-full bg-[#0FB6AE]/[0.04] blur-[120px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1100px]">
        {/* Heading — same style as Faqs */}
        <div className="w-full flex justify-center select-none pointer-events-none mb-14">
          <h2
            className={`font-just text-[40px] md:text-[50px] lg:text-[56px] text-[#0FB6AE] text-center uppercase drop-shadow-[0_0_15px_rgba(15,182,174,0.3)]`}
          >
            Policies
          </h2>
        </div>

        {/* Policy items */}
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
          {policies.map((policy, i) => (
            <div
              key={policy.title}
              data-reveal-item
              className="venue-reveal-item"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <h3
                className={`font-just mb-3 text-[18px] md:text-[20px] uppercase text-[#0FB6AE]`}
              >
                {policy.title}
              </h3>

              <div className="space-y-2">
                {policy.body.map((paragraph, j) => (
                  <p
                    key={j}
                    className="text-[13px] md:text-[14px] leading-[1.85] text-white/40"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Read More */}
        <div data-reveal-item className="venue-reveal-item mt-14 flex justify-center">
          <Link
            href="/event-terms-and-conditions"
            className="group relative flex h-10 sm:h-11 shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-[#18060F] px-6 sm:px-8 text-sm sm:text-base uppercase text-white shadow-[0_0_30px_rgba(24,6,15,0.4)] transition-all duration-300 hover:shadow-[0_0_45px_rgba(24,6,15,0.6)] active:scale-95"
          >
            <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            Read More
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:size-[18px]"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TicketPolicies;
