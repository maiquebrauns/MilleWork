import React, { useState } from 'react';
import { MessageSquare, BookOpen, Layers, Pin, Sparkles } from 'lucide-react';
import Logo from './Logo';

export default function Navbar({
  onOpenBooking,
  onScrollTo,
  photographer,
}) {
  const [logoStyle, setLogoStyle] = useState('viewfinder');

  const cycleLogo = () => {
    const options = ['viewfinder', 'lens', 'camera'];
    const next = options[(options.indexOf(logoStyle) + 1) % options.length];
    setLogoStyle(next);
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-300 bg-[#121110]/90 border-[#26221E] text-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-6">
        {/* Brand / Logo (Toque para alternar o estilo se desejar) */}
        <div
          onClick={cycleLogo}
          className="flex items-center gap-3 shrink-0 cursor-pointer group"
          title="Clique para ver variações da logo"
        >
          <div className="p-1 rounded-xl group-hover:bg-[#201D1A] transition-colors">
            <Logo style={logoStyle} className="w-9 h-9" />
          </div>
          <span className="font-serif font-bold text-xl tracking-wide text-[#FAFAFA] whitespace-nowrap leading-none">
            {photographer.name}
          </span>
        </div>

        {/* Spatial Navigation Pills (Textos alinhados e retos, sem quebra de linha) */}
        <nav className="hidden md:flex items-center gap-1.5 text-xs font-medium text-[#B8B0A5]">
          <button
            onClick={() => onScrollTo('about')}
            className="px-3.5 py-2 rounded-full hover:bg-[#201D1A] hover:text-[#FAFAFA] transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
            <span>Sobre Mim</span>
          </button>
          <button
            onClick={() => onScrollTo('shelf')}
            className="px-3.5 py-2 rounded-full hover:bg-[#201D1A] hover:text-[#FAFAFA] transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#D4A373]" />
            <span>Coleções & Livros</span>
          </button>
          <button
            onClick={() => onScrollTo('gallery')}
            className="px-3.5 py-2 rounded-full hover:bg-[#201D1A] hover:text-[#FAFAFA] transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <Layers className="w-3.5 h-3.5 text-[#D4A373]" />
            <span>Galeria Curada</span>
          </button>
          <button
            onClick={() => onScrollTo('visionboard')}
            className="px-3.5 py-2 rounded-full hover:bg-[#201D1A] hover:text-[#FAFAFA] transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <Pin className="w-3.5 h-3.5 text-[#D4A373]" />
            <span>Mural & Depoimentos</span>
          </button>
          <button
            onClick={() => onScrollTo('services')}
            className="px-3.5 py-2 rounded-full hover:bg-[#201D1A] hover:text-[#FAFAFA] transition-colors whitespace-nowrap"
          >
            <span>Serviços</span>
          </button>
        </nav>

        {/* Action Controls: Somente o botão direto de Agendar Ensaio */}
        <div className="flex items-center shrink-0">
          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 rounded-full font-mono text-xs font-bold bg-[#D4A373] hover:bg-[#DFB286] text-[#141210] shadow-md shadow-[#D4A373]/20 transition-all flex items-center gap-2 active:scale-95 whitespace-nowrap cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Agendar Ensaio</span>
          </button>
        </div>
      </div>
    </header>
  );
}
