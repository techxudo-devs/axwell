"use client";

import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

// ============================================================
// CONFIG — everything is automatic, no manual switching needed
// ============================================================
// Countdown starts on its own at this moment and runs for 48 hours.
// Before launch  → placeholder text ("Will Be Displayed Soon")
// After launch   → live 48h countdown
// After 48 hours → bar hides itself completely
const COUNTDOWN_START = "2026-08-22T17:00:00+05:00";

const DURATION_MS = 48 * 60 * 60 * 1000;
const START_MS = new Date(COUNTDOWN_START).getTime();
const END_MS = START_MS + DURATION_MS;
// ============================================================

const formatUnit = (value: number) => String(value).padStart(2, "0");

const TopBanner = () => {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  // null (pre-hydration) renders as waiting to avoid SSR mismatch
  const phase =
    now === null || now < START_MS ? "waiting" : now < END_MS ? "live" : "expired";

  // Before launch the timer sits at the full 48h; once live it ticks down
  const shown = phase === "live" ? Math.max(0, END_MS - (now ?? START_MS)) : DURATION_MS;
  const hours = Math.floor(shown / 3_600_000);
  const minutes = Math.floor((shown % 3_600_000) / 60_000);
  const seconds = Math.floor((shown % 60_000) / 1000);

  // Hide completely once the offer window has passed
  if (phase === "expired") return null;

  return (
    <div className="relative z-[70] w-full overflow-hidden border-b border-[#0FB6AE]/25 bg-gradient-to-r from-[#18060F] via-[#2A0A1E] to-[#18060F] text-white">
      {/* Teal glow accents */}
      <div className="absolute -top-8 left-1/4 h-16 w-64 rounded-full bg-[#0FB6AE]/15 blur-3xl pointer-events-none" />
      <div className="absolute -top-8 right-1/4 h-16 w-64 rounded-full bg-[#0FB6AE]/10 blur-3xl pointer-events-none" />

      <div className="relative flex items-center justify-center gap-3 px-4 py-2.5 select-none">
        <Sparkles size={14} className="text-[#0FB6AE] shrink-0 animate-pulse" />

        <p className="font-just text-[10px] sm:text-xs font-medium uppercase tracking-wider whitespace-nowrap">
          <span className="text-[#0FB6AE] font-bold">Early Bird Discount</span>
          <span className="text-white/80"> Ends In</span>
        </p>

        {/* Countdown */}
        <div className="flex items-center gap-1 font-just text-[11px] sm:text-sm font-bold tabular-nums">
          {[
            { value: formatUnit(hours), label: "HRS" },
            { value: formatUnit(minutes), label: "MIN" },
            { value: formatUnit(seconds), label: "SEC" },
          ].map((unit, i) => (
            <React.Fragment key={unit.label}>
              {i > 0 && <span className="text-[#0FB6AE]">:</span>}
              <div className="flex flex-col items-center">
                <span
                  className={`inline-flex min-w-[26px] sm:min-w-[30px] items-center justify-center rounded-md border px-1 py-0.5 ${
                    phase === "live"
                      ? "border-white/15 bg-white/5 shadow-[0_0_12px_rgba(15,182,174,0.2)]"
                      : "border-white/10 bg-white/[0.03] opacity-70"
                  }`}
                >
                  {unit.value}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
