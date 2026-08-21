"use client";

import React, { useState } from "react";

export default function Map2() {
  // Hover pill state for interactivity
  const [hoveredPill, setHoveredPill] = useState<{
    name: string;
    rect: DOMRect;
  } | null>(null);

  // Hover Handler — shows floating pill above hovered element
  const handleMouseEnter = (e: React.PointerEvent, name: string) => {
    if (e.pointerType !== "mouse") return;
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    setHoveredPill({ name, rect });
  };

  // Mouse Leave Handler
  const handleMouseLeave = () => {
    setHoveredPill(null);
  };

  // Click Handler — opens ticket detail section for the given tier
  const openTicketDetails = (ticketId: string) => {
    setHoveredPill(null);
    window.dispatchEvent(
      new CustomEvent("open-ticket-registration", { detail: { ticketId } })
    );
    document
      .getElementById("tickets")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className="w-full bg-[#020109] text-neutral-100 font-sans p-2 sm:p-4 md:p-6 flex flex-col items-center select-none relative md:min-h-screen pb-10"
      onClick={() => setHoveredPill(null)}
    >
      {/* Header */}
      <div className="w-full max-w-[1280px] text-center mb-3 sm:mb-5">
        <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-medium text-[#0FB6AE] uppercase tracking-wider">
          DHA SPORTS CLUB — EVENT LAYOUT
        </h1>
      </div>

      {/* Main SVG Map Canvas Container */}
      <div className="w-full max-w-[1280px] bg-[#020109] rounded-xl border border-neutral-800 shadow-2xl p-1 sm:p-3 overflow-hidden relative">
        <svg
          viewBox="0 0 1020 680"
          className="w-full h-auto block"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Background Canvas */}
          <rect x="0" y="0" width="1020" height="680" fill="#020109" />

          {/* ================= TOP ENTRIES ================= */}

          {/* V.I.P. Entry */}
          <g
            className="hover:opacity-80 transition-opacity cursor-pointer"
            onPointerEnter={(e) => handleMouseEnter(e, "V.I.P. Entry")}
            onMouseLeave={handleMouseLeave}
          >
            <text
              x="195"
              y="28"
              textAnchor="middle"
              fill="#fde047"
              fontSize="14"
              fontWeight="600"
              letterSpacing="0.5"
            >
              V.I.P. Entry
            </text>
            <rect
              x="170"
              y="36"
              width="50"
              height="20"
              fill="#020109"
              stroke="#fde047"
              strokeWidth="1.5"
            />
          </g>

          {/* Artist Entry */}
          <g
            className="hover:opacity-80 transition-opacity cursor-pointer"
            onPointerEnter={(e) => handleMouseEnter(e, "Artist Entry")}
            onMouseLeave={handleMouseLeave}
          >
            <text
              x="450"
              y="28"
              textAnchor="middle"
              fill="#2dd4bf"
              fontSize="14"
              fontWeight="600"
              letterSpacing="0.5"
            >
              Artist Entry
            </text>
            <rect
              x="428"
              y="36"
              width="40"
              height="16"
              fill="#020109"
              stroke="#2dd4bf"
              strokeWidth="1.5"
            />
          </g>

          {/* ================= PLAYERS PAVILION (Top Right Angled) ================= */}
          <g
            transform="translate(425, 102) rotate(-38)"
            className="hover:opacity-80 transition-opacity cursor-pointer"
            onPointerEnter={(e) => handleMouseEnter(e, "Players Pavilion")}
            onMouseLeave={handleMouseLeave}
          >
            <polygon
              points="0,20 30,0 120,0 150,20 150,70 120,90 30,90 0,70"
              fill="#0f766e"
              stroke="#2dd4bf"
              strokeWidth="1.8"
            />
            <text
              x="90"
              y="40"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="14"
              fontWeight="700"
            >
              Players
            </text>
            <text
              x="90"
              y="58"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="14"
              fontWeight="700"
            >
              Pavilion
            </text>
          </g>

          {/* ================= MAIN ARENA / FIELD CONTAINER ================= */}
          <g>
            {/* Outer Arena Boundary Oval Box */}
            <rect
              x="45"
              y="85"
              width="465"
              height="550"
              rx="80"
              ry="80"
              fill="#080a10"
              stroke="#334155"
              strokeWidth="2.5"
            />

            {/* ================= STAGE AREA ================= */}

            {/* Left Bleacher Entrance Arrow & Text */}
            <g
              className="cursor-pointer"
              onPointerEnter={(e) => handleMouseEnter(e, "Bleacher Entrance")}
              onMouseLeave={handleMouseLeave}
            >
              <text
                x="92"
                y="125"
                textAnchor="middle"
                fill="#38bdf8"
                fontSize="18"
                fontWeight="900"
              >
                ↖
              </text>
              <text
                x="92"
                y="138"
                textAnchor="middle"
                fill="#e2e8f0"
                fontSize="9"
                fontWeight="600"
              >
                Bleacher
              </text>
              <text
                x="92"
                y="148"
                textAnchor="middle"
                fill="#e2e8f0"
                fontSize="9"
                fontWeight="600"
              >
                Entrance
              </text>
            </g>

            {/* Left Bleacher */}
            <g
              className="hover:opacity-80 transition-opacity cursor-pointer"
              onPointerEnter={(e) => handleMouseEnter(e, "Bleacher 56 x 24")}
              onMouseLeave={handleMouseLeave}
            >
              <rect
                x="118"
                y="130"
                width="36"
                height="75"
                fill="#334155"
                stroke="#64748b"
                strokeWidth="1.2"
              />
              <text
                x="148"
                y="170"
                textAnchor="middle"
                fill="#f8fafc"
                fontSize="9"
                fontWeight="600"
                transform="rotate(-90 136 167)"
              >
                Bleacher
              </text>
            </g>

            {/* STAGE */}
            <g
              className="hover:opacity-90 transition-opacity cursor-pointer"
              onPointerEnter={(e) => handleMouseEnter(e, "Stage 80 x 40")}
              onMouseLeave={handleMouseLeave}
            >
              <rect
                x="198"
                y="100"
                width="160"
                height="60"
                fill="#1e1b4b"
                stroke="#0fb6ae"
                strokeWidth="2"
              />
              <text
                x="278"
                y="135"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="18"
                fontWeight="800"
                letterSpacing="1"
              >
                STAGE
              </text>
            </g>

            {/* Right Bleacher */}
            <g
              className="hover:opacity-80 transition-opacity cursor-pointer"
              onPointerEnter={(e) => handleMouseEnter(e, "Bleacher 56 x 24")}
              onMouseLeave={handleMouseLeave}
            >
              <rect
                x="400"
                y="130"
                width="36"
                height="75"
                fill="#334155"
                stroke="#64748b"
                strokeWidth="1.2"
              />
              <text
                x="430"
                y="170"
                textAnchor="middle"
                fill="#f8fafc"
                fontSize="9"
                fontWeight="600"
                transform="rotate(-90 418 167)"
              >
                Bleacher
              </text>
            </g>

            {/* Right Bleacher Entrance Arrow & Text */}
            <g
              className="cursor-pointer"
              onPointerEnter={(e) => handleMouseEnter(e, "Bleacher Entrance")}
              onMouseLeave={handleMouseLeave}
            >
              <text
                x="462"
                y="125"
                textAnchor="middle"
                fill="#38bdf8"
                fontSize="18"
                fontWeight="900"
              >
                ↗
              </text>
              <text
                x="462"
                y="138"
                textAnchor="middle"
                fill="#e2e8f0"
                fontSize="9"
                fontWeight="600"
              >
                Bleacher
              </text>
              <text
                x="462"
                y="148"
                textAnchor="middle"
                fill="#e2e8f0"
                fontSize="9"
                fontWeight="600"
              >
                Entrance
              </text>
            </g>

            {/* Boundary line under stage */}
            <line
              x1="47"
              y1="178"
              x2="508"
              y2="178"
              stroke="#475569"
              strokeWidth="1.5"
            />

            {/* ================= PLATINUM SECTION ================= */}
            <g
              className="hover:opacity-90 transition-opacity cursor-pointer"
              onPointerEnter={(e) => handleMouseEnter(e, "Platinum 200 x 46")}
              onMouseLeave={handleMouseLeave}
              onClick={() => openTicketDetails("platinum")}
            >
              <rect
                x="47"
                y="178"
                width="461"
                height="55"
                fill="#1e3a8a"
                stroke="#3b82f6"
                strokeWidth="1.2"
              />
              <text
                x="278"
                y="215"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="22"
                fontWeight="800"
                letterSpacing="1.5"
              >
                PLATINUM
              </text>

              {/* Platinum Entrances */}
              <text
                x="125"
                y="225"
                textAnchor="middle"
                fill="#93c5fd"
                fontSize="11"
                fontWeight="700"
              >
                Platinum Entrance
              </text>
              <text
                x="430"
                y="225"
                textAnchor="middle"
                fill="#93c5fd"
                fontSize="11"
                fontWeight="700"
              >
                Platinum Entrance
              </text>
            </g>

            {/* ================= V.V.I.P. SECTION ================= */}
            <g
              className="hover:opacity-90 transition-opacity cursor-pointer"
              onPointerEnter={(e) => handleMouseEnter(e, "V.V.I.P. 400 x 25")}
              onMouseLeave={handleMouseLeave}
              onClick={() => openTicketDetails("vvip")}
            >
              <rect
                x="47"
                y="233"
                width="461"
                height="48"
                fill="#4c1d95"
                stroke="#a855f7"
                strokeWidth="1.2"
              />
              <text
                x="278"
                y="265"
                textAnchor="middle"
                fill="#fde047"
                fontSize="20"
                fontWeight="800"
                letterSpacing="2"
              >
                V.V.I.P.
              </text>
            </g>

            {/* Divider line */}
            <line
              x1="47"
              y1="281"
              x2="508"
              y2="281"
              stroke="#6b7280"
              strokeWidth="2"
            />

            {/* ================= PINK GOLD & GOLD SECTION ================= */}

            {/* PINK GOLD (Left Box) */}
            <g
              className="hover:opacity-90 transition-opacity cursor-pointer"
              onPointerEnter={(e) => handleMouseEnter(e, "PINK GOLD 51X35")}
              onMouseLeave={handleMouseLeave}
            >
              <rect
                x="47"
                y="282"
                width="70"
                height="50"
                fill="#f43f5e"
                stroke="#fda4af"
                strokeWidth="1.5"
              />
              <text
                x="82"
                y="304"
                textAnchor="middle"
                fill="#000000"
                fontSize="10"
                fontWeight="900"
              >
                PINK
              </text>
              <text
                x="82"
                y="317"
                textAnchor="middle"
                fill="#000000"
                fontSize="10"
                fontWeight="900"
              >
                GOLD
              </text>
            </g>

            {/* GOLD (Rest of section) */}
            <g
              className="hover:opacity-90 transition-opacity cursor-pointer"
              onPointerEnter={(e) => handleMouseEnter(e, "GOLD 400 x 35")}
              onMouseLeave={handleMouseLeave}
              onClick={() => openTicketDetails("gold")}
            >
              <rect
                x="117"
                y="282"
                width="391"
                height="50"
                fill="#eab308"
                stroke="#fef08a"
                strokeWidth="1.5"
              />
              <text
                x="277"
                y="315"
                textAnchor="middle"
                fill="#000000"
                fontSize="22"
                fontWeight="900"
                letterSpacing="2.5"
              >
                GOLD
              </text>
            </g>

            {/* Divider line */}
            <line
              x1="47"
              y1="332"
              x2="508"
              y2="332"
              stroke="#6b7280"
              strokeWidth="2"
            />

            {/* ================= SILVER SECTION ================= */}
            <g
              className="hover:opacity-90 transition-opacity cursor-pointer"
              onPointerEnter={(e) => handleMouseEnter(e, "Silver 400 x 65")}
              onMouseLeave={handleMouseLeave}
              onClick={() => openTicketDetails("silver")}
            >
              <rect
                x="47"
                y="333"
                width="461"
                height="90"
                fill="#94a3b8"
                stroke="#e2e8f0"
                strokeWidth="1.5"
              />

              {/* Sound / FOH Booth in center of Silver */}
              <rect
                x="236"
                y="340"
                width="60"
                height="80"
                fill="#0f172a"
                stroke="#ffffff"
                strokeWidth="1.5"
              />
              <rect
                x="244"
                y="342"
                width="44"
                height="76"
                fill="none"
                stroke="#64748b"
                strokeWidth="1"
              />

              <text
                x="145"
                y="386"
                textAnchor="middle"
                fill="#020617"
                fontSize="24"
                fontWeight="900"
                letterSpacing="1"
              >
                SILVER
              </text>
            </g>

            {/* Divider line */}
            <line
              x1="47"
              y1="423"
              x2="508"
              y2="423"
              stroke="#6b7280"
              strokeWidth="2"
            />

            {/* ================= BRONZE SECTION ================= */}
            <g
              className="hover:opacity-90 transition-opacity cursor-pointer"
              onPointerEnter={(e) => handleMouseEnter(e, "Bronze 400 x 135")}
              onMouseLeave={handleMouseLeave}
              onClick={() => openTicketDetails("bronze")}
            >
              <path
                d="M 47 424 L 508 424 L 508 555 A 80 80 0 0 1 428 635 L 127 635 A 80 80 0 0 1 47 555 Z"
                fill="#9a3412"
                stroke="#f97316"
                strokeWidth="1.5"
              />
              <text
                x="278"
                y="535"
                textAnchor="middle"
                fill="#ffedd5"
                fontSize="32"
                fontWeight="900"
                letterSpacing="1.5"
              >
                BRONZE
              </text>
            </g>
          </g>

          {/* ================= RIGHT SIDE: SEATING STAND & ENTRIES ================= */}

          {/* 1. SEATING STAND */}
          <g
            className="hover:opacity-90 transition-opacity cursor-pointer"
            onPointerEnter={(e) => handleMouseEnter(e, "Seating Stand")}
            onMouseLeave={handleMouseLeave}
          >
            <rect
              x="518"
              y="258"
              width="68"
              height="352"
              fill="#1e293b"
              stroke="#64748b"
              strokeWidth="1.8"
            />
            <text
              x="552"
              y="440"
              textAnchor="middle"
              fill="#f8fafc"
              fontSize="26"
              fontWeight="700"
              letterSpacing="2"
              transform="rotate(-90 552 434)"
            >
              Seating Stand
            </text>
          </g>

          {/* 2. LOWER EXTENSION STRUCTURE (L-shape) */}
          <g
            className="hover:opacity-90 transition-opacity cursor-pointer"
            onPointerEnter={(e) => handleMouseEnter(e, "Entry Courtyard Extension")}
            onMouseLeave={handleMouseLeave}
          >
            <path
              d="M 586 370 L 816 370 L 816 505 L 650 505 L 650 610 L 586 610 Z"
              fill="#0f172a"
              stroke="#334155"
              strokeWidth="1.8"
            />
          </g>

          {/* 3. GOLD PLATINUM ENTRY */}
          <g
            className="hover:opacity-80 transition-opacity cursor-pointer"
            onPointerEnter={(e) => handleMouseEnter(e, "Gold Platinum Entry")}
            onMouseLeave={handleMouseLeave}
          >
            {/* Entry Gate Rectangle */}
            <rect
              x="816"
              y="370"
              width="14"
              height="35"
              fill="#020109"
              stroke="#eab308"
              strokeWidth="1.8"
            />
            <text
              x="840"
              y="385"
              fill="#eab308"
              fontSize="16"
              fontWeight="700"
            >
              Gold Platinum
            </text>
            <text
              x="840"
              y="405"
              fill="#eab308"
              fontSize="16"
              fontWeight="700"
            >
              Entry
            </text>
          </g>

          {/* 4. BRONZE - SILVER ENTRY */}
          <g
            className="hover:opacity-80 transition-opacity cursor-pointer"
            onPointerEnter={(e) => handleMouseEnter(e, "Bronze - Silver Entry")}
            onMouseLeave={handleMouseLeave}
          >
            {/* Entry Gate Rectangle */}
            <rect
              x="816"
              y="450"
              width="14"
              height="45"
              fill="#020109"
              stroke="#f97316"
              strokeWidth="1.8"
            />
            <text
              x="840"
              y="468"
              fill="#f97316"
              fontSize="16"
              fontWeight="700"
            >
              Bronze - Silver
            </text>
            <text
              x="840"
              y="488"
              fill="#f97316"
              fontSize="16"
              fontWeight="700"
            >
              Entry
            </text>
          </g>
        </svg>
      </div>

      {/* DESKTOP/MOBILE HOVER PILL */}
      {hoveredPill && (
        <div
          className="fixed pointer-events-none z-50 bg-[#04040A]/95 text-[#0FB6AE] border border-[#0FB6AE]/60 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium shadow-2xl backdrop-blur-md transition-all duration-150 ease-out whitespace-nowrap"
          style={{
            left: `${hoveredPill.rect.left + hoveredPill.rect.width / 2}px`,
            top: `${hoveredPill.rect.top - 8}px`,
            transform: "translate(-50%, -100%)",
          }}
        >
          {hoveredPill.name}
        </div>
      )}
    </div>
  );
}