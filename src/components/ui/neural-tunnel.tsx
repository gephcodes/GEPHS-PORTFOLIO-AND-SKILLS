import React, { useEffect, useRef } from 'react';

export interface NeuralTunnelProps {
  speed?: number;
  density?: number;
  glowColor?: string;
  interactive?: boolean;
  className?: string;
}

export default function NeuralTunnel({
  speed = 1.5,
  density = 250,
  glowColor = '#06b6d4',
  interactive = true,
  className = '',
}: NeuralTunnelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    let animationFrameId: number;

    // Perspective & interaction states
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    // High-DPI Canvas Setup
    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    // Tunnel Engine Configuration
    const MAX_DEPTH = 2000;
    const TUNNEL_RADIUS = 350;
    const CONNECTION_DISTANCE = 180;
    const FOV = Math.max(width, height) * 0.8;

    interface Node {
      angle: number;
      radiusBase: number;
      x: number;
      y: number;
      z: number;
      pulseOffset: number;
      pulseSpeed: number;
    }

    const nodes: Node[] = [];

    // Populate neural nodes around the cylinder surface
    for (let i = 0; i < density; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radiusBase = TUNNEL_RADIUS + (Math.random() - 0.5) * 60; // Slight surface irregularity
      nodes.push({
        angle,
        radiusBase,
        x: Math.cos(angle) * radiusBase,
        y: Math.sin(angle) * radiusBase,
        z: Math.random() * MAX_DEPTH,
        pulseOffset: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.04,
      });
    }

    const draw = () => {
      // Deep space trailing effect for motion blur
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(253, 251, 247, 0.4)';
      ctx.fillRect(0, 0, width, height);

      // Smooth mouse interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      const centerX = width / 2 + currentMouseX * (width * 0.15);
      const centerY = height / 2 + currentMouseY * (height * 0.15);

      ctx.globalCompositeOperation = 'source-over';

      const projectedNodes: Array<{
        px: number;
        py: number;
        scale: number;
        opacity: number;
        original: Node;
      }> = [];

      const time = Date.now();
      const currentFov = Math.max(width, height) * 0.8; // Recalculate if resized

      // Move & Project nodes
      nodes.forEach((node) => {
        node.z -= speed * 4;
        if (node.z < 10) {
          node.z += MAX_DEPTH;
          // Slowly rotate the tunnel by adjusting angles when they wrap
          node.angle += (Math.random() - 0.5) * 0.2;
          node.x = Math.cos(node.angle) * node.radiusBase;
          node.y = Math.sin(node.angle) * node.radiusBase;
        }

        // Add organic breathing/wiggling
        const wiggle = Math.sin(time * 0.001 * node.pulseSpeed + node.pulseOffset) * 25;
        const currentX = Math.cos(node.angle) * (node.radiusBase + wiggle);
        const currentY = Math.sin(node.angle) * (node.radiusBase + wiggle);

        const scale = currentFov / (node.z || 1);
        const px = centerX + currentX * scale;
        const py = centerY + currentY * scale;

        // Opacity mapping (fade in from back, fade out past camera)
        let opacity = 1;
        if (node.z > MAX_DEPTH - 600) {
          opacity = (MAX_DEPTH - node.z) / 600;
        } else if (node.z < 300) {
          opacity = node.z / 300;
        }

        projectedNodes.push({ px, py, scale, opacity, original: node });
      });

      // Draw Neural Connections (Dendrites)
      ctx.lineWidth = 1.2;
      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const n1 = projectedNodes[i];
          const n2 = projectedNodes[j];

          // 3D Distance check (using original un-wiggled coordinates for topological stability)
          const dx = n1.original.x - n2.original.x;
          const dy = n1.original.y - n2.original.y;
          const dz = n1.original.z - n2.original.z;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < CONNECTION_DISTANCE * CONNECTION_DISTANCE) {
            const dist = Math.sqrt(distSq);
            // Dynamic opacity based on distance and node depth
            const connectionOpacity = (1 - dist / CONNECTION_DISTANCE) * Math.min(n1.opacity, n2.opacity) * 0.7;

            if (connectionOpacity > 0.05) {
              ctx.beginPath();
              ctx.moveTo(n1.px, n1.py);
              ctx.lineTo(n2.px, n2.py);
              ctx.strokeStyle = glowColor;
              ctx.globalAlpha = connectionOpacity;

              // Only apply shadow blur to elements reasonably close to save GPU
              if (n1.original.z < MAX_DEPTH * 0.6) {
                ctx.shadowBlur = 12;
                ctx.shadowColor = glowColor;
              } else {
                ctx.shadowBlur = 0;
              }

              ctx.stroke();
            }
          }
        }
      }

      // Draw Synapse Nodes
      projectedNodes.forEach((node) => {
        if (node.opacity > 0.05) {
          ctx.beginPath();
          // Scale node size by perspective
          const radius = Math.max(0.5, 3 * node.scale);
          ctx.arc(node.px, node.py, radius, 0, Math.PI * 2);
          ctx.fillStyle = glowColor;
          ctx.globalAlpha = node.opacity;
          ctx.shadowBlur = 15;
          ctx.shadowColor = glowColor;
          ctx.fill();
        }
      });

      // Reset context state
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      targetMouseX = (x / width) * 2 - 1;
      targetMouseY = (y / height) * 2 - 1;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [speed, density, glowColor, interactive]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden w-full h-full bg-[#FDFBF7] ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      {/* Fallback gradient in case canvas fails or is slow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#FDFBF7]/50 to-[#FDFBF7] pointer-events-none" />
    </div>
  );
}
