import React, { useState, useRef } from 'react';
import { Layers, ZoomIn, Eye, Sparkles, Sliders } from 'lucide-react';
import { playSwitchSound } from '../utils/audio';

export default function LightTable({ negatives, isMuted, isDarkroom }) {
  const [activeNegative, setActiveNegative] = useState(null);
  const [isTableLit, setIsTableLit] = useState(true);
  const [loupePos, setLoupePos] = useState({ x: 0, y: 0, visible: false });
  const [hoveredFrame, setHoveredFrame] = useState(null);
  const tableRef = useRef(null);

  const toggleTableLight = () => {
    if (!isMuted) playSwitchSound(!isTableLit);
    setIsTableLit(!isTableLit);
  };

  const handleMouseMove = (e) => {
    if (!tableRef.current) return;
    const rect = tableRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setLoupePos({ x, y, visible: true });
  };

  const handleMouseLeave = () => {
    setLoupePos((prev) => ({ ...prev, visible: false }));
  };

  return (
    <section id="light-table" className="relative py-12 scroll-mt-20">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#E84A27] tracking-wider uppercase mb-1">
            <Layers className="w-3.5 h-3.5" />
            <span>Mesa de Luz & Conta-Fios</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAFAFA] tracking-tight">
            Negativos em Filme 35mm
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTableLight}
            className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all border flex items-center gap-2 ${
              isTableLit
                ? 'bg-[#FAF6EE] text-[#141210] border-[#FAF6EE] font-semibold shadow-[0_0_15px_rgba(250,246,238,0.4)]'
                : 'bg-[#221F1B] text-[#8C847A] border-[#38332E] hover:text-[#E8E2D9]'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isTableLit ? 'bg-[#141210]' : 'bg-[#524B43]'}`}></span>
            <span>{isTableLit ? 'Mesa Acesa (5000K)' : 'Mesa Desligada'}</span>
          </button>
        </div>
      </div>

      {/* The Light Box Instrument Body */}
      <div
        ref={tableRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-2xl border-4 border-[#2E2824] p-6 sm:p-10 shadow-2xl overflow-hidden transition-all duration-500 cursor-crosshair select-none"
        style={{
          backgroundColor: isTableLit
            ? isDarkroom
              ? '#380B0B' // Safelight dim under darkroom
              : '#EFECE6'
            : '#12100E',
          boxShadow: isTableLit
            ? isDarkroom
              ? '0 0 50px rgba(232, 39, 39, 0.25), inset 0 0 30px rgba(0,0,0,0.5)'
              : '0 0 60px rgba(255, 250, 240, 0.35), inset 0 0 40px rgba(255,255,255,0.7)'
            : 'inset 0 4px 15px rgba(0,0,0,0.8)',
        }}
      >
        {/* Subtle grid on the light table acrylic plate */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `linear-gradient(to right, ${isTableLit ? '#000000' : '#ffffff'} 1px, transparent 1px), linear-gradient(to bottom, ${isTableLit ? '#000000' : '#ffffff'} 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        ></div>

        {/* 35mm Film Strip */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 bg-[#0A0908] rounded-xl p-4 sm:p-6 border border-[#2D2824] shadow-2xl">
          {negatives.map((neg, idx) => {
            const isHovered = hoveredFrame === neg.frame;

            return (
              <div
                key={neg.frame}
                onMouseEnter={() => setHoveredFrame(neg.frame)}
                onMouseLeave={() => setHoveredFrame(null)}
                onClick={() => setActiveNegative(neg)}
                className={`relative flex-1 group transition-transform duration-200 cursor-pointer ${
                  isHovered ? 'scale-105 z-20' : 'scale-100 z-10'
                }`}
              >
                {/* Film Top Sprocket Strip */}
                <div className="h-5 bg-[#0F0D0C] border-b border-[#2A2520] flex items-center justify-between px-2">
                  <span className="text-[7px] font-mono text-[#D97706] tracking-tighter">
                    KODAK 5063 TX
                  </span>
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2 rounded-[2px] bg-[#FAF6EE]/80"></div>
                    <div className="w-2.5 h-2 rounded-[2px] bg-[#FAF6EE]/80"></div>
                  </div>
                </div>

                {/* Film Negative Frame */}
                <div className="relative aspect-[3/2] bg-[#141210] overflow-hidden border-x border-[#2A2520] group-hover:border-[#E84A27] transition-colors">
                  <img
                    src={neg.url}
                    alt={neg.title}
                    className={`w-full h-full object-cover transition-all duration-300 ${
                      isTableLit
                        ? 'brightness-95 contrast-125 filter group-hover:contrast-100'
                        : 'opacity-40 grayscale'
                    }`}
                  />

                  {/* Frame Number Overlay */}
                  <div className="absolute bottom-1 right-2 bg-black/70 backdrop-blur-xs px-1.5 py-0.5 rounded text-[8px] font-mono text-[#D97706] font-bold">
                    {neg.frame}
                  </div>
                </div>

                {/* Film Bottom Sprocket Strip */}
                <div className="h-5 bg-[#0F0D0C] border-t border-[#2A2520] flex items-center justify-between px-2">
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2 rounded-[2px] bg-[#FAF6EE]/80"></div>
                    <div className="w-2.5 h-2 rounded-[2px] bg-[#FAF6EE]/80"></div>
                  </div>
                  <span className="text-[7px] font-mono text-[#D97706]">
                    ▲ {neg.frame}
                  </span>
                </div>

                {/* Label under frame */}
                <div className="mt-2 text-center">
                  <p className="text-[11px] font-serif font-semibold text-[#E8E2D9] truncate">
                    {neg.title}
                  </p>
                  <p className="text-[9px] font-mono text-[#8C847A]">
                    {neg.film}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Loupe / Magnifier following cursor on desktop */}
        {loupePos.visible && isTableLit && (
          <div
            className="hidden lg:flex fixed pointer-events-none z-30 w-32 h-32 rounded-full border-4 border-[#24201C] bg-[#FAF6EE] shadow-[0_15px_30px_rgba(0,0,0,0.5),inset_0_0_15px_rgba(0,0,0,0.4)] items-center justify-center -translate-x-1/2 -translate-y-1/2 overflow-hidden"
            style={{
              left: `${loupePos.x + (tableRef.current?.getBoundingClientRect().left || 0)}px`,
              top: `${loupePos.y + (tableRef.current?.getBoundingClientRect().top || 0)}px`,
            }}
          >
            {/* Loupe glass crosshair */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-[0.5px] bg-[#E84A27]/40"></div>
              <div className="h-full w-[0.5px] bg-[#E84A27]/40 absolute"></div>
              <div className="w-6 h-6 rounded-full border border-[#E84A27]/50"></div>
            </div>
            <span className="absolute bottom-1 font-mono text-[8px] text-[#2E2824] font-bold bg-white/70 px-1 rounded">
              LUPA 2.5X
            </span>
          </div>
        )}
      </div>

      {/* Negative Detail Inspector Modal */}
      {activeNegative && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-[#1A1715] border border-[#3D3731] rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#2E2824] mb-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#E84A27]/20 border border-[#E84A27]/40 text-[#FFA08C] text-xs font-mono">
                  Quadro {activeNegative.frame}
                </span>
                <h3 className="font-serif font-bold text-lg text-white">
                  {activeNegative.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveNegative(null)}
                className="text-xs font-mono text-[#8C847A] hover:text-white px-2 py-1 rounded bg-[#26221E]"
              >
                Fechar ✕
              </button>
            </div>

            <div className="aspect-[3/2] rounded-lg overflow-hidden border border-[#2E2824] mb-4 bg-black">
              <img
                src={activeNegative.url}
                alt={activeNegative.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-[#12100E] border border-[#2A2520] text-xs space-y-1.5 font-mono">
              <div className="flex justify-between text-[#B8B0A5]">
                <span>Emulsão:</span>
                <span className="text-[#FAFAFA]">{activeNegative.film}</span>
              </div>
              <div className="flex justify-between text-[#B8B0A5]">
                <span>Anotação de Bancada:</span>
                <span className="text-[#E5A84B]">{activeNegative.notes}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
