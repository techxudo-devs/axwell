"use client";

import { Ticket, ChevronRight, X } from "lucide-react";
import EventCountdown from "./EventCountdown";


interface CountdownIntroModalProps {
  active: boolean;
  onClose: () => void;
}

const CountdownIntroModal = ({ active, onClose }: CountdownIntroModalProps) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8">
      <div
        className={`hero-modal-backdrop absolute inset-0 bg-[#0E010E] ${active ? "hero-modal-backdrop-open" : "hero-modal-backdrop-close"}`}
        aria-hidden
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="intro-countdown-title"
        className={`hero-modal-panel relative z-10 w-full max-w-[720px] ${active ? "hero-modal-panel-open" : "hero-modal-panel-close"}`}
      >
        <div className="mb-4 flex justify-center">
          <span className="hero-urgency inline-flex items-center gap-2 rounded-full border border-[#18060F]/40 bg-[#18060F]/10 px-4 py-1.5 text-[9px] font-medium uppercase tracking-wider text-[#18060F]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#18060F] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#18060F]" />
            </span>
            Limited Tickets · Selling Fast
          </span>
        </div>

        <div className="hero-panel-glow relative rounded-[32px] bg-gradient-to-br from-[#0FB6AE]/30 via-[#18060F]/15 to-[#0FB6AE]/20 p-[1px]">
          <div className="relative overflow-hidden rounded-[31px] bg-[#0a0010]/95 px-5 py-7 backdrop-blur-2xl sm:px-10 sm:py-9">
            <button
              type="button"
              onClick={onClose}
              aria-label="Enter website"
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-all duration-300 hover:border-[#18060F]/50 hover:bg-[#18060F]/15 hover:text-white active:scale-95"
            >
              <X size={16} strokeWidth={2.5} />
            </button>

            <div className="pointer-events-none absolute left-0 top-1/2 flex -translate-y-1/2 flex-col gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="-ml-1.5 h-3 w-3 rounded-full bg-[#0E010E]" />
              ))}
            </div>
            <div className="pointer-events-none absolute right-0 top-1/2 flex -translate-y-1/2 flex-col gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="-mr-1.5 h-3 w-3 rounded-full bg-[#0E010E]" />
              ))}
            </div>

            <div className="pointer-events-none absolute -top-16 left-1/2 h-32 w-72 -translate-x-1/2 rounded-full bg-[#0FB6AE]/12 blur-[70px]" />

            <div className="relative mb-7 text-center">
              <div className="mb-3 flex items-center justify-center gap-3">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#0FB6AE]/50" />
                <span className="text-[9px] font-medium uppercase tracking-wider text-[#0FB6AE]/70">
                  Don&apos;t miss it
                </span>
                <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#0FB6AE]/50" />
              </div>
              <h2
                id="intro-countdown-title"
                className={`font-just text-[32px] sm:text-[42px] uppercase leading-none text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]`}
              >
                Tickets <span className="text-[#0FB6AE]">Go Live</span>
              </h2>
            </div>

            <EventCountdown className="gap-1.5 sm:gap-3" />

            <div className="mt-7 grid grid-cols-2 gap-2 border-t border-white/8 pt-6">
              {[
                { val: "Axwell", lbl: "Headliner", color: "#ffffff" },
                { val: "22 AUG", lbl: "2026", color: "#0FB6AE" },
              ].map((stat) => (
                <div key={stat.lbl} className="text-center">
                  <p
                    className={`font-just text-[18px] sm:text-[22px]r`}
                    style={{ color: stat.color }}
                  >
                    {stat.val === "AXWELL" ? (
                      <span className="relative inline-block">
                        <span className="blur-[3.5px] select-none pointer-events-none opacity-40">
                          {stat.val}
                        </span>
                        <span className="absolute inset-0 flex items-center justify-center text-sm text-white/90 font-medium tracking-normal whitespace-nowrap">
                          Axwell
                        </span>
                      </span>
                    ) : (
                      stat.val
                    )}
                  </p>
                  <p className="text-[8px] uppercase tracking-wider text-white/30 mt-0.5">
                    {stat.lbl}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#0FB6AE] to-[#0FB6AE] px-8 py-4 text-[12px] font-medium uppercase tracking-wider text-[#0E010E] shadow-[0_4px_35px_rgba(15,182,174,0.35)] transition-all duration-300 hover:shadow-[0_6px_45px_rgba(15,182,174,0.55)] active:scale-[0.98] sm:w-auto sm:text-[13px]">
                <Ticket size={17} strokeWidth={2.5} />
                Buy Tickets Now
                <ChevronRight size={17} strokeWidth={2.5} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-full border border-white/15 bg-gradient-to-r from-white/[0.06] to-white/[0.02] px-8 py-4 text-[12px] font-medium uppercase tracking-wider text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-[#18060F]/40 hover:from-[#18060F]/10 hover:text-white active:scale-[0.98] sm:w-auto sm:text-[13px]"
              >
                Enter Site
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownIntroModal;
