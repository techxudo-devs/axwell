"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import EventCountdown from "./EventCountdown";
import { EARLY_BIRD_ENDS_AT, isEarlyBirdActive } from "@/lib/earlyBird";

const EarlyBirdCountdown = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const sync = () => setActive(isEarlyBirdActive());
    sync();
    const interval = window.setInterval(sync, 1000);
    return () => window.clearInterval(interval);
  }, []);

  if (!active) return null;

  return (
    <div className="group relative mb-8 flex w-full max-w-[850px] flex-col items-center justify-center gap-3 overflow-hidden px-4 py-4 sm:flex-row sm:gap-6 sm:px-8">
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
        onComplete={() => setActive(false)}
        className="scale-[0.85] sm:scale-90 lg:scale-100"
      />
    </div>
  );
};

export default EarlyBirdCountdown;
