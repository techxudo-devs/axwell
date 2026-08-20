import React from 'react'
import Contact from './Contact'
import ContactForm from './ContactForm'

const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen bg-black py-10 px-4 sm:px-6 md:px-10 flex flex-col items-center justify-center overflow-hidden select-none">
      
      {/* Decorative ambient background glows */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[450px] h-[350px] bg-[#0FB6AE]/40 rounded-full blur-[130px] pointer-events-none z-0" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[350px] bg-[#491833]/50 rounded-full blur-[130px] pointer-events-none z-0" 
        aria-hidden="true" 
      />

      <div className="relative z-10 w-full max-w-[1200px] flex flex-col items-center">
        
        {/* TOP CENTER EDITORIAL HEADINGS */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-16 md:mb-20">
          <h2 className="font-plus text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
            Let's <span className="text-[#0FB6AE]">Talk</span>
          </h2>
          <span className="font-plus text-base sm:text-lg md:text-xl text-purple-300 font-light mt-3 tracking-wide">
            Make something unforgettable.
          </span>
        </div>

        {/* 50/50 SPLIT GRID SYSTEM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 w-full items-start">
          {/* Left Side: Agency Details */}
          <Contact />

          {/* Right Side: Form Inputs */}
          <ContactForm />
        </div>

      </div>
    </section>
  )
}

export default Hero;
