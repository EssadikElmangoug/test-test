
import React from 'react';
import { Link } from 'react-router-dom';
import { BLINK_LOGO, INSTAGRAM_URL, FACEBOOK_URL, YOUTUBE_URL, TIKTOK_URL, TIKTOK_ICON, INSTAGRAM_ICON, FACEBOOK_ICON, YOUTUBE_ICON } from '../constants';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-black text-white border-t-8 border-cyan-400 py-16 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <Link 
          to="/" 
          onClick={scrollToTop}
          className="flex items-center gap-6 group cursor-pointer text-left"
        >
          <div className="w-24 h-24 group-hover:-rotate-12 transition-all duration-300 shrink-0">
            {BLINK_LOGO}
          </div>
          <div>
            <h2 className="band-logo-style text-3xl">
              <span className="text-pink-500 block">THE AUSTRALIAN</span>
              <span className="text-yellow-400 block">BLINK-182 SHOW</span>
            </h2>
            <p className="text-gray-400 font-bold mt-3 uppercase tracking-widest text-sm">
              © {new Date().getFullYear()} - THE ULTIMATE TRIBUTE
            </p>
          </div>
        </Link>

        <div className="flex gap-6 items-center">
          <a 
            href={INSTAGRAM_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-3 bg-zinc-900 border-2 border-white text-white hover:bg-pink-500 hover:text-black hover:-rotate-6 transition-all transform flex items-center justify-center"
            aria-label="Instagram"
          >
            <div className="w-7 h-7">
              {INSTAGRAM_ICON}
            </div>
          </a>
          <a 
            href={FACEBOOK_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-3 bg-zinc-900 border-2 border-white text-white hover:bg-cyan-400 hover:text-black hover:rotate-6 transition-all transform flex items-center justify-center"
            aria-label="Facebook"
          >
            <div className="w-7 h-7">
              {FACEBOOK_ICON}
            </div>
          </a>
          <a 
            href={YOUTUBE_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-3 bg-zinc-900 border-2 border-white text-white hover:bg-yellow-400 hover:text-black hover:-rotate-3 transition-all transform flex items-center justify-center"
            aria-label="Youtube"
          >
            <div className="w-7 h-7">
              {YOUTUBE_ICON}
            </div>
          </a>
          <a 
            href={TIKTOK_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-3 bg-zinc-900 border-2 border-white text-white hover:bg-white hover:text-black hover:rotate-12 transition-all transform flex items-center justify-center"
            aria-label="TikTok"
          >
            <div className="w-7 h-7">
              {TIKTOK_ICON}
            </div>
          </a>
        </div>

        <div className="text-center md:text-right">
          <p className="punk-font text-2xl mb-2 text-cyan-400 uppercase leading-none">I GUESS THIS IS GROWING UP</p>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest leading-none">MADE WITH BEER & PIES IN OZ</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;