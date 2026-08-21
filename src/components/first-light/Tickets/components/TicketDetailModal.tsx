"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Clock, Mail, ArrowRight, ArrowDown, Check, Ticket as TicketIcon, X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { NOTCH_COLOR } from "../constants";
import type { TicketDetailModalProps } from "../types";
import Barcode from "./Barcode";

gsap.registerPlugin(useGSAP);

const TicketDetailModal = ({ ticket, onClose }: TicketDetailModalProps) => {
  const root = useRef<HTMLDivElement>(null);
  const accent = ticket.featured ? "#0FB6AE" : "#ffffff";

  const { contextSafe } = useGSAP(
    () => {
      if (typeof document === "undefined" || !root.current) return;

      gsap
        .timeline()
        .from(".modal-backdrop", {
          autoAlpha: 0,
          duration: 0.3,
          ease: "power2.out",
        })
        .from(
          ".modal-glow",
          {
            autoAlpha: 0,
            scale: 0.6,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.1"
        )
        .from(
          ".modal-card",
          {
            y: 60,
            scale: 0.9,
            autoAlpha: 0,
            duration: 0.55,
            ease: "back.out(1.4)",
          },
          "-=0.45"
        )
        .from(
          ".modal-stagger",
          {
            y: 20,
            autoAlpha: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: "power2.out",
          },
          "-=0.25"
        )
        .fromTo(
          ".modal-cta",
          { y: 16, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: "power2.out",
            clearProps: "transform",
          },
          "-=0.15"
        );

      // Continuous neon shimmer on borders + top bar.
      gsap.to(".modal-topbar, .modal-card-neon", {
        backgroundPosition: "300% 0",
        duration: 3.5,
        ease: "none",
        repeat: -1,
      });
      gsap.to(".modal-side-rail", {
        backgroundPosition: "0% 300%",
        duration: 4,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: root, dependencies: [ticket], revertOnUpdate: true }
  );

  const handleClose = contextSafe(() => {
    gsap
      .timeline({ onComplete: onClose })
      .to(".modal-card", {
        y: 40,
        scale: 0.94,
        autoAlpha: 0,
        duration: 0.3,
        ease: "power2.in",
      })
      .to(
        [".modal-glow", ".modal-backdrop"],
        { autoAlpha: 0, duration: 0.3, ease: "power2.in" },
        "-=0.2"
      );
  });

  useEffect(() => {
    window.__lenis?.stop();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.__lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={root}
      className={`font-just fixed inset-0 z-[100] flex items-center justify-center p-4`}
      role="dialog"
      aria-modal="true"
      aria-label={`${ticket.name} ticket details`}
    >
      {/* Backdrop with radial magenta wash */}
      <div
        className="modal-backdrop absolute inset-0 bg-[#02010A]/85 backdrop-blur-md"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 40%, rgba(24,6,15,0.18), transparent 55%)",
        }}
        onClick={handleClose}
      />

      {/* Neon glow halo behind the card */}
      <div
        className="modal-glow pointer-events-none absolute h-[520px] w-[420px] rounded-full opacity-70 blur-[90px]"
        style={{
          background: ticket.featured
            ? "radial-gradient(circle, rgba(15,182,174,0.35), rgba(24,6,15,0.25) 60%, transparent 75%)"
            : "radial-gradient(circle, rgba(24,6,15,0.3), rgba(15,182,174,0.15) 60%, transparent 75%)",
        }}
      />

      {/* Detail Card — animated gradient border */}
      <div className="modal-card-wrap relative w-full max-w-[410px] rounded-2xl p-[2px]">
        <div
          className="modal-card-neon pointer-events-none absolute inset-0 rounded-2xl opacity-90"
          style={{
            background: ticket.featured
              ? "linear-gradient(90deg,#0FB6AE,#ffffff,#0FB6AE,#18060F,#0FB6AE,#ffffff)"
              : "linear-gradient(90deg,#0FB6AE,#ffffff,#0FB6AE,#18060F,#0FB6AE,#ffffff)",
            backgroundSize: "300% 100%",
          }}
        />
      <div className="modal-card relative flex h-[min(90vh,720px)] w-full flex-col overflow-hidden rounded-[14px] bg-linear-to-b from-[#1a0025] via-[#120018] to-[#02010A] shadow-[0_0_60px_rgba(15,182,174,0.15)]">
        {/* Animated side borders */}
        <div
          className="modal-side-rail pointer-events-none absolute left-0 top-0 bottom-0 z-20 w-[3px] rounded-l-[14px]"
          style={{
            background: "linear-gradient(180deg,#0FB6AE,#ffffff,#0FB6AE,#18060F,#0FB6AE)",
            backgroundSize: "100% 300%",
          }}
        />
        <div
          className="modal-side-rail pointer-events-none absolute right-0 top-0 bottom-0 z-20 w-[3px] rounded-r-[14px]"
          style={{
            background: "linear-gradient(180deg,#18060F,#0FB6AE,#ffffff,#0FB6AE,#18060F)",
            backgroundSize: "100% 300%",
          }}
        />

        {/* Animated neon top bar */}
        <div className="relative z-20 h-[5px] w-full overflow-hidden rounded-t-[14px]">
          <div
            className="modal-topbar absolute inset-0"
            style={{
              background: ticket.featured
                ? "linear-gradient(90deg,#0FB6AE,#ffffff,#0FB6AE,#18060F,#0FB6AE,#ffffff)"
                : "linear-gradient(90deg,#0FB6AE,#ffffff,#0FB6AE,#18060F,#0FB6AE,#ffffff)",
              backgroundSize: "300% 100%",
            }}
          />
        </div>

        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="absolute right-4 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/70 backdrop-blur-sm transition-all duration-300 hover:rotate-90 hover:border-[#18060F] hover:text-[#18060F] cursor-pointer"
        >
          <X size={16} />
        </button>

        {/* Animated scroll-down hint */}
        <div className="absolute right-[160px] md:right-[179px] bottom-40 md:bottom-4 z-20 flex flex-col items-center gap-1.5 pointer-events-none">
          <ArrowDown className="text-[#0FB6AE]/70 animate-bounce w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
          {/* <span className={`font-just text-lgr text-[#0FB6AE]/60 uppercase`}>
            Buy Now
          </span> */}
        </div>

        <div
          data-lenis-prevent
          className="scrollbar-none min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain"
        >
        {/* Header */}
        <div className="px-7 pt-6 pb-5">
          <span
            className="modal-stagger inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-medium uppercase"
            style={{
              color: ticket.featured ? "#02010A" : "#02010A",
              borderColor: ticket.featured
                ? "#fff"
                : "#fff",
              backgroundColor: ticket.featured
                ? "#fff"
                : "#fff",
            }}
          >
            <TicketIcon size={11} />
            {ticket.featured ? "Exclusive Pass" : "Festival Pass"}
          </span>

          <h3
            className={`font-just modal-stagger mt-3 text-[58px] leading-[0.85]`}
            style={{
              color: accent,
              textShadow: ticket.featured
                ? "0 0 25px rgba(15,182,174,0.45)"
                : "0 0 20px rgba(255,255,255,0.25)",
            }}
          >
            {ticket.name}
          </h3>

          {/* Price chip */}
          <div className="modal-stagger mt-4 flex items-end gap-3">
            <div className="rounded-lg border border-[#0FB6AE]/40 bg-[#0FB6AE]/10 px-4 py-2 shadow-[0_0_20px_rgba(15,182,174,0.15)] flex flex-col">
              {ticket.earlyBirdPrice ? (
                <>
                  <span className="text-[10px] font-medium uppercase tracking-widest text-[#0FB6AE]/60 line-through">
                    Regular: {ticket.priceFull}
                  </span>
                  <p
                    className={`font-just text-[32px] leading-none text-[#0FB6AE] mt-0.5`}
                  >
                    Early Bird: {ticket.earlyBirdPrice}
                  </p>
                </>
              ) : (
                <p
                  className={`font-just text-[32px] leading-none text-[#0FB6AE]`}
                >
                  {ticket.priceFull}
                </p>
              )}
            </div>

          </div>
        </div>

        {/* Perforated tear divider */}
        <div className="relative my-1 flex items-center">
          <span
            className="absolute -left-2 h-4 w-4 rounded-full"
            style={{ backgroundColor: NOTCH_COLOR }}
          />
          <div className="mx-4 h-px flex-1 border-t border-dashed border-white/20" />
          <span
            className="absolute -right-2 h-4 w-4 rounded-full"
            style={{ backgroundColor: NOTCH_COLOR }}
          />
        </div>

        {/* Body */}
        <div className="px-7 pt-5 pb-6">
          <p className="modal-stagger mb-3 text-[11px] font-medium uppercase tracking-wider text-white/50">
            What&apos;s included
          </p>

          <ul className="flex flex-col gap-2.5">
            {ticket.features.map((feature) => (
              <li
                key={feature}
                className="modal-stagger flex items-center gap-3 text-sm text-white/80"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0FB6AE]/15 text-[#0FB6AE]">
                  <Check size={12} strokeWidth={3} />
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* Meta row */}
          <div className="modal-stagger mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-white/10 bg-white/3 px-3 py-2.5">
              <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-[#0FB6AE]">
                <Clock size={12} />
                Gates
              </div>
              <p className="mt-1 text-sm font-semibold text-white">
                {ticket.gateLabel} · from {ticket.gates}
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/3 px-3 py-2.5">
              <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-[#0FB6AE]">
                <Mail size={12} />
                Limit
              </div>
              <p className="mt-1 text-sm font-semibold text-white">
                Max {ticket.maxPerID} per ID
              </p>
            </div>
          </div>

          {/* Decorative barcode strip */}
          <div className="modal-stagger mt-6 flex items-center gap-3 rounded-lg border border-white/10 bg-black/30 px-4 py-2.5">
            <div className="h-8 flex-1">
              <Barcode color="#ffffff" />
            </div>
            <span
              className={`font-just text-xs text-white/40`}
            >
              {ticket.name.toUpperCase()}-2026
            </span>
          </div>

          {/* CTAs */}
          <a
            href="https://ticketwala.pk/event/first-light-axwell-6005"
            target="_blank"
            rel="noopener noreferrer"
            className={`font-just modal-cta group mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0FB6AE] py-4 text-center text-lg uppercasest text-[#02010A] shadow-[0_0_30px_rgba(15,182,174,0.25)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(15,182,174,0.45)] active:scale-[0.98]`}
          >
            Buy Now
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
        </div>
      </div>
      </div>
    </div>,
    document.body
  );
};

export default TicketDetailModal;
