import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BLINK_LOGO } from '../constants';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleNavClick = () => {
    window.scrollTo(0, 0);
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'TOUR', path: '/tour' },
    { name: 'MEDIA', path: '/media' },
    { name: 'BOOKING', path: '/booking' },
  ];

  return (
    <nav className="bg-black text-white sticky top-0 z-50 border-b-4 border-cyan-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <Link to="/" onClick={handleNavClick} className="flex items-center gap-6 group">
            <div className="w-16 h-16 sm:w-20 sm:h-20 group-hover:rotate-12 transition-all duration-300 shrink-0">
              {BLINK_LOGO}
            </div>
            <div>
              <h2 className="band-logo-style text-3xl">
                <span className="text-pink-500 block">THE AUSTRALIAN</span>
                <span className="text-yellow-400 block">BLINK-182 SHOW</span>
              </h2>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={handleNavClick}
                className={`font-black text-lg hover:text-pink-500 transition-colors uppercase italic ${
                  location.pathname === link.path ? 'text-cyan-400 border-b-4 border-cyan-400' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-pink-500 transition-colors"
            >
              {isOpen ? <X size={36} /> : <Menu size={36} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-black border-t-4 border-pink-500">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={handleNavClick}
                className={`block px-4 py-6 text-3xl font-black italic transition-colors hover:bg-yellow-400 hover:text-black ${
                  location.pathname === link.path ? 'text-cyan-400' : 'text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;