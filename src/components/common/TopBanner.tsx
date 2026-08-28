"use client";

import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { EARLY_BIRD_ENDS_AT, isEarlyBirdActive } from "@/lib/earlyBird";

const END_MS = EARLY_BIRD_ENDS_AT.getTime();
const pad = (n: number) => String(n).padStart(2, "0");

const TopBanner = () => {
  const [active, setActive] = useState(false);
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    const tick = () => {
      setActive(isEarlyBirdActive());
      setRemaining(Math.max(0, END_MS - Date.now()));
    };
    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, []);

  if (!active) return null;

  const days = Math.floor(remaining / 86_400_000);
  const hours = Math.floor((remaining % 86_400_000) / 3_600_000);
  const minutes = Math.floor((remaining % 3_600_000) / 60_000);
  const seconds = Math.floor((remaining % 60_000) / 1000);

  const units =
    days > 0
      ? [
          { value: pad(days), label: "D" },
          { value: pad(hours), label: "H" },
          { value: pad(minutes), label: "M" },
          { value: pad(seconds), label: "S" },
        ]
      : [
          { value: pad(hours), label: "H" },
          { value: pad(minutes), label: "M" },
          { value: pad(seconds), label: "S" },
        ];

  return (
    <div className="relative z-30 w-full border-b border-[#0FB6AE]/20 bg-[#18060F]/95 text-white backdrop-blur-sm">
      <div className="mx-auto flex h-7 max-w-[1400px] items-center justify-center gap-2 px-3 sm:h-8 sm:gap-2.5 sm:px-4">
        <Sparkles size={10} className="shrink-0 text-[#0FB6AE] animate-pulse" />

        <p className="font-just text-[8px] font-medium uppercase tracking-wide whitespace-nowrap sm:text-[9px]">
          <span className="font-bold text-[#0FB6AE]">Early Bird</span>
          <span className="text-white/70"> · Ends In</span>
        </p>

        <div className="flex items-center gap-0.5 font-just text-[9px] font-bold tabular-nums sm:text-[10px]">
          {units.map((unit, i) => (
            <React.Fragment key={unit.label}>
              {i > 0 && <span className="text-[#0FB6AE]/50">:</span>}
              <span className="inline-flex min-w-[18px] items-center justify-center rounded border border-white/10 bg-white/[0.04] px-0.5 py-px sm:min-w-[20px]">
                {unit.value}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
