"use client";

import { Phone } from 'lucide-react'
import Image from 'next/image'

const Navbar = () => {
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement | HTMLButtonElement>,
    targetId: string
  ) => {
    e.preventDefault();
    if (targetId === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  };

  return (
    <nav className="absolute top-0 left-0 w-full z-20 flex items-center justify-between px-6 md:px-10  py-6 bg-transparent text-white select-none">
      {/* Left Navigation Items */}
      <div className="flex items-center space-x-6 md:space-x-10">
        {/* Home Icon Container */}
        <div 
          onClick={(e) => handleScroll(e, 'home')}
          className="flex items-center cursor-pointer"
        >
          <Image src={"/images/logo2.png"} alt='Logo' width={50} height={50}/>
        </div>
        
        {/* Nav Links */}
        <div className="flex items-center space-x-8 text-xs font-medium tracking-wide text-zinc-400 font-plus">
          {['HOME', 'ABOUT', 'SERVICES', 'WORK'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`} 
              onClick={(e) => handleScroll(e, item.toLowerCase())}
              className="relative py-1 text-zinc-400 hover:text-white transition-colors duration-300 ease-out group"
            >
              <span>{item}</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </div>
      </div>

      {/* Right Side: Contact Button */}
      <div className="flex items-center">
        <button 
          onClick={(e) => handleScroll(e, 'contact')}
          className="relative group overflow-hidden px-5 py-3 border flex items-center space-x-2.5 text-xs font-medium tracking-wide transition-all duration-300 ease-out active:scale-95 font-plus cursor-pointer"
        >
          {/* Slider Background: Using translate-x-full ensures 100% coverage across rounded borders */}
          <span className="absolute inset-0 w-full h-full bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" />
          
          {/* Phone Icon */}
          <Phone 
            size={14} 
            className="relative z-10 text-white group-hover:text-black" 
          />
          
          {/* Button Text */}
          <span className="relative z-10 text-white group-hover:text-black transition-colors duration-300 ease-out">
            CONTACT US
          </span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar