
import React, { useState, useEffect } from 'react';
import { BANDSINTOWN_URL } from '../constants';
import { fetchLiveTourDates } from '../services/bandsInTownService';
import { TourDate } from '../types';
import { ExternalLink, Ticket, MapPin, Calendar, RefreshCw } from 'lucide-react';

const Tour: React.FC = () => {
  const [dates, setDates] = useState<TourDate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDates = async () => {
      setLoading(true);
      const liveDates = await fetchLiveTourDates();
      setDates(liveDates);
      setLoading(false);
    };
    loadDates();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-20 text-center">
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-6 italic text-yellow-400 uppercase leading-[0.85]">TOUR DATES</h1>
          <p className="punk-font text-3xl text-pink-500 -rotate-1 mb-10 uppercase leading-none">Let’s go, Don’t wait!</p>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <RefreshCw className="w-16 h-16 text-pink-500 animate-spin mb-4" />
            <h2 className="punk-font text-4xl uppercase leading-none">SHREDDING THE DATA...</h2>
          </div>
        ) : dates.length > 0 ? (
          <div className="space-y-8 mb-20">
            {dates.map((item, idx) => (
              <div 
                key={item.id}
                className={`relative bg-zinc-900 border-4 border-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 transition-all hover:scale-[1.01] shadow-[10px_10px_0px_0px_rgba(255,0,255,1)] ${
                  idx % 2 === 0 ? 'hover:shadow-[10px_10px_0px_0px_rgba(0,255,255,1)]' : ''
                }`}
              >
                <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                  <div className="flex flex-col items-center justify-center bg-pink-500 text-black p-4 min-w-[140px] border-2 border-black -rotate-2 leading-tight">
                    <Calendar size={20} className="mb-1" />
                    <span className="font-black text-2xl uppercase">{item.date}</span>
                  </div>
                  
                  <div>
                    <h3 className="text-3xl md:text-4xl font-black text-yellow-400 mb-2 uppercase tracking-tighter italic leading-[0.85]">
                      {item.venue}
                    </h3>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-cyan-400 font-bold uppercase text-lg leading-none">
                      <MapPin size={20} />
                      {item.location}
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-auto">
                  <a 
                    href={item.ticketLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block text-center px-10 py-5 font-black text-2xl border-4 border-black transition-all transform hover:-rotate-2 leading-none ${
                      item.isSoldOut 
                        ? 'bg-gray-600 text-gray-300 cursor-not-allowed line-through' 
                        : 'bg-yellow-400 text-black hover:bg-white active:translate-y-1'
                    }`}
                  >
                    {item.isSoldOut ? 'SOLD OUT' : 'MORE INFO'}
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-zinc-900 border-4 border-white p-12 mb-20">
            <h2 className="punk-font text-5xl mb-4 text-pink-500 uppercase leading-none">NO GIGS FOUND!</h2>
            <p className="text-2xl font-black uppercase mb-8 leading-[1.2]">THE TOUR BUS IS GETTING SERVICED. CHECK BACK SOON.</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-yellow-400 text-black px-8 py-4 font-black text-xl border-4 border-black hover:bg-white uppercase leading-none"
            >
              RELOAD THE PIT
            </button>
          </div>
        )}

        {/* Bandsintown tracker button moved to bottom */}
        <div className="flex justify-center mt-12 mb-20">
          <a 
            href={BANDSINTOWN_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-cyan-400 text-black px-10 py-4 font-black text-xl uppercase border-4 border-white hover:bg-pink-500 hover:text-white transition-all transform hover:rotate-2 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] leading-none"
          >
            Track on Bandsintown <ExternalLink size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Tour;
