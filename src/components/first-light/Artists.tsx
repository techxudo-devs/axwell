"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

import {
  FaInstagram,
  FaGlobe,
  FaSoundcloud,
  FaUser,
  FaYoutube,
} from "react-icons/fa";
import type { IconType } from "react-icons/lib";
import Image from "next/image";
import brohiImg from "@/assets/brohi2.png";
import hazey from "@/assets/hazey.png";
import shotbox from "@/assets/shotbox.png";
import axwell from "@/assets/axwell9.svg";
import ArtistDetailModal, {
  type Artist,
  type ArtistExtra,
  type SocialPlatform,
} from "./ArtistDetailModal";

const SOCIAL_ICON: Record<SocialPlatform, IconType> = {
  instagram: FaInstagram,
  globe: FaGlobe,
  soundcloud: FaSoundcloud,
  user: FaUser,
  youtube: FaYoutube,
};

const AXWELL_EXTRA: ArtistExtra = {
  tagline: [
    "Founding member of Swedish House Mafia",
    "5 billion+ streams globally",
  ],
  stats: [
    { value: "5B+", label: "Global Streams" },
    { value: "20+", label: "Years Headlining" },
    { value: "#1", label: "Paradise Again Chart Debut" },
    { value: "3", label: "Swedish House Mafia Members" },
  ],
  highlights: [
    "Swedish House Mafia",
    "Paradise Again",
    "One Last Tour",
    "Ultra",
    "Tomorrowland",
    "Coachella",
  ],
};

const ArtistsData: Artist[] = [
  // {
  //   artist: "MR Shotbox",
  //   role: "Opening Act-3rd",
  //   imageUrl: shotbox.src,
  //   bio: "Shotbox is Karachi's most ambitious alternative electronic music collective — an SECP-registered production venture that fuses fine art, kinetic sculptural installations, and MADRIX lighting technology with premium house music. Behind the decks, Mr. Shotbox delivers immersive sets spanning orchestral techno, melodic house, and cinematic soundscapes. The platform has hosted and collaborated with global headliners including Miss Monique, HOSH, Eelke Kleijn, Nick Devon, and Darin Epsilon, and has produced some of Pakistan's most visually and sonically ambitious electronic events to date. Shotbox is not just a DJ act — it is a complete production aesthetic.",
  //   genre: ["House", "Bass"],
  //   stage: "Main Stage",
  //   setTime: "6:00 PM",
  //   socials: [
  //     { platform: "youtube", url: "" },
  //     { platform: "instagram", url: "" },
  //   ],
  // },
  {
    artist: "Hazey",
    role: "Opening Act-2nd",
    imageUrl: hazey.src,
    bio: "Hazey is a pioneering British-Pakistani artist based in Islamabad and Pakistan's first female producer of progressive house. Since beginning her EDM journey in 2019, she has become a defining voice in Pakistan's underground electronic scene.Her international journey began in 2024 with her debut at Lost in the Clouds, the official afters of We Are Lost Festival in Sri Lanka, where Guy J, Chicola and Mike Rish headlined the main event. She returned to Sri Lanka in 2025 for Coastline Events alongside Ruben Karapetyan, followed by a 2026 headline performance for Beat Synth, Dr. Green & Friends. With multiple international appearances, Hazey has established herself as one of Pakistan's most internationally active electronic artist Her sound blends progressive, organic and deep house, combining deep emotion with melodic precision and a distinctly underground edge.",
    genre: ["Melodic", "Deep House"],
    stage: "Main Stage",
    setTime: "7:30 PM",
    socials: [
      {
        platform: "instagram",
        url: "https://www.instagram.com/hazeypk/?hl=en",
      },
      {
        platform: "soundcloud",
        url: "https://soundcloud.com/juiceboxmusic-in/juicebox-radio-194-hazey-pk?ref=clipboard&p=i&c=0&si=19DB07AC62344802B657FE68414A244F&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
      },
      {
        platform: "youtube",
        url: "https://www.youtube.com/watch?v=mB3hW0CgQEg",
      },
    ],
  },
  {
    artist: "Axwell",
    role: "Headliner",
    imageUrl: axwell.src,
    bio: `Axwell (Axel Christofer Hedfors) is a Swedish DJ and producer and a founding member of Swedish House Mafia, among the most influential acts in modern electronic music.
    
    Axwell  — known the world over as Axwell — is one of the most influential figures in the history of electronic music. A founding member of Swedish House Mafia alongside Steve Angello and Sebastian Ingrosso, he helped define an era of stadium-scale house music that reached billions of listeners across every continent.

His landmark tracks — 'In My Arms', 'I Found U', 'Feel the Vibe', and the Swedish House Mafia anthem 'Don't You Worry Child' — are among the most recognised dance records ever recorded, accumulating over 5 billion combined streams to date.

Beyond Swedish House Mafia, Axwell. has built a formidable solo and Axwell Λ Ingrosso catalogue, with releases on Def Jam, Axtone Records, and major streaming platforms globally.

He headlined the historic One Last Tour at Madison Square Garden and Tele2 Arena before Swedish House Mafia's triumphant return with the Grammy-nominated album Paradise Again in 2022 — debuting at #1 in Sweden and charting worldwide.

He remains a fixture at the world's most prestigious festivals including Ultra Miami, Tomorrowland, Coachella, and Creamfields.`,
    genre: ["Progressive", "Big Room"],
    stage: "Main Stage",
    setTime: "11:00 PM",
    socials: [
      { platform: "instagram", url: "https://www.instagram.com/axwell/?hl=en" },
    ],
    extra: AXWELL_EXTRA,
  },
  {
    artist: "Bilal Brohi",
    role: "Opening Act-1st",
    imageUrl: brohiImg.src,
    bio: "A veteran of Pakistan's electronic music scene since the early 2000s, Bilal Brohi studied Music Synthesis and Sound Design in Malaysia before building a reputation as one of the country's most technically accomplished house music DJs. He has performed internationally across Pakistan, Malaysia, Morocco, Turkey, and Sri Lanka alongside names including Anthony Pappa, Dave Seaman, Nick Devon, and Matthias Meyer. Known for seamless transitions and emotionally immersive sets, he has appeared at the Rod Music Festival, Firin Istanbul, and countless underground club nights — consistently delivering performances that bridge the gap between the casual listener and the devoted dance floor purist.",
    genre: ["Techno", "Underground"],
    stage: "Main Stage",
    setTime: "5:00 PM",
    socials: [
      { platform: "youtube", url: "https://www.youtube.com/@bilalbrohi" },
      { platform: "instagram", url: "https://www.instagram.com/bilalbrohi/" },
    ],
  },
];

const Artists = () => {
  const [activeIndex, setActiveIndex] = useState(2);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  // --- High Performance Cursor Tracking ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 250, damping: 25, mass: 0.1 });
  const springY = useSpring(mouseY, { stiffness: 250, damping: 25, mass: 0.1 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getCardStyles = (cardIndex: number) => {
    const len = ArtistsData.length;
    let diff = cardIndex - activeIndex;
    if (diff > len / 2) diff -= len;
    if (diff < -len / 2) diff += len;

    switch (diff) {
      case -2:
        return {
          transform: "translateX(-105%) scale(0.8)",
          zIndex: 10,
          opacity: 0.5,
        };
      case -1:
        return {
          transform: "translateX(-52%) scale(0.9)",
          zIndex: 20,
          opacity: 1,
        };
      case 0:
        return {
          transform: "translateX(0) scale(1.04)",
          zIndex: 30,
          opacity: 1,
        };
      case 1:
        return {
          transform: "translateX(52%) scale(0.9)",
          zIndex: 20,
          opacity: 1,
        };
      case 2:
        return {
          transform: "translateX(105%) scale(0.8)",
          zIndex: 10,
          opacity: 0.5,
        };
      default:
        return {
          transform: "translateX(0) scale(0)",
          zIndex: 0,
          opacity: 0,
          pointerEvents: "none" as const,
        };
    }
  };

  const handleCardClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    } else {
      setSelectedArtist(ArtistsData[index]);
    }
  };

  const goPrev = useCallback(() => {
    setActiveIndex(
      (prev) => (prev - 1 + ArtistsData.length) % ArtistsData.length,
    );
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % ArtistsData.length);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goPrev, goNext]);

  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goPrev();
      else goNext();
    }
  };

  return (
    <section
      id="artists"
      className={`relative w-full flex flex-col items-center overflow-hidden pt-24 px-4 font-just bg-[#04040A] text-white`}
    >
      <h2
        className={`font-just mb-14 text-[40px] md:text-[50px] lg:text-[56px] leading-none text-[#0FB6AE] text-center uppercase drop-shadow-[0_0_15px_rgba(15,182,174,0.3)] select-none`}
      >
        Artists Lineup
      </h2>

      <div
        className="relative w-full max-w-[1200px] h-[480px] flex items-center justify-center select-none outline-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative flex items-center justify-center w-full h-full scale-[0.8] sm:scale-90 md:scale-100 transition-transform duration-500 ease-out">
          {ArtistsData.map((card, index) => {
            const cardStyle = getCardStyles(index);
            const isCenter = index === activeIndex;

            return (
              <div
                key={`${card.artist}-${card.role}`}
                onClick={() => handleCardClick(index)}
                className="absolute w-[295px] h-[400px] rounded-[28px] border p-2 flex flex-col justify-between transition-all duration-700 ease-out select-none cursor-pointer shadow-[0_30px_70px_rgba(0,0,0,0.6)]"
                style={{
                  ...cardStyle,
                  borderColor: isCenter
                    ? "rgba(78, 205, 196, 0.4)"
                    : "rgba(24, 6, 15, 0.25)",
                  background:
                    "linear-gradient(135deg, rgba(35, 5, 55, 0.4) 0%, rgba(15, 0, 30, 0.2) 100%)",
                  backdropFilter: "blur(25px)",
                  WebkitBackdropFilter: "blur(25px)",
                }}
              >
                <div className="relative w-full h-[80%] z-10">
                  <div
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${card.artist} profile`}
                    onPointerEnter={(e) => {
                      if (e.pointerType === "mouse") {
                        setHoveredIndex(index);
                        const rect = e.currentTarget.getBoundingClientRect();
                        mouseX.set(e.clientX - rect.left);
                        mouseY.set(e.clientY - rect.top);
                      }
                    }}
                    onPointerLeave={(e) => {
                      if (e.pointerType === "mouse") {
                        setHoveredIndex(null);
                      }
                    }}
                    onPointerMove={(e) => {
                      if (e.pointerType === "mouse") {
                        const rect = e.currentTarget.getBoundingClientRect();
                        mouseX.set(e.clientX - rect.left);
                        mouseY.set(e.clientY - rect.top);
                      }
                    }}
                    className="group absolute inset-0 rounded-[20px] overflow-hidden bg-black shadow-md cursor-none"
                  >
                    <Image
                      src={card.imageUrl}
                      alt={`${card.artist} portrait`}
                      fill
                      priority
                      draggable={false}
                      className={`object-cover select-none brightness-95 contrast-[1.1] transition-transform duration-500 ${card.artist === "Axwell" ? "translate-y-2" : ""}`}
                    />

                    {/* --- Floating "View Profile" Tag --- */}
                    <AnimatePresence>
                      {hoveredIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                          }}
                          exit={{ opacity: 0, scale: 0 }}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            pointerEvents: "none",
                            zIndex: 100,
                            x: springX,
                            y: springY,
                            translateX: "-50%",
                            translateY: "-50%",
                          }}
                          className={`
                            w-24 h-24 
                            rounded-full 
                            bg-[#0FB6AE] 
                            text-black 
                            flex items-center justify-center 
                            text-center 
                            text-[16px] 
                            font-medium 
                            uppercase 
                            leading-4 
                            tracking-wider
                            shadow-[0_0_30px_rgba(15,182,174,0.8)]
                            font-just
                          `}
                        >
                          {(() => {
                            const len = ArtistsData.length;
                            let diff = index - activeIndex;
                            if (diff > len / 2) diff -= len;
                            if (diff < -len / 2) diff += len;
                            if (diff < 0) return <ChevronLeft size={32} strokeWidth={2.5} />;
                            if (diff > 0) return <ChevronRight size={32} strokeWidth={2.5} />;
                            return <>View <br /> Profile</>;
                          })()}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex gap-2 z-50">
                    {card.socials.map((social, i) => {
                      const SocialIcon = SOCIAL_ICON[social.platform];
                      return (
                        <a
                          key={i}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-9 h-9 rounded-full bg-[#0FB6AE] text-black flex items-center justify-center border border-[#0a0010] hover:scale-110 transition-transform duration-200 cursor-pointer"
                        >
                          <SocialIcon size={18} />
                        </a>
                      );
                    })}
                  </div>
                </div>

                <div
                  className="flex-1 flex flex-col items-center justify-center text-center px-1 pt-3 pb-1"
                  onClick={(e) => {
                    if (isCenter) {
                      e.stopPropagation();
                      setSelectedArtist(ArtistsData[index]);
                    }
                  }}
                >
                  <h3
                    className={`font-just text-[#0FB6AE] text-[23px] mt-4 font-medium leading-noner relative`}
                  >
                    {card.artist === "Axwell" ? (
                      <span className="relative inline-block">
                        <span className="blur-[3.5px] select-none pointer-events-none opacity-40">
                          {card.artist}
                        </span>
                        <span className="absolute inset-0 flex items-center justify-center text-white/90 font-medium tracking-normal whitespace-nowrap">
                          Axwell
                        </span>
                      </span>
                    ) : (
                      card.artist
                    )}
                  </h3>
                  <p className="text-white/80 text-[13px] tracking-normal mt-1.5 font-medium">
                    {card.role}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-5 sm:gap-8">
        <button
          type="button"
          onClick={goPrev}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#0FB6AE]/30 bg-[#0FB6AE]/10 text-[#0FB6AE] transition-all duration-300 hover:scale-105 hover:border-[#0FB6AE] hover:bg-[#0FB6AE]/20 active:scale-95 cursor-pointer"
        >
          <ChevronLeft size={22} strokeWidth={2.5} />
        </button>

        <div className="flex items-center gap-2.5">
          {ArtistsData.map((card, index) => (
            <button
              key={`dot-${card.artist}`}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${index === activeIndex ? "w-8 bg-[#0FB6AE] shadow-[0_0_12px_rgba(15,182,174,0.5)]" : "w-2.5 bg-white/25 hover:bg-white/45"}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={goNext}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#0FB6AE]/30 bg-[#0FB6AE]/10 text-[#0FB6AE] transition-all duration-300 hover:scale-105 hover:border-[#0FB6AE] hover:bg-[#0FB6AE]/20 active:scale-95 cursor-pointer"
        >
          <ChevronRight size={22} strokeWidth={2.5} />
        </button>
      </div>

      <p className="mt-3 text-center text-xs uppercase tracking-wider text-white/35 select-none">
        Click cards, use arrows, or swipe to browse
      </p>

      {selectedArtist && (
        <ArtistDetailModal
          artist={selectedArtist}
          onClose={() => setSelectedArtist(null)}
        />
      )}
    </section>
  );
};

export default Artists;
