import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { INSTAGRAM_URL, FACEBOOK_URL, YOUTUBE_URL, TIKTOK_URL, INSTAGRAM_ICON, FACEBOOK_ICON, YOUTUBE_ICON, TIKTOK_ICON } from '../constants';

const Booking: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const googleFormData = new URLSearchParams();
    googleFormData.append('entry.2064907981', formData.get('name') as string);
    googleFormData.append('entry.758610539', formData.get('email') as string);
    googleFormData.append('entry.1602875882', formData.get('message') as string);

    try {
      await fetch('https://docs.google.com/forms/d/e/1FAIpQLSeahHBW4tjeshVDlQGiB81WlVG1So4Nszsp1fHp-QcjeiDZQg/formResponse', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: googleFormData.toString(),
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen py-20 px-4 relative overflow-hidden">
      {/* Background visual flair */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500 opacity-10 blur-3xl rounded-full -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500 opacity-10 blur-3xl rounded-full -ml-48 -mb-48"></div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 relative z-10">
        <div>
          <h1 className="text-[80px] md:text-[140px] font-black tracking-tighter mb-8 leading-[0.8] italic uppercase flex flex-col">
            <span className="text-cyan-400">BOOK</span>
            <span className="text-cyan-400">THE</span>
            <span className="text-pink-500">SHOW</span>
          </h1>
          <p className="text-2xl font-bold mb-12 leading-relaxed uppercase">
            WANT THE WORLD'S #1 BLINK-182 TRIBUTE AT YOUR VENUE, FESTIVAL OR EVENT? WE BRING THE NOISE, THE NOSTALGIA, AND THE NAKED ENERGY. IF YOU'RE FEELING THIS - GET IN TOUCH TODAY!
          </p>

          <div className="space-y-10">
            <div className="flex items-start gap-6 group">
              <div className="bg-yellow-400 p-4 text-black border-2 border-white transform -rotate-12 group-hover:rotate-0 transition-transform shrink-0">
                <Mail size={32} />
              </div>
              <div>
                <h4 className="font-black text-xl text-pink-500 uppercase">EMAIL US</h4>
                <a 
                  href="mailto:australianblink182show@gmail.com" 
                  className="text-2xl md:text-3xl font-black break-all hover:text-yellow-400 transition-colors text-white"
                >
                  australianblink182show@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="bg-pink-500 p-4 text-white border-2 border-white transform rotate-12 group-hover:rotate-0 transition-transform shrink-0">
                <Phone size={32} />
              </div>
              <div>
                <h4 className="font-black text-xl text-cyan-400 uppercase">CALL US</h4>
                <p className="text-2xl md:text-3xl font-black leading-none">(02) 9872 4144</p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="bg-cyan-400 p-4 text-black border-2 border-white transform -rotate-6 group-hover:rotate-0 transition-transform shrink-0">
                <MapPin size={32} />
              </div>
              <div>
                <h4 className="font-black text-xl text-yellow-400 uppercase">LOCATION</h4>
                <p className="text-2xl md:text-3xl font-black uppercase">Sydney / Worldwide</p>
              </div>
            </div>
          </div>

          <div className="mt-16 flex gap-6">
            <a 
              href={INSTAGRAM_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-4 border-2 border-white hover:bg-white hover:text-black transition-all flex items-center justify-center"
              aria-label="Instagram"
            >
              <div className="w-8 h-8">
                {INSTAGRAM_ICON}
              </div>
            </a>
            <a 
              href={FACEBOOK_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-4 border-2 border-white hover:bg-white hover:text-black transition-all flex items-center justify-center"
              aria-label="Facebook"
            >
              <div className="w-8 h-8">
                {FACEBOOK_ICON}
              </div>
            </a>
            <a 
              href={YOUTUBE_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-4 border-2 border-white hover:bg-white hover:text-black transition-all flex items-center justify-center"
              aria-label="Youtube"
            >
              <div className="w-8 h-8">
                {YOUTUBE_ICON}
              </div>
            </a>
            <a 
              href={TIKTOK_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-4 border-2 border-white hover:bg-white hover:text-black transition-all flex items-center justify-center"
              aria-label="TikTok"
            >
              <div className="w-8 h-8">
                {TIKTOK_ICON}
              </div>
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-4 -right-4 w-24 h-10 bg-gray-400 opacity-40 mix-blend-multiply -rotate-45 z-20"></div>
          <div className="absolute -bottom-4 -left-4 w-24 h-10 bg-gray-400 opacity-40 mix-blend-multiply rotate-45 z-20"></div>
          
          <div className="absolute -inset-4 bg-yellow-400 -z-10 transform rotate-2"></div>
          <div className="bg-white text-black p-8 md:p-12 border-4 border-black relative overflow-hidden">
            <div className="absolute -top-10 -right-10 text-pink-500 opacity-10 font-black text-9xl pointer-events-none select-none">
              182
            </div>

            {submitted ? (
              <div className="text-center py-20 flex flex-col items-center">
                <div className="punk-font text-7xl mb-6 animate-bounce text-pink-500 uppercase">F**K YEAH!</div>
                <p className="text-3xl font-black mb-8 uppercase italic text-black">WE'LL GET BACK TO YOU SOON, MATE.</p>
                <div className="w-24 h-24 bg-cyan-400 rounded-full flex items-center justify-center border-4 border-black mb-10">
                  <Send className="text-black" size={48} />
                </div>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="bg-black text-white px-8 py-4 font-black text-xl hover:bg-yellow-400 hover:text-black transition-all transform hover:rotate-2"
                >
                  SEND ANOTHER MESSAGE?
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <h2 className="punk-font text-5xl mb-8 -rotate-1 italic uppercase text-black">GET IN THE PIT</h2>
                
                <div className="group">
                  <label className="block font-black text-lg mb-2 uppercase group-focus-within:text-pink-600 transition-colors text-black">WHO ARE YA?</label>
                  <input 
                    name="name"
                    type="text" 
                    required
                    className="w-full p-4 border-4 border-black font-bold focus:ring-8 focus:ring-pink-500/20 outline-none placeholder:text-gray-400 bg-white text-black uppercase"
                    placeholder="NAME / VENUE / LABEL"
                  />
                </div>

                <div className="group">
                  <label className="block font-black text-lg mb-2 uppercase group-focus-within:text-cyan-600 transition-colors text-black">WHERE DO WE REPLY?</label>
                  <input 
                    name="email"
                    type="email" 
                    required
                    className="w-full p-4 border-4 border-black font-bold focus:ring-8 focus:ring-cyan-500/20 outline-none placeholder:text-gray-400 bg-white text-black uppercase"
                    placeholder="YOUR@EMAIL.COM"
                  />
                </div>

                <div className="group">
                  <label className="block font-black text-lg mb-2 uppercase group-focus-within:text-yellow-600 transition-colors text-black">WHAT'S THE GOSS?</label>
                  <textarea 
                    name="message"
                    rows={4}
                    required
                    className="w-full p-4 border-4 border-black font-bold focus:ring-8 focus:ring-yellow-500/20 outline-none placeholder:text-gray-400 bg-white text-black uppercase"
                    placeholder="DATES, VENUES, SHOUTOUTS..."
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-black text-white py-6 font-black text-3xl flex items-center justify-center gap-4 hover:bg-pink-500 hover:scale-105 transition-all active:scale-95 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none uppercase"
                >
                  SEND IT! <Send size={32} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;