import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchLiveTourDates } from '../services/bandsInTownService';
import { TourDate } from '../types';
import LyricGenerator from '../components/LyricGenerator';
import { PlayCircle, ExternalLink, Calendar, MapPin, RefreshCw, X } from 'lucide-react';

const Home: React.FC = () => {
  const [nextShows, setNextShows] = useState<TourDate[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Updated link for the Home page promo as per user request
  const PROMO_VIDEO_URL = "https://www.blink182show.com/Media/Videos/The%20Australian%20Blink-182%20Show.mp4";
  const HERO_IMAGE_URL = "https://blink182show.com/Media/Photos/Blink182ShowHeroImage.jpeg";
  const INTRO_IMAGE_URL = "https://blink182show.com/Media/Photos/Capturelive.JPG";

  useEffect(() => {
    const loadNextShows = async () => {
      setLoading(true);
      const liveDates = await fetchLiveTourDates();
      setNextShows(liveDates.slice(0, 3));
      setLoading(false);
    };
    loadNextShows();
  }, []);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isModalOpen]);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 opacity-60">
          <img 
            src={HERO_IMAGE_URL} 
            alt="The Australian Blink-182 Show Live" 
            className="w-full h-full object-cover filter contrast-110 brightness-75"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80"></div>
        
        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.85] italic uppercase flex flex-col items-center">
            <span className="text-pink-500">THE AUSTRALIAN</span>
            <span className="text-yellow-400">BLINK-182 SHOW</span>
          </h1>
          <p className="punk-font text-2xl md:text-4xl text-cyan-400 mb-10 max-w-2xl mx-auto sticker-rotate-right leading-none uppercase">
            THE WORLD’S #1 TRIBUTE TO MARK, TOM & TRAVIS
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              to="/tour" 
              className="inline-flex items-center justify-center bg-cyan-400 text-black px-10 py-5 font-black text-xl md:text-2xl border-4 border-white hover:bg-yellow-400 hover:text-black transition-all transform hover:scale-105 active:scale-95 leading-none text-center min-w-[280px] h-[72px] md:h-[84px]"
            >
              FIND TOUR DATES
            </Link>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-3 bg-pink-500 text-white px-10 py-5 font-black text-xl md:text-2xl border-4 border-white hover:bg-yellow-400 hover:text-black transition-all transform hover:scale-105 active:scale-95 leading-none text-center min-w-[280px] h-[72px] md:h-[84px]"
            >
              <PlayCircle size={28} /> WATCH PROMO
            </button>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 px-4 bg-white text-black">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="punk-font text-5xl mb-6 -rotate-2 leading-none uppercase">WHAT'S MY AGE AGAIN?</h2>
            <p className="text-xl font-bold leading-[1.3] mb-8 uppercase text-black">
              Relive the golden era of pop-punk with the most authentic Blink-182 experience in the world. 
              From the high-octane hits of Enema of the State and Take Off Your Pants and Jacket to the brooding tracks of the self-titled album, 
              we bring the noise, the jokes, and the naked energy.
            </p>
            <Link to="/media" className="inline-block transition-all transform hover:scale-105 hover:-rotate-1">
              <h2 className="punk-font text-4xl mb-0 leading-none">
                <span className="bg-pink-500 text-white px-4 py-1 uppercase inline-block">SEE THE SHOW PHOTOS</span>
              </h2>
            </Link>
          </div>
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full border-4 border-cyan-500 -z-10 transform -rotate-3"></div>
            <img 
              src={INTRO_IMAGE_URL} 
              alt="The Australian Blink-182 Show Performance" 
              className="w-full rounded-sm border-4 border-black shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Tour Teaser */}
      <section className="py-20 px-4 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-[0.85]">NEXT SHOWS</h2>
            <Link to="/tour" className="text-yellow-400 font-bold mb-2 hover:underline flex items-center gap-2 leading-none uppercase text-sm tracking-widest">
              VIEW ALL DATES <ExternalLink size={16} />
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-20 border-4 border-dashed border-zinc-700">
              <RefreshCw className="animate-spin text-pink-500 w-12 h-12" />
            </div>
          ) : nextShows.length > 0 ? (
            <div className="grid gap-8">
              {nextShows.map((show, idx) => (
                <div 
                  key={show.id}
                  className={`relative bg-zinc-900 border-4 border-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 transition-all hover:scale-[1.01] shadow-[10px_10px_0px_0px_rgba(255,0,255,1)] ${
                    idx % 2 === 0 ? 'hover:shadow-[10px_10px_0px_0px_rgba(0,255,255,1)]' : ''
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                    <div className="flex flex-col items-center justify-center bg-pink-500 text-black p-4 min-w-[140px] border-2 border-black -rotate-2 leading-tight">
                      <Calendar size={20} className="mb-1" />
                      <span className="font-black text-2xl uppercase">{show.date}</span>
                    </div>
                    
                    <div>
                      <h3 className="text-3xl md:text-4xl font-black text-yellow-400 mb-2 uppercase tracking-tighter italic leading-[0.85]">
                        {show.venue}
                      </h3>
                      <div className="flex items-center justify-center md:justify-start gap-2 text-cyan-400 font-bold uppercase text-lg leading-none">
                        <MapPin size={20} />
                        {show.location}
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-auto">
                    <a 
                      href={show.ticketLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block text-center px-10 py-5 font-black text-2xl border-4 border-black transition-all transform hover:-rotate-2 leading-none ${
                        show.isSoldOut 
                          ? 'bg-gray-600 text-gray-300 cursor-not-allowed line-through' 
                          : 'bg-yellow-400 text-black hover:bg-white active:translate-y-1'
                      }`}
                    >
                      {show.isSoldOut ? 'SOLD OUT' : 'MORE INFO'}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-zinc-900 p-10 text-center border-4 border-zinc-700">
              <p className="punk-font text-3xl uppercase leading-none">NO UPCOMING SHOWS FOUND!</p>
            </div>
          )}
        </div>
      </section>

      {/* AI Lyric Section */}
      <section className="py-20 px-4 bg-cyan-500">
        <div className="max-w-4xl mx-auto">
          <LyricGenerator />
        </div>
      </section>

      {/* Video Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 animate-in fade-in duration-300"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-5xl max-h-[85vh] aspect-video bg-black border-4 border-cyan-400 shadow-[0_0_50px_rgba(0,255,255,0.4)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-pink-500 transition-colors p-2 z-[110] bg-black/50 rounded-full"
              aria-label="Close video"
            >
              <X size={32} strokeWidth={3} />
            </button>
            <video
              className="w-full h-full object-contain"
              src={PROMO_VIDEO_URL}
              controls
              autoPlay
              playsInline
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;