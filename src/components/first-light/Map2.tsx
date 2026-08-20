"use client";

import React, { useState } from "react";

export default function Map2() {
  // Desktop hover pill state
  const [hoveredPill, setHoveredPill] = useState<{
    name: string;
    rect: DOMRect;
  } | null>(null);

  // Desktop Hover Handler — shows pill at top of element
  const handleMouseEnter = (e: React.PointerEvent, name: string) => {
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    setHoveredPill({ name, rect });
  };

  // Mouse Leave Handler
  const handleMouseLeave = () => {
    setHoveredPill(null);
  };

  return (
    <div className="w-full bg-[#020109] text-neutral-900 font-sans p-2 sm:p-4 md:pb-10 flex flex-col items-center select-none relative">
      {/* Blueprint Header */}
      <div className="w-full max-w-[1280px] text-center mb-3">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-wide text-[#0FB6AE] uppercase">
          DHA SPORTS CLUB
        </h1>
      </div>

      {/* Main SVG Map Canvas */}
      <div className="w-full max-w-[1280px] bg-[#020109] rounded-lg shadow-xl p-2 sm:p-3 overflow-hidden relative">
        <svg
          viewBox="0 0 1000 680"
          className="w-full h-auto"
          style={{ maxHeight: "120vh" }}
        >
          <defs>
            {/* Pattern for Walkway paving */}
            <pattern
              id="pavement"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <rect width="10" height="10" fill="#dcd5c5" />
              <path
                d="M 0 5 L 10 5 M 5 0 L 5 10"
                stroke="#c2bbb0"
                strokeWidth="0.8"
              />
            </pattern>

            {/* Pattern for VIP seating grid */}
            <pattern
              id="vipGrid"
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 2 2 L 6 6 M 6 2 L 2 6"
                stroke="#a8927a"
                strokeWidth="1.2"
              />
            </pattern>
          </defs>

          {/* Background Canvas */}
          <rect x="0" y="0" width="1200" height="680" fill="#020109" />

          {/* ================= ROADS & BOUNDARIES ================= */}

          {/* KH-E-TIPU SULTAN (Left Vertical Road) */}
          <g>
            <rect x="0" y="0" width="12" height="640" fill="#48a058" />
            <rect x="12" y="0" width="30" height="640" fill="#111" />
            <line
              x1="42"
              y1="0"
              x2="42"
              y2="640"
              stroke="#ffffff"
              strokeWidth="2"
            />
            <text
              x="-320"
              y="30"
              transform="rotate(-90)"
              fill="#ffffff"
              fontSize="12"
              fontWeight="700"
              letterSpacing="1"
            >
              KH-E-TIPU SULTAN
            </text>
          </g>

          {/* KH-E-SHAHEEN ROAD (Bottom Horizontal Road) */}
          <g>
            <line
              x1="0"
              y1="640"
              x2="1000"
              y2="640"
              stroke="#ffffff"
              strokeWidth="2"
            />
            <rect x="0" y="642" width="1000" height="30" fill="#111" />
            <rect x="0" y="672" width="1000" height="8" fill="#48a058" />
            <text
              x="500"
              y="662"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="13"
              fontWeight="600"
              letterSpacing="1"
            >
              KH-E-SHAHEEN ROAD
            </text>
          </g>

          {/* DACSS CREEK CAMPUS (Right Text) */}
          <g>
            <text
              x="875"
              y="400"
              fill="#f5f0e8"
              fontSize="12"
              fontWeight="500"
              letterSpacing="0.5"
            >
              DACSS
            </text>
            <text
              x="850"
              y="415"
              fill="#f5f0e8"
              fontSize="11"
              fontWeight="500"
              fontStyle="italic"
            >
              CREEK CAMPUS
            </text>
          </g>

          {/* COMPASS ROSE (Top Right) */}
          <g transform="translate(930, 85)">
            {/* Compass Rays */}
            <path
              d="M 0 -45 L 8 -8 L 45 0 L 8 8 L 0 45 L -8 8 L -45 0 L -8 -8 Z"
              fill="#e2c46c"
              stroke="#333333"
              strokeWidth="1"
            />
            <path
              d="M 0 -45 L 0 0 L 45 0 L 0 0 L 0 45 L 0 0 L -45 0 L 0 0 Z"
              fill="#c8c0b4"
            />
            <circle
              cx="0"
              cy="0"
              r="4"
              fill="#ffffff"
              stroke="#1a1a1a"
              strokeWidth="1.5"
            />
            {/* Labels aligned to rays */}
            <text
              x="26"
              y="-22"
              textAnchor="middle"
              fontSize="11"
              fontWeight="500"
              fill="#f5f0e8"
            >
              N
            </text>
            <text
              x="26"
              y="32"
              textAnchor="middle"
              fontSize="11"
              fontWeight="500"
              fill="#f5f0e8"
            >
              E
            </text>
            <text
              x="-26"
              y="32"
              textAnchor="middle"
              fontSize="11"
              fontWeight="500"
              fill="#f5f0e8"
            >
              S
            </text>
            <text
              x="-26"
              y="-22"
              textAnchor="middle"
              fontSize="11"
              fontWeight="500"
              fill="#f5f0e8"
            >
              W
            </text>
          </g>

          {/* ================= NORTH SECTION BUILDINGS ================= */}

          {/* 1. Existing ELC School */}
          <g
            className="hover:opacity-90 transition-opacity cursor-pointer"
            onPointerEnter={(e) => handleMouseEnter(e, "Existing ELC School")}
            onMouseLeave={handleMouseLeave}
            
          >
            <rect
              x="115"
              y="35"
              width="155"
              height="125"
              fill="#aa4a38"
              stroke="#6b261a"
              strokeWidth="2"
            />
            <rect
              x="135"
              y="60"
              width="115"
              height="75"
              fill="#2e7d32"
              stroke="#1b4d1e"
              strokeWidth="1.5"
            />
            <text
              x="192"
              y="93"
              textAnchor="middle"
              fill="#f5f0e8"
              fontSize="12"
              fontWeight="800"
              fontStyle="italic"
            >
              Existing
            </text>
            <text
              x="192"
              y="107"
              textAnchor="middle"
              fill="#f5f0e8"
              fontSize="12"
              fontWeight="800"
              fontStyle="italic"
            >
              ELC School
            </text>
          </g>

          {/* Walkway */}
          <g
            className="cursor-pointer"
            onPointerEnter={(e) => handleMouseEnter(e, "Walkway")}
            onMouseLeave={handleMouseLeave}
            
          >
            <rect
              x="115"
              y="170"
              width="155"
              height="80"
              fill="url(#pavement)"
              stroke="#b5ad9e"
              strokeWidth="1.5"
            />
            <rect
              x="115"
              y="250"
              width="155"
              height="10"
              fill="#388e3c"
              stroke="#1b5e20"
              strokeWidth="1"
            />
            <text
              x="192"
              y="215"
              textAnchor="middle"
              fill="#f5f0e8"
              fontSize="13"
              fontWeight="700"
              fontStyle="italic"
            >
              Walkway
            </text>
          </g>

          {/* Gate No. 1 */}
          <g>
            <text
              x="115"
              y="295"
              fill="#f5f0e8"
              fontSize="10"
              fontWeight="800"
              fontStyle="italic"
            >
              Gate No. 1
            </text>
            <line
              x1="175"
              y1="292"
              x2="350"
              y2="292"
              stroke="#000000"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            <rect x="235" y="289" width="6" height="6" fill="#f5f0e8" />
            <rect x="285" y="289" width="6" height="6" fill="#f5f0e8" />
            <rect x="335" y="289" width="6" height="6" fill="#f5f0e8" />
          </g>

          {/* 2. Swimming Pool & Kids Pool & Play Area */}
          <g
            className="hover:opacity-90 transition-opacity cursor-pointer"
            onPointerEnter={(e) => handleMouseEnter(e, "Existing Swimming Pool & Gym Complex")}
            onMouseLeave={handleMouseLeave}
          >
            {/* Existing Swimming Pool */}
            <rect
              x="280"
              y="35"
              width="85"
              height="60"
              fill="#4299e1"
              stroke="#1d4ed8"
              strokeWidth="2"
            />
            <path
              d="M 280 50 L 365 50 M 280 65 L 365 65 M 280 80 L 365 80 M 300 35 L 300 95 M 320 35 L 320 95 M 340 35 L 340 95"
              stroke="#2b6cb0"
              strokeWidth="0.8"
            />
            <text
              x="322"
              y="58"
              textAnchor="middle"
              fill="#f5f0e8"
              fontSize="10"
              fontWeight="800"
              fontStyle="italic"
            >
              Existing
            </text>
            <text
              x="322"
              y="70"
              textAnchor="middle"
              fill="#f5f0e8"
              fontSize="10"
              fontWeight="800"
              fontStyle="italic"
            >
              Swimming
            </text>
            <text
              x="322"
              y="82"
              textAnchor="middle"
              fill="#f5f0e8"
              fontSize="10"
              fontWeight="800"
              fontStyle="italic"
            >
              Pool
            </text>

            {/* Kids Play Area */}
            <rect
              x="372"
              y="35"
              width="20"
              height="60"
              fill="#81c784"
              stroke="#2e7d32"
              strokeWidth="1"
            />
            <text
              x="382"
              y="66"
              textAnchor="middle"
              fill="#111"
              fontSize="8"
              fontWeight="500"
              transform="rotate(-90 382 65)"
            >
              Kids Play Area
            </text>

            {/* Existing Kids Pool */}
            <rect
              x="280"
              y="105"
              width="30"
              height="40"
              fill="#4299e1"
              stroke="#1d4ed8"
              strokeWidth="1.5"
            />
            <text
              x="290"
              y="118"
              textAnchor="middle"
              fill="#f5f0e8"
              fontSize="7"
              fontWeight="500"
              transform="rotate(-90 295 120)"
            >
              Existing
            </text>
            <text
              x="290"
              y="126"
              textAnchor="middle"
              fill="#f5f0e8"
              fontSize="7"
              fontWeight="500"
              transform="rotate(-90 295 120)"
            >
              Kids Pool
            </text>

            {/* Existing Gym Building */}
            <rect
              x="315"
              y="100"
              width="77"
              height="55"
              fill="#aa4a38"
              stroke="#6b261a"
              strokeWidth="2"
            />
            <text
              x="353"
              y="122"
              textAnchor="middle"
              fill="#f5f0e8"
              fontSize="9"
              fontWeight="800"
              fontStyle="italic"
            >
              Existing
            </text>
            <text
              x="353"
              y="134"
              textAnchor="middle"
              fill="#f5f0e8"
              fontSize="9"
              fontWeight="800"
              fontStyle="italic"
            >
              Gym.Building
            </text>
          </g>

          {/* 3. Practice Pitches 1 */}
          <g
            className="hover:opacity-90 transition-opacity cursor-pointer"
            onPointerEnter={(e) => handleMouseEnter(e, "Existing Practice Pitches")}
            onMouseLeave={handleMouseLeave}
          >
            <rect
              x="402"
              y="35"
              width="38"
              height="45"
              fill="#d0be96"
              stroke="#8d734a"
              strokeWidth="1.5"
            />
            <text
              x="410"
              y="60"
              textAnchor="middle"
              fill="#111"
              fontSize="7"
              fontWeight="500"
              transform="rotate(-90 410 58)"
            >
              PITCHS
            </text>
            <text
              x="421"
              y="60"
              textAnchor="middle"
              fill="#111"
              fontSize="7"
              fontWeight="500"
              transform="rotate(-90 421 58)"
            >
              PITCHS
            </text>
            <text
              x="432"
              y="60"
              textAnchor="middle"
              fill="#111"
              fontSize="7"
              fontWeight="500"
              transform="rotate(-90 432 58)"
            >
              PITCHS
            </text>

            <rect
              x="402"
              y="85"
              width="38"
              height="70"
              fill="#e6ddc5"
              stroke="#8d734a"
              strokeWidth="1"
            />
            <text
              x="421"
              y="112  "
              textAnchor="middle"
              fill="#111"
              fontSize="8"
              fontWeight="800"
              fontStyle="italic"
              transform="rotate(-90 421 120)"
            >
              Existing
            </text>
            <text
              x="421"
              y="123"
              textAnchor="middle"
              fill="#111"
              fontSize="8"
              fontWeight="800"
              fontStyle="italic"
              transform="rotate(-90 421 120)"
            >
              Practice
            </text>
            <text
              x="421"
              y="134"
              textAnchor="middle"
              fill="#111"
              fontSize="8"
              fontWeight="800"
              fontStyle="italic"
              transform="rotate(-90 421 120)"
            >
              Pitches
            </text>
          </g>

          {/* 4. Club House */}
          <g
            className="hover:opacity-90 transition-opacity cursor-pointer"
            onPointerEnter={(e) => handleMouseEnter(e, "Club House")}
            onMouseLeave={handleMouseLeave}
          >
            <rect
              x="452"
              y="35"
              width="105"
              height="55"
              fill="#aa4a38"
              stroke="#6b261a"
              strokeWidth="2"
            />
            <text
              x="495"
              y="58"
              textAnchor="middle"
              fill="#f5f0e8"
              fontSize="11"
              fontWeight="800"
              fontStyle="italic"
            >
              Club
            </text>
            <text
              x="494"
              y="68"
              textAnchor="middle"
              fill="#f5f0e8"
              fontSize="11"
              fontWeight="800"
              fontStyle="italic"
            >
              House
            </text>

            {/* Green patch below Club House */}
            <rect
              x="452"
              y="95"
              width="75"
              height="40"
              fill="#48a058"
              stroke="#2e7d32"
              strokeWidth="1"
            />
          </g>

          {/* 5. Practice Pitches 2 */}
          <g
            className="hover:opacity-90 transition-opacity cursor-pointer"
            onPointerEnter={(e) => handleMouseEnter(e, "Existing Practice Pitches")}
            onMouseLeave={handleMouseLeave}
          >
            <rect
              x="533"
              y="35"
              width="30"
              height="45"
              fill="#d0be96"
              stroke="#8d734a"
              strokeWidth="1.5"
            />
            <text
              x="540"
              y="59"
              textAnchor="middle"
              fill="#111"
              fontSize="6"
              fontWeight="500"
              transform="rotate(-90 540 58)"
            >
              PITCHS
            </text>
            <text
              x="548"
              y="60"
              textAnchor="middle"
              fill="#111"
              fontSize="6"
              fontWeight="500"
              transform="rotate(-90 548 58)"
            >
              PITCHS
            </text>
            <text
              x="556"
              y="61"
              textAnchor="middle"
              fill="#111"
              fontSize="6"
              fontWeight="500"
              transform="rotate(-90 556 58)"
            >
              PITCHS
            </text>

            <rect
              x="533"
              y="85"
              width="30"
              height="50"
              fill="#e6ddc5"
              stroke="#8d734a"
              strokeWidth="1"
            />
            <text
              x="548"
              y="103"
              textAnchor="middle"
              fill="#111"
              fontSize="7"
              fontWeight="800"
              fontStyle="italic"
              transform="rotate(-90 548 110)"
            >
              Existing
            </text>
            <text
              x="548"
              y="112"
              textAnchor="middle"
              fill="#111"
              fontSize="7"
              fontWeight="800"
              fontStyle="italic"
              transform="rotate(-90 548 110)"
            >
              Practice
            </text>
            <text
              x="548"
              y="120"
              textAnchor="middle"
              fill="#111"
              fontSize="7"
              fontWeight="800"
              fontStyle="italic"
              transform="rotate(-90 548 110)"
            >
              Pitches
            </text>
          </g>

          {/* 6. Futsal Court */}
          <g
            className="hover:opacity-90 transition-opacity cursor-pointer"
            onPointerEnter={(e) => handleMouseEnter(e, "Futsal Court & U.G.W.T.")}
            onMouseLeave={handleMouseLeave}
          >
            <rect
              x="568"
              y="35"
              width="135"
              height="110"
              fill="#48a058"
              stroke="#2e7d32"
              strokeWidth="2"
            />
            <rect
              x="578"
              y="45"
              width="115"
              height="90"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.2"
            />
            <line
              x1="635"
              y1="45"
              x2="635"
              y2="135"
              stroke="#ffffff"
              strokeWidth="1.2"
            />
            <circle
              cx="635"
              cy="90"
              r="18"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.2"
            />
            <text
              x="635"
              y="94"
              textAnchor="middle"
              fill="#f5f0e8"
              fontSize="11"
              fontWeight="800"
              fontStyle="italic"
            >
              Futsal Court
            </text>

            {/* Scorekeeper/bench box at bottom */}
            <rect
              x="595"
              y="150"
              width="28"
              height="12"
              fill="#ffffff"
              stroke="#f5f0e8"
              strokeWidth="1"
            />

            {/* U.G.W.T. */}
            <rect
              x="655"
              y="40"
              width="40"
              height="12"
              fill="#111"
              stroke="#f5f0e8"
              strokeWidth="1"
              rx="3"
            />
            <text
              x="675"
              y="49"
              textAnchor="middle"
              fill="#f5f0e8"
              fontSize="7"
              fontWeight="800"
            >
              U.G.W.T.
            </text>
          </g>

          {/* 7. Squash Complex & Padel Court */}
          <g
            className="hover:opacity-90 transition-opacity cursor-pointer"
            onPointerEnter={(e) => handleMouseEnter(e, "Squash Complex & Padel Court")}
            onMouseLeave={handleMouseLeave}
          >
            <rect
              x="712"
              y="35"
              width="82"
              height="80"
              fill="#aa4a38"
              stroke="#6b261a"
              strokeWidth="2"
            />
            <text
              x="753"
              y="70"
              textAnchor="middle"
              fill="#f5f0e8"
              fontSize="11"
              fontWeight="800"
              fontStyle="italic"
            >
              Squash
            </text>
            <text
              x="753"
              y="82"
              textAnchor="middle"
              fill="#f5f0e8"
              fontSize="11"
              fontWeight="800"
              fontStyle="italic"
            >
              Complex
            </text>

            {/* Padel Court */}
            <rect
              x="735"
              y="125"
              width="59"
              height="25"
              fill="#388e3c"
              stroke="#1b5e20"
              strokeWidth="1.5"
            />
            <text
              x="764"
              y="141"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="8"
              fontWeight="800"
              fontStyle="italic"
            >
              Padel Court
            </text>
          </g>

          {/* ================= WEST SECTION BUILDINGS ================= */}

          {/* Gate No. 2 */}
          <g>
            <text
              x="115"
              y="385"
              fill="#f5f0e8"
              fontSize="10"
              fontWeight="800"
              fontStyle="italic"
            >
              Gate No. 2
            </text>
          </g>

          {/* 8. Function Hall */}
          <g
            className="hover:opacity-90 transition-opacity cursor-pointer"
            onPointerEnter={(e) => handleMouseEnter(e, "Function Hall")}
            onMouseLeave={handleMouseLeave}
          >
            <rect
              x="115"
              y="405"
              width="200"
              height="95"
              fill="#888888"
              stroke="#444444"
              strokeWidth="2"
            />
            <text
              x="215"
              y="458"
              textAnchor="middle"
              fill="#f5f0e8"
              fontSize="13"
              fontWeight="900"
              fontStyle="italic"
            >
              Function Hall
            </text>
          </g>

          {/* 9. Existing Pavilion */}
          <g
            className="hover:opacity-90 transition-opacity cursor-pointer"
            onPointerEnter={(e) => handleMouseEnter(e, "Existing Pavilion")}
            onMouseLeave={handleMouseLeave}
          >
            <rect
              x="365"
              y="225"
              width="28"
              height="240"
              fill="#555555"
              stroke="#222222"
              strokeWidth="2"
            />
            <text
              x="379"
              y="348"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="12"
              fontWeight="800"
              fontStyle="italic"
              transform="rotate(-90 379 345)"
            >
              Existing Pavilion
            </text>
          </g>

          {/* VIP Seating Tile Grid (between Multiplex and Bldg 4) */}
          <rect
            x="355"
            y="515"
            width="50"
            height="55"
            fill="url(#vipGrid)"
            stroke="#a8927a"
            strokeWidth="1"
          />

          {/* 10. THE PLACE NUE MULTIPLEX & ENTERTAINMENT */}
          <g
            className="hover:opacity-90 transition-opacity cursor-pointer"
            onPointerEnter={(e) =>
              handleMouseEnter(e, "THE PLACE NUE MULTIPLEX & ENTERTAINMENT")
            }
            onMouseLeave={handleMouseLeave}
          >
            <rect
              x="115"
              y="525"
              width="200"
              height="115"
              fill="#c68a68"
              stroke="#8c5839"
              strokeWidth="2"
            />
            <text
              x="215"
              y="565"
              textAnchor="middle"
              fill="#f5f0e8"
              fontSize="12"
              fontWeight="900"
              fontStyle="italic"
            >
              THE PLACE
            </text>
            <text
              x="215"
              y="580"
              textAnchor="middle"
              fill="#f5f0e8"
              fontSize="10"
              fontWeight="800"
              fontStyle="italic"
            >
              NUE MULTIPLEX
            </text>
            <text
              x="215"
              y="593"
              textAnchor="middle"
              fill="#f5f0e8"
              fontSize="10"
              fontWeight="800"
              fontStyle="italic"
            >
              &
            </text>
            <text
              x="215"
              y="606"
              textAnchor="middle"
              fill="#f5f0e8"
              fontSize="10"
              fontWeight="800"
              fontStyle="italic"
            >
              ENTERTAINMENT
            </text>
          </g>

          {/* ================= CENTER RIGHT: LARGE CRICKET FIELD ================= */}

          {/* 11. CRICKET FIELD OVAL & RUNNING TRACK */}
          <g
            className="hover:opacity-95 transition-opacity cursor-pointer"
            onPointerEnter={(e) => handleMouseEnter(e, "Cricket Field & Running Track")}
            onMouseLeave={handleMouseLeave}
          >
            {/* Outer Sienna Running Track Oval */}
            <rect
              x="415"
              y="185"
              width="390"
              height="455"
              rx="90"
              ry="90"
              fill="#a0522d"
              stroke="#703417"
              strokeWidth="3"
            />

            {/* Inner Grass Cricket Field Oval */}
            <rect
              x="430"
              y="200"
              width="360"
              height="425"
              rx="85"
              ry="85"
              fill="#3d8b37"
              stroke="#245920"
              strokeWidth="2"
            />

            {/* Central Cricket Pitch Box */}
            <rect
              x="575"
              y="370"
              width="70"
              height="85"
              fill="#d8ad72"
              stroke="#8c6d3b"
              strokeWidth="2"
            />
            {/* Pitch Wicket Lanes */}
            <rect
              x="585"
              y="378"
              width="12"
              height="69"
              fill="#c2985d"
              stroke="#73562a"
              strokeWidth="1"
            />
            <rect
              x="604"
              y="378"
              width="12"
              height="69"
              fill="#c2985d"
              stroke="#73562a"
              strokeWidth="1"
            />
            <rect
              x="623"
              y="378"
              width="12"
              height="69"
              fill="#c2985d"
              stroke="#73562a"
              strokeWidth="1"
            />

            {/* Main Label Text */}
            <text
              x="610"
              y="345"
              textAnchor="middle"
              fill="#f5f0e8"
              fontSize="16"
              fontWeight="900"
              fontStyle="italic"
              letterSpacing="1"
            >
              CRICKET FIELD
            </text>

            {/* Running Track Labels along curve */}
            <text
              x="610"
              y="195"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="8"
              fontWeight="500"
              fontStyle="italic"
            >
              Jogging Track & Running Track
            </text>
            <text
              x="610"
              y="634"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="8"
              fontWeight="500"
              fontStyle="italic"
            >
              Jogging Track & Running Track
            </text>

            {/* Track Side Labels */}
            <text
              x="788"
              y="428"
              textAnchor="middle"
              fill="#f5f0e8"
              fontSize="10"
              fontWeight="900"
              fontStyle="italic"
              transform="rotate(-90 788 430)"
            >
              SOUTH EAST
            </text>
            <text
              x="800"
              y="429"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="8"
              fontWeight="500"
              fontStyle="italic"
              transform="rotate(-90 800 430)"
            >
              Jogging Track & Running Track
            </text>

            <text
              x="610"
              y="620"
              textAnchor="middle"
              fill="#f5f0e8"
              fontSize="10"
              fontWeight="900"
              fontStyle="italic"
            >
              SOUTH WEST
            </text>
          </g>

          {/* ================= SOUTH SECTION ================= */}

          {/* 12. Existing Sports Facility Building No. 4 */}
          <g
            className="hover:opacity-90 transition-opacity cursor-pointer"
            onPointerEnter={(e) =>
              handleMouseEnter(e, "Existing Sports Facility Building No.4")
            }
            onMouseLeave={handleMouseLeave}
          >
            <path
              d="M 385 570 L 450 570 L 450 635 L 385 635 Z"
              fill="#aa4a38"
              stroke="#6b261a"
              strokeWidth="2"
            />
            <text
              x="420"
              y="592"
              textAnchor="middle"
              fill="#f5f0e8"
              fontSize="9"
              fontWeight="900"
              fontStyle="italic"
            >
              Existing
            </text>
            <text
              x="418"
              y="603"
              textAnchor="middle"
              fill="#f5f0e8"
              fontSize="9"
              fontWeight="900"
              fontStyle="italic"
            >
              Facility
            </text>
            <text
              x="417"
              y="615"
              textAnchor="middle"
              fill="#f5f0e8"
              fontSize="9"
              fontWeight="900"
              fontStyle="italic"
            >
              Building No.4
            </text>
          </g>

          {/* Gate No. 3 */}
          <g>
            <text
              x="325"
              y="634"
              fill="#f5f0e8"
              fontSize="10"
              fontWeight="800"
              fontStyle="italic"
            >
              Gate No. 3
            </text>
          </g>

          {/* Gate No. 4 */}
          <g>
            <text
              x="790"
              y="635"
              fill="#f5f0e8"
              fontSize="10"
              fontWeight="800"
              fontStyle="italic"
            >
              Gate No. 4
            </text>
          </g>

          {/* 13. Tool Room */}
          <g
            className="hover:opacity-90 transition-opacity cursor-pointer"
            onPointerEnter={(e) => handleMouseEnter(e, "Tool Room")}
            onMouseLeave={handleMouseLeave}
          >
            <rect
              x="748"
              y="590"
              width="60"
              height="32"
              fill="#8c3827"
              stroke="#5c2217"
              strokeWidth="1.5"
            />
            <text
              x="775"
              y="604"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="10"
              fontWeight="500"
            >
              Tool
            </text>
            <text
              x="776"
              y="615"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="10"
              fontWeight="500"
            >
              Room
            </text>
          </g>
        </svg>
      </div>

      {/* DESKTOP HOVER PILL — positioned at top of hovered element */}
      {hoveredPill && (
        <div
          className="fixed pointer-events-none z-50 bg-[#04040A]/95 text-[#0FB6AE] border border-[#0FB6AE]/50 px-3.5 py-1.5 rounded-full text-xs font-medium shadow-2xl backdrop-blur-md transition-all duration-150 ease-out whitespace-nowrap"
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