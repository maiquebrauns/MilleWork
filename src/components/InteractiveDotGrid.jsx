import React, { useEffect, useRef } from 'react';

/**
 * InteractiveDotGrid
 * 
 * Cria uma grade de pontos sutil no fundo onde apenas os pontinhos
 * acendem suavemente com brilho dourado conforme o mouse passa por eles,
 * exatamente como na referência visual do usuário.
 */
export default function InteractiveDotGrid() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;

    // Mouse coordinates (default to outside the screen)
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      isActive: false,
    };

    const DOT_SPACING = 32; // Distância entre os pontos
    const INFLUENCE_RADIUS = 160; // Raio em torno do mouse onde os pontos acendem
    const BASE_ALPHA = 0.07; // Brilho base do ponto em repouso
    const ACTIVE_ALPHA = 0.85; // Brilho máximo do ponto aceso

    // Redimensionamento responsivo e Retina (HiDPI)
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isActive = true;
    };

    const handleMouseLeave = () => {
      mouse.isActive = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Loop de renderização fluida
    const render = () => {
      // Suavização do movimento do mouse (lerp)
      mouse.x += (mouse.targetX - mouse.x) * 0.2;
      mouse.y += (mouse.targetY - mouse.y) * 0.2;

      ctx.clearRect(0, 0, width, height);

      // Renderiza a grade de pontinhos
      const cols = Math.ceil(width / DOT_SPACING) + 1;
      const rows = Math.ceil(height / DOT_SPACING) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * DOT_SPACING;
          const y = j * DOT_SPACING;

          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const distSq = dx * dx + dy * dy;
          const maxDistSq = INFLUENCE_RADIUS * INFLUENCE_RADIUS;

          let alpha = BASE_ALPHA;
          let dotRadius = 1;
          let isLit = false;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            // Curva suave de aproximação
            const factor = Math.cos((dist / INFLUENCE_RADIUS) * (Math.PI / 2));
            alpha = BASE_ALPHA + (ACTIVE_ALPHA - BASE_ALPHA) * factor;
            dotRadius = 1 + 1.2 * factor;
            isLit = factor > 0.4;
          }

          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);

          if (isLit) {
            // Ponto aceso: dourado champagne com brilho
            ctx.fillStyle = `rgba(247, 235, 218, ${alpha})`;
            ctx.shadowColor = 'rgba(212, 163, 115, 0.6)';
            ctx.shadowBlur = 4;
          } else {
            // Ponto em repouso: sutil e discreto
            ctx.fillStyle = `rgba(212, 163, 115, ${alpha})`;
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
          }

          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
