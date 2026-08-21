"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa6";

const WHATSAPP_LINK = "https://wa.me/923008204263";

const WhatsAppButton = () => {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-6 right-6 z-[60] flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#0FB6AE] to-[#0A726C] text-white shadow-[0_4px_24px_rgba(15,182,174,0.45)] transition-all duration-300 hover:scale-110 hover:shadow-[0_6px_32px_rgba(15,182,174,0.65)] active:scale-95 cursor-pointer"
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#0FB6AE]/50 animate-ping pointer-events-none" />

      <FaWhatsapp size={28} className="relative z-10 sm:w-8 sm:h-8 drop-shadow-md" />

      {/* Tooltip (desktop only) */}
      <span className="hidden md:flex absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap items-center bg-[#0A0A10]/95 border border-white/10 text-white text-xs font-medium tracking-wide px-3.5 py-2 rounded-full opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none backdrop-blur-md">
        Chat with us
      </span>
    </a>
  );
};

export default WhatsAppButton;
