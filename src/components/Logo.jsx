import React, { useState } from 'react';

/**
 * Logos autorais para Millie Moura Fotografia
 * 
 * Opção 1 (Padrão): "Focus Viewfinder" - Os colchetes de foco do visor da câmera com a inicial M refinada.
 * Opção 2: "Optical Lens M" - Lente circular com diafragma minimalista e elegante.
 * Opção 3: "Camera Line Art" - Traço contínuo e moderno da silhueta da câmera formando o M.
 */
export default function Logo({
  style = 'viewfinder', // 'viewfinder' | 'lens' | 'camera'
  className = 'w-9 h-9',
  onSelectStyle,
}) {
  // 1. FOCUS VIEWFINDER (O Enquadramento / Visor de Foco do Fotógrafo)
  // Conceito: Os marcadores de foco de um visor profissional [ ⌜ ⌝ ⌞ ⌟ ] abraçando a inicial M.
  if (style === 'viewfinder') {
    return (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="Logo Millie Moura - Viewfinder"
      >
        <defs>
          <linearGradient id="goldVF" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F5DDB3" />
            <stop offset="50%" stopColor="#D4A373" />
            <stop offset="100%" stopColor="#B37E46" />
          </linearGradient>
        </defs>

        {/* 4 Colchetes de Foco da Câmera (Viewfinder Brackets) */}
        {/* Superior Esquerdo */}
        <path d="M 5 13 L 5 7 L 11 7" stroke="url(#goldVF)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        {/* Superior Direito */}
        <path d="M 29 7 L 35 7 L 35 13" stroke="url(#goldVF)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        {/* Inferior Esquerdo */}
        <path d="M 5 27 L 5 33 L 11 33" stroke="url(#goldVF)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        {/* Inferior Direito */}
        <path d="M 29 33 L 35 33 L 35 27" stroke="url(#goldVF)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />

        {/* O 'M' Editorial Centralizado (Elegante e Limpo) */}
        <path
          d="M 12 28 L 12 14 L 20 22 L 28 14 L 28 28"
          stroke="url(#goldVF)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Ponto de Foco Central (O 'Catchlight' da lente) */}
        <circle cx="20" cy="27" r="1.5" fill="url(#goldVF)" />
      </svg>
    );
  }

  // 2. OPTICAL LENS M (Lente Circular com Abertura e Monograma)
  if (style === 'lens') {
    return (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="Logo Millie Moura - Optical Lens"
      >
        <defs>
          <linearGradient id="goldLens" x1="2" y1="2" x2="38" y2="38" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F5DDB3" />
            <stop offset="50%" stopColor="#D4A373" />
            <stop offset="100%" stopColor="#B37E46" />
          </linearGradient>
        </defs>

        {/* Círculo da Lente Fina e Elegante */}
        <circle cx="20" cy="20" r="18" stroke="url(#goldLens)" strokeWidth="1.5" strokeDasharray="50 4" />
        
        {/* Círculo interno sutil */}
        <circle cx="20" cy="20" r="14.5" stroke="url(#goldLens)" strokeWidth="0.75" opacity="0.4" />

        {/* Monograma M esculpido no centro */}
        <path
          d="M 13 26 L 13 14 L 20 21 L 27 14 L 27 26"
          stroke="url(#goldLens)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Pequena abertura de luz no topo */}
        <circle cx="20" cy="9.5" r="1.25" fill="url(#goldLens)" />
      </svg>
    );
  }

  // 3. CAMERA LINE ART (Silhueta Minimalista da Câmera com a Lente em 'M')
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Logo Millie Moura - Camera"
    >
      <defs>
        <linearGradient id="goldCam" x1="2" y1="4" x2="38" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F5DDB3" />
          <stop offset="50%" stopColor="#D4A373" />
          <stop offset="100%" stopColor="#B37E46" />
        </linearGradient>
      </defs>

      {/* Corpo da Câmera minimalista */}
      <rect x="5" y="11" width="30" height="22" rx="5" stroke="url(#goldCam)" strokeWidth="1.75" />
      
      {/* Topo / Prisma do visor */}
      <path d="M 14 11 L 16 7 L 24 7 L 26 11" stroke="url(#goldCam)" strokeWidth="1.75" strokeLinejoin="round" />

      {/* Botão de disparo */}
      <line x1="8" y1="8" x2="11" y2="8" stroke="url(#goldCam)" strokeWidth="1.5" strokeLinecap="round" />

      {/* Lente em formato de M no centro */}
      <path
        d="M 13 25 L 13 18 L 20 23 L 27 18 L 27 25"
        stroke="url(#goldCam)"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
