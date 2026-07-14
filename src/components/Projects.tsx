import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

export default function Projects() {
  const projects: Project[] = [
    {
      id: 'stupidsimple',
      name: 'StupidSimple.AI',
      tag: 'Live',
      role: 'CEO',
      description: 'Text simplification, powered by AI. Condensing complex text into clear, direct prose instantly.',
      detailedDescription: 'An AI-driven platform focused on distilling complex information into actionable, easy-to-understand insights to improve personal productivity.',
      features: ['Instant cognitive parsing', 'Context-aware prose reduction', 'Structured bullet summaries', 'Zero-latency execution layout'],
      link: 'https://stupidsimple-ai-dashboard-385962461092.asia-southeast1.run.app/?mode=simplifier&lang=english&complexity=7&session=iwnp9c'
    },
    {
      id: 'goalhub',
      name: 'GoalHub',
      tag: 'Live',
      role: 'CEO',
      description: 'Goal structuring and progress tracking made effortless. Designed for builders who ship.',
      detailedDescription: 'A centralized dashboard system for tracking personal development, setting structured milestones, and managing long-term entrepreneurship objectives.',
      features: ['Hierarchical milestone decomposition', 'Dynamic progression tracking analytics', 'Atomic system builders', 'Interactive accountability reviews'],
      link: 'https://goalplan-ai-385962461092.asia-southeast1.run.app/'
    },

    {
      id: 'scentpreview',
      name: 'Scent Preview',
      tag: 'Curated',
      role: 'CEO',
      description: 'A curated approach to fragrance collecting, focusing on selecting high-end scents based on seasonal versatility, social context, and personal branding.',
      detailedDescription: 'Eliminating trial-and-error from olfactory styling. Scent Preview applies seasonal filters, dress-code tags, and branding formulas to assemble hyper-curated, elite fragrance portfolios.',
      features: ['Olfactory branding guidelines', 'Seasonal humidity calculators', 'Contextual dress-code recommendations', 'Private collection management metrics'],
      link: 'https://scentpreview.onrender.com/'
    }
  ];

  const handleProjectClick = (proj: Project) => {
    if (proj.link) {
      window.open(proj.link, '_blank');
    }
  };

  return (
    <section id="projects" className="relative border-t border-zinc-800 bg-black px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        {/* Header Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
          <div className="md:col-span-4">
            <span className="font-mono text-xs text-zinc-500 uppercase tracking-[0.2em] block mb-2">
              01 — Projects & Digital Assets
            </span>
            <h2 className="font-sans text-3xl font-light tracking-tight text-white md:text-4xl">
              Active Products
            </h2>
          </div>
          <div className="md:col-span-8 flex items-end">
            <p className="font-sans text-sm text-zinc-400 font-light max-w-xl">
              Deploying functional products and proprietary platforms. Translating structural challenges into high-contrast interfaces, with a steady focus on speed and aesthetic consistency.
            </p>
          </div>
        </div>

        {/* 2x2 Grid of Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj) => {
            const hasLink = !!proj.link;
            return (
              <div
                key={proj.id}
                onClick={() => handleProjectClick(proj)}
                className={`group relative overflow-hidden border border-zinc-800 bg-zinc-950/20 p-6 sm:p-8 transition-all rounded-none ${
                  hasLink 
                    ? 'cursor-pointer hover:border-zinc-700 hover:bg-zinc-950/60' 
                    : 'cursor-default opacity-80'
                }`}
                id={`project-card-${proj.id}`}
              >
                {/* Card Header */}
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    {proj.role}
                  </span>
                  <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
                    proj.tag === 'Active Build'
                      ? 'border-zinc-800 text-zinc-400'
                      : 'border-white text-white'
                  }`}>
                    {proj.tag}
                  </span>
                </div>

                {/* Card Body */}
                <div className="mb-8">
                  <h3 className="font-sans text-2xl font-light tracking-tight text-white group-hover:text-white transition-colors flex items-center gap-2">
                    {proj.name}
                    {hasLink && (
                      <ArrowUpRight className="h-4 w-4 text-zinc-500 group-hover:text-white transition-colors" />
                    )}
                  </h3>
                  <p className="font-sans text-sm text-zinc-400 font-light mt-3 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                {/* Card Action Link Indicator */}
                <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-white group-hover:underline underline-offset-4 decoration-zinc-500">
                  {hasLink ? (
                    <>
                      <span>Launch Site</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  ) : (
                    <span className="text-zinc-500">* Active Build (Development Offline)</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
