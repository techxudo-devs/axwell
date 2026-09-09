"use client";

import { ChevronRight } from "lucide-react";

const TICKETWALA_URL = "https://ticketwala.pk/event/first-light-axwell-6005";

const TopBanner = () => {
  return (
    <div className="relative z-30 w-full border-b border-[#0FB6AE]/20 bg-[#18060F]/95 text-white backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0FB6AE]/50 to-transparent opacity-80" />

      <div className="mx-auto flex h-7 max-w-[1400px] items-center justify-center gap-2 px-3 sm:h-8 sm:gap-3 sm:px-4">
        <p className="font-just text-[8px] font-medium uppercase tracking-wide whitespace-nowrap sm:text-[9px]">
          <span className="font-bold text-[#0FB6AE]">First Light Youth Access</span>
          <span className="text-white/60"> · Special Discount · </span>
          <span className="font-bold text-white">PKR 12,500</span>
        </p>

        <a
          href={TICKETWALA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-0.5 rounded-full bg-[#0FB6AE] px-2 py-0.5 text-[7px] font-medium uppercase tracking-wider text-[#0E010E] transition-all hover:bg-white active:scale-95 sm:gap-1 sm:px-2.5 sm:py-1 sm:text-[8px]"
        >
          Get Ticket
          <ChevronRight size={10} strokeWidth={2.5} className="sm:h-[11px] sm:w-[11px]" />
        </a>
      </div>
    </div>
  );
};

export default TopBanner;
