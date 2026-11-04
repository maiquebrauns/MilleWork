import React from 'react';
import { ArrowUp, ExternalLink } from 'lucide-react';
import InstagramIcon from './InstagramIcon';
import Logo from './Logo';
import { playSwitchSound } from '../utils/audio';

export default function Footer({ photographer, isMuted, onOpenBooking }) {
  const scrollToTop = () => {
    if (!isMuted) playSwitchSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-[#26211C] bg-[#0E0C0B] text-[#9E968A] py-12 px-4 sm:px-6 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Branding & Instagram */}
        <div className="text-center md:text-left space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-2.5 text-white">
            <Logo className="w-6 h-6" />
            <span className="font-serif font-bold text-xl tracking-wide">
              {photographer.name}
            </span>
          </div>
          <p className="text-xs font-mono text-[#7D756C] max-w-sm">
            {photographer.title} · {photographer.location}
          </p>
          <a
            href={photographer.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#D4A373] hover:underline"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>{photographer.handle}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Center: Quote */}
        <div className="text-center italic font-serif text-sm sm:text-base text-[#D4CDC2] max-w-md">
          "A beleza não se fabrica: ela se revela no instante em que nos permitimos sermos nós mesmos."
        </div>

        {/* Right: Actions & Back to top */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="px-4 py-2 rounded-full border border-[#38312A] bg-[#1A1714] text-xs font-mono text-[#E8E2D9] hover:bg-[#26211D] transition-colors"
            >
              Agendar Ensaio
            </button>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full border border-[#38312A] bg-[#1A1714] text-[#D4A373] hover:bg-[#26211D] transition-colors"
              title="Voltar ao Topo"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
          <span className="text-[11px] font-mono text-[#575047]">
            © {new Date().getFullYear()} {photographer.name} ({photographer.handle}). Todos os direitos reservados.
          </span>
        </div>
      </div>
    </footer>
  );
}
