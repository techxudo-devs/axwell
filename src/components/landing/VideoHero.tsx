"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const videos = [
  {
    src: "/videos/echoboomers.mp4",
    title: "ECHO BOOMERS",
    tags: ["Movie", "Short - Feature"],
    year: "2020",
    duration: "1 hr 34 m",
    genre: "Action • Crime • Drama",
    rating: 5,
    watchUrl: "https://www.imdb.com/title/tt4353270/",
    description:
      "Based on a true story, five college graduates decide the best way to get back at the unfair economy and live the life they've always wanted is to steal from Chicago's richest and give to themselves.",
  },
  {
    src: "/videos/michelshort.mp4",
    title: "KING OF POP",
    tags: ["Documentary", "Short"],
    year: "2026",
    duration: "2 hr 7 m",
    genre: "Documentary • Drama • History",
    rating: 5,
    watchUrl: "https://www.imdb.com/title/tt11378946/",
    description:
      "The early life of musician Michael Jackson, from the discovery of his talent as the lead of the Jackson Five to the artist whose creative ambition fueled a pursuit to become the biggest entertainer in the world.",
  },
];

const VideoHero: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  // Second video is heavy (~11MB): don't download it on initial page
  // load — prefetch it in the background once the page has settled.
  const [loadSecond, setLoadSecond] = useState(false);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  useEffect(() => {
    const idle =
      typeof window !== "undefined" && "requestIdleCallback" in window
        ? window.requestIdleCallback
        : (cb: () => void) => window.setTimeout(cb, 2500);
    const cancel =
      typeof window !== "undefined" && "cancelIdleCallback" in window
        ? window.cancelIdleCallback
        : (id: number) => window.clearTimeout(id);
    const id = idle(() => setLoadSecond(true));
    return () => cancel(typeof id === "number" ? id : 0);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning || index === current) return;
      setIsTransitioning(true);

      const nextVideo = videoRefs.current[index];
      if (nextVideo) {
        nextVideo.currentTime = 0;
        nextVideo.play().catch(() => {});
      }

      setTimeout(() => {
        const prevVideo = videoRefs.current[current];
        if (prevVideo) prevVideo.pause();
        setCurrent(index);
        setIsTransitioning(false);
      }, 700);
    },
    [current, isTransitioning]
  );

  const next = useCallback(() => {
    goTo((current + 1) % videos.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + videos.length) % videos.length);
  }, [current, goTo]);

  useEffect(() => {
    const video = videoRefs.current[current];
    if (!video) return;
    const handleEnded = () => next();
    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, [current, next]);

  useEffect(() => {
    const first = videoRefs.current[0];
    if (first) first.play().catch(() => {});
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Video slides */}
      {videos.map((v, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{ transform: `translateX(${(i - current) * 100}%)` }}
        >
          <video
            ref={(el) => { videoRefs.current[i] = el!; }}
            src={i === 0 || loadSecond ? v.src : undefined}
            preload={i === 0 ? "auto" : "none"}
            muted
            playsInline
            loop={false}
            disablePictureInPicture
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent z-[1] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/25 z-[1] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-black via-black/90 to-transparent z-[1] pointer-events-none" />

      {/* Content overlay */}
      <div className="absolute inset-0 z-30 w-full flex flex-col justify-between h-full gap-8 lg:gap-0 pointer-events-none">
        <div className="relative z-30 w-full px-4 sm:px-6 md:px-12 pt-24 pb-8 sm:pb-12 pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="max-w-xl flex flex-col items-start space-y-3 sm:space-y-4 pt-4 lg:-translate-y-6"
            >
              {/* Tags */}
              <div className="flex items-center space-x-2">
                {videos[current].tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-zinc-800/30 backdrop-blur-sm text-zinc-300 text-[10px] md:text-xs font-medium px-4 py-1 rounded-full tracking-wide font-plus"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="font-plus text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-none">
                {videos[current].title}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-0.5">
                {[...Array(videos[current].rating)].map((_, i) => (
                  <Star key={i} size={14} className="sm:size-[16px] fill-amber-500 text-amber-500" />
                ))}
              </div>

              {/* Meta */}
              <div className="flex items-center space-x-2 text-zinc-400 text-xs tracking-wide font-medium font-plus">
                <span>{videos[current].year}</span>
                <span className="text-[8px] text-zinc-600">•</span>
                <span>{videos[current].duration}</span>
                <span className="text-[8px] text-zinc-600">•</span>
                <span>{videos[current].genre}</span>
              </div>

              {/* Description */}
              <p className="font-pop text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-md tracking-wide font-normal">
                {videos[current].description}
              </p>

              {/* Buttons */}
              <div className="flex items-center space-x-2 md:space-x-3 pt-2">
                <a
                  href={videos[current].watchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer bg-cyan-600/30 hover:bg-cyan-700/30 active:scale-95 text-white flex items-center space-x-2 px-5 sm:px-6 py-2 sm:py-[10px] rounded-full text-[10px] md:text-xs font-medium font-plus tracking-wide transition duration-150 ease-in-out shadow-md shadow-red-900/10"
                >
                  <ArrowUpRight size={12} className="sm:size-[14px] text-white" />
                  <span>LEARN MORE</span>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="absolute inset-y-0 left-0 right-0 z-40 flex items-center justify-between px-3 sm:px-6 md:px-10 pointer-events-none">
        <button
          onClick={prev}
          disabled={isTransitioning}
          className="pointer-events-auto bg-cyan-500/10 hover:bg-white text-white hover:text-black p-2.5 sm:p-4 rounded-full transition-all duration-300 backdrop-blur-sm active:scale-95 border border-white/10 disabled:opacity-30 cursor-pointer"
        >
          <ChevronLeft size={16} className="sm:size-5" />
        </button>
        <button
          onClick={next}
          disabled={isTransitioning}
          className="pointer-events-auto bg-cyan-500/10 hover:bg-white text-white hover:text-black p-2.5 sm:p-4 rounded-full transition-all duration-300 backdrop-blur-sm active:scale-95 border border-white/10 disabled:opacity-30 cursor-pointer"
        >
          <ChevronRight size={16} className="sm:size-5" />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex gap-2.5">
        {videos.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === current
                ? "w-8 bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                : "w-1.5 bg-white/25 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoHero;