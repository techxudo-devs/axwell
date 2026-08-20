"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import Image from "next/image";
import EventCountdown from "./EventCountdown";
import shadowAx from "@/assets/ax4.png";
import axwellRevealed from "@/assets/axwell3.png";

const Revealing = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [countdownDone, setCountdownDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCountdownComplete = useCallback(() => {
    setCountdownDone(true);
  }, []);

  // Mouse position for custom cursor
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring settings for the cursor
  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Function to set mouse coordinates back to the center of the container
  const centerCursor = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(rect.width / 2);
    mouseY.set(rect.height / 2);
  };

  // Center the cursor coordinates initially on mount and on window resize
  useEffect(() => {
    centerCursor();
    window.addEventListener("resize", centerCursor);
    return () => {
      window.removeEventListener("resize", centerCursor);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    centerCursor();
  };

  return (
    <section
      id="revealing"
      className={`relative w-full min-h-[50vh] flex flex-col items-center justify-center overflow-hidden bg-[#020109] px-4 font-just cursor-none`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
    >
      {/* Background Ambient Glows */}
      {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0FB6AE]/10 rounded-full blur-[150px] pointer-events-none" /> */}
      
      {/* Content Wrapper */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            <motion.div
              key="silhouette-container"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(40px)" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col items-center select-none"
              onClick={() => setIsRevealed(true)}
            >
              {/* Creative Text Above Image */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center relative z-20"
              >
                <h3 className={`font-just text-4xl uppercase sm:text-[36px] md:text-[52px]r text-[#0FB6AE] leading-tight md:translate-y-4 px-8`}>
                  Guess who's hiding in the shadows?
                </h3>
              </motion.div>

              {/* Artist Silhouette (Asset based) */}
              <div className="relative w-[400px] h-[480px] md:w-[450px] md:h-[350px] flex items-center justify-center translate-y-6">
                <Image
                  src={shadowAx}
                  alt="Hidden Artist"
                  fill
                  priority
                  className={`object-contain transition-all duration-700 ${
                    isHovered ? "scale-[1.03]" : ""
                  }`}
                />
              </div>
            </motion.div>
          ) : countdownDone ? (
            <motion.div
              key="revealed-artist"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center py-10"
            >
              <h2 className={`font-just text-[50px] md:text-[70px] md:text-[75px] text-[#0FB6AE] leading-none mb-4 drop-shadow-[0_0_30px_rgba(15,182,174,0.6)]`}>
                It's
              </h2>

              <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px] flex items-center justify-center my-8">
                <Image
                  src={axwellRevealed}
                  alt="Axwell"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_0_60px_rgba(15,182,174,0.1)]"
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="countdown-container"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex flex-col items-center text-center py-10"
            >
              <h2 className={`font-just text-[50px] md:text-[70px] md:text-[75px] text-[#0FB6AE] leading-none mb-4 drop-shadow-[0_0_30px_rgba(15,182,174,0.6)]`}>
                Revealing In
              </h2>
              
              <div className="scale-110 md:scale-[1.4] my-16">
                <EventCountdown targetDate={new Date(2026, 7, 20, 17, 0, 0)} onComplete={handleCountdownComplete} />
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                onClick={() => setIsRevealed(false)}
                className={`font-just mt-8 text-sm uppercaser hover:scale-105 text-white transition-all cursor-pointer`}
              >
                ← Back to Showdown
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Custom Hover Cursor */}
      <AnimatePresence>
        {isHovered && !isRevealed && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            style={{
              left: smoothX,
              top: smoothY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            className="absolute pointer-events-none z-[100] w-36 h-36 flex items-center justify-center"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Premium Gradient Circle */}
              <div className="absolute inset-0 rounded-full bg-radial from-[#0FB6AE] via-[#0FB6AE]/80 to-transparent shadow-[0_0_60px_rgba(15,182,174,0.4)]" />
              
              {/* Animated Inner Ring */}
              <div className="absolute inset-2 rounded-full border border-white/30 border-dashed animate-[spin_10s_linear_infinite]" />
              
              {/* Text */}
              <span className={`font-just relative z-10 text-black text-center text-xl leading-[0.9]r font-medium uppercase drop-shadow-sm`}>
                Reveal <br /> Artist
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Revealing;