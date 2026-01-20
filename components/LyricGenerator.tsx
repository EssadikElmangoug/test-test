import React, { useState } from 'react';
import { generatePunkLyrics } from '../services/geminiService';
import { Music, RefreshCw } from 'lucide-react';

const LyricGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [verse, setVerse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    const result = await generatePunkLyrics(topic);
    setVerse(result);
    setLoading(false);
  };

  return (
    <div className="bg-yellow-400 p-8 rounded-lg sticker-rotate-left border-4 border-black text-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
      <h3 className="punk-font text-3xl mb-4 uppercase leading-none">AI VERSE SHREDDER</h3>
      <p className="font-black mb-4 italic uppercase text-sm">"I guess this is growing up..."</p>
      
      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic (e.g., aliens)"
          className="p-4 border-4 border-black rounded-none font-black text-lg bg-white text-black placeholder:text-gray-400 focus:outline-none focus:ring-8 focus:ring-pink-500/30 transition-all uppercase leading-none"
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-black text-white font-black py-5 px-6 border-4 border-black hover:bg-pink-500 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-3 uppercase text-xl leading-none"
        >
          {loading ? <RefreshCw className="animate-spin" size={24} /> : <Music size={24} />}
          {loading ? 'SHREDDING...' : 'GENERATE VERSE'}
        </button>
      </div>

      {verse && (
        <div className="mt-8 p-6 bg-white border-4 border-black font-black text-xl italic whitespace-pre-line animate-in fade-in slide-in-from-top-4 duration-500 text-black leading-tight">
          <div className="text-pink-500 mb-2 uppercase text-xs not-italic tracking-widest font-black">VERSE 1:</div>
          {verse}
        </div>
      )}
    </div>
  );
};

export default LyricGenerator;