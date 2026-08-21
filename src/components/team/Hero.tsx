"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, UserRoundIcon } from "lucide-react";

interface CrewMember {
  id: string;
  name: string;
  role: string;
  img: string;
  bio: string;
}

const Hero: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<CrewMember | null>(null);

  const crew: CrewMember[] = [
    {
      id: "01",
      name: "Omer H. Paracha",
      role: "CEO",
      img: "/images/image8.jpeg",
      bio: "Omer H. Paracha is the visionary founder and executive producer driving OP Productions. With years of global media experience, he aligns planning, creative execution, and international distribution to guide groundbreaking cinematic campaigns from concept to delivery.",
    },
    {
      id: "02",
      name: "Muhammad Zouhaib",
      role: "MD",
      img: "/images/image3.jpeg",
      bio: "Muhammad Zouhaib leads day-to-day operations as Managing Director, translating vision into execution. He oversees production planning, partnerships, and internal workflows, ensuring every OP Productions project runs efficiently while upholding the studio's standards for quality and reliability.",
    },
    {
      id: "03",
      name: "Omar Hassan",
      role: "Executive Director",
      img: "",
      bio: "Omar Hassan provides executive direction across OP Productions' slate, shaping strategy and creative oversight. He builds key relationships, guides project development, and ensures every production aligns with the company's long-term vision and international ambitions.",
    },
    {
      id: "04",
      name: "Omar Ovais Akram",
      role: "Executive Director",
      img: "/images/image4.jpeg",
      bio: "Omar Ovais Akram drives executive planning and creative coordination at OP Productions. Working across departments, he streamlines decision-making, supports high-level partnerships, and keeps productions on course from early development through final delivery.",
    },
    {
      id: "05",
      name: "Saif Aly Khan",
      role: "Head Of Legal",
      img: "/images/image1.jpeg",
      bio: "Saif Aly Khan heads legal affairs at OP Productions, safeguarding contracts, intellectual property, and compliance. His expertise protects the studio's interests across film, events, and media ventures, ensuring every deal is secure and transparent.",
    },
    {
      id: "06",
      name: "Nadeem Kazmi",
      role: "Senior Manager",
      img: "/images/image2.jpeg",
      bio: "Nadeem Kazmi manages core operations as Senior Manager, coordinating teams, vendors, and schedules. His hands-on approach keeps complex productions organized and on budget, delivering smooth execution across films, live events, and commercial work.",
    },
    {
      id: "07",
      name: "Khairaza Khan",
      role: "Senior Manager",
      img: "/images/image7.jpeg",
      bio: "Khairaza Khan oversees production logistics as Senior Manager, handling planning, resources, and on-ground coordination. His attention to detail ensures every OP Productions event and shoot runs seamlessly from first call to final wrap.",
    },
    {
      id: "08",
      name: "Shahista Zohaib",
      role: "Manager",
      img: "/images/image5.jpeg",
      bio: "Shahista Zohaib manages daily operations and team coordination at OP Productions. She supports planning, communication, and administration across projects, keeping workflows organized and ensuring creative teams have everything needed to deliver their best work.",
    },
    {
      id: "09",
      name: "Solomon Yaqub",
      role: "Associate Manager",
      img: "/images/image6.jpeg",
      bio: "Solomon Yaqub assists in managing production activities and event operations at OP Productions. From scheduling to on-site support, he brings energy and reliability to every task, helping the crew deliver polished results consistently.",
    },
  ];

  return (
    <section className="relative w-full min-h-screen bg-black py-10 px-4 sm:px-6 md:px-10 flex flex-col items-center overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div
        className="absolute top-[-10%] left-[-10%] w-[400px] h-[350px] bg-[#0FB6AE]/40 rounded-full blur-[120px] pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="absolute top-[-10%] right-[-10%] w-[400px] h-[350px] bg-[#491833]/80 rounded-full blur-[120px] pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[350px] bg-[#0FB6AE]/40 rounded-full blur-[120px] pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[350px] bg-[#491833]/80 rounded-full blur-[120px] pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[1240px] flex flex-col items-start">
        {/* Section Heading */}
        <div className="flex flex-col items-center justify-center w-full mx-auto mb-10 md:mb-20 lg:mb-24">
          <span className="font-plus text-xs md:text-sm font-medium text-[#0FB6AE] uppercase mb-2">
            The Studio Team
          </span>
          <h2 className="font-plus text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase">
            THE <span className="text-[#0FB6AE]">CREW</span>
          </h2>
        </div>

        {/* Staggered Editorial Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 w-full">
          {crew.map((member, idx) => (
            <div
              key={member.id}
              onClick={() => setSelectedMember(member)}
              className={`flex flex-col items-start cursor-pointer group active:scale-[0.98] transition-transform duration-150 ${idx % 2 === 1 ? "md:mt-16" : ""}`}
            >
              {/* Portrait Image Frame - No shadows, no borders */}
              <div className="relative w-full aspect-[4/5] overflow-hidden mb-6 rounded-none bg-neutral-900">
                {member.img ? (
                  <img
                    loading="lazy"
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-neutral-800">
                    <div className="w-32 h-32 rounded-full bg-neutral-700 flex items-center justify-center">
                      <UserRoundIcon size={56} className="text-white/80" />
                    </div>
                  </div>
                )}
              </div>

              {/* Minimal Text Details and Accent ID */}
              <div className="flex items-start justify-between w-full px-1">
                <div className="flex flex-col">
                  {/* Member Name */}
                  <span className="font-plus text-2xl font-semibold text-white tracking-tight leading-tight group-hover:text-[#0FB6AE] transition-colors duration-300">
                    {member.name}
                  </span>
                  {/* Member Subdivision/Role */}
                  <span className="font-plus tracking-wide text-xs text-white/60 group-hover:text-white transition-colors duration-300 font-medium uppercase mt-1">
                    {member.role}
                  </span>
                </div>

                {/* Theme-compliant Cyan Numeric ID */}
                <span className="font-plus text-3xl font-black text-[#0FB6AE] leading-none tracking-tight select-none">
                  {member.id}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modern & Premium Detail Popup Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setSelectedMember(null)}
          >
            {/* Outer Container with exact high-rounding and clean gradient border */}
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative p-1 rounded-2xl bg-gradient-to-b from-[#491833] to-[#0FB6AE] max-w-sm w-full h-[500px] md:h-[520px] cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Inner content container */}
              <div className="relative w-full h-full rounded-2xl bg-[#0c030c] flex flex-col overflow-hidden">
                {/* 1. Upper Section: High-Contrast Banner Image */}
                <div className="relative w-full h-[310px] md:h-[320px] overflow-hidden flex-shrink-0">
                  {selectedMember.img ? (
                    <img
                      loading="lazy"
                      src={selectedMember.img}
                      alt={selectedMember.name}
                      className="w-full h-full object-cover object-top scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-neutral-800">
                      <UserRoundIcon size={96} className="text-white/70" />
                    </div>
                  )}
                  {/* Subtle shadows & bottom-fade gradient blending into the lower dark content block */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c030c] via-transparent to-black/35 z-10" />

                  {/* Top Left Glassmorphic Badge overlayed on image */}
                  <div className="absolute top-3 left-3 z-20 flex items-center space-x-1.5 bg-[#0FB6AE]/10 border border-[#0FB6AE]/30 px-3 py-1 rounded-full backdrop-blur-sm">
                    {/* <span className="w-1.5 h-1.5 rounded-full bg-[#0FB6AE] animate-pulse" /> */}
                    <span className="font-plus text-[10px] tracking-wide text-[#0FB6AE] uppercase font-medium">
                      OPENING ACT - {selectedMember.id}
                    </span>
                  </div>

                  {/* Top Right Close Button overlayed on image */}
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="absolute top-3 right-3 z-20 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-all duration-200 border border-white/10 cursor-pointer backdrop-blur-sm"
                  >
                    <X size={14} />
                  </button>
                </div>

                {/* 2. Overlap Typography Panel */}
                <div className="relative z-20 px-3 -mt-20 flex flex-col">
                  {/* Big Cyan Name */}
                  <h3 className="font-plus text-3xl font-black text-[#0FB6AE] tracking-tight leading-none uppercase drop-shadow-sm">
                    {selectedMember.name}
                  </h3>

                  {/* Pills */}
                  <div className="flex items-center space-x-2 mt-3">
                    <span className="bg-white/5 border border-white/10 px-3.5 py-1 rounded-full text-[10px] font-medium tracking-wide text-zinc-300 uppercase">
                      {selectedMember.id === "01" ? "EXECUTIVE" : "PRODUCTION"}
                    </span>
                    <span className="bg-white/5 border border-white/10 px-3.5 py-1 rounded-full text-[10px] font-medium tracking-wide text-zinc-300 uppercase">
                      {selectedMember.id === "01" ? "STRATEGY" : "OP CREW"}
                    </span>
                  </div>
                </div>

                {/* 3. Lower Content: Divider & About Section */}
                <div className="flex-grow px-4 pt-4 pb-4 flex flex-col justify-start items-start text-left z-20 bg-[#0c030c]">
                  <div className="w-full h-[1px] bg-white/10 mb-5" />

                  <span className="font-plus text-[10px] font-medium tracking-wider text-purple-400 uppercase mb-2">
                    About
                  </span>
                  <p className="font-plus text-xs md:text-sm text-slate-300 leading-relaxed font-light">
                    {selectedMember.bio}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
