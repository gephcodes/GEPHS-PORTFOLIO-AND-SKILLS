import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import Hiring from './Hiring';

export default function Hero() {
  const handleScroll = () => {
    const el = document.getElementById('projects');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[90vh] w-full flex flex-col justify-between items-center pt-24 pb-14 px-4 sm:px-6 md:px-12 overflow-hidden"
    >
      {/* Centered Main Avatar Landing Hero */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-4xl text-center select-none my-auto">
        {/* Glow behind character matching site navy blue palette */}
        <div className="absolute -top-10 w-72 sm:w-96 md:w-[480px] aspect-square rounded-full bg-gradient-to-tr from-[#162248]/70 via-[#0A122C]/90 to-transparent blur-3xl pointer-events-none -z-10" />

        {/* Character Image - Original Person Cutout with Transparent Background */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative cursor-pointer group"
          onClick={handleScroll}
        >
          {/* Floor contact shadow */}
          <div className="absolute -bottom-4 inset-x-8 h-8 rounded-full bg-[#000000]/60 blur-xl pointer-events-none" />

          {/* Original character figure */}
          <div className="w-64 sm:w-80 md:w-96 lg:w-[420px] aspect-[1086/1448] relative transition-transform duration-300 ease-out group-hover:scale-[1.02]">
            <img
              src="/assets/aistudio/gephel_original_person_transparent.png"
              alt="gephel chingtham"
              className="w-full h-full object-contain filter contrast-[1.03] brightness-[1.0] drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)]"
              loading="eager"
            />
          </div>
        </motion.div>

        {/* Name and Roles Directly Below the Picture - Funky Interactive Design */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 space-y-3"
        >
          <h1 className="font-sans text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#FFFFFF] lowercase">
            gephel chingtham
          </h1>
          
          {/* Poster Typography Roles Display (Side by side, pure white, no jumpy text animation) */}
          <div className="flex flex-col items-center justify-center gap-3 pt-2 max-w-2xl mx-auto">
            <div className="flex flex-row flex-wrap items-center justify-center gap-2 font-[Archivo_Black,Arial_Black,sans-serif] text-xs sm:text-sm md:text-base font-black uppercase tracking-tight text-[#F9F6F0]">
              <span className="inline-block px-3 py-1 bg-[#162248] border-2 border-zinc-700 shadow-[3px_3px_0px_#FFFFFF] rotate-[-1deg] hover:rotate-0 transition-all cursor-default text-[#FFFFFF]">
                creative developer
              </span>

              <span className="inline-block px-3 py-1 bg-[#0A122C] border-2 border-zinc-700 shadow-[3px_3px_0px_#8E9AAF] rotate-[1deg] hover:rotate-0 transition-all cursor-default text-[#F9F6F0]">
                visionary
              </span>

              <span className="inline-block px-3 py-1 bg-[#162248] border-2 border-zinc-700 shadow-[3px_3px_0px_#FFFFFF] rotate-[-1deg] hover:rotate-0 transition-all cursor-default text-[#FFFFFF]">
                technical director
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* About Gephel Card - Clean, containing only the About Gephel text */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-3xl mt-12 rounded-xl border border-zinc-800 bg-[#0A122C]/90 p-6 sm:p-8 backdrop-blur-md shadow-2xl text-left space-y-4"
      >
        <div className="border-b border-zinc-800 pb-3">
          <p className="font-mono text-xs text-[#8E9AAF] uppercase tracking-widest font-bold">
            about gephel
          </p>
        </div>

        <div className="font-sans text-sm sm:text-base text-[#F9F6F0] leading-relaxed space-y-3">
          <p className="font-bold text-[#FFFFFF]">yo, im gephel.</p>
          <p>im an entrepreneur, retail investor, visionary and startup founder.</p>
          <p>i've worked with organisation's and companies like nasa, meta, ibm, etc.</p>
          <p>i am ranked in the top 1000 on the global leaderboard with lablab.ai as of 10.11.2026.</p>
        </div>

        <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800/80">
          <button
            onClick={handleScroll}
            className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#FFFFFF] hover:text-[#8E9AAF] transition-colors"
          >
            <span>Scroll for active projects</span>
            <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
          </button>
        </div>
      </motion.div>

      {/* Separate Hiring section below About */}
      <Hiring />
    </section>
  );
}
