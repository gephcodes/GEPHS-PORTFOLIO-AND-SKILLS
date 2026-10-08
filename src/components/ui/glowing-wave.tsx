import React, { useEffect, useRef } from 'react';

export interface GlowingWaveProps {
  className?: string;
  color?: string;
}

export default function GlowingWave({ className = '', color = '#8E9AAF' }: GlowingWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    let step = 0;

    const render = () => {
      step += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Distinct, highly visible glowing wave layers matching color palette
      const waves = [
        { frequency: 0.006, amplitude: 90, speed: 1.0, opacity: 0.8, stroke: '#FFFFFF', shadowBlur: 25 },
        { frequency: 0.01, amplitude: 120, speed: 0.7, opacity: 0.6, stroke: color, shadowBlur: 20 },
        { frequency: 0.004, amplitude: 150, speed: 1.3, opacity: 0.5, stroke: '#FFFFFF', shadowBlur: 30 }
      ];

      waves.forEach((wave, idx) => {
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 3 + idx;
        ctx.strokeStyle = wave.stroke;
        ctx.shadowColor = wave.stroke;
        ctx.shadowBlur = wave.shadowBlur;
        ctx.globalAlpha = wave.opacity;

        for (let x = 0; x <= width; x += 4) {
          const y =
            height * 0.5 +
            Math.sin(x * wave.frequency + step * wave.speed + idx) * wave.amplitude +
            Math.cos(x * 0.003 - step * 0.4) * 40;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color]);

  return (
    <div className={`relative overflow-hidden w-full h-full bg-[#0A122C] ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}
