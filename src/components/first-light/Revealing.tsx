"use client";

import React from "react";
import Image from "next/image";
import axwellHeadliner from "@/assets/axwell8.svg";

const Revealing = () => {
  return (
    <section
      id="revealing"
      className="relative w-full min-h-[50vh] flex flex-col items-center justify-center overflow-hidden bg-[#020109] px-10 font-just -mb-30"
    >
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center py-10">
        {/* <h2 className="font-just text-[40px] md:text-[60px] text-[#0FB6AE] leading-none mb-4 drop-shadow-[0_0_30px_rgba(15,182,174,0.6)]">
          Our Headliner
        </h2> */}

        <div className="relative w-[400px] h-[400px] md:w-[450px] md:h-[450px] flex items-center justify-center my-8 -mt-10">
          <Image
            src={axwellHeadliner}
            alt="Axwell"
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Revealing;
