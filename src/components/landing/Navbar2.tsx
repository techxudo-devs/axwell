"use client";

import Image from 'next/image'

const Navbar2 = () => {
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
    <nav className="absolute top-0 left-0 w-full z-20 flex items-center justify-between px-4 sm:px-6 md:px-10 py-6 bg-transparent text-white select-none">
      {/* Left Navigation Items */}
      <div className="flex-1 flex justify-end items-center space-x-8 md:space-x-8 text-[11px] md:text-xs font-medium tracking-wide text-zinc-400 font-plus mr-6 md:mr-10">
        {['HOME', 'ABOUT'].map((item) => (
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

      {/* Center Logo */}
      <div 
        onClick={(e) => handleScroll(e, 'home')}
        className="flex items-center cursor-pointer shrink-0"
      >
        <Image 
          src="/images/logo.png" 
          alt="Logo" 
          width={50} 
          height={50} 
          priority 
        />
      </div>

      {/* Right Navigation Items */}
      <div className="flex-1 flex justify-start items-center space-x-6 md:space-x-8 text-[11px] md:text-xs font-medium tracking-wide text-zinc-400 font-plus ml-6 md:ml-10">
        {['SERVICES', 'WORK'].map((item) => (
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
    </nav>
  )
}

export default Navbar2;