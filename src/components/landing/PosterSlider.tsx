"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface BasePoster {
  id: number;
  img: string;
  title: string;
}

interface ExtendedPoster extends BasePoster {
  stableId: string;
}

const PosterSlider: React.FC = () => {
  const basePosters: BasePoster[] = [
    { id: 1, img: "/images/post1.jpg", title: "Echo Boomers" },
    { id: 2, img: "/images/post2.jpg", title: "OuttaBounds" },
    { id: 3, img: "/images/poster1.webp", title: "King Of Pop" },
    { id: 4, img: "/images/post4.jpg", title: "Van Gogh - Coming Soon" },
    { id: 5, img: "/images/post5.jpg", title: "Grief - Coming Soon" },
  ];

  const extendedPosters: ExtendedPoster[] = [
    ...basePosters.map((p) => ({ ...p, stableId: `copy0-${p.id}` })),
    ...basePosters.map((p) => ({ ...p, stableId: `copy1-${p.id}` })),
    ...basePosters.map((p) => ({ ...p, stableId: `copy2-${p.id}` })),
  ];

  const totalBaseItems = basePosters.length;

  const [currentIndex, setCurrentIndex] = useState<number>(11);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [animateLayout, setAnimateLayout] = useState<boolean>(true);

  const [dimensions, setDimensions] = useState({
    cardWidth: 200,
    cardGap: 12,
    visibleCount: 5,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setDimensions({ cardWidth: 200, cardGap: 12, visibleCount: 5 });
      } else if (width >= 768) {
        setDimensions({ cardWidth: 180, cardGap: 12, visibleCount: 3 });
      } else if (width >= 480) {
        setDimensions({ cardWidth: 130, cardGap: 10, visibleCount: 3 });
      } else {
        setDimensions({ cardWidth: 92, cardGap: 8, visibleCount: 3 });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { cardWidth, cardGap, visibleCount } = dimensions;
  const stepWidth = cardWidth + cardGap;

  const offsetMultiplier = visibleCount === 5 ? 2 : 1;
  const targetX = -(currentIndex - offsetMultiplier) * stepWidth;

  const handleNext = () => {
    if (isAnimating) return;
    setAnimateLayout(true);
    setIsAnimating(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setAnimateLayout(true);
    setIsAnimating(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleAnimationComplete = () => {
    setIsAnimating(false);

    if (currentIndex >= totalBaseItems * 2) {
      setAnimateLayout(false);
      setCurrentIndex((prev) => prev - totalBaseItems);
    } else if (currentIndex < totalBaseItems) {
      setAnimateLayout(false);
      setCurrentIndex((prev) => prev + totalBaseItems);
    }
  };

  const springTransition = {
    type: "spring",
    stiffness: 320,
    damping: 28,
    mass: 0.6,
  } as const;

  return (
    <div className="relative w-full flex flex-col items-center overflow-hidden select-none translate-y-80 lg:translate-y-44 ">
      {/* Slider Viewport Container */}
      <div className="relative w-full max-w-[1200px] flex items-center justify-center px-4">
        {/* Left Navigation Arrow */}
        <button
          onClick={handlePrev}
          disabled={isAnimating && animateLayout}
          className="absolute left-1 sm:left-2 md:left-4 z-30 bg-cyan-500/10 hover:bg-white text-white hover:text-black p-2.5 sm:p-4 rounded-full transition-all duration-300 backdrop-blur-sm active:scale-95 border border-white/10 disabled:opacity-50 cursor-pointer"
        >
          <ChevronLeft size={16} className="sm:size-5 pr-0.5" />
        </button>

        {/* Carousel Window */}
        <div
          className="overflow-hidden py-6 sm:py-10 px-1"
          style={{ width: `${visibleCount * stepWidth - cardGap}px` }}
        >
          {/* Slider Track */}
          <motion.div
            className="flex items-center will-change-transform"
            style={{ gap: `${cardGap}px` }}
            animate={{ x: targetX }}
            transition={animateLayout ? springTransition : { duration: 0 }}
            onAnimationComplete={handleAnimationComplete}
          >
            {extendedPosters.map((poster, index) => {
              const distance = Math.abs(index - currentIndex);
              const isCenter = distance === 0;
              const isAdjacent = distance === 1;
              const isOuter = distance === 2;

              const scale = isCenter
                ? 1.1
                : isAdjacent
                ? 0.95
                : isOuter && visibleCount === 5
                ? 0.85
                : 0.7;
              const opacity = isCenter ? 1 : isAdjacent ? 0.85 : 0.4;
              const zIndex = isCenter ? 20 : isAdjacent ? 10 : 5;

              return (
                <motion.div
                  key={poster.stableId}
                  className="flex-shrink-0 flex flex-col items-center animate-gpu"
                  style={{ width: `${cardWidth}px` }}
                  animate={{ scale, opacity, zIndex }}
                  transition={
                    animateLayout ? springTransition : { duration: 0 }
                  }
                >
                  {/* Poster Image Frame */}
                  <div className="relative w-full h-[130px] min-[375px]:h-[150px] sm:h-[220px] md:h-[270px] rounded-xl border border-cyan-500 overflow-hidden">
                    <img
                      src={poster.img}
                      alt={poster.title}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>

                  {/* Underline highlight & movie title */}
                  <div className="h-10 mt-3 sm:mt-4 flex flex-col items-center justify-start text-center">
                    <span
                      className={`text-[9px] sm:text-[10px] md:text-xs font-medium tracking-wide uppercase font-plus transition-colors duration-300 ${
                        isCenter ? "text-cyan-500 font-semibold" : "text-zinc-500"
                      }`}
                    >
                      {poster.title}
                    </span>
                    {isCenter && (
                      <motion.div
                        layoutId="underline"
                        className="w-6 sm:w-8 h-[2px] sm:h-[2.5px] bg-cyan-600 rounded-full mt-1 sm:mt-1.5"
                        transition={springTransition}
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Right Navigation Arrow */}
        <button
          onClick={handleNext}
          disabled={isAnimating && animateLayout}
          className="absolute right-1 sm:right-2 md:right-4 z-30 bg-cyan-500/10 hover:bg-white text-white hover:text-black p-2.5 sm:p-4 rounded-full transition-all duration-300 backdrop-blur-sm active:scale-95 border border-white/10 disabled:opacity-50 cursor-pointer"
        >
          <ChevronRight size={16} className="sm:size-5 pl-0.5" />
        </button>
      </div>
    </div>
  );
};

export default PosterSlider;