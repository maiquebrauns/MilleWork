import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MapPin, ArrowDown, ArrowUpRight, MessageCircle } from 'lucide-react';
import InstagramIcon from './InstagramIcon';
import { playSwitchSound } from '../utils/audio';

export default function HeroEditorial({ photographer, isMuted, onOpenBooking, onScrollTo }) {
  const [activeHighlight, setActiveHighlight] = useState(0);

  // Exclusively real project photos — starting with the iconic Brazilian flag photo
  const highlights = [
    {
      title: "Brazilcore & Identidade Carioca",
      desc: "A energia vibrante das ruas do Rio de Janeiro com a bandeira do Brasil.",
      image: "/images/urbanpack/bandeira-brasil.webp",
      tag: "Brazilcore",
    },
    {
      title: "Street Style & Atitude",
      desc: "Retratos urbanos com personalidade, cores vivas e luz natural da cidade.",
      image: "/images/urbanpack/urban-1.webp",
      tag: "UrbanPack",
    },
    {
      title: "Queen · Presença & Poder",
      desc: "Composição marcante, empoderamento e a força do olhar autoral.",
      image: "/images/urbanpack/urban-5.webp",
      tag: "Queen",
    },
  ];

  const handleNext = () => {
    if (!isMuted) playSwitchSound();
    setActiveHighlight((prev) => (prev + 1) % highlights.length);
  };

  const handlePrev = () => {
    if (!isMuted) playSwitchSound();
    setActiveHighlight((prev) => (prev - 1 + highlights.length) % highlights.length);
  };

  return (
    <section className="relative pt-6 pb-12">
      {/* Background ambient warm illumination */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-[#D4A373]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Editorial Introduction & Statements */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F1C19] border border-[#332C25] text-xs font-mono text-[#D4A373] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#D4A373] animate-pulse"></span>
            <span>Agenda Aberta 2024/2025 · Rio de Janeiro & Destinos</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#FAFAFA] leading-[1.1]">
            A luz do instante, <br className="hidden sm:inline" />
            <span className="italic font-normal text-[#D4A373]">contada com afeto</span> e poesia visual.
          </h1>

          <p className="text-base sm:text-lg text-[#B5ADA3] leading-relaxed max-w-2xl font-serif">
            {photographer.bio}
          </p>

          {/* Quick Details Chips */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#A8A196] bg-[#1A1715] border border-[#2E2824] px-3 py-1.5 rounded-full">
              <MapPin className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>{photographer.location}</span>
            </div>
            <a
              href={photographer.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono text-[#D4A373] hover:text-[#FFA08C] bg-[#1A1715] border border-[#3D332A] px-3 py-1.5 rounded-full transition-colors"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>{photographer.handle}</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

          {/* CTA Action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
            <button
              onClick={onOpenBooking}
              className="px-6 py-3 rounded-full font-mono text-xs font-bold bg-[#D4A373] hover:bg-[#DFB286] text-[#141210] shadow-xl shadow-[#D4A373]/25 flex items-center gap-2 active:scale-95 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Solicitar Orçamento / Ensaio</span>
            </button>

            <button
              onClick={() => {
                if (!isMuted) playSwitchSound();
                onScrollTo('gallery');
              }}
              className="px-5 py-3 rounded-full font-mono text-xs text-[#E8E2D9] border border-[#38312B] bg-[#1C1815] hover:bg-[#25201C] transition-colors flex items-center gap-2"
            >
              <span>Ver Galeria de Ensaios</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#D4A373]" />
            </button>
          </div>
        </div>

        {/* Right Column: Visual Moodreel Cards */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-sm sm:max-w-md">
            {/* Main Featured Photo Frame with Drag & Swipe */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.3}
              onDragEnd={(_, info) => {
                const threshold = 40;
                if (info.offset.x < -threshold || info.velocity.x < -300) {
                  handleNext();
                } else if (info.offset.x > threshold || info.velocity.x > 300) {
                  handlePrev();
                }
              }}
              whileTap={{ cursor: 'grabbing' }}
              className="relative bg-[#FAF8F5] p-3 sm:p-4 pb-8 rounded-2xl shadow-2xl border border-[#38312A] rotate-1 hover:rotate-0 transition-transform duration-500 cursor-grab active:cursor-grabbing select-none touch-pan-y"
            >
              <div className="relative aspect-[4/5] bg-black overflow-hidden rounded-xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeHighlight}
                    src={highlights[activeHighlight].image}
                    alt={highlights[activeHighlight].title}
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0.7 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full object-cover pointer-events-none"
                    draggable={false}
                  />
                </AnimatePresence>
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-white border border-white/20 pointer-events-none">
                  {highlights[activeHighlight].tag}
                </div>
              </div>

              {/* Caption & Indicator */}
              <div className="mt-4 px-1 flex items-center justify-between text-[#24211E] pointer-events-none">
                <div>
                  <h3 className="font-serif font-bold text-base sm:text-lg leading-tight">
                    {highlights[activeHighlight].title}
                  </h3>
                  <p className="text-xs font-mono text-[#786F66] mt-0.5">
                    {highlights[activeHighlight].desc}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Selector Dots below card */}
            <div className="mt-4 flex items-center justify-center gap-2">
              {highlights.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (!isMuted) playSwitchSound();
                    setActiveHighlight(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    activeHighlight === idx
                      ? 'w-7 bg-[#D4A373]'
                      : 'w-2 bg-[#38312B] hover:bg-[#5C5349]'
                  }`}
                  title={item.title}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
