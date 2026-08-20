import React from "react";

const About = () => {
  return (
    <section
      id="about"
      className="relative w-full flex flex-col items-center justify-center z-20 text-center px-4 bg-black overflow-hidden"
    >
      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase font-bold font-plus leading-none tracking-tight mb-0 text-white select-none">
            <span
              className=""
            >
              The future, on screen
            </span>
          </h1>
        </div>

        <div className="max-w-2xl mt-9 font-plus">
          <p className="text-base sm:text-lg md:text-xl tracking-wide font-light leading-tight mb-4 text-slate-200">
            OP Productions specializes in film production, event management and
            funding for creative ventures — bringing visions to life and
            nurturing talent across the entertainment industry.
          </p>
          <p
            className="opacity-90 text-sm md:text-base font-medium
             bg-gradient-to-r from-[#0FB6AE] via-[#0FB6AE] to-[#0FB6AE]
             bg-clip-text text-transparent select-none uppercase"
          >
            [ Production with a purpose ]
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;