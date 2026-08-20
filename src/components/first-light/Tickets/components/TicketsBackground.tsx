const TicketsBackground = () => (
  <>
    {/* Wave lining light effect */}
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 opacity-40 mt-4">
      <svg
        className="w-full h-full"
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="wave-grad-magenta"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#18060F" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#800040" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#0a0010" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="wave-grad-acid"
            x1="100%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#0FB6AE" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#2d4000" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0a0010" stopOpacity="0" />
          </linearGradient>
          <filter id="soft-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d="M -100 200 C 300 450, 500 -50, 1540 300"
          fill="none"
          stroke="url(#wave-grad-magenta)"
          strokeWidth="3"
          filter="url(#soft-glow)"
        />
        <path
          d="M -100 280 C 250 500, 600 50, 1540 380"
          fill="none"
          stroke="url(#wave-grad-magenta)"
          strokeWidth="1.5"
          opacity="0.5"
        />
        <path
          d="M -100 600 C 400 300, 800 750, 1540 450"
          fill="none"
          stroke="url(#wave-grad-acid)"
          strokeWidth="2.5"
          filter="url(#soft-glow)"
        />
        <path
          d="M -100 660 C 450 350, 750 820, 1540 500"
          fill="none"
          stroke="url(#wave-grad-acid)"
          strokeWidth="1.2"
          opacity="0.6"
        />
      </svg>
    </div>

    {/* Subtle smoky magenta glow */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[350px] bg-[#18060F]/10 blur-[120px] rounded-full pointer-events-none z-0" />
  </>
);

export default TicketsBackground;
