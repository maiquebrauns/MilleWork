import React, { useState } from 'react';
import { X, MessageCircle, Mail, Check, Copy, Sparkles, Send } from 'lucide-react';
import InstagramIcon from './InstagramIcon';
import { playSwitchSound } from '../utils/audio';

export default function BookingModal({ isOpen, onClose, photographer, isMuted }) {
  const [selectedService, setSelectedService] = useState('Retrato Autoral');
  const [selectedMonth, setSelectedMonth] = useState('Este mês');
  const [clientName, setClientName] = useState('');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const services = ['Retrato Autoral', 'Branding Pessoal', 'Casal / Elopement', 'Moda / Editorial'];
  const months = ['Este mês', 'Próximo mês', 'Próximos 3 meses', 'A Definir'];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(photographer.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getWhatsAppMessage = () => {
    const text = `Olá Millie! Meu nome é ${clientName || 'uma admiradora do seu trabalho'}. Adorei seu portfólio e gostaria de agendar um ensaio de *${selectedService}* para *${selectedMonth}*.\n${notes ? `Detalhes: ${notes}` : ''}`;
    return `https://wa.me/5521998765432?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg bg-[#181513] border border-[#38312A] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#2A241F] mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#D4A373]/20 border border-[#D4A373]/40 flex items-center justify-center text-[#D4A373]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-white">
                Agende Seu Ensaio
              </h3>
              <p className="text-xs font-mono text-[#9C9488]">
                {photographer.name} · {photographer.handle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#26211C] text-[#8C847A] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="space-y-4">
          {/* Select Type of Shoot */}
          <div>
            <label className="text-xs font-mono text-[#A8A196] block mb-2">
              Qual estilo de ensaio você tem em mente?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {services.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    if (!isMuted) playSwitchSound();
                    setSelectedService(s);
                  }}
                  className={`p-2.5 rounded-xl text-xs font-mono transition-all border text-left ${
                    selectedService === s
                      ? 'bg-[#D4A373]/15 border-[#D4A373] text-[#FFA08C] font-semibold'
                      : 'bg-[#141210] border-[#2A241F] text-[#B5ADA3] hover:bg-[#201D1A]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Select Timeline */}
          <div>
            <label className="text-xs font-mono text-[#A8A196] block mb-2">
              Previsão de data / mês:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {months.map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    if (!isMuted) playSwitchSound();
                    setSelectedMonth(m);
                  }}
                  className={`p-2.5 rounded-xl text-xs font-mono transition-all border text-left ${
                    selectedMonth === m
                      ? 'bg-[#D4A373]/15 border-[#D4A373] text-[#FFA08C] font-semibold'
                      : 'bg-[#141210] border-[#2A241F] text-[#B5ADA3] hover:bg-[#201D1A]'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Name input */}
          <div>
            <label className="text-xs font-mono text-[#A8A196] block mb-1">
              Como você gostaria de ser chamada(o)?
            </label>
            <input
              type="text"
              placeholder="Seu nome ou marca..."
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#12100E] border border-[#2D2620] text-sm text-white placeholder-[#5C544B] focus:outline-hidden focus:border-[#D4A373] font-mono"
            />
          </div>

          {/* Direct Actions: WhatsApp or Instagram */}
          <div className="pt-2 flex flex-col gap-2.5">
            <a
              href={getWhatsAppMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-mono text-xs font-bold shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Enviar Mensagem no WhatsApp</span>
            </a>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={photographer.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-[#201D1A] border border-[#2E2822] hover:bg-[#2A241F] text-xs font-mono text-[#D4A373] flex items-center justify-center gap-2 transition-colors"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>DM no Instagram</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="py-2.5 px-3 rounded-xl bg-[#201D1A] border border-[#2E2822] hover:bg-[#2A241F] text-xs font-mono text-[#E8E2D9] flex items-center justify-center gap-2 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#D4A373]" />}
                <span>{copied ? 'Copiado!' : 'Copiar E-mail'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
