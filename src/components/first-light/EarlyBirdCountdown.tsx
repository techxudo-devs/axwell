"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import EventCountdown from "./EventCountdown";

// Early Bird discount window closes 48h after sale start (22 Aug 2026, 5:00 PM PKT)
const EARLY_BIRD_ENDS_AT = new Date("2026-08-24T17:00:00+05:00");

const EarlyBirdCountdown = () => {
  const [expired, setExpired] = useState(false);

  // Hide entirely once the Early Bird window has passed
  useEffect(() => {
    if (Date.now() >= EARLY_BIRD_ENDS_AT.getTime()) setExpired(true);
  }, []);

  if (expired) return null;

  return (
    <div className="group relative mb-8 flex w-full max-w-[850px] flex-col items-center justify-center gap-3 overflow-hidden px-4 py-4 sm:flex-row sm:gap-6 sm:px-8">
      {/* Teal glow accents */}
      <div className="pointer-events-none absolute -top-12 left-1/4 h-20 w-56 rounded-full bg-[#0FB6AE]/10 blur-3xl" />
      <div className="pointer-events-none absolute -top-12 right-1/4 h-20 w-56 rounded-full bg-[#18060F]/15 blur-3xl" />

      <p className="relative select-none text-center text-[9px] font-medium uppercase tracking-wider whitespace-nowrap min-[390px]:text-[10px] sm:text-[11px]">
        <Sparkles
          size={13}
          className="mr-1.5 inline-block shrink-0 animate-pulse align-[-2px] text-[#0FB6AE]"
        />
        <span className="font-bold text-[#0FB6AE]">Early Bird Discount</span>
        <span className="text-white/80"> Ends In</span>
      </p>

      <EventCountdown
        compact
        targetDate={EARLY_BIRD_ENDS_AT}
        maxDurationMs={48 * 60 * 60 * 1000}
        onComplete={() => setExpired(true)}
        className="scale-[0.85] sm:scale-90 lg:scale-100"
      />
    </div>
  );
};

export default EarlyBirdCountdown;
