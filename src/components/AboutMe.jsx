import React from 'react';
import { Sparkles, MapPin, Heart, MessageCircle, ArrowUpRight, Camera } from 'lucide-react';
import InstagramIcon from './InstagramIcon';

export default function AboutMe({ about, photographer, onOpenBooking }) {
  if (!about) return null;

  return (
    <section id="about" className="relative py-16 scroll-mt-20">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#D4A373]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Photos of Millie */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="relative w-full max-w-sm sm:max-w-md">
            {/* Primary Portrait Card */}
            <div className="relative z-10 bg-[#FAF8F5] p-3.5 pb-8 rounded-2xl shadow-2xl border border-[#38312A] rotate-[-1.5deg] hover:rotate-0 transition-transform duration-500">
              <div className="relative aspect-[3/4] bg-black overflow-hidden rounded-xl">
                <img
                  src={about.avatar}
                  alt={about.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-white border border-white/20">
                  Millie Moura
                </div>
              </div>

              {/* Caption */}
              <div className="mt-4 px-2 flex items-center justify-between text-[#24211E]">
                <span className="font-serif font-bold text-base">
                  Millie Moura
                </span>
                <span className="text-xs font-mono text-[#8C847A]">
                  Rio de Janeiro, RJ
                </span>
              </div>
            </div>

            {/* Secondary Floating Candid Photo */}
            {about.secondaryPhoto && (
              <div className="hidden sm:block absolute -bottom-6 -right-6 z-20 w-44 bg-[#FAF8F5] p-2.5 pb-5 rounded-xl shadow-2xl border border-[#38312A] rotate-6 hover:rotate-3 transition-transform duration-300 animate-float">
                <div className="aspect-[4/5] bg-black overflow-hidden rounded-lg">
                  <img
                    src={about.secondaryPhoto}
                    alt="Millie Moura - Detalhes"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-hand text-center text-xs text-[#24211E] font-bold mt-2">
                  No meu olhar ✨
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Narrative & Philosophy */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F1C19] border border-[#332C25] text-xs font-mono text-[#D4A373]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sobre Mim · Por Trás das Lentes</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#FAFAFA] leading-tight">
            Olá, sou a <span className="text-[#D4A373] italic">Millie Moura</span>.
          </h2>

          <p className="text-base sm:text-lg text-[#E8E2D9] font-serif italic leading-relaxed">
            "{about.headline}"
          </p>

          <div className="space-y-4 text-sm sm:text-base text-[#A8A196] leading-relaxed font-sans">
            {about.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
            <button
              onClick={onOpenBooking}
              className="px-6 py-3 rounded-full font-mono text-xs font-bold bg-[#D4A373] hover:bg-[#DFB286] text-[#141210] shadow-xl shadow-[#D4A373]/25 flex items-center gap-2 active:scale-95 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Vamos Conversar?</span>
            </button>

            <a
              href={photographer.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-full font-mono text-xs text-[#E8E2D9] border border-[#38312B] bg-[#1C1815] hover:bg-[#25201C] transition-colors flex items-center gap-2"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>Ver dia a dia no {photographer.handle}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#7A7268]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
