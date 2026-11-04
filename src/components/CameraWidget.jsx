import React, { useState } from 'react';
import { Camera, Sparkles, Sliders, Info, Zap } from 'lucide-react';
import { playShutterSound, playFilmWinding } from '../utils/audio';

export default function CameraWidget({ isMuted, onTriggerFlash, cameraData }) {
  const [frameCounter, setFrameCounter] = useState(24);
  const [isWinding, setIsWinding] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCameraIndex, setSelectedCameraIndex] = useState(0);

  const activeCamera = cameraData[selectedCameraIndex] || cameraData[0];

  const handleShoot = () => {
    if (isWinding) return;

    if (!isMuted) {
      playShutterSound();
    }
    onTriggerFlash();

    setIsWinding(true);
    setFrameCounter((prev) => (prev >= 36 ? 1 : prev + 1));

    setTimeout(() => {
      if (!isMuted) {
        playFilmWinding();
      }
      setIsWinding(false);
    }, 450);
  };

  return (
    <div className="relative bg-[#1A1715] border border-[#2D2824] rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden">
      {/* Subtle background ambient glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#E84A27]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left: Camera description & interactive trigger */}
        <div className="max-w-md text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#26221E] border border-[#3D3731] text-xs font-mono text-[#E84A27] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Câmera Principal do Ateliê · 35mm</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAFAFA] tracking-tight mb-2">
            {activeCamera.name}
          </h3>

          <p className="text-sm text-[#A8A196] leading-relaxed mb-5">
            {activeCamera.whyUse}
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <button
              onClick={handleShoot}
              disabled={isWinding}
              className={`px-5 py-2.5 rounded-full font-mono text-xs font-semibold flex items-center gap-2.5 transition-all shadow-lg active:scale-95 ${
                isWinding
                  ? 'bg-[#38332E] text-[#7A736B] cursor-not-allowed'
                  : 'bg-[#E84A27] hover:bg-[#F25C39] text-white shadow-[#E84A27]/30 hover:shadow-[#E84A27]/50'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>{isWinding ? 'Avançando Filme...' : 'Disparar Obturador (Flash)'}</span>
            </button>

            <button
              onClick={() => setShowDetails(!showDetails)}
              className="px-4 py-2.5 rounded-full border border-[#3D3731] bg-[#221F1B] hover:bg-[#2A2621] text-xs font-mono text-[#C8C1B6] transition-colors flex items-center gap-2"
            >
              <Info className="w-3.5 h-3.5 text-[#E84A27]" />
              <span>{showDetails ? 'Ocultar Detalhes' : 'Ver Mecânica'}</span>
            </button>
          </div>
        </div>

        {/* Right: The Interactive Vintage Camera Body Visual */}
        <div className="relative flex flex-col items-center">
          {/* Top Plate with Dials and Shutter Button */}
          <div className="w-72 sm:w-80 h-10 bg-gradient-to-b from-[#4A453F] to-[#2E2A26] rounded-t-xl border-t border-x border-[#5A544C] flex items-center justify-between px-6 shadow-md relative">
            {/* Shutter Speed Dial */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-b from-[#2E2A26] to-[#1E1B19] border border-[#5A544C] flex items-center justify-center shadow-inner cursor-pointer hover:border-[#E84A27] transition-colors" title="Dial de Velocidade: 1/250s">
              <span className="text-[9px] font-mono font-bold text-[#E8E2D9]">250</span>
            </div>

            {/* Viewfinder window */}
            <div className="w-6 h-4 bg-[#141F28] border border-[#3B4E5F] rounded-sm shadow-inner flex items-center justify-center">
              <div className="w-2 h-2 bg-[#4287F5]/30 rounded-xs"></div>
            </div>

            {/* Shutter Release Button */}
            <button
              onClick={handleShoot}
              disabled={isWinding}
              className={`w-7 h-7 rounded-full bg-gradient-to-b from-[#E84A27] to-[#B02F12] border-2 border-[#FFA08C] shadow-lg flex items-center justify-center transform active:translate-y-0.5 transition-all cursor-pointer ${
                isWinding ? 'opacity-50' : 'hover:scale-105'
              }`}
              title="Clique para bater a foto"
            >
              <div className="w-2 h-2 rounded-full bg-white/80"></div>
            </button>
          </div>

          {/* Main Camera Body (Textured Leatherette) */}
          <div className="w-72 sm:w-80 h-36 bg-[#161413] border-x border-b border-[#3D3731] rounded-b-2xl relative shadow-2xl flex items-center justify-center overflow-hidden">
            {/* Vulcanite Texture Pattern */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:6px_6px]"></div>

            {/* Red Leica Dot Logo */}
            <div className="absolute top-3 left-6 w-5 h-5 rounded-full bg-[#E84A27] text-white flex items-center justify-center font-serif text-[8px] font-bold shadow-sm tracking-tighter">
              35
            </div>

            {/* Frame Counter Window */}
            <div className="absolute top-3 right-6 bg-[#0F0E0D] border border-[#38332E] px-2 py-0.5 rounded text-[10px] font-mono text-[#E84A27]">
              EXP {String(frameCounter).padStart(2, '0')}/36
            </div>

            {/* Lens Barrel and Glass Elements */}
            <div
              onClick={handleShoot}
              className="w-24 h-24 rounded-full bg-gradient-to-b from-[#2E2A26] to-[#141210] border-4 border-[#3D3731] flex items-center justify-center shadow-[inset_0_4px_10px_rgba(0,0,0,0.8),0_10px_20px_rgba(0,0,0,0.5)] cursor-pointer group hover:border-[#E84A27]/60 transition-all"
              title="Lente Summicron 35mm f/2 · Clique para disparar"
            >
              {/* Inner Lens Glass with Reflections */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#0F1E29] via-[#0E2C3D] to-[#1E3B33] border-2 border-[#1A3338] relative flex items-center justify-center group-hover:scale-105 transition-transform">
                {/* Aperture blades simulation */}
                <div className="w-6 h-6 rounded-full bg-black border border-[#2E3C40] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#00ffff]/20 animate-pulse"></div>
                </div>

                {/* Glass reflection highlight */}
                <div className="absolute top-2 left-2 w-4 h-2 rounded-full bg-white/20 transform -rotate-45 blur-[0.5px]"></div>
              </div>
            </div>

            {/* Bottom film door release indicator */}
            <div className="absolute bottom-2 inset-x-8 h-1 bg-[#26221E] rounded-full border-t border-[#38332E]"></div>
          </div>

          <div className="mt-3 flex items-center gap-2 text-xs font-mono text-[#8C847A]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Carregada com {activeCamera.favoriteLens}</span>
          </div>
        </div>
      </div>

      {/* Expanded Mechanics Details Drawer */}
      {showDetails && (
        <div className="mt-8 pt-6 border-t border-[#2D2824] grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in duration-300">
          {cameraData.map((cam, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedCameraIndex(idx)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                selectedCameraIndex === idx
                  ? 'bg-[#26221E] border-[#E84A27]/60 shadow-md'
                  : 'bg-[#181513] border-[#2A2622] hover:bg-[#201D1A]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-serif font-semibold text-sm text-[#FAFAFA]">
                  {cam.name}
                </span>
                {selectedCameraIndex === idx && (
                  <span className="text-[10px] font-mono text-[#E84A27] bg-[#E84A27]/10 px-2 py-0.5 rounded">
                    Ativa
                  </span>
                )}
              </div>
              <p className="text-xs text-[#9E978D] font-mono mb-2">{cam.type}</p>
              <p className="text-xs text-[#C2BBB0] leading-relaxed">{cam.favoriteLens}</p>
              <p className="text-[11px] text-[#7A736A] mt-2 font-mono">Obturador: {cam.shutter}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
