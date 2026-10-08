import React from 'react';
import { Award, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

const certificates = [
  {
    id: 1,
    name: 'Meta Frontend Certificate',
    issuer: 'Coursera / Meta',
    date: 'Recent',
    link: 'https://coursera.org/share/8984d5550e263d04ff5543d53bb8a0df'
  },
  {
    id: 2,
    name: 'Natively Builder Certificate',
    issuer: 'LabLab.ai',
    date: 'Recent',
    link: 'https://lablab.ai/u/@Geph/ai-hackathons/nativebuilder-build-without-limits/certificate'
  },
  {
    id: 3,
    name: 'Alpaca AI Trading Agents Hackathon',
    issuer: 'LabLab.ai',
    date: 'Recent',
    link: 'https://lablab.ai/u/@Geph/ai-hackathons/alpaca-ai-trading-agents-hackathon/certificate'
  },
  {
    id: 4,
    name: 'Infra Summit Hackathon',
    issuer: 'LabLab.ai',
    date: 'Recent',
    link: 'https://lablab.ai/u/@Geph/ai-hackathons/ai-infra-summit-hackathon/certificate'
  },
  {
    id: 5,
    name: 'IBM Bob 2.0 Hackathon',
    issuer: 'LabLab.ai',
    date: 'Recent',
    link: 'https://lablab.ai/u/@Geph/ai-hackathons/ibm-bob-2-hackathon/certificate'
  }
];

export default function Certificates() {
  return (
    <section id="certificates" className="relative overflow-hidden border-t border-zinc-800 bg-transparent px-6 py-24 md:px-12 lg:px-24">
      <div className="absolute inset-0 pointer-events-none z-0">
      </div>
      <div className="relative z-10 mx-auto max-w-7xl">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs text-[#8E9AAF] uppercase tracking-[0.2em] font-bold">
              Certificates & Achievements
            </span>
            <div className="h-[1px] flex-1 bg-zinc-800"></div>
          </div>
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-[#FFFFFF] md:text-5xl uppercase">
            Verified Credentials
          </h2>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              className="group relative flex flex-col justify-between overflow-hidden border border-zinc-800 bg-[#0A122C]/80 p-6 sm:p-8 rounded-sm shadow-md hover:shadow-xl hover:border-[#8E9AAF]"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="p-3 border border-zinc-800 bg-zinc-900">
                  <Award className="h-6 w-6 text-[#FFFFFF]" />
                </div>
                <ArrowUpRight className="h-5 w-5 text-[#8E9AAF] group-hover:text-[#FFFFFF] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
              
              <div>
                <span className="font-mono text-[10px] uppercase text-[#8E9AAF] font-semibold tracking-wider mb-2 block">
                  {cert.issuer}
                </span>
                <h3 className="font-sans text-xl font-bold tracking-tight text-[#F9F6F0] group-hover:text-[#FFFFFF] transition-colors">
                  {cert.name}
                </h3>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
