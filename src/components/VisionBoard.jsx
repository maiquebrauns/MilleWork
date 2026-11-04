import React, { useState } from 'react';
import { Pin, Sparkles, Heart, Quote } from 'lucide-react';
import { playSwitchSound } from '../utils/audio';

export default function VisionBoard({ items, isMuted }) {
  const [activeItem, setActiveItem] = useState(null);

  const handleClick = (item) => {
    if (!isMuted) playSwitchSound(true);
    setActiveItem(item);
  };

  return (
    <section id="visionboard" className="relative py-12 scroll-mt-20">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#D4A373] tracking-wider uppercase mb-1">
            <Pin className="w-3.5 h-3.5" />
            <span>Mural de Afeto & Memórias</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAFAFA] tracking-tight">
            Vision Board & Depoimentos
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#A8A196] max-w-sm">
          Polaroids dos bastidores, recados carinhosos de clientes e as inspirações que guiam cada clique da Millie.
        </p>
      </div>

      {/* Realistic Linen / Cork Pinboard */}
      <div className="relative rounded-2xl border-8 border-[#2E2822] p-6 sm:p-10 shadow-2xl overflow-hidden bg-[#4A3B32]">
        {/* Linen texture pattern */}
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#241A14 1.5px, transparent 1.5px), radial-gradient(#1A120E 1px, transparent 1px)`,
            backgroundSize: '16px 16px',
            backgroundPosition: '0 0, 8px 8px',
          }}
        ></div>

        {/* Board Items Grid */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {items.map((item, idx) => {
            if (item.type === 'polaroid') {
              return (
                <div
                  key={idx}
                  onClick={() => handleClick(item)}
                  className="relative group cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-20"
                  style={{ transform: `rotate(${item.rotation})` }}
                >
                  {/* Push Pin */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 w-3.5 h-3.5 rounded-full bg-[#D4A373] border-2 border-white/80 shadow-md"></div>

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

            // Testimonial or Quote Sticky Note
            return (
              <div
                key={idx}
                onClick={() => handleClick(item)}
                className="relative group cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-20"
                style={{ transform: `rotate(${item.rotation})` }}
              >
                {/* Push Pin */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 w-3.5 h-3.5 rounded-full bg-[#E07A5F] border-2 border-white/80 shadow-md"></div>

                <div
                  className="p-5 rounded-sm shadow-xl text-[#1E1B18] border border-black/10 flex flex-col justify-between min-h-[160px]"
                  style={{ backgroundColor: item.bg || '#FEF9C3' }}
                >
                  <div>
                    {item.type === 'quote' ? (
                      <div className="flex items-center gap-1.5 text-[#E07A5F] mb-1">
                        <Quote className="w-4 h-4" />
                        <span className="font-serif font-bold text-xs uppercase tracking-wider">
                          Inspiração
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-[#E07A5F] mb-1">
                        <Heart className="w-3.5 h-3.5 fill-current" />
                        <span className="font-serif font-bold text-xs">
                          {item.name}
                        </span>
                      </div>
                    )}

                    <p className="font-hand text-base sm:text-lg leading-snug mt-1">
                      {item.text}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-black/50 border-t border-black/10 pt-2">
                    <span>@milliesmoura</span>
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
