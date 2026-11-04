import React, { useState } from 'react';
import { Pin, Sparkles, Award, Heart } from 'lucide-react';
import { playSwitchSound } from '../utils/audio';

export default function CorkBoard({ notes, isMuted }) {
  const [activeItem, setActiveItem] = useState(null);

  const handleClick = (item) => {
    if (!isMuted) playSwitchSound(true);
    setActiveItem(item);
  };

  return (
    <section id="corkboard" className="relative py-12 scroll-mt-20">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#E84A27] tracking-wider uppercase mb-1">
            <Pin className="w-3.5 h-3.5" />
            <span>Mural de Inspirações & Prêmios</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAFAFA] tracking-tight">
            Mural do Ateliê
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#9C9488] max-w-sm">
          Recados de curadores, fórmulas de revelação, polaroids de viagens e memórias afetivas afixadas com alfinetes.
        </p>
      </div>

      {/* Realistic Cork Board with Oak Wood Frame */}
      <div className="relative rounded-2xl border-8 border-[#3A2A1D] p-6 sm:p-10 shadow-2xl overflow-hidden bg-[#8B5A2B]/90">
        {/* Cork texture layer */}
        <div
          className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#40220F 1.5px, transparent 1.5px), radial-gradient(#2A1608 1px, transparent 1px)`,
            backgroundSize: '16px 16px',
            backgroundPosition: '0 0, 8px 8px',
          }}
        ></div>

        {/* Board Pins & Items Grid */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {notes.map((item, idx) => {
            if (item.type === 'polaroid') {
              return (
                <div
                  key={idx}
                  onClick={() => handleClick(item)}
                  className="relative group cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-20"
                  style={{ transform: `rotate(${item.rotation})` }}
                >
                  {/* Push Pin */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 w-3.5 h-3.5 rounded-full bg-[#E84A27] border-2 border-white/80 shadow-md"></div>

                  {/* Polaroid Frame */}
                  <div className="bg-[#FAF8F5] p-3 pb-6 rounded-xs shadow-xl border border-[#E8E2D9]">
                    <div className="aspect-square bg-black overflow-hidden mb-2 rounded-xs">
                      <img
                        src={item.url}
                        alt={item.caption}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <p className="font-hand text-center text-lg text-[#2E2824] font-bold">
                      {item.caption}
                    </p>
                  </div>
                </div>
              );
            }

            // Sticky Note or Clippings
            return (
              <div
                key={idx}
                onClick={() => handleClick(item)}
                className="relative group cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-20"
                style={{ transform: `rotate(${item.rotation})` }}
              >
                {/* Push Pin */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 w-3.5 h-3.5 rounded-full bg-[#3B82F6] border-2 border-white/80 shadow-md"></div>

                <div
                  className="p-5 rounded-sm shadow-xl text-[#1E1B18] border border-black/10 flex flex-col justify-between min-h-[160px]"
                  style={{ backgroundColor: item.color || '#FEF08A' }}
                >
                  <div>
                    <span className="font-serif font-bold text-sm block mb-1.5 border-b border-black/15 pb-1">
                      {item.title}
                    </span>
                    <p className="font-hand text-base sm:text-lg leading-snug">
                      {item.text}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-black/50">
                    <span>Atelier 35</span>
                    <span>📍 Mural</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
