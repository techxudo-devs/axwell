"use client";

import { useEffect, useState, useRef } from "react";

const DEFAULT_TARGET = new Date(2026, 8, 19, 17, 0, 0).getTime();

type CountdownUnit = {
  value: number;
  label: string;
  accent: "lime" | "pink";
  flip?: boolean;
};

interface EventCountdownProps {
  compact?: boolean;
  className?: string;
  targetDate?: Date;
  onComplete?: () => void;
  /** Never display more than this much remaining time (ms) */
  maxDurationMs?: number;
}

const EventCountdown = ({
  compact = false,
  className = "",
  targetDate,
  onComplete,
  maxDurationMs,
}: EventCountdownProps) => {
  const targetTime = useRef(targetDate ? targetDate.getTime() : DEFAULT_TARGET);

  const getTimeLeft = () => {
    let diff = targetTime.current - Date.now();
    if (maxDurationMs !== undefined && diff > maxDurationMs) {
      diff = maxDurationMs;
    }
    return Math.max(0, Math.floor(diff / 1000));
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0 && onComplete) {
      onComplete();
    }
  }, [timeLeft, onComplete]);

  const d = Math.floor(timeLeft / (24 * 3600));
  const h = Math.floor((timeLeft % (24 * 3600)) / 3600);
  const m = Math.floor((timeLeft % 3600) / 60);
  const s = timeLeft % 60;

  const countdown: CountdownUnit[] = [
    { value: d, label: "Days", accent: "lime" },
    { value: h, label: "Hours", accent: "pink" },
    { value: m, label: "Mins", accent: "lime" },
    { value: s, label: "Secs", accent: "pink" },
  ];

  return (
    <div
      className={`relative flex items-center justify-center gap-1 sm:gap-1.5 ${className}`}
      aria-label="Countdown"
    >
      {countdown.map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-1 sm:gap-1.5">
          <div className="flex flex-col items-center">
            <div
              className={`hero-countdown-box relative flex items-center justify-center ${
                compact
                  ? "h-10 w-10 rounded-xl min-[390px]:h-11 min-[390px]:w-11 sm:h-12 sm:w-12 sm:rounded-2xl"
                  : "h-[68px] w-[68px] rounded-2xl sm:h-[88px] sm:w-[88px] sm:rounded-3xl"
              } ${unit.accent === "lime" ? "hero-box-lime" : "hero-box-pink"} ${
                unit.flip ? "hero-flip" : ""
              }`}
            >
              <span
                className={`font-just relative z-10 ${
                  compact
                    ? "text-[22px] min-[390px]:text-[24px] sm:text-[28px]"
                    : "text-[34px] sm:text-[46px]"
                } ${
                  unit.accent === "lime"
                    ? "text-[#0FB6AE] drop-shadow-[0_0_12px_rgba(15,182,174,0.5)]"
                    : "text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]"
                }`}
              >
                {String(unit.value).padStart(2, "0")}
              </span>
            </div>
            <span
              className={`mt-1 font-medium uppercase tracking-wider text-white/40 ${
                compact
                  ? "text-[6px] min-[390px]:text-[7px] sm:mt-1.5 sm:text-[8px]"
                  : "mt-2.5 text-[8px] sm:text-[9px]"
              }`}
            >
              {unit.label}
            </span>
          </div>
          {i < countdown.length - 1 && (
            <span
              className={`-mt-4 font-thin sm:-mt-5 ${
                compact ? "text-sm min-[390px]:text-base sm:text-lg" : "text-xl sm:text-3xl"
              } ${i % 2 === 0 ? "text-[#0FB6AE]/30" : "text-white/30"}`}
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default EventCountdown;
