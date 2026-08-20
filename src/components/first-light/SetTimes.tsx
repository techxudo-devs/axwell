"use client";

import React from "react";
import { Sun, Music, Mic2, Star } from "lucide-react";

const setTimes = [
  { time: "16:00", label: "Gates Open", icon: <Sun size={14} />, type: "gate" as const },
  { time: "19:00", end: "19:45", label: "Mahnoor", icon: <Music size={14} />, type: "set" as const },
  { time: "20:20", end: "21:05", label: "Shotbox", icon: <Music size={14} />, type: "set" as const },
  { time: "21:25", end: "22:15", label: "Bilal Brohi", icon: <Mic2 size={14} />, type: "support" as const },
  { time: "22:45", end: "00:00", label: "AXWELL", icon: <Star size={14} />, type: "headliner" as const },
];

const SetTimes = () => {
  return (
    <section className="relative w-full bg-[#020109] overflow-hidden px-4 py-14 md:py-16 font-just">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(15,182,174,0.04)_0%,_transparent_70%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-10 md:mb-14">
          <div>
            <span className="font-just text-[10px] md:text-xs uppercase tracking-wider text-[#0FB6AE]/50 block mb-2">
              4 Sep 2026 · DHA Golf Club, Karachi
            </span>
            <h2 className="font-just text-3xl sm:text-4xl md:text-5xl text-[#0FB6AE] leading-none tracking-tight">
              Set Times
            </h2>
          </div>
          <p className="font-just text-[10px] md:text-xs text-white/25 tracking-wide uppercase">
            Gates 16:00 · Curfew 00:00
          </p>
        </div>

        {/* Horizontal timeline bar */}
        <div className="relative mb-8 md:mb-10">
          {/* Track */}
          <div className="w-full h-1 rounded-full bg-white/[0.06] overflow-hidden">
            <div className="h-full w-full rounded-full bg-gradient-to-r from-[#0FB6AE]/40 via-[#0FB6AE]/20 to-[#0FB6AE]/40" />
          </div>
          {/* Dot markers on the track */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex justify-between px-0">
            {setTimes.map((_, i) => {
              const leftPct = [0, 21, 41, 61, 81][i];
              return (
                <div
                  key={i}
                  className="absolute -translate-x-1 -translate-y-1.5"
                  style={{ left: `${leftPct}%` }}
                >
                  <div className={`w-3 h-3 rounded-full border-2 ${
                    i === setTimes.length - 1
                      ? "bg-[#0FB6AE] border-[#0FB6AE] shadow-[0_0_10px_rgba(15,182,174,0.5)]"
                      : "bg-[#0c0c14] border-white/20"
                  }`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 md:gap-3">
          {setTimes.map((item, i) => {
            const isHeadliner = item.type === "headliner";
            const isSupport = item.type === "support";

            return (
              <div
                key={i}
                className={`group relative rounded-xl md:rounded-2xl p-3.5 md:p-4 transition-all duration-300 ${
                  isHeadliner
                    ? "col-span-2 sm:col-span-3 md:col-span-1 bg-gradient-to-b from-[#0FB6AE]/[0.12] to-[#0FB6AE]/[0.03] border border-[#0FB6AE]/25 shadow-[0_0_30px_rgba(15,182,174,0.06)]"
                    : isSupport
                    ? "bg-white/[0.04] border border-white/[0.08]"
                    : "bg-white/[0.02] border border-white/[0.05]"
                } hover:bg-white/[0.06]`}
              >
                {/* Time */}
                <div className="flex items-baseline gap-1.5 mb-2">
                  <span className={`font-just text-base sm:text-lg md:text-xl font-bold ${
                    isHeadliner ? "text-[#0FB6AE]" : "text-white/80"
                  }`}>
                    {item.time}
                  </span>
                  {item.end && (
                    <span className={`font-just text-xs ${isHeadliner ? "text-[#0FB6AE]/40" : "text-white/20"}`}>
                      {item.end}
                    </span>
                  )}
                </div>

                {/* Divider */}
                <div className={`w-full h-px mb-2.5 ${isHeadliner ? "bg-[#0FB6AE]/15" : "bg-white/[0.06]"}`} />

                {/* Label + icon */}
                <div className="flex items-center gap-1.5">
                  <span className={isHeadliner ? "text-[#0FB6AE]/70" : "text-white/30"}>
                    {item.icon}
                  </span>
                  <span className={`font-just text-xs md:text-sm truncate ${
                    isHeadliner ? "text-white font-medium" : "text-white/50"
                  }`}>
                    {item.label}
                  </span>
                </div>

                {/* Headliner glow */}
                {isHeadliner && (
                  <div className="absolute -top-px left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#0FB6AE]/50 to-transparent" />
                )}
              </div>
            );
          })}
        </div>

        {/* Prayer note */}
        <p className="font-just text-xs md:text-sm text-white text-center mt-6 md:mt-8 tracking-wide">
          15-min prayer breaks (Asr 17:00 · Maghrib 18:45 · Isha 20:05) built into changeovers — gates stay open
        </p>
      </div>
    </section>
  );
};

export default SetTimes;
