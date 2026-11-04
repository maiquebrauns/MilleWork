import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';
import { playSwitchSound } from '../utils/audio';

export default function FAQSection({ faqs, isMuted }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (idx) => {
    if (!isMuted) playSwitchSound();
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section className="relative py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#D4A373] tracking-wider uppercase mb-1">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Tirando Dúvidas</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAFAFA] tracking-tight">
            Perguntas Frequentes
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-xl border border-[#2D2620] bg-[#181513] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-serif font-semibold text-base sm:text-lg text-[#FAFAFA] hover:text-[#D4A373] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#D4A373] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-[#A8A196] font-mono leading-relaxed border-t border-[#241F1A] pt-3 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
