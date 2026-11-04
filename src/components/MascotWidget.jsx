import React, { useState } from 'react';
import { Sparkles, MessageCircle, Heart, Fish, Moon, Cookie } from 'lucide-react';
import { playMascotSound, playSwitchSound } from '../utils/audio';

export default function MascotWidget({ mascotData, isMuted }) {
  const [activeSpeech, setActiveSpeech] = useState(
    "Miau! Eu sou a Luz, a guardiã do quarto escuro. Quando a luz vermelha acende, eu fico quietinha no meu cesto. Toca num botão pra falar comigo!"
  );
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleAction = (text, isMeow = true) => {
    if (!isMuted) {
      if (isMeow) playMascotSound();
      else playSwitchSound();
    }
    setActiveSpeech(text);
    setSelectedQuestion(null);
  };

  const handleQuestion = (item) => {
    if (!isMuted) playMascotSound();
    setSelectedQuestion(item.q);
    setActiveSpeech(item.a);
  };

  return (
    <section className="relative py-12">
      <div className="bg-[#1A1715] border border-[#2E2824] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Soft background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#E84A27]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Left: Mascot Portrait & Soundboard Buttons */}
          <div className="flex flex-col items-center text-center shrink-0">
            {/* Mascot Avatar with sleeping animation / breathing */}
            <div
              onClick={() => handleAction("Ronrom... Luz ama carinho atrás da orelha! 🐾")}
              className="relative w-36 h-36 rounded-full p-1 bg-gradient-to-tr from-[#E84A27] to-[#F59E0B] shadow-xl cursor-pointer group hover:scale-105 transition-transform"
              title="Toque na Luz para fazer carinho!"
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-black border-2 border-[#1E1B18]">
                <img
                  src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80"
                  alt="Gata Luz"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Status Indicator */}
              <div className="absolute bottom-1 right-2 w-6 h-6 rounded-full bg-[#10B981] border-2 border-[#1A1715] flex items-center justify-center text-[10px] text-white">
                🐾
              </div>
            </div>

            <h3 className="font-serif font-bold text-xl text-[#FAFAFA] mt-3">
              {mascotData.name}
            </h3>
            <p className="text-xs font-mono text-[#948D85]">{mascotData.breed}</p>

            {/* Quick Action Soundboard Buttons */}
            <div className="mt-4 flex flex-wrap justify-center gap-2 max-w-[240px]">
              <button
                onClick={() => handleAction("Miau! Nhac nhac... sachê de atum é o meu predileto!", true)}
                className="px-2.5 py-1 rounded-full bg-[#26221E] hover:bg-[#332C26] border border-[#3D3731] text-[11px] font-mono text-[#E8E2D9] transition-colors flex items-center gap-1 active:scale-95"
              >
                <Fish className="w-3 h-3 text-[#38BDF8]" />
                Sachê
              </button>
              <button
                onClick={() => handleAction("Purrr... ronrom... ronrom... adoro quando você visita o ateliê!", true)}
                className="px-2.5 py-1 rounded-full bg-[#26221E] hover:bg-[#332C26] border border-[#3D3731] text-[11px] font-mono text-[#E8E2D9] transition-colors flex items-center gap-1 active:scale-95"
              >
                <Heart className="w-3 h-3 text-[#F43F5E]" />
                Carinho
              </button>
              <button
                onClick={() => handleAction("Cuidado com a bandeja do fixador! Não pode encostar a patinha na química.", false)}
                className="px-2.5 py-1 rounded-full bg-[#26221E] hover:bg-[#332C26] border border-[#3D3731] text-[11px] font-mono text-[#E8E2D9] transition-colors flex items-center gap-1 active:scale-95"
              >
                <Moon className="w-3 h-3 text-[#F59E0B]" />
                Quarto Escuro
              </button>
              <button
                onClick={() => handleAction("Croc croc croc! Biscoitinho crocante pra começar o ensaio fotográfico.", true)}
                className="px-2.5 py-1 rounded-full bg-[#26221E] hover:bg-[#332C26] border border-[#3D3731] text-[11px] font-mono text-[#E8E2D9] transition-colors flex items-center gap-1 active:scale-95"
              >
                <Cookie className="w-3 h-3 text-[#A855F7]" />
                Petisco
              </button>
            </div>
          </div>

          {/* Right: Speech Bubble & Interactive Questions */}
          <div className="flex-1 w-full">
            {/* Speech Dialogue Bubble */}
            <div className="relative bg-[#221E1B] border border-[#38322B] rounded-2xl p-5 sm:p-6 mb-5 shadow-lg">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-[#E84A27]/20 text-[#E84A27] shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#E84A27] font-semibold block mb-1">
                    Luz diz:
                  </span>
                  <p className="font-serif text-base sm:text-lg text-[#FAFAFA] leading-relaxed">
                    "{activeSpeech}"
                  </p>
                </div>
              </div>
            </div>

            {/* Questions Chips */}
            <div>
              <span className="text-xs font-mono text-[#948D85] block mb-2.5">
                Pergunte à Luz sobre o trabalho do Léo:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {mascotData.questions.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuestion(item)}
                    className={`p-3 rounded-xl border text-left text-xs font-mono transition-all flex items-center justify-between gap-2 ${
                      selectedQuestion === item.q
                        ? 'bg-[#E84A27]/15 border-[#E84A27] text-[#FFA08C]'
                        : 'bg-[#181513] border-[#2A2521] text-[#C4BCB0] hover:bg-[#24201C] hover:border-[#3D362F]'
                    }`}
                  >
                    <span>{item.q}</span>
                    <span className="text-[10px] text-[#7A7268]">Perguntar →</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
