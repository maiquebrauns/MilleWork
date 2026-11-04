import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Camera, Film, MapPin, Award } from 'lucide-react';
import { playPageFlip } from '../utils/audio';

export default function BookModal({ book, isOpen, onClose, isMuted }) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    setCurrentPhotoIndex(0);
  }, [book]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentPhotoIndex, book]);

  if (!isOpen || !book) return null;

  const currentPhoto = book.photos[currentPhotoIndex] || book.photos[0];

  const handleNext = () => {
    if (currentPhotoIndex < book.photos.length - 1) {
      if (!isMuted) playPageFlip();
      setCurrentPhotoIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPhotoIndex > 0) {
      if (!isMuted) playPageFlip();
      setCurrentPhotoIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-[#1A1715] border border-[#3D3731] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="px-5 py-4 border-b border-[#2E2824] flex items-center justify-between bg-[#141210]">
          <div className="flex items-center gap-3">
            <div
              className="w-3 h-8 rounded-xs"
              style={{ backgroundColor: book.accentColor }}
            ></div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#FAFAFA] leading-tight">
                {book.title}
              </h3>
              <p className="text-xs font-mono text-[#9C9488]">
                {book.subtitle} · {book.year}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#8A8276] px-2 py-1 rounded bg-[#221F1B] border border-[#2E2824]">
              Prancha {currentPhotoIndex + 1} de {book.photos.length}
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#2A2520] text-[#A8A196] hover:text-[#FAFAFA] transition-colors"
              title="Fechar Livro (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Photobook Two-Page Spread Content */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-0 bg-[#161413]">
          {/* Left Spread: High-res print presentation */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col items-center justify-center bg-[#0F0E0D] border-b lg:border-b-0 lg:border-r border-[#26221E] relative min-h-[340px]">
            <div className="relative group max-w-full">
              {/* Silver gelatin print border simulation */}
              <div className="bg-[#FAF8F5] p-3 sm:p-4 rounded-sm shadow-2xl transition-transform duration-300">
                <img
                  src={currentPhoto.url}
                  alt={currentPhoto.caption}
                  className="max-h-[50vh] sm:max-h-[55vh] w-auto object-contain select-none"
                />
                <div className="pt-3 flex items-center justify-between text-[11px] font-mono text-[#544E47] border-t border-[#E8E2D9] mt-2">
                  <span className="font-hand text-sm text-[#24211E]">
                    {currentPhoto.caption}
                  </span>
                  <span>{book.year}</span>
                </div>
              </div>

              {/* Fullscreen button overlay */}
              <button
                onClick={() => setIsFullScreen(true)}
                className="absolute top-6 right-6 p-2 rounded-full bg-black/60 text-white/80 hover:text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                title="Ampliar Foto"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Pagination Controls */}
            <div className="mt-5 flex items-center gap-3">
              <button
                onClick={handlePrev}
                disabled={currentPhotoIndex === 0}
                className={`p-2 rounded-full border transition-all ${
                  currentPhotoIndex === 0
                    ? 'border-[#26221E] text-[#47413B] cursor-not-allowed'
                    : 'border-[#3D3731] bg-[#221F1B] hover:bg-[#2E2824] text-[#E8E2D9]'
                }`}
                title="Página Anterior (Seta Esquerda)"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-1.5">
                {book.photos.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (!isMuted) playPageFlip();
                      setCurrentPhotoIndex(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all ${
                      currentPhotoIndex === idx
                        ? 'w-6 bg-[#E84A27]'
                        : 'w-2 bg-[#38332E] hover:bg-[#5A534B]'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={currentPhotoIndex === book.photos.length - 1}
                className={`p-2 rounded-full border transition-all ${
                  currentPhotoIndex === book.photos.length - 1
                    ? 'border-[#26221E] text-[#47413B] cursor-not-allowed'
                    : 'border-[#3D3731] bg-[#221F1B] hover:bg-[#2E2824] text-[#E8E2D9]'
                }`}
                title="Próxima Página (Seta Direita)"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Spread: Curatorial Narrative & Technical EXIF */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[11px] font-mono tracking-wider uppercase text-[#E84A27] font-semibold block mb-2">
                Conceito & Curadoria
              </span>

              <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#FAFAFA] mb-3">
                {book.title}
              </h4>

              <p className="text-sm text-[#B8B0A5] leading-relaxed mb-4">
                {book.description}
              </p>

              {book.curatorNote && (
                <div className="p-3.5 rounded-lg bg-[#221F1B] border border-[#332D27] flex items-start gap-3">
                  <Award className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#D6CFC4] italic leading-relaxed">
                    "{book.curatorNote}"
                  </p>
                </div>
              )}
            </div>

            {/* Technical Film and Camera Specs */}
            <div className="space-y-3 pt-4 border-t border-[#26221E]">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#7D766C] block">
                Ficha Técnica da Prancha
              </span>

              <div className="bg-[#12100F] border border-[#2E2824] rounded-xl p-3.5 space-y-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-[#C4BDB2]">
                  <Camera className="w-3.5 h-3.5 text-[#E84A27]" />
                  <span>{book.camera}</span>
                </div>
                <div className="flex items-center gap-2 text-[#C4BDB2]">
                  <Film className="w-3.5 h-3.5 text-[#E84A27]" />
                  <span>{book.filmStock}</span>
                </div>
                <div className="flex items-center gap-2 text-[#FFA08C] pt-1 border-t border-[#221F1B]">
                  <span className="text-[#8A8276]">EXIF:</span>
                  <span>{currentPhoto.exif}</span>
                </div>
              </div>
            </div>

            {/* Thumbnails strip */}
            <div className="pt-2">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#7D766C] block mb-2">
                Todas as Pranchas da Série
              </span>
              <div className="grid grid-cols-4 gap-2">
                {book.photos.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (!isMuted) playPageFlip();
                      setCurrentPhotoIndex(idx);
                    }}
                    className={`relative aspect-square rounded overflow-hidden border-2 transition-all ${
                      currentPhotoIndex === idx
                        ? 'border-[#E84A27] scale-105 shadow-md'
                        : 'border-[#2E2824] opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={p.url}
                      alt={p.caption}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Zoom Lightbox */}
      {isFullScreen && (
        <div
          onClick={() => setIsFullScreen(false)}
          className="fixed inset-0 z-60 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out animate-in fade-in"
        >
          <img
            src={currentPhoto.url}
            alt={currentPhoto.caption}
            className="max-w-full max-h-[92vh] object-contain shadow-2xl"
          />
          <button
            onClick={() => setIsFullScreen(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/20 text-white hover:bg-white/30"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
