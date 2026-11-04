import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  X,
  Compass,
  ArrowRight,
  Camera,
  Layers,
} from 'lucide-react';
import { playSwitchSound, playShutterSound } from '../utils/audio';

// Rotations for natural, organic floating photo spread
const ROTATIONS = [-2.5, 3.8, -1.8, 3.2, -3.5, 2.5, -2, 4];

export default function CuratedGallery({ items, isMuted }) {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [isHovered, setIsHovered] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);

  const categories = ['Todos', 'Brazilcore', 'UrbanPack', 'Queen', 'Sobre Mim'];

  const filteredItems = selectedCategory === 'Todos'
    ? items
    : items.filter((item) => item.category === selectedCategory);

  // Repeat items so the seamless marquee flows continuously
  const baseItems = filteredItems.length > 0 ? filteredItems : items;
  // Duplicate 4 times to ensure no gaps on wide screens
  const duplicatedImages = [...baseItems, ...baseItems, ...baseItems, ...baseItems];

  const handleFilter = (cat) => {
    if (!isMuted) playSwitchSound();
    setSelectedCategory(cat);
  };

  const handleOpenPhoto = (photoIndex) => {
    if (!isMuted) playShutterSound();
    setActivePhotoIndex(photoIndex % baseItems.length);
  };

  const handleCloseLightbox = () => {
    setActivePhotoIndex(null);
  };

  const handleNextLightbox = (e) => {
    e?.stopPropagation();
    if (activePhotoIndex !== null && baseItems.length > 0) {
      if (!isMuted) playSwitchSound();
      setActivePhotoIndex((activePhotoIndex + 1) % baseItems.length);
    }
  };

  const handlePrevLightbox = (e) => {
    e?.stopPropagation();
    if (activePhotoIndex !== null && baseItems.length > 0) {
      if (!isMuted) playSwitchSound();
      setActivePhotoIndex((activePhotoIndex - 1 + baseItems.length) % baseItems.length);
    }
  };

  const activePhoto = activePhotoIndex !== null ? baseItems[activePhotoIndex] : null;

  // Base duration in seconds for full loop
  const duration = Math.max(28, baseItems.length * 3.5);

  return (
    <section id="gallery" className="relative py-16 scroll-mt-20 overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#D4A373]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#D4A373] tracking-wider uppercase mb-2">
            <Camera className="w-3.5 h-3.5" />
            <span>Curadoria Visual em Movimento Livre</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#FAFAFA] tracking-tight">
            Galeria de Ensaios
          </h2>
          <p className="text-xs sm:text-sm font-serif text-[#A8A196] mt-2 max-w-xl">
            Fotografias livres em movimento contínuo. Passe o mouse para pausar, alinhar os enquadramentos e ampliar cada história.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-[#25201A]">
          {categories.map((cat) => {
            const count = cat === 'Todos' ? items.length : items.filter((i) => i.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-[#D4A373] text-[#141210] border-[#D4A373] font-bold shadow-lg shadow-[#D4A373]/20 scale-105'
                    : 'bg-[#181512]/80 text-[#8C847A] border-[#2E2822] hover:text-[#FAFAFA] hover:border-[#4A4035]'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-[#141210]/20 text-[#141210]' : 'bg-[#241F1A] text-[#6E665C]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Floating Animated Marquee — FORA DO TRILHO / SEM QUADRO */}
      <div
        className="relative w-full py-6 select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Soft edge gradient fades so images enter/exit gracefully */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#121110] via-[#121110]/80 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#121110] via-[#121110]/80 to-transparent z-10" />

        {/* Marquee Track Container */}
        <div
          className="flex gap-6 sm:gap-8 w-max will-change-transform py-4"
          style={{
            animation: `marqueeRoll ${duration}s linear infinite`,
            animationPlayState: isHovered ? 'paused' : 'running',
          }}
        >
          {duplicatedImages.map((photo, index) => {
            const rot = ROTATIONS[index % ROTATIONS.length];
            return (
              <motion.div
                key={`${photo.id}-${index}`}
                onClick={() => handleOpenPhoto(index)}
                initial={false}
                style={{
                  rotate: `${rot}deg`,
                }}
                whileHover={{
                  scale: 1.08,
                  rotate: 0,
                  y: -12,
                  zIndex: 30,
                  transition: { type: 'spring', stiffness: 350, damping: 20 },
                }}
                whileTap={{ scale: 0.96 }}
                className="relative aspect-[3/4] h-64 sm:h-80 md:h-96 flex-shrink-0 cursor-pointer rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.85)] border border-white/10 hover:border-[#D4A373] group transition-shadow duration-300 bg-[#1A1715]"
              >
                {/* Photo Image */}
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 pointer-events-none"
                  loading="lazy"
                />

                {/* Ambient vignette shadow on each card */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/25 opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Category Badge Top Right */}
                <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-[#D4A373] border border-[#D4A373]/30 tracking-wider">
                  {photo.category}
                </div>

                {/* Frame Counter Top Left */}
                <div className="absolute top-3.5 left-3.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-mono text-[#A8A196] border border-white/10">
                  {String((index % baseItems.length) + 1).padStart(2, '0')}
                </div>

                {/* Hover Caption Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex flex-col justify-end text-white">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-serif font-bold text-base sm:text-lg text-[#FAFAFA] group-hover:text-[#D4A373] transition-colors leading-snug drop-shadow-md">
                      {photo.title}
                    </h3>
                    <p className="text-[11px] font-mono text-[#C4BCB1] mt-0.5 line-clamp-1 drop-shadow">
                      {photo.details}
                    </p>
                  </div>

                  {/* Expand CTA button on hover */}
                  <div className="mt-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-2 border-t border-white/15">
                    <span className="text-[11px] font-mono text-[#D4A373] flex items-center gap-1.5">
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>Ver Ampliado</span>
                    </span>
                    <span className="text-[10px] font-mono text-[#A8A196]">Rio de Janeiro</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Zoom Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseLightbox}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/94 backdrop-blur-md"
          >
            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-[#171412] border border-[#3A322A] rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#2A241F] mb-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-0.5 rounded-full bg-[#2A241F] text-[10px] font-mono text-[#D4A373] border border-[#D4A373]/30 uppercase tracking-wider">
                    {activePhoto.category}
                  </span>
                  <span className="text-xs font-mono text-[#8C847A]">
                    {activePhotoIndex + 1} de {baseItems.length}
                  </span>
                </div>

                <button
                  onClick={handleCloseLightbox}
                  className="p-1.5 rounded-full bg-[#241F1A] hover:bg-[#332C25] text-[#9C9488] hover:text-white transition-colors"
                  title="Fechar (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Photo Display with Next / Prev */}
              <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden border border-[#2E2824] mb-4 bg-black flex items-center justify-center">
                <img
                  src={activePhoto.url}
                  alt={activePhoto.title}
                  className="w-full h-full object-contain"
                />

                {/* Prev Button */}
                <button
                  onClick={handlePrevLightbox}
                  className="absolute left-3 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 hover:border-[#D4A373] transition-all hover:scale-110 active:scale-95"
                  title="Foto anterior (←)"
                >
                  <ChevronLeft className="w-5 h-5 text-[#D4A373]" />
                </button>

                {/* Next Button */}
                <button
                  onClick={handleNextLightbox}
                  className="absolute right-3 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 hover:border-[#D4A373] transition-all hover:scale-110 active:scale-95"
                  title="Próxima foto (→)"
                >
                  <ChevronRight className="w-5 h-5 text-[#D4A373]" />
                </button>
              </div>

              {/* Caption & EXIF Details */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-[#A8A196] bg-[#12100E] p-4 rounded-xl border border-[#25201A]">
                <div>
                  <h4 className="font-serif font-bold text-base text-white">
                    {activePhoto.title}
                  </h4>
                  <p className="text-[#8C847A] text-[11px] mt-0.5">
                    {activePhoto.details}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[#D4A373]">Millie Moura Fotografia</span>
                  <span className="text-[#3E362E]">·</span>
                  <span className="text-[#8C847A]">Rio de Janeiro</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
