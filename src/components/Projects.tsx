import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, Clock, X, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { Project } from '../types';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 'solvry',
      name: 'Solvry',
      tag: 'Live',
      role: 'Founder',
      description: 'Peer support for teens. Anonymous. Real talk.',
      detailedDescription: 'Peer support for teens. Anonymous. Real talk.',
      whyBuilt: 'Lost my grandad, friends ghosted me, girl rejected me—all in one year. Figured it out alone. Realized that sucks. Built it so nobody has to.',
      features: [],
      link: 'https://solvry-repo.vercel.app'
    },
    {
      id: 'mint',
      name: 'Mint',
      tag: 'Hackathon',
      role: 'Creator',
      description: 'Offline code IDE. Built it in a week just to compete.',
      detailedDescription: 'Offline code IDE. Built it in a week just to compete.',
      features: [],
      link: 'https://wudaiyu6g4bggf08xyb4l21n.nativelyai.app'
    },
    {
      id: 'stupidsimple',
      name: 'StupidSimple.AI',
      tag: 'Live',
      role: 'Founder',
      description: 'Make complex text simple. Instantly.',
      detailedDescription: 'Make complex text simple. Instantly.',
      features: [],
      link: 'https://stupidsimple-ai-dashboard-385962461092.asia-southeast1.run.app/?mode=simplifier&lang=english&complexity=7&session=iwnp9c'
    },
    {
      id: 'goalhub',
      name: 'GoalHub',
      tag: 'Live',
      role: 'Founder',
      description: 'Track your goals. Actually finish them.',
      detailedDescription: 'Track your goals. Actually finish them.',
      features: [],
      link: 'https://goalplan-ai-385962461092.asia-southeast1.run.app/'
    },
    {
      id: 'scentpreview',
      name: 'Scent Preview',
      tag: 'Brand',
      role: 'Creator',
      description: 'High-end fragrance game. Seasonal. Personal brand.',
      detailedDescription: 'High-end fragrance game. Seasonal. Personal brand.',
      features: [],
      link: 'https://scentpreview.onrender.com/'
    },
    {
      id: 'pulse',
      name: 'Pulse',
      tag: 'AI',
      role: 'Creator',
      description: 'LLM that talks like you. For fun.',
      detailedDescription: 'LLM that talks like you. For fun.',
      features: [],
      link: 'https://ai.studio/apps/f2c5c6b3-6119-4f55-818a-14779f986139'
    },
    {
      id: 'vantage',
      name: 'AI Infra Summit Hackathon',
      tag: 'Hackathon',
      role: 'Participant',
      description: 'Built for AI Infra Summit Hackathon.',
      detailedDescription: 'Built for AI Infra Summit Hackathon.',
      features: [],
      link: 'https://vantage-pi-ivory.vercel.app'
    },
    {
      id: 'ibm-bob',
      name: 'IBM Bob 2.0 Hackathon',
      tag: 'Hackathon',
      role: 'Participant',
      description: 'Built for IBM Bob 2.0 Hackathon.',
      detailedDescription: 'Built for IBM Bob 2.0 Hackathon.',
      features: [],
      link: 'https://cortexibmproject.vercel.app'
    }
  ];

  const handleCardClick = (proj: Project) => {
    if (proj.link) {
      window.open(proj.link, '_blank');
    } else {
      setSelectedProject(proj);
    }
  };

  return (
    <section id="projects" className="relative overflow-hidden border-t border-zinc-800 bg-transparent px-6 py-24 md:px-12 lg:px-24">
      <div className="absolute inset-0 pointer-events-none z-0">
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16"
        >
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-[#FFFFFF] md:text-5xl">
            Active projects
          </h2>
          <p className="font-mono text-sm text-[#8E9AAF] mt-2 font-medium">
            I build cool stuff
          </p>
        </motion.div>

        {/* 2x2 Grid of Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj, idx) => {
            const hasLink = !!proj.link;
            const isBuilding = proj.tag.toLowerCase().includes('building');

            return (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 32, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
                onClick={() => handleCardClick(proj)}
                className="group relative flex flex-col justify-between overflow-hidden border border-zinc-800 bg-[#0A122C]/90 p-6 sm:p-8 rounded-sm shadow-md hover:shadow-2xl hover:border-[#8E9AAF] cursor-pointer"
                id={`project-card-${proj.id}`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold text-[#8E9AAF] uppercase tracking-wider">
                      {proj.role}
                    </span>
                    <span className="rounded-full border border-zinc-700 bg-zinc-900 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#F9F6F0] font-medium">
                      {proj.tag}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="mb-6">
                    <h3 className="font-sans text-2xl font-bold tracking-tight text-[#FFFFFF] group-hover:text-[#F9F6F0] transition-colors flex items-center gap-2">
                      {proj.name}
                      {hasLink ? (
                        <ArrowUpRight className="h-5 w-5 text-[#8E9AAF] group-hover:text-[#FFFFFF] transition-colors" />
                      ) : (
                        <Sparkles className="h-4 w-4 text-[#8E9AAF] group-hover:rotate-12 transition-transform" />
                      )}
                    </h3>
                    <p className="font-sans text-sm text-[#8E9AAF] font-normal mt-3 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  {/* Why I Built It Callout (if present) */}
                  {proj.whyBuilt && (
                    <div className="mb-6 border-l-2 border-[#8E9AAF] bg-zinc-900/80 p-3.5 text-xs font-sans text-[#F9F6F0] italic leading-relaxed">
                      <span className="font-mono text-[10px] text-[#8E9AAF] not-italic uppercase tracking-wider block mb-1 font-bold">
                        ★ Why I Built It
                      </span>
                      "{proj.whyBuilt}"
                    </div>
                  )}

                  {/* Features */}
                  {proj.features && proj.features.length > 0 && (
                    <div className="mb-6 space-y-2">
                      <span className="font-mono text-[10px] text-[#8E9AAF] font-bold uppercase tracking-wider block">
                        Core Capabilities
                      </span>
                      <ul className="space-y-1.5 text-xs font-sans text-[#F9F6F0] font-medium">
                        {proj.features.slice(0, 3).map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#8E9AAF] font-mono text-[10px] mt-0.5">•</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                  {hasLink ? (
                    <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#FFFFFF] group-hover:underline underline-offset-4 decoration-[#8E9AAF]">
                      <span>Launch Site</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  ) : (
                    <span className="font-mono text-xs text-[#8E9AAF] font-medium">* Active Build</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal for Projects */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A122C]/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl border border-zinc-800 bg-[#0A122C] p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto text-[#F9F6F0] rounded-sm">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-zinc-800 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs text-[#F9F6F0] uppercase tracking-wider border border-zinc-700 bg-zinc-900 px-2 py-0.5 font-bold">
                    {selectedProject.tag}
                  </span>
                  <span className="font-mono text-xs text-[#8E9AAF] uppercase tracking-wider font-bold">
                    {selectedProject.role}
                  </span>
                </div>
                <h3 className="font-sans text-3xl font-bold text-[#FFFFFF]">{selectedProject.name}</h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-[#8E9AAF] hover:text-[#FFFFFF] transition-colors p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* What is it */}
            <div className="space-y-2">
              <h4 className="font-mono text-xs text-[#8E9AAF] uppercase tracking-wider flex items-center gap-1.5 font-bold">
                <Sparkles className="h-3.5 w-3.5 text-[#FFFFFF]" /> What is {selectedProject.name}?
              </h4>
              <p className="font-sans text-sm text-[#F9F6F0] leading-relaxed font-normal">
                {selectedProject.description}
              </p>
            </div>

            {/* Why I Built It */}
            {selectedProject.whyBuilt && (
              <div className="space-y-2 border-l-2 border-[#8E9AAF] bg-zinc-900/80 p-4">
                <h4 className="font-mono text-xs text-[#8E9AAF] uppercase tracking-wider font-bold">
                  Why I Built It
                </h4>
                <p className="font-sans text-sm text-[#F9F6F0] italic leading-relaxed">
                  "{selectedProject.whyBuilt}"
                </p>
              </div>
            )}

            {/* Footer Close */}
            <div className="pt-4 border-t border-zinc-800 flex justify-end">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2 font-mono text-xs text-[#FFFFFF] bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 transition-colors uppercase font-bold"
              >
                [ Close Overview ]
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
