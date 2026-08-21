"use client";

import React from "react";
import Image from "next/image";
import axwellHeadliner from "@/assets/axwell9.svg";

const Revealing = () => {
  return (
    <section
      id="revealing"
      className="relative w-full flex flex-col items-center justify-center overflow-hidden bg-[#020109] px-10 font-just"
    >
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center pt-8 pb-0">
        {/* <h2 className="font-just text-[40px] md:text-[60px] text-[#0FB6AE] leading-none mb-4 drop-shadow-[0_0_30px_rgba(15,182,174,0.6)]">
          Our Headliner
        </h2> */}

        <div className="relative w-full max-w-[720px] aspect-[750/421.5]">
          <Image
            src={axwellHeadliner}
            alt="Axwell"
            fill
            priority
            draggable={false}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Revealing;
