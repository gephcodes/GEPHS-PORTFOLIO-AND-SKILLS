import React from 'react';
import { motion } from 'motion/react';

interface HeroProps {
  onWorkClick: () => void;
}

export default function Hero({ onWorkClick }: HeroProps) {
  return (
    <section 
      id="hero" 
      className="relative flex min-h-[60vh] flex-col justify-center px-6 pt-36 pb-20 md:px-12 lg:px-24 overflow-hidden bg-transparent"
    >
      <div className="relative z-10 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-5"
        >
          <h1 className="font-sans text-5xl font-extrabold tracking-tight text-[#FFFFFF] sm:text-7xl lg:text-8xl">
            Gephel Chingtham
          </h1>
          <p className="font-mono text-base md:text-xl text-[#8E9AAF] tracking-wider uppercase font-semibold">
            Visionary | Technical Director | Entrepreneur | Founder
          </p>
        </motion.div>
      </div>
    </section>
  );
}
