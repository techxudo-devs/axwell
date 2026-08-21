import React from "react";
import { MapPin, Phone, ArrowUpRight } from "lucide-react";
import { FaInstagram, FaYoutube, FaLinkedinIn, FaFacebookF, FaTiktok, FaXTwitter } from "react-icons/fa6";

const Contact: React.FC = () => {
  return (
    <section
      id="contact"
      className="relative w-full bg-gradient-to-b from-black via-[#0c0309] to-[#040105] text-white py-10 px-4 sm:px-6 md:px-16 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Soft velvet ambient backdrop glow */}
      <div
        className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#1E0A15]/15 rounded-full blur-[150px] pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
        {/* LEFT COLUMN: HERO CALL TO ACTION */}
        <div className="lg:col-span-5 flex flex-col items-start justify-center h-full">
          <span className="font-plus text-xs md:text-sm font-medium text-cyan-400 uppercase mb-4">
            Get In Touch
          </span>

          <h2 className="font-plus text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-none tracking-tighter uppercase mb-2 select-none">
            Let's talk
          </h2>

          <p className="font-plus text-base sm:text-lg md:text-xl font-light tracking-wide text-cyan-200 mb-12">
            Make something unforgettable.
          </p>

          {/* Large Interactive Email Link */}
          <a
            href="mailto:hello@opproductions.com"
            className="group inline-flex items-center space-x-3 text-xl md:text-2xl font-black font-plus text-white hover:text-cyan-300 transition-colors duration-300 ease-out border-b border-white/10 pb-3 relative"
          >
            <span>hello@opproductions.com</span>
            <ArrowUpRight className="w-6 md:w-8 h-6 md:h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 text-cyan-400" />
          </a>
        </div>

        {/* RIGHT COLUMN: OFFICES & SOCIALS */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-12 md:space-y-16 h-full pl-0 lg:pl-12">
          {/* Offices Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
            {/* Karachi Office */}
            <div className="flex flex-col items-start group">
              <h4 className="font-plus font-extrabold text-lg tracking-wide text-white mb-4 border-b border-white/5 pb-2 w-full flex items-center gap-2">
                <MapPin size={16} className="text-cyan-500" />
                <span>Karachi</span>
              </h4>
              <p className="font-pop text-sm text-slate-400 font-light leading-relaxed max-w-[280px]">
                10-C Kh-e-Shahbaz, D.H.A Phase 6<br />
                Karachi, Sindh, Pakistan
              </p>
              <a
                href="tel:+923008204263"
                className="font-pop text-sm text-cyan-400 hover:text-white font-medium mt-4 flex items-center gap-2 transition-colors duration-200"
              >
                <Phone size={13} />
                <span>+92 300 8204263</span>
              </a>
            </div>

            {/* Los Angeles Office */}
            <div className="flex flex-col items-start group">
              <h4 className="font-plus font-extrabold text-lg tracking-wide text-white mb-4 border-b border-white/5 pb-2 w-full flex items-center gap-2">
                <MapPin size={16} className="text-cyan-500" />
                <span>Los Angeles</span>
              </h4>
              <p className="font-pop text-sm text-slate-400 font-light leading-relaxed max-w-[280px]">
                112 W 9th St, Ste 812
                <br />
                Los Angeles, CA, USA
              </p>
              <a
                href="tel:+15613606910"
                className="font-pop text-sm text-cyan-400 hover:text-white font-medium mt-4 flex items-center gap-2 transition-colors duration-200"
              >
                <Phone size={13} />
                <span>+1 561 360 6910</span>
              </a>
            </div>
          </div>

          {/* Social Channels Section */}
          <div className="flex flex-col items-start w-full border-t border-white/5 pt-10">
            <h5 className="font-plus text-xs font-medium tracking-wide text-cyan-400 uppercase mb-6">
              Elsewhere
            </h5>

            <div className="grid grid-cols-3 gap-4 items-center md:flex md:items-center md:gap-x-6">
              {/* Instagram */}
              <a
                href="https://instagram.com/opproductionsofficial"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center space-x-2 text-slate-300 hover:text-white font-pop text-sm font-medium tracking-wide transition-colors duration-200"
              >
                <FaInstagram
                  size={16}
                  className="text-slate-400 group-hover:text-cyan-400 transition-colors duration-200"
                />
                <span className="md:hidden">Instagram</span>
                <span className="hidden md:inline">Insta</span>
                <ArrowUpRight
                  size={14}
                  className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                />
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com/@opproductionsofficial1"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center space-x-2 text-slate-300 hover:text-white font-pop text-sm font-medium tracking-wide transition-colors duration-200"
              >
                <FaYoutube
                  size={16}
                  className="text-slate-400 group-hover:text-cyan-400 transition-colors duration-200"
                />
                <span className="md:hidden">YouTube</span>
                <span className="hidden md:inline">YT</span>
                <ArrowUpRight
                  size={14}
                  className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                />
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/company/99193478"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center space-x-2 text-slate-300 hover:text-white font-pop text-sm font-medium tracking-wide transition-colors duration-200"
              >
                <FaLinkedinIn
                  size={15}
                  className="text-slate-400 group-hover:text-cyan-400 transition-colors duration-200"
                />
                <span>LinkedIn</span>
                <ArrowUpRight
                  size={14}
                  className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                />
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com/share/1A59o5yTYr"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center space-x-2 text-slate-300 hover:text-white font-pop text-sm font-medium tracking-wide transition-colors duration-200"
              >
                <FaFacebookF
                  size={14}
                  className="text-slate-400 group-hover:text-cyan-400 transition-colors duration-200"
                />
                <span className="md:hidden">Facebook</span>
                <span className="hidden md:inline">FB</span>
                <ArrowUpRight
                  size={14}
                  className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                />
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com/@opproductionsofficial"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center space-x-2 text-slate-300 hover:text-white font-pop text-sm font-medium tracking-wide transition-colors duration-200"
              >
                <FaTiktok
                  size={14}
                  className="text-slate-400 group-hover:text-cyan-400 transition-colors duration-200"
                />
                <span>TikTok</span>
                <ArrowUpRight
                  size={14}
                  className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                />
              </a>

              {/* X / Twitter */}
              <a
                href="https://x.com/OPPOfficial"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center space-x-2 text-slate-300 hover:text-white font-pop text-sm font-medium tracking-wide transition-colors duration-200"
              >
                <FaXTwitter
                  size={14}
                  className="text-slate-400 group-hover:text-cyan-400 transition-colors duration-200"
                />
                <span>X</span>
                <ArrowUpRight
                  size={14}
                  className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;