import React, { useState } from 'react';
import { Sparkles, Droplets, Info, Eye, CheckCircle2 } from 'lucide-react';
import { playSwitchSound } from '../utils/audio';

export default function Clothesline({ prints, isMuted, isDarkroom }) {
  const [selectedPrint, setSelectedPrint] = useState(null);

  const handleOpenPrint = (print) => {
    if (!isMuted) playSwitchSound(true);
    setSelectedPrint(print);
  };

  return (
    <section id="clothesline" className="relative py-12 scroll-mt-20">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#E84A27] tracking-wider uppercase mb-1">
            <Droplets className="w-3.5 h-3.5" />
            <span>Processo Químico & Secagem</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAFAFA] tracking-tight">
            Varal de Provas Baritadas
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#9C9488] max-w-sm">
          Cópias recém-saídas da lavagem de gelatina e prata, secando em pregadores de madeira no quarto escuro.
        </p>
      </div>

      {/* The Clothesline Wire and Hanging Prints Container */}
      <div
        className={`relative rounded-2xl border transition-all duration-500 p-6 sm:p-10 pt-16 overflow-hidden ${
          isDarkroom
            ? 'bg-[#1C0A0A] border-[#4A1515] shadow-[0_0_40px_rgba(232,39,39,0.2)]'
            : 'bg-[#181513] border-[#2E2824] shadow-2xl'
        }`}
      >
        {/* Steel Wire across the top */}
        <div className="absolute top-10 inset-x-4 sm:inset-x-8 h-[2px] bg-gradient-to-r from-[#4A433D] via-[#8C8277] to-[#4A433D] shadow-sm"></div>

        {/* Wire Mounting Brackets */}
        <div className="absolute top-8 left-4 w-4 h-5 rounded-sm bg-[#38322C] border border-[#524B43]"></div>
        <div className="absolute top-8 right-4 w-4 h-5 rounded-sm bg-[#38322C] border border-[#524B43]"></div>

        {/* Hanging Prints Row */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {prints.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => handleOpenPrint(item)}
              className="relative flex flex-col items-center group cursor-pointer"
            >
              {/* Wooden Peg (Pregador de Madeira) */}
              <div className="relative z-20 w-4 h-9 bg-gradient-to-b from-[#8B5A2B] to-[#5C3A21] rounded-xs shadow-md border-t border-[#A06D3B] flex flex-col items-center -mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#382415] mt-2"></div>
                <div className="w-2.5 h-1 bg-[#A06D3B] mt-1 rounded-xs"></div>
              </div>

              {/* Hanging Fine Art Print */}
              <div
                className={`relative w-full max-w-[280px] bg-[#FAF8F5] p-3.5 pb-6 rounded-xs shadow-2xl transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-102 ${
                  idx % 2 === 0 ? 'rotate-1' : '-rotate-1'
                }`}
                style={{
                  boxShadow: isDarkroom
                    ? '0 15px 35px rgba(255, 50, 50, 0.15), 0 8px 12px rgba(0,0,0,0.8)'
                    : '0 20px 40px rgba(0,0,0,0.7)',
                }}
              >
                {/* Wet photo look */}
                <div className="relative aspect-[4/5] bg-black overflow-hidden rounded-xs">
                  <img
                    src={item.url}
                    alt={item.title}
                    className={`w-full h-full object-cover transition-all duration-500 ${
                      isDarkroom
                        ? 'contrast-125 sepia-50 brightness-90'
                        : 'contrast-105'
                    }`}
                  />
                  {/* Water drip glint highlight */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10 pointer-events-none"></div>
                </div>

                {/* Print handwritten metadata on margin */}
                <div className="mt-3 flex items-center justify-between text-xs font-hand text-[#38322C]">
                  <span className="font-bold text-sm tracking-wide">
                    {item.title}
                  </span>
                  <span className="text-[10px] font-mono uppercase bg-[#EBE5DB] px-1.5 py-0.5 rounded text-[#5C5349]">
                    1/1 Prova
                  </span>
                </div>

                {/* Status Badge */}
                <div className="mt-1 flex items-center gap-1.5 text-[10px] font-mono text-[#7D7366]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                  <span>{item.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Darkroom Print Chemistry Modal */}
      {selectedPrint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-xl bg-[#1A1715] border border-[#3D3731] rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#2E2824] mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#E84A27] tracking-wider block">
                  Boletim de Ampliação
                </span>
                <h3 className="font-serif font-bold text-xl text-white">
                  {selectedPrint.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedPrint(null)}
                className="text-xs font-mono text-[#8C847A] hover:text-white px-2 py-1 rounded bg-[#26221E]"
              >
                Fechar ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="aspect-[16/10] rounded-lg overflow-hidden border border-[#2E2824]">
                <img
                  src={selectedPrint.url}
                  alt={selectedPrint.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-lg bg-[#12100E] border border-[#2A2520]">
                  <span className="text-[#8C847A] block mb-1">Papel Fotográfico:</span>
                  <span className="text-[#FAFAFA] font-semibold">{selectedPrint.paper}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#12100E] border border-[#2A2520]">
                  <span className="text-[#8C847A] block mb-1">Química de Banho:</span>
                  <span className="text-[#FFA08C] font-semibold">{selectedPrint.bathTime}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-[#161311] border border-[#332C26] text-xs font-mono text-[#D6CFC4] leading-relaxed">
                <span className="text-[#F59E0B] font-bold block mb-1">Técnica de Mascaramento:</span>
                {selectedPrint.note}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
