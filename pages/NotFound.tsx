import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center pb-[15vh] p-4 relative overflow-hidden">
      {/* Background visual flair */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500 rounded-full blur-[150px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500 rounded-full blur-[100px] opacity-40"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Redesigned UFO */}
        <div className="relative mb-12 z-20 animate-[float_4s_ease-in-out_infinite]">
          <svg 
            viewBox="0 0 200 100" 
            className="w-48 md:w-72 text-cyan-400 filter drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {/* Top Dome */}
            <path d="M70 45 C70 25, 130 25, 130 45" className="fill-cyan-400/20" />
            {/* Main Body */}
            <path d="M20 60 C20 45, 180 45, 180 60 C180 75, 20 75, 20 60 Z" fill="black" strokeWidth="3" />
            {/* Bottom Section */}
            <path d="M60 75 C60 85, 140 85, 140 75" />
            
            {/* Pulsing Lights */}
            <circle cx="45" cy="60" r="3" className="fill-pink-500 animate-pulse" />
            <circle cx="75" cy="63" r="3" className="fill-yellow-400 animate-pulse [animation-delay:0.2s]" />
            <circle cx="100" cy="64" r="3" className="fill-pink-500 animate-pulse [animation-delay:0.4s]" />
            <circle cx="125" cy="63" r="3" className="fill-yellow-400 animate-pulse [animation-delay:0.6s]" />
            <circle cx="155" cy="60" r="3" className="fill-pink-500 animate-pulse [animation-delay:0.8s]" />
            
            {/* Tractor Beam visual indicator */}
            <path 
              d="M85 82 L70 180 M115 82 L130 180" 
              className="opacity-30 stroke-cyan-400 animate-pulse" 
              strokeWidth="1" 
              strokeDasharray="4 4"
            />
          </svg>
          
          {/* Beam Glow */}
          <div className="absolute top-[80%] left-1/2 -translate-x-1/2 w-32 h-64 bg-gradient-to-b from-cyan-400/30 to-transparent blur-xl pointer-events-none opacity-50 animate-pulse"></div>
        </div>
        
        <div className="max-w-xl mx-auto relative z-30">
          <h2 className="punk-font text-4xl md:text-6xl text-yellow-400 -rotate-2 bg-black border-4 border-white px-8 py-3 inline-block uppercase leading-none mb-10 shadow-[8px_8px_0px_0px_rgba(255,0,255,1)]">
            ALIENS EXIST...
          </h2>
          <p className="text-2xl md:text-3xl font-black uppercase italic leading-tight mb-12 text-white">
            BUT THIS PAGE DEFINITELY DOESN'T.
          </p>
          
          <div className="space-y-8 flex flex-col items-center">
            <p className="text-xl font-bold text-gray-400 uppercase tracking-wider">
              WHERE ARE YOU? AND I'M SO SORRY...
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center gap-4 bg-pink-500 text-white px-12 py-6 font-black text-2xl md:text-3xl border-4 border-white hover:bg-cyan-400 hover:text-black transition-all transform hover:scale-105 active:scale-95 leading-none shadow-[10px_10px_0px_0px_rgba(255,255,0,1)] hover:shadow-none"
            >
              <Home size={32} /> GO BACK TO THE SHOW
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(3deg); }
        }
      `}</style>
    </div>
  );
};

export default NotFound;