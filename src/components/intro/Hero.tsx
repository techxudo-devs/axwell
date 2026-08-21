'use client'

import Link from 'next/link'
import { Sparkles, Clapperboard, MessageSquare, UsersRound } from 'lucide-react'
import { FaInstagram, FaYoutube, FaLinkedinIn, FaFacebookF, FaTiktok, FaXTwitter } from 'react-icons/fa6'

const socialLinks = [
  { icon: FaInstagram, href: 'https://instagram.com/opproductionsofficial', label: 'Instagram' },
  { icon: FaYoutube, href: 'https://youtube.com/@opproductionsofficial1', label: 'YouTube' },
  { icon: FaLinkedinIn, href: 'https://linkedin.com/company/99193478', label: 'LinkedIn' },
  { icon: FaFacebookF, href: 'https://facebook.com/share/1A59o5yTYr', label: 'Facebook' },
  { icon: FaTiktok, href: 'https://tiktok.com/@opproductionsofficial', label: 'TikTok' },
  { icon: FaXTwitter, href: 'https://x.com/OPPOfficial', label: 'X' },
]

const Hero = () => {
  return (
    <section className="relative h-screen max-h-screen w-full bg-gradient-to-br from-[#1E0A15] via-[#075d59] to-[#1E0A15] text-white flex flex-col justify-between overflow-hidden select-none">
      
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <linearGradient id="purpleCyanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#fff" />
        </linearGradient>
      </svg>

      <Link href="/production-and-media"
        className="absolute top-4 left-4 z-[999] flex md:hidden w-10 h-10 items-center justify-center"
      >
        <div className="absolute inset-0 bg-[#0FB6AE] blur-xl rounded-full pointer-events-none" />
        <img 
          src="/images/logo.png" 
          alt="Logo" 
          className="w-full h-full object-contain relative z-10" 
        />
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 flex-grow h-full relative overflow-hidden">
        
        <Link href="/production-and-media" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 hidden md:flex items-center justify-center w-24 h-24"
          aria-hidden="true">
          <div className="absolute inset-0 bg-[#0FB6AE] blur-xl rounded-full pointer-events-none" />
          <img 
            src="/images/logo.png" 
            alt="Logo" 
            className="w-full h-full object-cover relative z-10" 
          />
        </Link>

        <Link 
          href="/first-light" 
          className="group block border-r border-b border-[#0FB6AE]/20 bg-black/30 hover:bg-[#1E0A15]/10 transition-colors duration-300 p-4 md:p-6 flex flex-col items-center justify-center text-center space-y-3 md:space-y-6 pt-12 md:pt-6 h-full"
        >
          <Sparkles 
            size={48} 
            stroke="url(#purpleCyanGradient)" 
            className="w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 lg:w-16 lg:h-16 stroke-[1.5] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
          />
          <h2 className="font-plus tracking-tight text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold leading-none text-[#fff] uppercase">
            First Light
          </h2>
        </Link>

        <Link 
          href="/production-and-media" 
          className="group block border-b border-[#0FB6AE]/20 bg-black/30 hover:bg-[#0FB6AE]/10 transition-colors duration-300 p-4 md:p-6 flex flex-col items-center justify-center text-center space-y-3 md:space-y-6 h-full"
        >
          <Clapperboard 
            size={48} 
            stroke="url(#purpleCyanGradient)" 
            className="w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 lg:w-16 lg:h-16 stroke-[1.5] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
          />
          <h2 className="font-plus tracking-tight text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold leading-none text-[#fff] uppercase">
            Production & Media
          </h2>
        </Link>

        <Link 
          href="/our-team" 
          className="group block border-r border-[#0FB6AE]/20 bg-black/30 hover:bg-[#0FB6AE]/10 transition-colors duration-300 p-4 md:p-6 flex flex-col items-center justify-center text-center space-y-3 md:space-y-6 md:border-b-0 border-b h-full"
        >
          <UsersRound 
            size={48} 
            stroke="url(#purpleCyanGradient)" 
            className="w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 lg:w-16 lg:h-16 stroke-[1.5] transition-transform duration-300 group-hover:scale-110 group-hover:translate-y-[-2px]"
          />
          <h2 className="font-plus tracking-tight text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold leading-none text-[#fff] uppercase">
            Our Team
          </h2>
        </Link>

        <Link 
          href="/contact" 
          className="group block bg-black/30 hover:bg-cyan-950/10 transition-colors duration-300 p-4 md:p-6 flex flex-col items-center justify-center text-center space-y-3 md:space-y-6 h-full"
        >
          <MessageSquare 
            size={48} 
            stroke="url(#purpleCyanGradient)" 
            className="w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 lg:w-16 lg:h-16 stroke-[1.5] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-6deg]"
          />
          <h2 className="font-plus tracking-tight text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold leading-none text-[#fff] uppercase">
            Contact Us
          </h2>
        </Link>
      </div>

      <footer className="w-full bg-[#12040b]/40 border-t border-[#0FB6AE]/10 py-3 px-4 md:px-6 grid md:grid-cols-3 items-center justify-center select-none z-40 gap-3">
        <div className="flex items-center gap-3 md:gap-4 justify-center md:justify-self-start order-2 md:order-none">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-white/50 hover:text-[#0FB6AE] transition-colors duration-200"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
        <span className="justify-self-center text-[9px] md:text-[10px] font-medium font-plus tracking-widest text-white/50 uppercase whitespace-nowrap md:pt-0 pt-1 order-1 md:order-none">
          Developed by{' '}
          <a
            href="https://prmedia.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-200"
          >
            PR Media LLC
          </a>
        </span>
        <a
          href="mailto:hello@opproductions.com"
          className="md:justify-self-end text-[9px] md:text-[10px] font-medium font-plus tracking-widest uppercase whitespace-nowrap text-white/50 hover:text-white transition-colors duration-200 order-3 md:order-none"
        >
          hello@opproductions.com
        </a>
      </footer>

    </section>
  )
}

export default Hero
