import React from 'react';
import { Award, ArrowUpRight } from 'lucide-react';

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
  }
];

export default function Certificates() {
  return (
    <section id="certificates" className="relative overflow-hidden border-t border-zinc-200 bg-transparent px-6 py-24 md:px-12 lg:px-24">
      <div className="absolute inset-0 pointer-events-none z-0">
      </div>
      <div className="relative z-10 mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-20">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs text-white uppercase tracking-[0.2em] font-bold [text-shadow:0_4px_20px_rgba(0,0,0,1),0_0_40px_rgba(0,0,0,0.8)]">
              Certificates & Achievements
            </span>
            <div className="h-[1px] flex-1 bg-zinc-200"></div>
          </div>
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-white md:text-5xl uppercase [text-shadow:0_4px_20px_rgba(0,0,0,1),0_0_40px_rgba(0,0,0,0.8)]">
            Verified Credentials
          </h2>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <a 
              key={cert.id}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col justify-between overflow-hidden border border-zinc-200 bg-[#FDFBF7]/90 p-6 sm:p-8 transition-all duration-300 rounded-sm shadow-md hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="p-3 border border-zinc-200 bg-white">
                  <Award className="h-6 w-6 text-black" />
                </div>
                <ArrowUpRight className="h-5 w-5 text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
              
              <div>
                <span className="font-mono text-[10px] uppercase text-black font-semibold tracking-wider mb-2 block">
                  {cert.issuer}
                </span>
                <h3 className="font-sans text-xl font-bold tracking-tight text-black group-hover:text-[#003BFF] transition-colors">
                  {cert.name}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
