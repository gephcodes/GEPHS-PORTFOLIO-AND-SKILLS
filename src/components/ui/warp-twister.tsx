import React, { useEffect, useRef } from 'react';

export interface WarpTwisterProps {
  className?: string;
}

export default function WarpTwister({ className = '' }: WarpTwisterProps) {
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

    // Dust particles drifting in twisting tube
    interface Particle {
      x: number;
      y: number;
      z: number;
      size: number;
      speedZ: number;
      angle: number;
      spinSpeed: number;
    }

    const particles: Particle[] = [];
    const particleCount = 400;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: Math.random() * 1500,
        size: Math.random() * 2.5 + 0.5,
        speedZ: Math.random() * 3 + 1,
        angle: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() - 0.5) * 0.02
      });
    }

    let time = 0;

    const render = () => {
      time += 0.01;
      ctx.fillStyle = '#0A122C';
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw twisting haze rings (twisting tube effect)
      const ringCount = 35;
      for (let i = 0; i < ringCount; i++) {
        const z = (i * 45 - (time * 50) % 45) + 100;
        if (z <= 0) continue;

        const scale = 800 / z;
        const radius = 250 * scale;
        const twist = Math.sin(time + i * 0.2) * 2;

        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = i % 2 === 0 ? 'rgba(142, 154, 175, 0.15)' : 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 2 * scale;
        ctx.translate(centerX, centerY);
        ctx.rotate(twist);
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // Draw drifting dust particles
      particles.forEach((p) => {
        p.z -= p.speedZ;
        if (p.z <= 0) {
          p.z = 1500;
          p.x = (Math.random() - 0.5) * width * 1.5;
          p.y = (Math.random() - 0.5) * height * 1.5;
        }

        p.angle += p.spinSpeed;
        const scale = 800 / p.z;
        const x2d = centerX + (p.x * Math.cos(p.angle) - p.y * Math.sin(p.angle)) * scale;
        const y2d = centerY + (p.x * Math.sin(p.angle) + p.y * Math.cos(p.angle)) * scale;

        if (x2d >= 0 && x2d <= width && y2d >= 0 && y2d <= height) {
          const alpha = Math.min(1, (1500 - p.z) / 1000) * 0.8;
          ctx.fillStyle = `rgba(249, 246, 240, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x2d, y2d, p.size * scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`relative overflow-hidden w-full h-full bg-[#0A122C] ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}
