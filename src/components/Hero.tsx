import React from 'react';
import { Terminal, Compass, Cpu } from 'lucide-react';
import { motion } from 'motion/react';

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
      className="relative flex min-h-screen flex-col justify-between px-6 pt-32 pb-12 md:px-12 lg:px-24 overflow-hidden bg-transparent"
    >
      {/* Neural Tunnel Background */}
      <div className="absolute inset-0 z-0">
        {/* Soft dark vignette gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7]/60 via-transparent to-[#FDFBF7]/90 pointer-events-none" />
      </div>
      
      {/* Top Metadata Row */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 pb-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-2 w-2 animate-pulse bg-[#003BFF]" />
          <span className="font-mono text-xs tracking-[0.2em] text-black uppercase">
            Gangtok, Ind
          </span>
        </div>
      </div>

      {/* Hero Body Content */}
      <div className="relative z-10 my-auto max-w-4xl pt-12 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          {/* Main Display Heading */}
          <h1 className="font-sans text-4xl font-extrabold leading-[1.1] tracking-tight text-white [text-shadow:0_4px_20px_rgba(0,0,0,1),0_0_40px_rgba(0,0,0,0.8)] sm:text-6xl lg:text-7xl max-w-3xl">
            Gephel Chingtham
          </h1>
          {/* Core Bio Statement */}
          <div className="flex flex-col gap-4">
            <p className="font-sans text-xl font-bold text-white [text-shadow:0_4px_20px_rgba(0,0,0,1),0_0_40px_rgba(0,0,0,0.8)] md:text-2xl">
              Founder, Entrepreneur and Trader
            </p>
            <p className="font-sans text-lg font-bold leading-relaxed text-white [text-shadow:0_4px_20px_rgba(0,0,0,1),0_0_40px_rgba(0,0,0,0.8)] md:text-xl lg:max-w-3xl">
              I'm 13. I build shit that works. I trade. I work harder than most people twice my age.
            </p>
          </div>

          {/* CTA Link Layout */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-4">
            <button
              onClick={handleLearnMore}
              className="group inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-black hover:opacity-80 transition-opacity"
            >
              <span>Explore Projects</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </button>
            <span className="hidden sm:inline text-black">/</span>
            <button
              onClick={onWorkClick}
              className="group inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-black hover:text-black transition-opacity"
            >
              <span>Work with me</span>
            </button>
            <span className="hidden sm:inline text-black">/</span>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex font-mono text-xs text-black hover:text-black hover:underline underline-offset-4 decoration-zinc-500 transition-all uppercase tracking-widest"
            >
              Contact
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Grid Navigation / Anchors */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-zinc-200 pt-8 mt-auto">
        <div className="flex gap-4 items-start">
          <div className="p-2 border border-zinc-200 bg-white text-black">
            <Cpu className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-mono text-xs font-semibold text-black uppercase tracking-wider">Build products fast</h4>
          </div>
        </div>
        
        <div className="flex gap-4 items-start">
          <div className="p-2 border border-zinc-200 bg-white text-black">
            <Compass className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-mono text-xs font-semibold text-black uppercase tracking-wider">Move capital smart</h4>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <div className="p-2 border border-zinc-200 bg-white text-black">
            <Terminal className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-mono text-xs font-semibold text-black uppercase tracking-wider">Make systems that actually hit</h4>
          </div>
        </div>
      </div>
    </section>
  );
}
