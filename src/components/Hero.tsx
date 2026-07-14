import React from 'react';
import { Terminal, Compass, Cpu } from 'lucide-react';
import { motion } from 'motion/react';
import Balatro from './Balatro';

interface HeroProps {
  onWorkClick: () => void;
}

export default function Hero({ onWorkClick }: HeroProps) {
  const handleLearnMore = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      const top = projectsSection.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative flex min-h-screen flex-col justify-between px-6 pt-32 pb-12 md:px-12 lg:px-24 overflow-hidden bg-black"
    >
      {/* Balatro Fluid Shader Background */}
      <div className="absolute inset-0 z-0">
        <Balatro
          isRotate={true}
          spinSpeed={1.5}
          mouseInteraction={true}
          pixelFilter={1200}
          color1="#10b981" // Vibrant lighter emerald green
          color2="#06b6d4" // Lighter cyan highlight
          color3="#011a13" // Very deep forest green contrast
          contrast={4.2}
          lighting={0.45}
        />
        {/* Deep, highly legible dark mask that lets the glowing light colors show on the sides/bottom while ensuring perfect text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black/95 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#1c1c1c_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none" />
      </div>
      
      {/* Top Metadata Row */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-2 w-2 animate-pulse bg-zinc-400" />
          <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">
            13 — Gangtok, Ind
          </span>
        </div>
        <div className="flex items-center gap-6 font-mono text-xs text-zinc-500">
          <span>SYSTEM STATUS: OPTIMIZED</span>
        </div>
      </div>

      {/* Hero Body Content */}
      <div className="relative z-10 my-auto max-w-4xl pt-12 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-8"
        >
          {/* Main Display Heading */}
          <h1 className="font-sans text-4xl font-light leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl max-w-3xl">
            Building digital assets and <span className="text-zinc-500">automated systems</span> with efficiency.
          </h1>

          {/* Core Bio Statement */}
          <p className="font-sans text-lg font-light leading-relaxed text-zinc-400 md:text-xl lg:max-w-3xl">
            Young entrepreneur focused on developing tools, scaling media projects, and managing capital through data-driven trading. Focused on efficiency.
          </p>

          {/* CTA Link Layout */}
          <div className="flex flex-wrap items-center gap-6 pt-4">
            <button
              onClick={handleLearnMore}
              className="group inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-white hover:opacity-80 transition-opacity"
            >
              <span>Explore Projects</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </button>
            <span className="text-zinc-800">/</span>
            <button
              onClick={onWorkClick}
              className="font-mono text-xs text-emerald-400 hover:text-emerald-300 transition-all uppercase tracking-widest font-semibold flex items-center gap-1.5"
            >
              <span>Work with me</span>
              <span className="inline-flex h-1.5 w-1.5 bg-emerald-400 animate-pulse" />
            </button>
            <span className="text-zinc-800">/</span>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="font-mono text-xs text-zinc-500 hover:text-zinc-300 hover:underline underline-offset-4 decoration-zinc-500 transition-all uppercase tracking-widest"
            >
              Initialize Contact
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Grid Navigation / Anchors */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-zinc-800 pt-8 mt-auto">
        <div className="flex gap-4 items-start">
          <div className="p-2 border border-zinc-850 bg-zinc-950/40 text-zinc-400">
            <Cpu className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-mono text-xs font-semibold text-white uppercase tracking-wider">Asset Building</h4>
            <p className="font-sans text-xs text-zinc-500 mt-1">Rapid functional prototypes of automated services & core systems.</p>
          </div>
        </div>
        
        <div className="flex gap-4 items-start">
          <div className="p-2 border border-zinc-850 bg-zinc-950/40 text-zinc-400">
            <Compass className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-mono text-xs font-semibold text-white uppercase tracking-wider">Algorithmic Capital</h4>
            <p className="font-sans text-xs text-zinc-500 mt-1">Deploying data-driven structures across financial markets efficiently.</p>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <div className="p-2 border border-zinc-850 bg-zinc-950/40 text-zinc-400">
            <Terminal className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-mono text-xs font-semibold text-white uppercase tracking-wider">High-Efficiency Strategy</h4>
            <p className="font-sans text-xs text-zinc-500 mt-1">Applying the principles of modern automated design to speed up execution.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
