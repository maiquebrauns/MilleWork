import React, { useState } from 'react';
import { X, Phone, PhoneCall, Copy, Check, Sparkles, MessageSquare } from 'lucide-react';
import { playDialTone, playSwitchSound } from '../utils/audio';

export default function VintagePhoneModal({ isOpen, onClose, photographer, isMuted }) {
  const [dialedNumber, setDialedNumber] = useState('');
  const [copied, setCopied] = useState(false);
  const [isCalling, setIsCalling] = useState(false);

  if (!isOpen) return null;

  const handleDigit = (digit) => {
    if (!isMuted) playDialTone(digit);
    if (dialedNumber.length < 15) {
      setDialedNumber((prev) => prev + digit);
    }
  };

  const handleClear = () => {
    if (!isMuted) playSwitchSound();
    setDialedNumber('');
    setIsCalling(false);
  };

  const handleCall = () => {
    if (!isMuted) playSwitchSound(true);
    setIsCalling(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(photographer.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const keypad = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['*', '0', '#'],
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md bg-[#1C1815] border-2 border-[#3D352D] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#2E2824] mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#E84A27]/20 border border-[#E84A27]/50 flex items-center justify-center text-[#E84A27]">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-white">
                Telefone do Ateliê
              </h3>
              <p className="text-[10px] font-mono text-[#8C847A]">
                Linha Analógica Direta
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#2A241F] text-[#8C847A] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Vintage Display Screen */}
        <div className="bg-[#12100E] border-2 border-[#2E2824] rounded-xl p-3.5 mb-6 text-center shadow-inner">
          <span className="text-[10px] font-mono text-[#8C847A] tracking-widest block uppercase mb-1">
            {isCalling ? 'Chamando o Fotógrafo...' : 'Discador DTMF'}
          </span>
          <div className="font-mono text-xl sm:text-2xl text-[#E84A27] tracking-widest min-h-[32px] font-bold">
            {dialedNumber || photographer.phoneDisplay}
          </div>
        </div>

        {/* Telephone Keypad */}
        <div className="grid grid-cols-3 gap-3 mb-6 max-w-[280px] mx-auto">
          {keypad.flat().map((key) => (
            <button
              key={key}
              onClick={() => handleDigit(key)}
              className="h-14 rounded-2xl bg-gradient-to-b from-[#28221D] to-[#1C1814] border border-[#3D352D] hover:border-[#E84A27]/60 active:scale-95 text-[#E8E2D9] font-mono text-xl font-bold flex flex-col items-center justify-center shadow-md transition-all group"
            >
              <span>{key}</span>
              <span className="text-[7px] font-mono text-[#6E665C] group-hover:text-[#FFA08C]">
                {key === '1'
                  ? '✉'
                  : key === '2'
                  ? 'ABC'
                  : key === '3'
                  ? 'DEF'
                  : key === '0'
                  ? 'OPER'
                  : ''}
              </span>
            </button>
          ))}
        </div>

        {/* Controls: Call & Clear */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <button
            onClick={handleClear}
            className="px-4 py-2 rounded-full border border-[#3D352D] bg-[#241F1A] text-xs font-mono text-[#9C9488] hover:text-white"
          >
            Limpar
          </button>

          <button
            onClick={handleCall}
            className="px-6 py-2.5 rounded-full bg-[#10B981] hover:bg-[#059669] text-white font-mono text-xs font-bold shadow-lg shadow-emerald-900/40 flex items-center gap-2 active:scale-95 transition-all"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Discar</span>
          </button>
        </div>

        {/* Direct Quick Contact Links */}
        <div className="pt-4 border-t border-[#2E2824] space-y-2">
          <span className="text-[10px] font-mono uppercase text-[#7D756C] block text-center mb-1">
            Ou acione os canais digitais:
          </span>

          <div className="flex gap-2">
            <button
              onClick={handleCopyEmail}
              className="flex-1 py-2 px-3 rounded-xl bg-[#241F1A] border border-[#332B24] hover:bg-[#2E2721] text-xs font-mono text-[#E8E2D9] transition-colors flex items-center justify-center gap-2"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#E84A27]" />}
              <span>{copied ? 'Copiado!' : 'Copiar E-mail'}</span>
            </button>

            <a
              href={`mailto:${photographer.email}?subject=Orçamento de Ensaio Fotográfico`}
              className="flex-1 py-2 px-3 rounded-xl bg-[#E84A27]/20 border border-[#E84A27]/40 hover:bg-[#E84A27]/30 text-xs font-mono text-[#FFA08C] transition-colors flex items-center justify-center gap-2 text-center"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Enviar E-mail</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
