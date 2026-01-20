import React, { useState, useEffect, useMemo } from 'react';
import { MEDIA_GALLERY, LINKTREE_URL } from '../constants';
import { Play, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { MediaItem } from '../types';

const TapeEffect: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`absolute w-16 h-8 bg-gray-300 opacity-70 mix-blend-multiply border border-gray-400 transform z-20 ${className}`} />
);

const Media: React.FC = () => {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [isPortraitMode, setIsPortraitMode] = useState(false);

  // Updated featured clip URL as per user request
  const PROMO_VIDEO_URL = "https://www.blink182show.com/Media/Videos/FeatureHeroVideo.m4v";
  const PROMO_THUMBNAIL_URL = "https://www.blink182show.com/Media/Photos/HeroFeatureClip.jpeg";

  // Filter gallery into types
  const photoItems = MEDIA_GALLERY.filter(item => item.type === 'image');
  const videoItems = MEDIA_GALLERY.filter(item => item.type === 'video');

  const openLightbox = (item: MediaItem, index: number) => {
    setSelectedMedia(item);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedMedia(null);
  };

  const openVideoPlayer = (url: string, isPortrait: boolean = false) => {
    setActiveVideoUrl(url);
    setIsPortraitMode(isPortrait);
    setIsVideoModalOpen(true);
  };

  const closeVideoPlayer = () => {
    setIsVideoModalOpen(false);
    setActiveVideoUrl(null);
    setIsPortraitMode(false);
  };

  const navigatePhotos = (direction: 'next' | 'prev') => {
    let nextIdx = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIdx >= photoItems.length) nextIdx = 0;
    if (nextIdx < 0) nextIdx = photoItems.length - 1;
    setCurrentIndex(nextIdx);
    setSelectedMedia(photoItems[nextIdx]);
  };

  useEffect(() => {
    if (isVideoModalOpen || selectedMedia) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isVideoModalOpen, selectedMedia]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedMedia) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') navigatePhotos('next');
        if (e.key === 'ArrowLeft') navigatePhotos('prev');
      }
      if (isVideoModalOpen && e.key === 'Escape') {
        closeVideoPlayer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMedia, currentIndex, isVideoModalOpen]);

  // Determine aspect ratio for lightbox
  const isLandscape = [0, 2, 4, 5, 8, 11].includes(currentIndex);

  return (
    <div className="bg-white text-black min-h-screen py-12 md:py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 relative">
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter italic border-b-8 border-black pb-4 mb-6 relative z-10 uppercase leading-[0.85]">
            SHOW GALLERY
          </h1>
          <p className="punk-font text-2xl md:text-4xl text-pink-600 -rotate-1 inline-block uppercase leading-none">SIGHTS & SOUNDS FROM THE FRONT ROW</p>
        </header>

        {/* Video Highlight Section */}
        <section className="mb-24">
          <h2 className="punk-font text-4xl mb-8 flex items-center gap-4 leading-none">
            <span className="bg-black text-white px-4 py-1 uppercase">FEATURED CLIP</span>
          </h2>
          <div 
            onClick={() => openVideoPlayer(PROMO_VIDEO_URL, true)}
            className="block relative aspect-video bg-black rounded-lg overflow-hidden border-8 border-black group cursor-pointer shadow-[20px_20px_0px_0px_rgba(255,0,255,1)]"
          >
            <img 
              src={PROMO_THUMBNAIL_URL} 
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
              alt="Video Thumbnail" 
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-yellow-400 p-8 rounded-full border-4 border-black group-hover:scale-110 transition-transform group-hover:bg-cyan-400">
                <Play size={64} fill="currentColor" />
              </div>
            </div>
            <div className="absolute top-8 right-8">
              <span className="bg-cyan-400 text-black px-6 py-2 font-black text-2xl border-2 border-black -rotate-3 inline-block uppercase leading-none">
                WATCH NOW
              </span>
            </div>
          </div>
        </section>

        {/* Photo Grid */}
        <section className="mb-24">
          <h2 className="punk-font text-4xl mb-8 flex items-center gap-4 leading-none">
            <span className="bg-pink-500 text-white px-4 py-1 uppercase">THE PIT PHOTOS</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {photoItems.map((item, idx) => (
              <div 
                key={item.id} 
                onClick={() => openLightbox(item, idx)}
                className={`relative p-4 bg-white border-4 border-black group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] ${
                  idx % 3 === 0 ? 'rotate-2' : idx % 3 === 1 ? '-rotate-1' : 'rotate-1'
                }`}
              >
                <div className="relative aspect-square overflow-hidden mb-4 border-2 border-black/10">
                  <img 
                    src={item.url} 
                    alt={item.thumbnail} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                    <Maximize2 className="text-white w-12 h-12" />
                  </div>
                </div>
                <div className="punk-font text-lg text-black uppercase leading-none">
                  {item.thumbnail || 'UNNAMED SHOW #182'}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* VIDEO VAULT Section */}
        <section className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end gap-4 mb-8">
            <h2 className="punk-font text-4xl flex items-center gap-4 leading-none">
              <span className="bg-cyan-400 text-black px-4 py-1 uppercase">VIDEO VAULT</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {videoItems.map((item, idx) => (
              <div 
                key={item.id}
                onClick={() => openVideoPlayer(item.url, false)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-video bg-black border-4 border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,255,255,1)] group-hover:shadow-[8px_8px_0px_0px_rgba(255,0,255,1)] transition-all transform group-hover:-translate-y-1">
                  {item.poster ? (
                    <img 
                      src={item.poster} 
                      alt={item.thumbnail} 
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-zinc-800 group-hover:bg-zinc-700 transition-colors" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center text-white group-hover:text-yellow-400 group-hover:border-yellow-400 transition-colors bg-black/20 backdrop-blur-sm">
                      <Play size={40} fill="currentColor" />
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-start">
                  <h3 className="punk-font text-2xl uppercase leading-none group-hover:text-pink-600 transition-colors">
                    {item.thumbnail}
                  </h3>
                  <span className="text-xs font-black bg-yellow-400 px-2 py-1 rotate-3 border border-black uppercase">LIVE</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Unified Video Modal */}
      {isVideoModalOpen && activeVideoUrl && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 animate-in fade-in duration-300"
          onClick={closeVideoPlayer}
        >
          <div 
            className={`relative bg-black border-4 border-cyan-400 shadow-[0_0_50px_rgba(0,255,255,0.4)] overflow-hidden transition-all duration-300 ${
              isPortraitMode ? 'w-[85vw] md:w-[450px] aspect-[9/16] max-h-[90vh]' : 'w-full max-w-5xl aspect-video'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closeVideoPlayer}
              className="absolute top-4 right-4 text-white hover:text-pink-500 transition-colors p-2 z-[110] bg-black/50 rounded-full"
              aria-label="Close video"
            >
              <X size={32} strokeWidth={3} />
            </button>
            <video
              className="w-full h-full object-contain"
              src={activeVideoUrl}
              controls
              autoPlay
              playsInline
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedMedia && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          <div className="absolute inset-0 bg-pink-600 opacity-50 pointer-events-none z-0"></div>

          <button 
            className="absolute top-6 right-6 text-white hover:text-yellow-400 transition-colors p-2 z-[110]"
            onClick={closeLightbox}
          >
            <X size={48} strokeWidth={3} />
          </button>

          <button 
            className="absolute left-2 md:left-10 top-1/2 -translate-y-1/2 text-white hover:text-cyan-400 transition-all p-3 z-[110] bg-black/50 hover:bg-black rounded-full shadow-lg"
            onClick={(e) => { e.stopPropagation(); navigatePhotos('prev'); }}
          >
            <ChevronLeft size={48} strokeWidth={4} />
          </button>

          <button 
            className="absolute right-2 md:right-10 top-1/2 -translate-y-1/2 text-white hover:text-cyan-400 transition-all p-3 z-[110] bg-black/50 hover:bg-black rounded-full shadow-lg"
            onClick={(e) => { e.stopPropagation(); navigatePhotos('next'); }}
          >
            <ChevronRight size={48} strokeWidth={4} />
          </button>

          <div 
            className={`relative w-full flex flex-col items-center justify-center z-10 px-4 transition-all duration-300 ${
              isLandscape ? 'max-w-4xl' : 'max-w-2xl'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-white p-4 md:p-6 pb-12 md:pb-20 border-2 border-black shadow-[25px_25px_0px_0px_rgba(0,0,0,1)] transform rotate-1 animate-in zoom-in-95 duration-300 w-full">
              <TapeEffect className="-top-4 -left-6 rotate-45" />
              <TapeEffect className="-top-4 -right-6 -rotate-45" />
              <TapeEffect className="-bottom-4 -left-6 -rotate-45" />
              <TapeEffect className="-bottom-4 -right-6 rotate-45" />
              
              <div className={`border-2 border-black overflow-hidden relative bg-zinc-200 transition-all duration-300 ${
                isLandscape ? 'aspect-video' : 'aspect-[4/5]'
              }`}>
                <img 
                  src={selectedMedia.url} 
                  alt={selectedMedia.thumbnail}
                  className="w-full h-full object-cover block"
                />
              </div>
              
              <div className="mt-8 md:mt-12 text-center px-2">
                <h3 className="punk-font text-3xl md:text-5xl text-black uppercase leading-tight tracking-tight">
                  {selectedMedia.thumbnail || 'BLINK LIVE'}
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Media;