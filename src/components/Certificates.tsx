import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

const certificates = [
  {
    id: 1,
    name: 'Meta Frontend Certificate',
    issuer: 'Coursera / Meta',
    description: 'Coursera / Meta certified. I know how to build clean, high-performance UI systems.',
    link: 'https://coursera.org/share/8984d5550e263d04ff5543d53bb8a0df'
  },
  {
    id: 2,
    name: 'Natively Builder Certificate',
    issuer: 'LabLab.ai',
    description: 'Lablab.ai verified. Certified in shipping native AI application pipelines.',
    link: 'https://lablab.ai/u/@Geph/ai-hackathons/nativebuilder-build-without-limits/certificate'
  },
  {
    id: 3,
    name: 'Alpaca AI Trading Agents Hackathon',
    issuer: 'LabLab.ai',
    description: 'Built autonomous AI agents to trade markets under intense competition.',
    link: 'https://lablab.ai/u/@Geph/ai-hackathons/alpaca-ai-trading-agents-hackathon/certificate'
  },
  {
    id: 4,
    name: 'Infra Summit Hackathon',
    issuer: 'LabLab.ai',
    description: 'Proof I can architect high-performance AI infra under extreme time constraints.',
    link: 'https://lablab.ai/u/@Geph/ai-hackathons/ai-infra-summit-hackathon/certificate'
  },
  {
    id: 5,
    name: 'IBM Bob 2.0 Hackathon',
    issuer: 'LabLab.ai',
    description: 'Forged a solid solution in a massive sprint using cutting-edge IBM infrastructure.',
    link: 'https://lablab.ai/u/@Geph/ai-hackathons/ibm-bob-2-hackathon/certificate'
  }
];

export default function Certificates() {
  return (
    <section id="certificates" className="relative overflow-hidden border-t border-zinc-800 bg-transparent px-4 sm:px-6 md:px-12 lg:px-24 py-16 sm:py-24">
      <div className="absolute inset-0 pointer-events-none z-0">
      </div>
      <div className="relative z-10 mx-auto max-w-7xl">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 sm:mb-14"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-[10px] sm:text-xs text-[#8E9AAF] uppercase tracking-[0.2em] font-bold">
              CERTIFICATES & ACHIEVEMENTS
            </span>
            <div className="h-[1px] flex-1 bg-zinc-800"></div>
          </div>
          <h2 className="font-sans text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#FFFFFF] uppercase">
            CERTIFICATES & ACHIEVEMENTS
          </h2>
        </motion.div>

        {/* Certificates Grid - Clean without icon banners, Side by Side on Mobile and Desktop */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6">
          {certificates.map((cert, idx) => (
            <motion.a 
              key={cert.id}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 32, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
              className="group relative flex flex-col justify-between overflow-hidden border border-zinc-800 bg-[#0A122C]/90 p-3 sm:p-5 md:p-6 rounded-sm shadow-md hover:shadow-xl hover:border-[#8E9AAF]"
            >
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-mono text-[9px] sm:text-[11px] uppercase text-[#8E9AAF] font-semibold tracking-wider truncate">
                    {cert.issuer}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#8E9AAF] group-hover:text-[#FFFFFF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </div>
                
                <h3 className="font-sans text-xs sm:text-base md:text-lg font-bold tracking-tight text-[#F9F6F0] group-hover:text-[#FFFFFF] transition-colors mb-1.5 leading-snug">
                  {cert.name}
                </h3>
                
                <p className="font-sans text-[11px] sm:text-xs text-[#8E9AAF] leading-snug sm:leading-relaxed">
                  {cert.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
