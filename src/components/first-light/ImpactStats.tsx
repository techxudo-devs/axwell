"use client";

import { useRef } from "react";
import { Zap } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const STATS = [
  {
    end: 24,
    suffix: "",
    label: "Limited Seats",
    detail: "September 2026",
    accent: "#0FB6AE",
    border: "rgba(15,182,174,0.4)",
    bg: "rgba(15,182,174,0.1)",
    glow: "rgba(15,182,174,0.2)",
    neonGradient:
      "linear-gradient(90deg,#0FB6AE,#18060F,#0FB6AE,#ffffff,#0FB6AE)",
    hideCounter: true,
  },
  {
    end: 5,
    suffix: "B+",
    label: "Axwell Global Streams",
    detail: null,
    accent: "#5eead4",
    border: "rgba(94,234,212,0.4)",
    bg: "rgba(94,234,212,0.08)",
    glow: "rgba(94,234,212,0.2)",
    neonGradient:
      "linear-gradient(90deg,#5eead4,#18060F,#0FB6AE,#5eead4,#18060F)",
  },
  {
    end: 1,
    suffix: "ST",
    label: "International Arena-Scale Event",
    detail: "In Pakistan",
    accent: "#5eead4",
    border: "rgba(94,234,212,0.4)",
    bg: "rgba(94,234,212,0.08)",
    glow: "rgba(94,234,212,0.2)",
    neonGradient:
      "linear-gradient(90deg,#5eead4,#0FB6AE,#5eead4,#5eead4,#0FB6AE)",
  },
] as const;

const ImpactStats = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (!prefersReduced) {
        gsap.to(".stats-box-neon", {
          backgroundPosition: "300% 0",
          duration: 3.5,
          ease: "none",
          repeat: -1,
          stagger: 0.6,
        });

        gsap.utils.toArray<HTMLElement>(".stats-box-light").forEach((light, i) => {
          const track = light.parentElement;
          if (!track) return;

          gsap.fromTo(
            light,
            { left: "-20%" },
            {
              left: "120%",
              duration: 2.8,
              ease: "none",
              repeat: -1,
              delay: i * 0.9,
            }
          );
        });

      }

      STATS.forEach((stat, i) => {
        const el = valueRefs.current[i];
        if (!el) return;

        if (prefersReduced) {
          el.textContent = `${stat.end}${stat.suffix}`;
          return;
        }

        const counter = { val: 0 };
        gsap.to(counter, {
          val: stat.end,
          duration: 2.4,
          delay: i * 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = `${Math.round(counter.val)}${stat.suffix}`;
          },
        });
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            once: true,
          },
        })
        .from(".stats-item", {
          y: 30,
          autoAlpha: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "back.out(1.2)",
        });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Event impact statistics"
      className={`relative w-full overflow-hidden bg-[#02010A] pt-24 font-just`}
    >
      <div className="relative mx-auto w-full max-w-[1100px] px-4 sm:px-6">
        {/* Section label */}
        <div className="mb-14 flex flex-col items-center text-center">
          <h2
            className={`font-just text-[clamp(36px,6vw,52px)] uppercase leading-none text-[#0FB6AE] drop-shadow-[0_0_20px_rgba(15,182,174,0.2)]`}
          >
            First Light Impact
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-12 sm:gap-10 md:grid-cols-3 md:gap-8">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="stats-item flex flex-col items-center text-center"
            >
              <div className="mb-1 flex items-center gap-1.5 text-[9px] font-medium uppercase tracking-wider text-white/35">
                <Zap size={10} style={{ color: stat.accent }} />
                <span style={{ color: stat.accent }}>0{i + 1}</span>
              </div>

              <div className="relative rounded-xl p-[2px]">
                <div
                  className="stats-box-neon absolute inset-0 rounded-xl opacity-90"
                  style={{
                    background: stat.neonGradient,
                    backgroundSize: "300% 100%",
                  }}
                />
                <div
                  className="relative overflow-hidden rounded-[10px] bg-[#0a0010]/90 px-6 py-4 shadow-[0_0_24px_var(--stat-glow)] backdrop-blur-sm"
                  style={{ "--stat-glow": stat.glow } as React.CSSProperties}
                >
                  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[10px]">
                    <div
                      className="stats-box-light absolute top-0 h-full w-[40%] opacity-70"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${stat.accent}55, transparent)`,
                        filter: `drop-shadow(0 0 12px ${stat.accent})`,
                      }}
                    />
                  </div>
                  {"hideCounter" in stat && stat.hideCounter ? (
                    <span
                      className={`font-just relative block text-[clamp(48px,8vw,72px)] leading-none uppercase`}
                      style={{
                        color: stat.accent,
                        textShadow: `0 0 30px ${stat.glow}`,
                      }}
                    >
                      24
                    </span>
                  ) : (
                    <span
                      ref={(el) => {
                        valueRefs.current[i] = el;
                      }}
                      className={`font-just relative block text-[clamp(48px,8vw,72px)] leading-none uppercase`}
                      style={{
                        color: stat.accent,
                        textShadow: `0 0 30px ${stat.glow}`,
                      }}
                    >
                      0{stat.suffix}
                    </span>
                  )}
                </div>
              </div>

              {"hideCounter" in stat && stat.hideCounter ? (
                <p className="mt-4 max-w-[240px] text-[9px] font-medium uppercase leading-relaxed tracking-wider text-white/45 sm:text-[10px]">
                  {stat.label}
                  {stat.detail && (
                    <>
                      <span className="mx-1.5 text-white/20">—</span>
                      <span className="text-white/55">{stat.detail}</span>
                    </>
                  )}
                </p>
              ) : (
                <p className="mt-4 max-w-[240px] text-[9px] font-medium uppercase leading-relaxed tracking-wider text-white/45 sm:text-[10px]">
                  {stat.label.includes("Axwell") ? (
                    <>
                      <span className="relative inline-block mr-1 translate-y-[-1px]">
                        <span className="blur-[3.5px] select-none pointer-events-none opacity-40">
                          AXWELL
                        </span>
                        <span className="absolute inset-0 flex items-center justify-center text-white/90 font-medium tracking-tight whitespace-nowrap mr-4 mt-0.5">
                          Axwell
                        </span>
                      </span>
                      {stat.label.replace("Axwell", "").trim()}
                    </>
                  ) : (
                    stat.label
                  )}
                  {stat.detail && (
                    <>
                      <span className="mx-1.5 text-white/20">—</span>
                      <span className="text-white/55">{stat.detail}</span>
                    </>
                  )}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
