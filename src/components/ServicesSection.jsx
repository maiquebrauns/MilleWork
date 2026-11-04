import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function ServicesSection({ services, onOpenBooking }) {
  return (
    <section id="services" className="relative py-12 scroll-mt-20">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#D4A373] tracking-wider uppercase mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Experiência & Formatos</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#FAFAFA] tracking-tight">
          Como Posso Te Retratar
        </h2>
        <p className="text-sm text-[#A8A196] mt-2">
          Cada projeto fotográfico é desenhado sob medida para valorizar sua história e identidade com elegância.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((item, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-8 rounded-2xl bg-[#181513] border border-[#2E2822] hover:border-[#D4A373]/50 transition-all duration-300 flex flex-col justify-between group shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-sm text-[#D4A373] font-bold">
                  {item.number}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#241F1A] border border-[#38312B] text-[#B5ADA3]">
                  {item.tag}
                </span>
              </div>

              <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#FAFAFA] group-hover:text-[#D4A373] transition-colors mb-2">
                {item.title}
              </h3>

              <p className="text-xs font-mono text-[#D4A373] mb-3">
                {item.subtitle}
              </p>

              <p className="text-sm text-[#A8A196] leading-relaxed">
                {item.details}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#26211C] flex items-center justify-between">
              <span className="text-xs font-mono text-[#78716A]">Rio de Janeiro & Viagens</span>
              <button
                onClick={onOpenBooking}
                className="text-xs font-mono font-semibold text-[#D4A373] hover:text-[#FFA08C] flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
              >
                <span>Consultar Vagas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
