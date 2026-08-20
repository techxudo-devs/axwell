"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";

const CardsStack = () => {
  const containerRef = useRef(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
    restDelta: 0.001,
  });

  const y1 = useTransform(smoothProgress, [0.000, 0.121], [2000, 0]);
  const y2 = useTransform(smoothProgress, [0.121, 0.242], [2000, 0]);
  const y3 = useTransform(smoothProgress, [0.242, 0.363], [2000, 0]);
  const y4 = useTransform(smoothProgress, [0.363, 0.484], [2000, 0]);
  const y5 = useTransform(smoothProgress, [0.484, 0.605], [2000, 0]);
  const y6 = useTransform(smoothProgress, [0.605, 0.726], [2000, 0]);
  const y7 = useTransform(smoothProgress, [0.726, 0.850], [2000, 0]);

  const yTransforms = [0, y1, y2, y3, y4, y5, y6, y7];

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (latest < 0.121) {
      setActiveCardIndex(0);
      return;
    }
    if (latest < 0.242) {
      setActiveCardIndex(1);
      return;
    }
    if (latest < 0.363) {
      setActiveCardIndex(2);
      return;
    }
    if (latest < 0.484) {
      setActiveCardIndex(3);
      return;
    }
    if (latest < 0.605) {
      setActiveCardIndex(4);
      return;
    }
    if (latest < 0.726) {
      setActiveCardIndex(5);
      return;
    }
    if (latest < 0.850) {
      setActiveCardIndex(6);
      return;
    }
    setActiveCardIndex(7);
  });

  const mobileContainerRef = useRef(null);
  const mobileViewportRef = useRef<HTMLDivElement | null>(null);
  const mobileTrackRef = useRef<HTMLDivElement | null>(null);
  const [mobileTrackDistance, setMobileTrackDistance] = useState(0);

  const { scrollYProgress: mobileScrollYProgress } = useScroll({
    target: mobileContainerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const updateMobileTrackDistance = () => {
      const viewportWidth = mobileViewportRef.current?.offsetWidth ?? 0;
      const trackWidth = mobileTrackRef.current?.scrollWidth ?? 0;
      setMobileTrackDistance(Math.max(trackWidth - viewportWidth, 0));
    };

    updateMobileTrackDistance();
    window.addEventListener("resize", updateMobileTrackDistance);

    return () => window.removeEventListener("resize", updateMobileTrackDistance);
  }, []);

  const mobileSmoothProgress = useSpring(mobileScrollYProgress, {
    stiffness: 70,
    damping: 24,
    mass: 0.75,
    restDelta: 0.001,
  });

  const mobileXTransform = useTransform(
    mobileSmoothProgress,
    [0, 1],
    [0, -mobileTrackDistance],
  );

  const cards = [
    {
      id: "01",
      title: "PRE PRODUCTION",
      desc: "Often the most important stage, it covers the entire planning process.",
      details:
        "Every project — feature, series, commercial, music video or documentary — starts here. Often the most important stage, it covers the entire planning process.",
      color: "bg-[#0FB6AE]",
      rotation: 0,
    },
    {
      id: "02",
      title: "Filming",
      desc: "Location secured, script signed off, equipment ready — time to shoot.",
      details:
        "Location secured, script signed off, equipment ready — time to shoot. We work with skilled camera operators, cinematographers, videographers and production assistants.",
      color: "bg-[#1E0A15]",
      rotation: -5,
    },
    {
      id: "03",
      title: "Top Producers",
      desc: "Based in the US and Pakistan, we've worked worldwide.",
      details:
        "Based in the US and Pakistan, we've worked worldwide and partnered with top media outlets, filmmakers and award-winning directors — a diverse body of work for our clients.",
      color: "bg-[#0FB6AE]",
      rotation: 0,
    },
    {
      id: "04",
      title: "Editing",
      desc: "Experienced editors, VFX artists and sound designers",
      details:
        "Experienced editors, VFX artists and sound designers, plus the latest editing tools, sound stages and design suites. We provide all of the above.",
      color: "bg-[#1E0A15]",
      rotation: 5,
    },
    {
      id: "05",
      title: "Distribution Atlas",
      desc: "Atlas Distribution transparent, end-to-end film distribution",
      details:
        "Through Atlas Distribution Company: transparent, end-to-end film distribution — testing, planning, booking, marketing, settlement and VoD / home-video setup.",
      color: "bg-[#0FB6AE]",
      rotation: 0,
    },
    {
      id: "06",
      title: "Event Planning",
      desc: "From corporate conferences to extravagant galas",
      details:
        "From corporate conferences to extravagant galas — venue selection, logistics, vendor management and captivating decor for a seamless, unforgettable experience.",
      color: "bg-[#1E0A15]",
      rotation: -5,
    },
    {
      id: "07",
      title: "First Light",
      desc: "Audio-visual setup, staging, lighting design and technical support ",
      details:
        "Audio-visual setup, staging, lighting design and technical support — state-of-the-art equipment and creative flair for extraordinary live moments.",
      color: "bg-[#0FB6AE]",
      rotation: 5,
    },
    {
      id: "08",
      title: "Event Management",
      desc: "From inception to execution venue selection",
      details:
        "From inception to execution: venue selection, logistical planning, vendor coordination, on-site management and guest experience — a stress-free success.",
      color: "bg-[#1E0A15]",
      rotation: 0,
    },
  ];

  const activeCard = cards[activeCardIndex];

  return (
    <div id="services">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* DESKTOP VIEW */}
      <div
        ref={containerRef}
        className="hidden lg:block relative h-[500vh]"
      >
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-[#1E0A15] to-black">
          <div className="flex w-full max-w-[1400px] px-4 lg:px-8 items-center justify-between mx-auto">
            {/* LEFT TEXT SECTION */}
            <div className="w-1/3 relative z-40">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[94px] leading-[0.85] tracking-tighter font-plus uppercase font-black">
                <span className="text-white block">This is</span>
                <span className="text-cyan-300 block">What</span>
                <span className="text-white block">We Do.</span>
              </h2>
            </div>

            {/* CENTER CARDS SECTION */}
            <div className="w-1/3 flex items-center justify-center relative">
              <div className="relative w-[270px] h-[410px] border-none">
                {cards.map((card, idx) => (
                  <motion.div
                    key={card.id}
                    style={{
                      y: yTransforms[idx],
                      rotate: card.rotation,
                      zIndex: idx * 10,
                      willChange: "transform",
                    }}
                    className={`absolute inset-0 w-full h-full rounded-3xl ${card.color} flex flex-col items-center justify-between border-none p-8 text-white`}
                  >
                    <h3 className="font-plus font-black text-3xl tracking-tight text-center uppercase leading-8 pt-2">
                      {card.title}
                    </h3>
                    <span className="font-plus font-black text-[160px] tracking-[-0.05em] leading-none pr-6">
                      {card.id}
                    </span>
                    <p className="font-plus text-center text-base font-medium leading-5 w-[95%] pb-2">
                      {card.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* RIGHT TEXT SECTION */}
            <div className="w-1/3 flex justify-start pl-14 z-40">
              <div className="w-full max-w-[340px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCard.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <p className="font-plus font-semibold text-slate-200 text-[16px] leading-5">
                      {activeCard.details}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-9 z-50">
            <span className="text-cyan-300 font-plus font-regular tracking-wide uppercase text-sm border-b border-cyan-300/30 pb-1">
              Film Production
            </span>
          </div>
        </div>
      </div>

      {/* MOBILE VIEW */}
      <div
        ref={mobileContainerRef}
        className="block lg:hidden relative h-[400vh] bg-black"
      >
        <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-between overflow-hidden py-6 sm:py-10 bg-gradient-to-b from-black via-[#1E0A15] to-black">
          {/* TOP TEXT SECTION */}
          <div className="flex flex-col items-center text-center px-6 relative z-20 w-full max-w-[500px] mx-auto mt-2 sm:mt-6">
            <h2 className="text-4xl min-[375px]:text-4xl sm:text-[50px] md:text-[60px] leading-[0.8] font-beni uppercase font-black">
              <span className="text-white block">This is</span>
              <span className="text-purple-300 block">What</span>
              <span className="text-white block">We Do.</span>
            </h2>
          </div>

          {/* ANIMATED HORIZONTAL CAROUSEL */}
          <div ref={mobileViewportRef} className="overflow-hidden px-6 my-auto pt-5">
            <motion.div
              ref={mobileTrackRef}
              style={{ x: mobileXTransform, willChange: "transform" }}
              className="flex w-max gap-4 sm:gap-6 pb-4 sm:pb-8 [transform:translate3d(0,0,0)]"
            >
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="w-[75vw] min-[375px]:w-[70vw] sm:w-[45vw] md:w-[35vw] shrink-0 flex justify-center py-2 sm:py-4"
                >
                  <motion.div
                    style={{ rotate: card.rotation, willChange: "transform" }}
                    className={`relative w-full max-w-[250px] min-[375px]:max-w-[280px] sm:max-w-[320px] h-[310px] min-[375px]:h-[350px] sm:h-[400px] md:h-[420px] rounded-2xl min-[375px]:rounded-3xl ${card.color} flex flex-col items-center justify-between p-5 sm:p-8 text-white shadow-xl [transform:translate3d(0,0,0)]`}
                  >
                    <h3 className="font-beni font-black text-2xl tracking-tight min-[375px]:text-2xl sm:text-2xl md:text-3xl text-center uppercase leading-[0.9] pt-1">
                      {card.title}
                    </h3>

                    <span className="font-beni font-black text-[120px] min-[375px]:text-[120px] sm:text-[140px] md:text-[160px] leading-none">
                      {card.id}
                    </span>

                    <p className="font-clash text-center text-xs min-[375px]:text-[12px] sm:text-sm md:text-sm font-medium leading-snug w-[95%] pb-1">
                      {card.desc}
                    </p>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* BOTTOM LEFT LABEL */}
          <div className="pl-6 pb-2 sm:pb-6 z-50">
            <span className="text-purple-300 font-clash font-regular tracking-wide uppercase text-xs sm:text-xs md:text-sm border-b border-purple-300/30 pb-1">
              Film Production
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsStack;