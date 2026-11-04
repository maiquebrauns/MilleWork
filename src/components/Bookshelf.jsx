import React, { useState } from 'react';
import { BookOpen, Sparkles, Layers, Info } from 'lucide-react';
import BookModal from './BookModal';
import { playPageFlip } from '../utils/audio';

export default function Bookshelf({ books, isMuted }) {
  const [selectedBook, setSelectedBook] = useState(null);
  const [hoveredBookId, setHoveredBookId] = useState(null);

  const handleOpenBook = (book) => {
    if (!isMuted) playPageFlip();
    setSelectedBook(book);
  };

  return (
    <section id="shelf" className="relative py-12 scroll-mt-20">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#E84A27] tracking-wider uppercase mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Estante de Publicações & Ensaios</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAFAFA] tracking-tight">
            Livros e Séries em Destaque
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#9C9488] max-w-sm">
          Toque em qualquer livro na estante para abrir a edição completa, folhear as pranchas e ler os dados de captura.
        </p>
      </div>

      {/* The Physical Bookshelf Structure */}
      <div className="relative bg-gradient-to-b from-[#1C1815] to-[#120F0D] rounded-2xl border border-[#332C26] p-6 sm:p-10 shadow-2xl overflow-hidden">
        {/* Books Row */}
        <div className="relative min-h-[300px] flex items-end justify-center sm:justify-start gap-4 sm:gap-8 pb-3 px-2 sm:px-6 overflow-x-auto no-scrollbar">
          {books.map((book, idx) => {
            const isHovered = hoveredBookId === book.id;

            return (
              <div
                key={book.id}
                onMouseEnter={() => setHoveredBookId(book.id)}
                onMouseLeave={() => setHoveredBookId(null)}
                onClick={() => handleOpenBook(book)}
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
                  className="w-16 sm:w-20 h-64 sm:h-72 rounded-t-sm shadow-[0_15px_30px_rgba(0,0,0,0.8)] border-t border-r border-[#4A423A] relative flex flex-col justify-between py-4 px-2.5 transition-shadow duration-300"
                  style={{
                    backgroundColor: book.spineColor,
                    boxShadow: isHovered
                      ? `0 20px 35px -5px ${book.accentColor}40, 0 10px 15px -5px rgba(0,0,0,0.8)`
                      : '0 10px 20px rgba(0,0,0,0.6)',
                  }}
                >
                  {/* Spine Header: Accent Stripe & Foil Badge */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className="w-full h-1 rounded-full"
                      style={{ backgroundColor: book.accentColor }}
                    ></div>
                    <span className="text-[9px] font-mono tracking-widest text-[#B5ADA3] uppercase">
                      {book.year}
                    </span>
                  </div>

                  {/* Vertical Book Title (Spine) */}
                  <div className="flex-1 flex items-center justify-center my-2">
                    <span
                      className="font-serif font-bold text-xs sm:text-sm tracking-widest text-[#E8E2D9] uppercase whitespace-nowrap"
                      style={{
                        writingMode: 'vertical-rl',
                        transform: 'rotate(180deg)',
                      }}
                    >
                      {book.title}
                    </span>
                  </div>

                  {/* Spine Bottom: Ribbons & Atelier logo */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-5 h-5 rounded-full border border-[#524B43] flex items-center justify-center text-[8px] font-mono text-[#D6CFC5]">
                      35
                    </div>
                    <span className="text-[8px] font-mono text-[#7D756C]">
                      {book.photos.length}P
                    </span>
                  </div>

                  {/* Cloth bookmark ribbon sticking out from bottom */}
                  <div
                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2.5 h-4 shadow-sm"
                    style={{
                      backgroundColor: book.accentColor,
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 75%, 0 100%)',
                    }}
                  ></div>
                </div>

                {/* Floating "Abrir Livro" Tooltip on Hover */}
                {isHovered && (
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#0F0E0D] border border-[#E84A27]/60 text-white text-[11px] font-mono px-3 py-1 rounded-full whitespace-nowrap shadow-xl pointer-events-none animate-in fade-in zoom-in-95 duration-150 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#E84A27]" />
                    <span>Folhear {book.title}</span>
                  </div>
                )}
              </div>
            );
          })}

          {/* Decorative Atelier Objects resting on the shelf */}
          <div className="hidden md:flex items-end gap-6 ml-6 pb-1 opacity-80 select-none">
            {/* Film Canister Stack */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-7 rounded-sm bg-[#F59E0B] border border-[#B45309] shadow-md flex items-center justify-center text-[7px] font-mono font-bold text-black rotate-3">
                KODAK 400
              </div>
              <div className="w-10 h-7 rounded-sm bg-[#1E293B] border border-[#334155] shadow-md flex items-center justify-center text-[7px] font-mono font-bold text-white -rotate-2 -mt-1">
                HP5+ 400
              </div>
            </div>

            {/* Vintage Exposure Meter (Fotômetro Analógico) */}
            <div className="w-12 h-20 rounded-t-lg bg-gradient-to-b from-[#38332E] to-[#1E1B18] border border-[#4A433D] shadow-lg flex flex-col items-center justify-between p-1.5">
              <div className="w-8 h-8 rounded-full bg-[#12100E] border border-[#524941] flex items-center justify-center">
                <div className="w-1 h-3 bg-[#E84A27] rounded-full rotate-45 transform origin-bottom"></div>
              </div>
              <span className="text-[7px] font-mono text-[#8C847A]">SEKONIC</span>
            </div>
          </div>
        </div>

        {/* The Wooden Shelf Board (Solid Wood Lip & Depth) */}
        <div className="relative h-6 sm:h-7 bg-gradient-to-r from-[#3D2817] via-[#52361F] to-[#3D2817] rounded-sm border-t-2 border-[#6E482A] border-b-4 border-[#24170D] shadow-[0_12px_20px_rgba(0,0,0,0.8)] flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#B8860B] shadow-sm"></div>
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#C8B89E]/70 font-semibold">
              Madeira Maciça · Prateleira I
            </span>
          </div>

          <span className="text-[9px] font-mono text-[#C8B89E]/50">
            {books.length} Séries Catalogadas
          </span>
        </div>
      </div>

      {/* Book Spread Modal */}
      <BookModal
        book={selectedBook}
        isOpen={Boolean(selectedBook)}
        onClose={() => setSelectedBook(null)}
        isMuted={isMuted}
      />
    </section>
  );
}
