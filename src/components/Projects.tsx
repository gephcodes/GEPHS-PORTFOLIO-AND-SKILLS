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
      description: 'A safe, completely anonymous app where teenagers can talk to each other and get real support without feeling judged.',
      detailedDescription: 'A safe, completely anonymous app where teenagers can talk to each other and get real support without feeling judged.',
      whyBuilt: 'Lost my grandad, friends ghosted me, girl rejected me—all in one year. Figured it out alone. Realized that sucks. Built it so nobody has to.',
      features: ['Completely anonymous peer support', 'Real-time community channels', 'Zero-judgment safe spaces'],
      link: 'https://solvry-repo.vercel.app'
    },
    {
      id: 'scentpreview',
      name: 'Scent Preview',
      tag: 'Brand',
      role: 'Creator',
      description: 'A high-end personal brand project that matches your vibe with unique, limited-edition fragrances for each season.',
      detailedDescription: 'A high-end personal brand project that matches your vibe with unique, limited-edition fragrances for each season.',
      features: ['Fragrance decanting curation (5-10ml bottles)', 'Seasonal limited-edition drops', 'Signature aesthetic & scent profile matching'],
      link: 'https://www.scentpreview.in'
    },
    {
      id: 'thermyx',
      name: 'THERMYX',
      tag: 'NASA ISAC 26',
      role: 'Creator',
      description: 'A smart live map that processes 20 years of NASA satellite data to track where dangerous wildfires are burning across the globe right now.',
      detailedDescription: 'A smart live map that processes 20 years of NASA satellite data to track where dangerous wildfires are burning across the globe right now.',
      features: [
        '20-year historical wildfire dataset visualization',
        'NASA MODIS & VIIRS satellite data integration',
        'Real-time active fire tracking & geospatial analytics'
      ],
      link: 'https://thermyx.vercel.app'
    },
    {
      id: 'kannvvas',
      name: 'kannvvas',
      tag: 'Agency',
      role: 'Founder',
      description: 'My personal freelance agency where I design and build lightning-fast websites and digital brands for clients.',
      detailedDescription: 'My personal freelance agency where I design and build lightning-fast websites and digital brands for clients.',
      features: [
        'End-to-end web product engineering & design',
        'Websites built for conversion & high performance',
        'Bespoke digital brand systems'
      ],
      link: 'https://kannvvas.vercel.app'
    },
    {
      id: 'mint',
      name: 'Mint',
      tag: 'Hackathon',
      role: 'Creator',
      description: 'offline vibecoding tool',
      detailedDescription: 'A code editor that works completely without internet, which I built in just one week to crush a programming competition.',
      features: ['Offline-first local compilation engine', 'Zero network latency syntax highlighting', 'Built in a week for competitive shipping'],
      link: 'https://wudaiyu6g4bggf08xyb4l21n.nativelyai.app'
    },
    {
      id: 'stupidsimple',
      name: 'StupidSimple.AI',
      tag: 'Live',
      role: 'Founder',
      description: 'study tool',
      detailedDescription: 'An AI tool that instantly turns confusing, complicated paragraphs into easy-to-read sentences.',
      features: ['Multi-level paragraph simplification', 'Instant LLM clarity engine', 'Zero fluff text refinement'],
      link: 'https://stupidsimple-ai-dashboard-385962461092.asia-southeast1.run.app/?mode=simplifier&lang=english&complexity=7&session=iwnp9c'
    },
    {
      id: 'goalhub',
      name: 'GoalHub',
      tag: 'Live',
      role: 'Founder',
      description: 'productivity tool',
      detailedDescription: 'A straightforward tracker designed to help you actually hit your goals instead of just writing them down.',
      features: ['Daily accountability milestones', 'Visual progression mechanics', 'Actionable goal completion pathways'],
      link: 'https://goalplan-ai-385962461092.asia-southeast1.run.app/'
    },
    {
      id: 'pulse',
      name: 'AI Pulse',
      tag: 'AI',
      role: 'Creator',
      description: 'mimic how people talk to you',
      detailedDescription: 'A fun AI chatbot that learns exactly how you talk so it can text just like you.',
      features: ['Adaptive tone & persona fine-tuning', 'Natural conversational cadence matching', 'Instant interactive playground'],
      link: 'https://ai.studio/apps/f2c5c6b3-6119-4f55-818a-14779f986139'
    },
    {
      id: 'vantage',
      name: 'AI Infra Summit Build',
      tag: 'Hackathon',
      role: 'Creator',
      description: 'understand the other persons texting mood',
      detailedDescription: 'A heavy-duty AI system I put together over a single weekend for a high-intensity tech competition.',
      features: ['High-throughput AI pipeline architecture', 'Ultra-fast inference under extreme time constraints', 'Production deployment in 48 hours'],
      link: 'https://vantage-pi-ivory.vercel.app'
    },
    {
      id: 'ibm-bob',
      name: 'IBM Bob 2.0 Build',
      tag: 'Hackathon',
      role: 'Creator',
      description: 'prompt enhancer',
      detailedDescription: 'A powerful software solution I coded under a tight deadline using IBM’s official tech tools.',
      features: ['Official IBM Cloud & Watson tooling integration', 'Rapid full-stack execution under pressure', 'Enterprise-grade architectural principles'],
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

        {/* 2-Column Grid on Mobile and Desktop */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 md:gap-8">
          {projects.map((proj, idx) => {
            const hasLink = !!proj.link;

            return (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 32, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
                onClick={() => handleCardClick(proj)}
                className="group relative flex flex-col justify-between overflow-hidden border border-zinc-800 bg-[#0A122C]/90 p-4 sm:p-6 md:p-8 rounded-sm shadow-md hover:shadow-2xl hover:border-[#8E9AAF] cursor-pointer"
                id={`project-card-${proj.id}`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-2 sm:mb-4 gap-2 flex-wrap">
                    <span className="font-mono text-[10px] sm:text-xs font-bold text-[#8E9AAF] uppercase tracking-wider">
                      {proj.role}
                    </span>
                    <span className="rounded-full border border-zinc-700 bg-zinc-900 px-2 py-0.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-[#F9F6F0] font-medium shrink-0">
                      {proj.tag}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="mb-3 sm:mb-4">
                    <h3 className="font-sans text-sm sm:text-lg md:text-xl font-bold tracking-tight text-[#FFFFFF] group-hover:text-[#F9F6F0] transition-colors flex items-center justify-between gap-1">
                      <span className="break-words">{proj.name}</span>
                      {hasLink ? (
                        <ArrowUpRight className="h-3.5 w-3.5 text-[#8E9AAF] group-hover:text-[#FFFFFF] transition-colors shrink-0" />
                      ) : (
                        <Sparkles className="h-3 w-3 text-[#8E9AAF] group-hover:rotate-12 transition-transform shrink-0" />
                      )}
                    </h3>
                    <p className="font-sans text-[11px] sm:text-xs text-[#8E9AAF] font-normal mt-1.5 leading-relaxed break-words">
                      {proj.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-2 sm:pt-3 border-t border-zinc-800 flex items-center justify-between mt-auto">
                  {hasLink ? (
                    <div className="flex items-center gap-1 font-mono text-[10px] sm:text-xs font-bold text-[#FFFFFF] group-hover:underline underline-offset-4 decoration-[#8E9AAF]">
                      <span>Launch Site</span>
                      <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  ) : (
                    <span className="font-mono text-[10px] sm:text-xs text-[#8E9AAF] font-medium">* Active Build</span>
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
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4">
              <p className="font-sans text-base text-[#F9F6F0] leading-relaxed">
                {selectedProject.detailedDescription}
              </p>

              {selectedProject.whyBuilt && (
                <div className="border-l-2 border-[#8E9AAF] bg-zinc-900/50 p-4 text-sm font-sans text-[#F9F6F0] italic">
                  <span className="font-mono text-xs text-[#8E9AAF] not-italic uppercase tracking-wider block mb-1 font-bold">
                    Why I Built It
                  </span>
                  "{selectedProject.whyBuilt}"
                </div>
              )}

              {selectedProject.features && selectedProject.features.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="font-mono text-xs text-[#8E9AAF] font-bold uppercase tracking-wider block">
                    Core Capabilities
                  </span>
                  <ul className="space-y-2 text-sm font-sans text-[#F9F6F0]">
                    {selectedProject.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <span className="text-[#8E9AAF] font-mono text-xs mt-1">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            {selectedProject.link && (
              <div className="border-t border-zinc-800 pt-4 flex justify-end">
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#FFFFFF] text-[#0A122C] px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#8E9AAF] transition-colors"
                >
                  <span>Open Project</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
