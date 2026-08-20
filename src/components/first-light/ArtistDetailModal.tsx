"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ArrowUpRight, Disc3 } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaInstagram, FaGlobe, FaSoundcloud, FaUser, FaYoutube } from "react-icons/fa";
import type { IconType } from "react-icons/lib";

gsap.registerPlugin(useGSAP);

export type SocialPlatform = "instagram" | "globe" | "soundcloud" | "user" | "youtube";

export interface ArtistSocial {
  platform: SocialPlatform;
  url: string;
}

export interface ArtistStat {
  value: string;
  label: string;
}

/** Optional spotlight info — currently only used for the headliner (Axwell). */
export interface ArtistExtra {
  tagline?: string[];
  stats?: ArtistStat[];
  highlights?: string[];
}

export interface Artist {
  artist: string;
  role: string;
  imageUrl: string;
  bio: string;
  genre: string[];
  stage: string;
  setTime: string;
  socials: ArtistSocial[];
  extra?: ArtistExtra;
}

const SOCIAL_META: Record<SocialPlatform, { icon: IconType; label: string }> = {
  instagram: { icon: FaInstagram, label: "Instagram" },
  globe: { icon: FaGlobe, label: "Website" },
  soundcloud: { icon: FaSoundcloud, label: "SoundCloud" },
  user: { icon: FaUser, label: "Profile" },
  youtube: { icon: FaYoutube, label: "YouTube" },
};

interface ArtistDetailModalProps {
  artist: Artist;
  onClose: () => void;
}

const ArtistDetailModal = ({ artist, onClose }: ArtistDetailModalProps) => {
  const root = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { contextSafe } = useGSAP(
    () => {
      if (!mounted || !root.current) return;

      gsap
        .timeline()
        .from(".modal-backdrop", {
          autoAlpha: 0,
          duration: 0.3,
          ease: "power2.out",
        })
        .from(
          ".modal-glow",
          { autoAlpha: 0, scale: 0.6, duration: 0.6, ease: "power2.out" },
          "-=0.1"
        )
        .from(
          ".modal-card",
          {
            y: 60,
            scale: 0.9,
            autoAlpha: 0,
            duration: 0.55,
            ease: "back.out(1.4)",
          },
          "-=0.45"
        )
        .from(
          ".modal-stagger",
          {
            y: 22,
            autoAlpha: 0,
            duration: 0.4,
            stagger: 0.06,
            ease: "power2.out",
          },
          "-=0.2"
        );

      // Continuous neon shimmer on profile card borders.
      gsap.to(".artist-modal-neon, .artist-modal-topbar", {
        backgroundPosition: "300% 0",
        duration: 3,
        ease: "none",
        repeat: -1,
      });
      gsap.to(".artist-modal-side-rail", {
        backgroundPosition: "0% 300%",
        duration: 3.5,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: root, dependencies: [mounted], revertOnUpdate: true }
  );

  const handleClose = contextSafe(() => {
    gsap
      .timeline({ onComplete: onClose })
      .to(".modal-card", {
        y: 40,
        scale: 0.94,
        autoAlpha: 0,
        duration: 0.3,
        ease: "power2.in",
      })
      .to(
        [".modal-glow", ".modal-backdrop"],
        { autoAlpha: 0, duration: 0.3, ease: "power2.in" },
        "-=0.2"
      );
  });

  useEffect(() => {
    window.__lenis?.stop();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.__lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      ref={root}
      className={`font-just fixed inset-0 z-100 flex items-center justify-center p-4`}
      role="dialog"
      aria-modal="true"
      aria-label={`${artist.artist} profile`}
    >
      {/* Backdrop */}
      <div
        className="modal-backdrop absolute inset-0 bg-[#02010A]/85 backdrop-blur-md"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 35%, rgba(24,6,15,0.2), transparent 55%)",
        }}
        onClick={handleClose}
      />

      {/* Neon glow halo */}
      <div
        className="modal-glow pointer-events-none absolute h-[560px] w-[460px] rounded-full opacity-70 blur-[90px]"
        style={{
          background:
            "radial-gradient(circle, rgba(15,182,174,0.3), rgba(24,6,15,0.28) 60%, transparent 75%)",
        }}
      />

      {/* Card — animated gradient border */}
      <div className="modal-card-wrap relative w-full max-w-[440px] rounded-3xl p-[3px]">
        <div
          className="artist-modal-neon pointer-events-none absolute inset-0 rounded-3xl"
          style={{
            background:
              "linear-gradient(90deg,#0FB6AE,#ffffff,#a855f7,#0FB6AE,#18060F,#0FB6AE,#ffffff)",
            backgroundSize: "300% 100%",
          }}
        />
      <div className="modal-card relative flex h-[min(90vh,760px)] w-full flex-col overflow-hidden rounded-[21px] bg-linear-to-b from-[#1a0025] via-[#120018] to-[#02010A] shadow-[0_0_60px_rgba(15,182,174,0.2)]">
        {/* Animated side borders */}
        <div
          className="artist-modal-side-rail pointer-events-none absolute left-0 top-0 bottom-0 z-20 w-[3px] rounded-l-[21px]"
          style={{
            background: "linear-gradient(180deg,#0FB6AE,#ffffff,#a855f7,#0FB6AE,#18060F,#0FB6AE)",
            backgroundSize: "100% 300%",
          }}
        />
        <div
          className="artist-modal-side-rail pointer-events-none absolute right-0 top-0 bottom-0 z-20 w-[3px] rounded-r-[21px]"
          style={{
            background: "linear-gradient(180deg,#18060F,#a855f7,#0FB6AE,#ffffff,#0FB6AE,#18060F)",
            backgroundSize: "100% 300%",
          }}
        />

        {/* Animated neon top bar */}
        <div className="relative z-20 h-[5px] w-full overflow-hidden rounded-t-[21px]">
          <div
            className="artist-modal-topbar absolute inset-0"
            style={{
              background: "linear-gradient(90deg,#0FB6AE,#ffffff,#a855f7,#0FB6AE,#18060F,#0FB6AE,#ffffff)",
              backgroundSize: "300% 100%",
            }}
          />
        </div>

        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="absolute right-4 top-5 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/70 backdrop-blur-sm transition-all duration-300 hover:rotate-90 hover:border-[#18060F] hover:text-[#18060F] cursor-pointer"
        >
          <X size={16} />
        </button>

        <div
          data-lenis-prevent
          className="scrollbar-none relative z-10 min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain"
        >
        {/* Hero image */}
        <div className="relative h-[320px] w-full overflow-hidden">
          <Image
            src={artist.imageUrl}
            alt={artist.artist}
            fill
            priority
            draggable={false}
            className={`object-cover brightness-95 contrast-[1.05] transition-transform duration-500 ${
              artist.artist === "Axwell" ? "scale-125" : ""
            }`}
            // className={`object-cover brightness-95 contrast-[1.05] transition-transform duration-500 ${
            //   artist.artist === "Axwell" ? "scale-110" : ""
            // }`}
          />
          {/* Fade into the card body */}
          <div className="absolute inset-0 bg-linear-to-t from-[#120018] via-[#120018]/30 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-[#120018]/40 via-transparent to-[#120018]/20" />

          {/* Role badge */}
          <span
            className="modal-stagger absolute left-6 top-6 inline-flex items-center gap-1.5 rounded-full border border-[#0FB6AE]/30 bg-[#0FB6AE]/10 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-[#0FB6AE] backdrop-blur-sm"
          >
            <Disc3 size={11} />
            {artist.role}
          </span>

          {/* Name overlapping bottom of image */}
          <div className="absolute inset-x-0 bottom-0 px-6 pb-4">
            <h3
              className={`font-just modal-stagger text-[52px] leading-[0.85] text-[#0FB6AE]`}
              style={{ textShadow: "0 0 25px rgba(15,182,174,0.45)" }}
            >
              {artist.artist === "Axwell" ? (
                <span className="relative inline-block">
                  <span className="select-none pointer-events-none">
                    {artist.artist}
                  </span>
                  {/* <span className="absolute inset-0 flex items-center justify-center text-white/90 font-medium text-4xl tracking-normal whitespace-nowrap pl-10">
                    Axwell
                  </span> */}
                </span>
              ) : (
                artist.artist
              )}
            </h3>
            <div className="modal-stagger mt-2 flex flex-wrap gap-2">
              {artist.genre.map((g) => (
                <span
                  key={g}
                  className="rounded-full border border-white/30 bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="relative z-10 bg-linear-to-b from-[#1a0025] via-[#120018] to-[#02010A] px-6 pb-7 pt-5">
          {/* Bio */}
          <p className="modal-stagger mb-1 text-[11px] font-medium uppercase tracking-wider text-white/50">
            About
          </p>
          <div className="modal-stagger space-y-3">
            {artist.bio
              .split(/\n\s*\n/)
              .map((paragraph) => paragraph.trim())
              .filter(Boolean)
              .map((paragraph, index) => (
                <p
                  key={index}
                  className="text-sm leading-relaxed text-white/75"
                >
                  {paragraph.split(/(Axwell|AXWELL)/g).map((part, i) => {
                    if (part === "Axwelll" || part === "AXWELlL") {
                      return (
                        <span key={i} className="relative inline-block mx-1 translate-y-[1px]">
                          <span className="blur-[3.5px] select-none pointer-events-none opacity-40">
                            {part}
                          </span>
                          <span className="absolute inset-0 flex items-center justify-center text-[9px] text-white/90 font-medium tracking-tight whitespace-nowrap">
                            Axwell
                          </span>
                        </span>
                      );
                    }
                    return part;
                  })}
                </p>
              ))}
          </div>

          {/* Tagline — short italic accent lines (headliner spotlight) */}
          {artist.extra?.tagline && (
            <div className="modal-stagger mt-4 border-l-2 border-[#18060F]/50 pl-3">
              {artist.extra.tagline.map((line) => (
                <p key={line} className="text-sm italic leading-snug text-[#18060F]/90">
                  {line}
                </p>
              ))}
            </div>
          )}

          {/* Career stats grid (headliner spotlight) */}
          {artist.extra?.stats && (
            <div className="modal-stagger mt-6 grid grid-cols-2 gap-3">
              {artist.extra.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/10 bg-white/3 px-4 py-3 transition-colors duration-300 hover:border-[#0FB6AE]/40"
                >
                  <p
                    className={`font-just text-[30px] leading-none text-[#0FB6AE]`}
                    style={{ textShadow: "0 0 18px rgba(15,182,174,0.4)" }}
                  >
                    {stat.value}
                  </p>
                  <p className="mt-1.5 text-[10px] font-medium uppercase tracking-wider text-white/50">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Known For — notable acts & festivals (headliner spotlight) */}
          {artist.extra?.highlights && (
            <>
              <p className="modal-stagger mb-2 mt-6 text-[11px] font-medium uppercase tracking-wider text-white/50">
                Known For
              </p>
              <div className="modal-stagger flex flex-wrap gap-2">
                {artist.extra.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="rounded-full border border-[#0FB6AE]/25 bg-[#0FB6AE]/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#0FB6AE]/90"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </>
          )}

          {/* Socials */}
          <p className="modal-stagger mb-2 mt-6 text-[11px] font-medium uppercase tracking-wider text-white/50">
            Socials
          </p>
          <div className="modal-stagger flex flex-wrap gap-2.5">
            {artist.socials.map((social) => {
              const meta = SOCIAL_META[social.platform];
              const SocialIcon = meta.icon;
              return (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/3 px-3.5 py-2.5 text-sm font-medium text-white/80 transition-all duration-300 hover:border-[#0FB6AE]/50 hover:bg-[#0FB6AE]/10 hover:text-[#0FB6AE]"
                >
                  <SocialIcon size={16} />
                  <span>{meta.label}</span>
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </a>
              );
            })}
          </div>
        </div>
        </div>
      </div>
      </div>
    </div>,
    document.body
  );
};

export default ArtistDetailModal;
