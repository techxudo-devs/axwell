"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Ticket, ChevronRight, X, ShieldCheck, Sparkles } from "lucide-react";
import EventCountdown from "./EventCountdown";
import { EARLY_BIRD_ENDS_AT, isEarlyBirdActive } from "@/lib/earlyBird";

gsap.registerPlugin(useGSAP);

const NEON_GRADIENT = "linear-gradient(90deg,#0FB6AE,#ffffff,#0FB6AE,#18060F,#0FB6AE,#ffffff)";
const SIDE_RAIL_LEFT = "linear-gradient(180deg,#0FB6AE,#ffffff,#0FB6AE,#18060F,#0FB6AE)";
const SIDE_RAIL_RIGHT = "linear-gradient(180deg,#18060F,#0FB6AE,#ffffff,#0FB6AE,#18060F)";

const TICKETWALA_URL = "https://ticketwala.pk/event/first-light-axwell-6005";

const ENTRY_REQUIREMENTS = [
  "Valid Guardian/Parent CNIC is mandatory",
  "Guardian/Parent must be present at entry",
  "Guardian/Parent must have their own valid ticket",
];

interface YouthTicketIntroModalProps {
  active: boolean;
  onClose: () => void;
}

const YouthTicketIntroModal = ({ active, onClose }: YouthTicketIntroModalProps) => {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!active) return;

      gsap.to(".youth-intro-neon", {
        backgroundPosition: "300% 0",
        duration: 3.5,
        ease: "none",
        repeat: -1,
      });
      gsap.to(".youth-intro-side-rail", {
        backgroundPosition: "0% 300%",
        duration: 4,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: root, dependencies: [active], revertOnUpdate: true },
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto px-4 py-4 sm:items-center sm:py-6">
      <div
        className={`hero-modal-backdrop fixed inset-0 bg-[#0E010E]/95 backdrop-blur-sm ${active ? "hero-modal-backdrop-open" : "hero-modal-backdrop-close"}`}
        aria-hidden
      />

      <div
        ref={root}
        role="dialog"
        aria-modal="true"
        aria-labelledby="youth-ticket-title"
        className={`hero-modal-panel relative z-10 my-auto w-full max-w-[520px] ${active ? "hero-modal-panel-open" : "hero-modal-panel-close"}`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0FB6AE]/35 bg-[#0FB6AE]/10 px-3 py-1 text-[8px] font-medium uppercase tracking-wider text-[#0FB6AE] shadow-[0_0_24px_rgba(15,182,174,0.2)]">
            <Sparkles size={11} className="animate-pulse" />
            Due to Popular Demand
          </span>
        </div>

        <div className="hero-panel-glow relative rounded-[24px] p-[2px] sm:rounded-[26px]">
          <div
            className="youth-intro-neon pointer-events-none absolute inset-0 rounded-[24px] opacity-90 sm:rounded-[26px]"
            style={{ background: NEON_GRADIENT, backgroundSize: "300% 100%" }}
          />
          <div className="relative overflow-hidden rounded-[22px] bg-[#0a0010] sm:rounded-[24px]">
            <div
              className="youth-intro-side-rail pointer-events-none absolute bottom-0 left-0 top-0 z-20 w-[3px] rounded-l-[22px] sm:rounded-l-[24px]"
              style={{ background: SIDE_RAIL_LEFT, backgroundSize: "100% 300%" }}
            />
            <div
              className="youth-intro-side-rail pointer-events-none absolute bottom-0 right-0 top-0 z-20 w-[3px] rounded-r-[22px] sm:rounded-r-[24px]"
              style={{ background: SIDE_RAIL_RIGHT, backgroundSize: "100% 300%" }}
            />
            {/* Full poster — no horizontal crop; inset mask hides PNG edge glow */}
            <div className="relative w-full overflow-hidden leading-none shadow-[inset_0_2px_0_0_#0a0010,inset_2px_0_0_0_#0a0010,inset_-2px_0_0_0_#0a0010]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/youth.png"
                alt="First Light Youth Access"
                draggable={false}
                className="block h-auto w-full"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-5 bg-gradient-to-t from-[#0a0010] to-transparent" />

              <button
                type="button"
                onClick={onClose}
                aria-label="Enter website"
                className="absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white/80 backdrop-blur-md transition-all duration-300 hover:border-[#0FB6AE]/50 hover:bg-[#0FB6AE]/20 hover:text-white active:scale-95"
              >
                <X size={16} strokeWidth={2.5} />
              </button>
            </div>

            <span id="youth-ticket-title" className="sr-only">
              First Light Youth Access
            </span>

            <div className="px-4 pb-4 pt-2.5 text-center sm:px-5 sm:pb-5 sm:pt-3">
              <p className="mx-auto max-w-[360px] text-[10px] leading-snug text-white/55">
                Ages 15–18 · Exclusive Youth Zone within Gold Tier
              </p>

              <div className="mx-auto mt-2.5 inline-flex flex-col items-center rounded-xl border border-[#0FB6AE]/30 bg-[#0FB6AE]/[0.07] px-5 py-2 shadow-[0_0_24px_rgba(15,182,174,0.12)]">
                <span className="text-[8px] font-medium uppercase tracking-wider text-[#0FB6AE]/80">
                  Special Price
                </span>
                <span className="font-just text-[26px] leading-none text-white sm:text-[28px]">
                  PKR 12,500
                </span>
              </div>

              {isEarlyBirdActive() && (
                <div className="mt-3.5 border-t border-white/8 pt-3">
                  <p className="mb-2.5 text-[8px] font-medium uppercase tracking-wider text-white/45">
                    Early Bird <span className="text-[#0FB6AE]">Discount</span> Ends In
                  </p>
                  <EventCountdown compact className="gap-1 sm:gap-1.5" targetDate={EARLY_BIRD_ENDS_AT} />
                </div>
              )}

              <div className="mt-3 rounded-xl border border-white/8 bg-white/[0.03] px-3.5 py-2.5 text-left">
                <div className="mb-1.5 flex items-center gap-1.5">
                  <ShieldCheck size={12} className="shrink-0 text-[#0FB6AE]" />
                  <p className="text-[8px] font-medium uppercase tracking-wider text-white/50">
                    Entry Requirements
                  </p>
                </div>
                <ul className="space-y-1.5">
                  {ENTRY_REQUIREMENTS.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[9px] leading-snug text-white/65 sm:text-[10px]"
                    >
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[#0FB6AE]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-1.5 border-t border-white/8 pt-3">
                {[
                  { val: "Gold Tier", lbl: "Youth Zone", color: "#0FB6AE" },
                  { val: "19 SEP", lbl: "2026 · Karachi", color: "#ffffff" },
                ].map((stat) => (
                  <div key={stat.lbl} className="text-center">
                    <p className="font-just text-[14px] sm:text-[17px]" style={{ color: stat.color }}>
                      {stat.val}
                    </p>
                    <p className="mt-0.5 text-[7px] uppercase tracking-wider text-white/30">{stat.lbl}</p>
                  </div>
                ))}
              </div>

              <div className="mt-3.5 flex flex-col gap-2 sm:flex-row sm:justify-center">
                <a
                  href={TICKETWALA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-cta-shine group relative flex w-full items-center justify-center gap-1.5 overflow-hidden rounded-full bg-gradient-to-r from-[#0FB6AE] to-[#0de0d5] px-6 py-2.5 text-[11px] font-medium uppercase tracking-wider text-[#0E010E] shadow-[0_4px_35px_rgba(15,182,174,0.4)] transition-all duration-300 hover:shadow-[0_6px_50px_rgba(15,182,174,0.6)] active:scale-[0.98] sm:w-auto"
                >
                  <Ticket size={14} strokeWidth={2.5} />
                  Buy Youth Ticket
                  <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full rounded-full border border-white/15 bg-white/[0.04] px-6 py-2.5 text-[11px] font-medium uppercase tracking-wider text-white/80 transition-all duration-300 hover:border-[#0FB6AE]/40 hover:bg-[#0FB6AE]/10 hover:text-white active:scale-[0.98] sm:w-auto"
                >
                  Enter Site
                </button>
              </div>
            </div>

            <div className="pointer-events-none absolute left-0 top-1/2 flex -translate-y-1/2 flex-col gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="-ml-1.5 h-2.5 w-2.5 rounded-full bg-[#0E010E]" />
              ))}
            </div>
            <div className="pointer-events-none absolute right-0 top-1/2 flex -translate-y-1/2 flex-col gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="-mr-1.5 h-2.5 w-2.5 rounded-full bg-[#0E010E]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouthTicketIntroModal;
