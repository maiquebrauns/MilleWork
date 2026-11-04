import React, { useState } from 'react';
import { BookOpen, Sparkles, Layers } from 'lucide-react';
import SeriesModal from './SeriesModal';
import { playPageFlip } from '../utils/audio';

export default function SeriesShelf({ series, isMuted }) {
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const handleOpenSeries = (item) => {
    if (!isMuted) playPageFlip();
    setSelectedSeries(item);
  };

  return (
    <section id="shelf" className="relative py-12 scroll-mt-20">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#D4A373] tracking-wider uppercase mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Séries & Ensaios Editoriais</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAFAFA] tracking-tight">
            Volumes em Destaque
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#A8A196] max-w-sm">
          Toque em qualquer volume para folhear a história completa, ver fotos ampliadas e notas de direção visual.
        </p>
      </div>

      {/* The Physical Bookshelf Structure */}
      <div className="relative bg-gradient-to-b from-[#1C1815] to-[#120F0D] rounded-2xl border border-[#332C26] p-4 sm:p-10 shadow-2xl overflow-hidden">

        {/* MOBILE VIEW (< sm): Livros Deitados Horizontalmente */}
        <div className="sm:hidden flex flex-col items-center gap-3.5 w-full py-4">
          {series.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenSeries(item)}
              className="relative w-full max-w-[320px] rounded-xl p-3.5 flex items-center justify-between cursor-pointer border border-[#4A423A] shadow-xl active:scale-98 transition-all group overflow-hidden select-none"
              style={{
                backgroundColor: item.spineColor,
                boxShadow: `0 8px 24px -4px ${item.accentColor}35, 0 4px 12px rgba(0,0,0,0.8)`,
              }}
            >
              {/* Left Color Spine Accent Stripe */}
              <div
                className="absolute left-0 top-0 bottom-0 w-2.5 rounded-l-xl"
                style={{ backgroundColor: item.accentColor }}
              />

              {/* Book Details in Horizontal Layout */}
              <div className="pl-3.5 flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-[9px] font-mono font-bold tracking-widest px-1.5 py-0.2 rounded"
                    style={{
                      backgroundColor: `${item.accentColor}25`,
                      color: item.accentColor,
                    }}
                  >
                    {item.year}
                  </span>
                  <span className="text-[9px] font-mono text-[#B5ADA3] uppercase tracking-wider">
                    {item.category.split('·')[0]}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-[#FAFAFA] tracking-wide group-hover:text-[#D4A373] transition-colors leading-tight">
                  {item.title}
                </h3>

                <span className="text-[10px] font-mono text-[#8C847A] mt-0.5">
                  {item.photos.length} Fotografias Selecionadas
                </span>
              </div>

              {/* Right Action & Cloth Ribbon */}
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-mono text-[#D4A373] bg-[#0F0E0D]/70 border border-[#D4A373]/30 px-2 py-1 rounded-full whitespace-nowrap">
                  Abrir 📖
                </span>
                <div
                  className="w-3 h-7 shadow-md flex-none"
                  style={{
                    backgroundColor: item.accentColor,
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 75%, 0 100%)',
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP VIEW (>= sm): Books Row Standing Upright (Em pé) */}
        <div className="hidden sm:flex relative min-h-[300px] items-end justify-center sm:justify-start gap-4 sm:gap-8 pb-3 px-2 sm:px-6 overflow-x-auto no-scrollbar">
          {series.map((item) => {
            const isHovered = hoveredId === item.id;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handleOpenSeries(item)}
                className={`relative group cursor-pointer transition-all duration-300 transform select-none ${
                  isHovered
                    ? '-translate-y-6 scale-105 z-20'
                    : 'translate-y-0 z-10'
                }`}
                style={{
                  perspective: '800px',
                }}
              >
                {/* Book Spine Graphic */}
                <div
                  className="w-18 sm:w-22 h-64 sm:h-72 rounded-t-sm shadow-[0_15px_30px_rgba(0,0,0,0.8)] border-t border-r border-[#4A423A] relative flex flex-col justify-between py-4 px-2.5 transition-shadow duration-300"
                  style={{
                    backgroundColor: item.spineColor,
                    boxShadow: isHovered
                      ? `0 20px 35px -5px ${item.accentColor}40, 0 10px 15px -5px rgba(0,0,0,0.8)`
                      : '0 10px 20px rgba(0,0,0,0.6)',
                  }}
                >
                  {/* Spine Header */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className="w-full h-1 rounded-full"
                      style={{ backgroundColor: item.accentColor }}
                    ></div>
                    <span className="text-[9px] font-mono tracking-widest text-[#B5ADA3] uppercase">
                      {item.year}
                    </span>
                  </div>

                  {/* Vertical Spine Title */}
                  <div className="flex-1 flex items-center justify-center my-2">
                    <span
                      className="font-serif font-bold text-xs sm:text-sm tracking-widest text-[#E8E2D9] uppercase whitespace-nowrap"
                      style={{
                        writingMode: 'vertical-rl',
                        transform: 'rotate(180deg)',
                      }}
                    >
                      {item.title}
                    </span>
                  </div>

                  {/* Spine Bottom: Category & Frame count */}
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[8px] font-mono text-[#D4A373] uppercase tracking-tighter text-center">
                      {item.category.split(' ')[0]}
                    </span>
                    <span className="text-[8px] font-mono text-[#7D756C]">
                      {item.photos.length} Fotos
                    </span>
                  </div>

                  {/* Cloth bookmark ribbon */}
                  <div
                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2.5 h-4 shadow-sm"
                    style={{
                      backgroundColor: item.accentColor,
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 75%, 0 100%)',
                    }}
                  ></div>
                </div>

                {/* Floating Tooltip */}
                {isHovered && (
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#0F0E0D] border border-[#D4A373]/60 text-white text-[11px] font-mono px-3 py-1 rounded-full whitespace-nowrap shadow-xl pointer-events-none animate-in fade-in zoom-in-95 duration-150 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#D4A373]" />
                    <span>Abrir {item.title}</span>
                  </div>
                )}
              </div>
            );
          })}

          {/* Decorative Journal / Coffee cup on shelf */}
          <div className="hidden md:flex items-end gap-6 ml-6 pb-1 opacity-75 select-none">
            {/* Minimalist Notebook */}
            <div className="w-16 h-28 rounded-xs bg-[#24201D] border border-[#3E3732] shadow-md flex flex-col justify-between p-2 rotate-2">
              <span className="text-[7px] font-mono text-[#D4A373]">MOODBOARD</span>
              <div className="w-full h-[1px] bg-[#3E3732]"></div>
              <span className="text-[6px] font-mono text-[#78716A]">MILLIE · 24</span>
            </div>
          </div>
        </div>

        {/* Shelf Board - Corrected and Perfectly Fitted Text */}
        <div className="relative min-h-[30px] sm:min-h-[34px] bg-gradient-to-r from-[#3D2817] via-[#52361F] to-[#3D2817] rounded-sm border-t-2 border-[#6E482A] border-b-4 border-[#24170D] shadow-[0_12px_20px_rgba(0,0,0,0.8)] flex items-center justify-between px-3 sm:px-6 py-1 gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4A373] shadow-sm flex-none"></div>
            <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-wider text-[#C8B89E] font-semibold truncate">
              <span className="sm:hidden">Edições Autorais</span>
              <span className="hidden sm:inline">Edições Impressas & Digitais</span>
            </span>
          </div>

          <span className="text-[8px] sm:text-[9px] font-mono text-[#C8B89E]/70 flex-none text-right">
            {series.length} Projetos
          </span>
        </div>
      </div>

      {/* Modal */}
      <SeriesModal
        series={selectedSeries}
        isOpen={Boolean(selectedSeries)}
        onClose={() => setSelectedSeries(null)}
        isMuted={isMuted}
      />
    </section>
  );
}
