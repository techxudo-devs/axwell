import React from "react";
import { MapPin, Phone, ArrowUpRight } from "lucide-react";
import { FaInstagram, FaYoutube, FaLinkedinIn, FaFacebookF, FaTiktok, FaXTwitter } from "react-icons/fa6";

const Contact: React.FC = () => {
  return (
    <div className="w-full flex flex-col space-y-8 text-white z-10 select-none">
      {/* Primary Global Email */}
      <div className="flex flex-col items-start">
        <span className="font-plus text-xs font-medium tracking-wide text-[#0FB6AE] uppercase mb-2">
          Direct Inquiry
        </span>
        <a
          href="mailto:hello@opproductions.com"
          className="group inline-flex items-center space-x-2 text-xl sm:text-2xl md:text-3xl font-black font-plus text-white hover:text-[#0FB6AE] transition-colors duration-300"
        >
          <span>hello@opproductions.com</span>
          <ArrowUpRight
            size={24}
            className="text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
          />
        </a>
      </div>

      {/* Offices Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full border-t border-white/5 pt-8">
        {/* Karachi Address */}
        <div className="flex flex-col items-start">
          <h4 className="font-plus font-bold text-base text-white mb-3 flex items-center gap-2 md:text-lg">
            <MapPin size={16} className="text-[#0FB6AE]" />
            <span>Karachi</span>
          </h4>
          <p className="font-plus text-xs text-slate-400 font-light leading-relaxed">
            10-C Kh-e-Shahbaz, D.H.A Phase 6<br />
            Karachi, Sindh, Pakistan
          </p>
          <a
            href="tel:+923008204263"
            className="font-plus text-xs text-purple-400 hover:text-white font-medium mt-3 flex items-center gap-1.5 transition-colors duration-200 md:text-sm"
          >
            <Phone size={14} />
            <span>+92 300 8204263</span>
          </a>
        </div>

        {/* Los Angeles Address */}
        <div className="flex flex-col items-start">
          <h4 className="font-plus font-bold text-base text-white mb-3 flex items-center gap-2 md:text-lg">
            <MapPin size={16} className="text-[#0FB6AE]" />
            <span>Los Angeles</span>
          </h4>
          <p className="font-plus text-xs text-slate-400 font-light leading-relaxed">
            112 W 9th St, Ste 812
            <br />
            Los Angeles, CA, USA
          </p>
          <a
            href="tel:+15613606910"
            className="font-plus text-xs text-purple-400 hover:text-white font-medium mt-3 flex items-center gap-1.5 transition-colors duration-200 md:text-sm"
          >
            <Phone size={14} />
            <span>+1 561 360 6910</span>
          </a>
        </div>
      </div>

      {/* Elsewhere Social Links */}
      <div className="flex flex-col items-start w-full border-t border-white/5 pt-8">
        <span className="font-plus text-xs font-medium tracking-wide text-[#0FB6AE] uppercase mb-4">
          Elsewhere
        </span>
        <div className="grid grid-cols-3 gap-4 items-center font-plus md:flex md:items-center md:gap-x-6">
          {/* Instagram Link */}
          <a
            href="https://instagram.com/opproductionsofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center space-x-1.5 text-slate-300 hover:text-white text-xs font-medium tracking-wide transition-colors duration-200"
          >
            <FaInstagram
              size={14}
              className="text-slate-400 group-hover:text-purple-400 transition-colors duration-200"
            />
            <span className="md:hidden">Instagram</span>
            <span className="hidden md:inline">Insta</span>
            <ArrowUpRight
              size={12}
              className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
            />
          </a>

          {/* YouTube Link */}
          <a
            href="https://youtube.com/@opproductionsofficial1"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center space-x-1.5 text-slate-300 hover:text-white text-xs font-medium tracking-wide transition-colors duration-200"
          >
            <FaYoutube
              size={14}
              className="text-slate-400 group-hover:text-purple-400 transition-colors duration-200"
            />
            <span className="md:hidden">YouTube</span>
            <span className="hidden md:inline">YT</span>
            <ArrowUpRight
              size={12}
              className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
            />
          </a>

          {/* LinkedIn Link */}
          <a
            href="https://linkedin.com/company/99193478"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center space-x-1.5 text-slate-300 hover:text-white text-xs font-medium tracking-wide transition-colors duration-200"
          >
            <FaLinkedinIn
              size={13}
              className="text-slate-400 group-hover:text-purple-400 transition-colors duration-200"
            />
            <span>LinkedIn</span>
            <ArrowUpRight
              size={12}
              className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
            />
          </a>

          {/* Facebook Link */}
          <a
            href="https://facebook.com/share/1A59o5yTYr"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center space-x-1.5 text-slate-300 hover:text-white text-xs font-medium tracking-wide transition-colors duration-200"
          >
            <FaFacebookF
              size={13}
              className="text-slate-400 group-hover:text-purple-400 transition-colors duration-200"
            />
            <span className="md:hidden">Facebook</span>
            <span className="hidden md:inline">FB</span>
            <ArrowUpRight
              size={12}
              className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
            />
          </a>

          {/* TikTok Link */}
          <a
            href="https://tiktok.com/@opproductionsofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center space-x-1.5 text-slate-300 hover:text-white text-xs font-medium tracking-wide transition-colors duration-200"
          >
            <FaTiktok
              size={13}
              className="text-slate-400 group-hover:text-purple-400 transition-colors duration-200"
            />
            <span>TikTok</span>
            <ArrowUpRight
              size={12}
              className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
            />
          </a>

          {/* X / Twitter Link */}
          <a
            href="https://x.com/OPPOfficial"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center space-x-1.5 text-slate-300 hover:text-white text-xs font-medium tracking-wide transition-colors duration-200"
          >
            <FaXTwitter
              size={13}
              className="text-slate-400 group-hover:text-purple-400 transition-colors duration-200"
            />
            <span>X</span>
            <ArrowUpRight
              size={12}
              className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
