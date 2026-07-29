import React, { useState } from 'react';
import { ArrowUpRight, Clock, ShieldCheck, Heart, Sparkles, X, FolderOpen, Layers } from 'lucide-react';
import { Project } from '../types';
import Folder from './Folder';
import ShapeGrid from './ShapeGrid';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 'solvry',
      name: 'Solvry',
      tag: 'Building Phase',
      role: 'Founder / CEO',
      description: 'Anonymous peer support app for teens 13-19. You post anonymously and connect safely with peers going through the same thing.',
      detailedDescription: 'Built out of personal loss to combat teen isolation. Solvry gives teens facing grief, academic stress, rejection, or family struggles a safe, moderated space to post and connect.',
      whyBuilt: 'Lost my grandad, dog died, friends ghosted me, girl rejected me—all in one year. Processed alone. Realized peers heal isolation better than anything else. Built Solvry so no teen feels that way.',
      features: [
        'Post anonymously with a tag (grief, academic stress, rejection, family issues)',
        'Connect safely with peers sharing similar experiences',
        'Talk & heal; crisis keywords auto-display helplines',
        'Safe architecture: no DMs, daily moderation, toxic content blocked'
      ],
      estimatedCompletion: 'December 30th'
    },
    {
      id: 'stupidsimple',
      name: 'StupidSimple.AI',
      tag: 'Live',
      role: 'Founder / CEO',
      description: 'Text simplification, powered by AI. Condensing complex text into clear, direct prose instantly.',
      detailedDescription: 'An AI-driven platform focused on distilling complex information into actionable, easy-to-understand insights to improve personal productivity.',
      features: ['Instant cognitive parsing', 'Context-aware prose reduction', 'Structured bullet summaries', 'Zero-latency execution layout'],
      link: 'https://stupidsimple-ai-dashboard-385962461092.asia-southeast1.run.app/?mode=simplifier&lang=english&complexity=7&session=iwnp9c'
    },
    {
      id: 'goalhub',
      name: 'GoalHub',
      tag: 'Live',
      role: 'Founder / CEO',
      description: 'Goal structuring and progress tracking made effortless. Designed for builders who ship.',
      detailedDescription: 'A centralized dashboard system for tracking personal development, setting structured milestones, and managing long-term entrepreneurship objectives.',
      features: ['Hierarchical milestone decomposition', 'Dynamic progression tracking analytics', 'Atomic system builders', 'Interactive accountability reviews'],
      link: 'https://goalplan-ai-385962461092.asia-southeast1.run.app/'
    },
    {
      id: 'scentpreview',
      name: 'Scent Preview',
      tag: 'Curated',
      role: 'Founder / CEO',
      description: 'A curated approach to fragrance collecting, focusing on selecting high-end scents based on seasonal versatility, social context, and personal branding.',
      detailedDescription: 'Eliminating trial-and-error from olfactory styling. Scent Preview applies seasonal filters, dress-code tags, and branding formulas to assemble hyper-curated, elite fragrance portfolios.',
      features: ['Olfactory branding guidelines', 'Seasonal humidity calculators', 'Contextual dress-code recommendations', 'Private collection management metrics'],
      link: 'https://scentpreview.onrender.com/'
    },
    {
      id: 'pulse',
      name: 'Pulse',
      tag: 'For Fun',
      role: 'For Fun',
      description: 'Generate a LLM to talk to you like how the person would talk to you',
      detailedDescription: 'An interactive experiment designed to synthesize conversational personas. Generate a custom LLM that speaks with the distinct vocabulary, cadence, and nuance of any target person.',
      features: ['Persona voice profiling', 'Conversational tone matching', 'Interactive response synthesis', 'Custom context alignment'],
      link: 'https://pulseapp-fptp.onrender.com/?fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGn_HLnIq1BtmdSwxEL72tFpVu5AjBpIIXmVja2V6McIIjsCzg0fjVqy7_Yu1k_aem_WqGPbmgZ5eM--4sOT2uqvw'
    }
  ];

  const folderItems = [
    <div key="p1" className="p-2 h-full flex flex-col items-center justify-center text-center font-sans bg-white text-zinc-900 border border-zinc-200 shadow-sm">
      <span className="font-mono text-[8px] text-zinc-400 font-semibold uppercase tracking-widest mb-0.5">01</span>
      <h4 className="font-bold text-[12px] text-zinc-900 tracking-tight leading-none">Solvry</h4>
    </div>,
    <div key="p2" className="p-2 h-full flex flex-col items-center justify-center text-center font-sans bg-zinc-50 text-zinc-900 border border-zinc-200 shadow-sm">
      <span className="font-mono text-[8px] text-zinc-400 font-semibold uppercase tracking-widest mb-0.5">02</span>
      <h4 className="font-bold text-[11px] text-zinc-900 tracking-tight leading-none">StupidSimple.AI</h4>
    </div>,
    <div key="p3" className="p-2 h-full flex flex-col items-center justify-center text-center font-sans bg-white text-zinc-900 border border-zinc-200 shadow-sm">
      <span className="font-mono text-[8px] text-zinc-400 font-semibold uppercase tracking-widest mb-0.5">03</span>
      <h4 className="font-bold text-[12px] text-zinc-900 tracking-tight leading-none">GoalHub</h4>
    </div>,
    <div key="p4" className="p-2 h-full flex flex-col items-center justify-center text-center font-sans bg-zinc-50 text-zinc-900 border border-zinc-200 shadow-sm">
      <span className="font-mono text-[8px] text-zinc-400 font-semibold uppercase tracking-widest mb-0.5">04</span>
      <h4 className="font-bold text-[11px] text-zinc-900 tracking-tight leading-none">Scent Preview</h4>
    </div>,
    <div key="p5" className="p-2 h-full flex flex-col items-center justify-center text-center font-sans bg-white text-zinc-900 border border-zinc-200 shadow-sm">
      <span className="font-mono text-[8px] text-zinc-400 font-semibold uppercase tracking-widest mb-0.5">05</span>
      <h4 className="font-bold text-[12px] text-zinc-900 tracking-tight leading-none">Pulse</h4>
    </div>
  ];

  const handleCardClick = (proj: Project) => {
    if (proj.link) {
      window.open(proj.link, '_blank');
    } else {
      setSelectedProject(proj);
    }
  };

  return (
    <section id="projects" className="relative overflow-hidden border-t border-zinc-800 bg-black px-6 py-24 md:px-12 lg:px-24">
      {/* Background ShapeGrid Component */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <ShapeGrid
          speed={1.2}
          squareSize={45}
          direction="diagonal"
          borderColor="#31adb8"
          hoverFillColor="#1e293b"
          shape="square"
          hoverTrailAmount={5}
          className="w-full h-full opacity-60"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
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

        {/* Interactive Vault Folder Feature Banner */}
        <div className="mb-12 border border-zinc-200 bg-white/95 backdrop-blur-md p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-8 text-zinc-900 shadow-xl rounded-sm">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 border border-zinc-300 bg-zinc-100 px-3 py-1 font-mono text-[10px] uppercase text-zinc-700 tracking-wider font-semibold">
              <FolderOpen className="h-3.5 w-3.5 text-emerald-600" />
              <span>Interactive Asset Vault</span>
            </div>
            <h3 className="font-sans text-xl font-medium text-zinc-900 tracking-tight">
              Click the folder to unfold active project files
            </h3>
            <p className="font-sans text-xs text-zinc-600 font-normal leading-relaxed">
              Explore live deployment blueprints and structural drafts directly from the interactive repository folder.
            </p>
          </div>

          <div className="flex items-center justify-center min-h-[140px] px-8 py-4">
            <Folder
              color="#e4e4e7"
              size={1.3}
              items={folderItems}
              onSelectPaper={(index) => {
                if (projects[index]) {
                  handleCardClick(projects[index]);
                }
              }}
            />
          </div>
        </div>

        {/* 2x2 Grid of Projects - Light White Theme */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj) => {
            const hasLink = !!proj.link;
            const isBuilding = proj.tag === 'Building Phase';

            return (
              <div
                key={proj.id}
                onClick={() => handleCardClick(proj)}
                className={`group relative flex flex-col justify-between overflow-hidden border p-6 sm:p-8 transition-all duration-300 rounded-sm shadow-md hover:shadow-2xl hover:-translate-y-1 ${
                  isBuilding
                    ? 'border-amber-300 bg-gradient-to-b from-amber-50/95 to-white text-zinc-900 hover:border-amber-400 cursor-pointer'
                    : hasLink
                    ? 'border-zinc-200 bg-white text-zinc-900 hover:border-zinc-400 hover:bg-zinc-50 cursor-pointer'
                    : 'border-zinc-200 bg-zinc-50 text-zinc-900 cursor-default'
                }`}
                id={`project-card-${proj.id}`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold text-zinc-500 uppercase tracking-wider">
                      {proj.role}
                    </span>
                    <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
                      isBuilding
                        ? 'border-amber-400 bg-amber-100 text-amber-900 font-semibold'
                        : 'border-zinc-300 bg-zinc-100 text-zinc-800 font-medium'
                    }`}>
                      {proj.tag}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="mb-6">
                    <h3 className="font-sans text-2xl font-bold tracking-tight text-zinc-900 group-hover:text-black transition-colors flex items-center gap-2">
                      {proj.name}
                      {hasLink ? (
                        <ArrowUpRight className="h-5 w-5 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                      ) : (
                        <Sparkles className="h-4 w-4 text-amber-500 group-hover:rotate-12 transition-transform" />
                      )}
                    </h3>
                    <p className="font-sans text-sm text-zinc-600 font-normal mt-3 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  {/* Why I Built It Callout (if present) */}
                  {proj.whyBuilt && (
                    <div className="mb-6 border-l-2 border-amber-500 bg-amber-50/90 p-3.5 text-xs font-sans text-zinc-800 italic leading-relaxed border-zinc-200">
                      <span className="font-mono text-[10px] text-amber-800 not-italic uppercase tracking-wider block mb-1 font-bold">
                        ★ Why I Built It
                      </span>
                      "{proj.whyBuilt}"
                    </div>
                  )}

                  {/* Features / How it works preview */}
                  {proj.features && proj.features.length > 0 && (
                    <div className="mb-6 space-y-2">
                      <span className="font-mono text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">
                        Core Capabilities
                      </span>
                      <ul className="space-y-1.5 text-xs font-sans text-zinc-700 font-medium">
                        {proj.features.slice(0, 3).map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-zinc-400 font-mono text-[10px] mt-0.5">•</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-4 border-t border-zinc-200 flex items-center justify-between">
                  {hasLink ? (
                    <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-zinc-900 group-hover:underline underline-offset-4 decoration-zinc-400">
                      <span>Launch Site</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  ) : isBuilding ? (
                    <div className="w-full flex items-center justify-between font-mono text-xs">
                      <span className="text-amber-800 flex items-center gap-1.5 text-[11px] font-bold">
                        <Clock className="h-3.5 w-3.5 animate-pulse text-amber-600" />
                        Est. Finish: {proj.estimatedCompletion || 'Dec 30th'}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(proj);
                        }}
                        className="text-[10px] text-zinc-800 hover:text-black font-semibold uppercase tracking-wider border border-amber-300 bg-amber-100 px-2.5 py-1 hover:bg-amber-200 transition-colors"
                      >
                        Read Details
                      </button>
                    </div>
                  ) : (
                    <span className="font-mono text-xs text-zinc-400 font-medium">* Active Build</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal for Projects */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="relative w-full max-w-2xl border border-zinc-200 bg-white p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto text-zinc-900 rounded-sm">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-zinc-200 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs text-amber-900 uppercase tracking-wider border border-amber-300 bg-amber-100 px-2 py-0.5 font-bold">
                    {selectedProject.tag}
                  </span>
                  <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider font-bold">
                    {selectedProject.role}
                  </span>
                </div>
                <h3 className="font-sans text-3xl font-bold text-zinc-900">{selectedProject.name}</h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-zinc-400 hover:text-zinc-900 transition-colors p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Completion Banner */}
            {selectedProject.estimatedCompletion && (
              <div className="flex items-center justify-between border border-amber-300 bg-amber-50 p-3 font-mono text-xs text-amber-900">
                <span className="flex items-center gap-2 font-semibold">
                  <Clock className="h-4 w-4 text-amber-600 animate-pulse" />
                  Building Phase Active
                </span>
                <span className="font-bold text-zinc-900">Estimated Finish: {selectedProject.estimatedCompletion}</span>
              </div>
            )}

            {/* What is it */}
            <div className="space-y-2">
              <h4 className="font-mono text-xs text-zinc-500 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" /> What is {selectedProject.name}?
              </h4>
              <p className="font-sans text-sm text-zinc-700 leading-relaxed font-normal">
                {selectedProject.description}
              </p>
            </div>

            {/* Why I Built It */}
            {selectedProject.whyBuilt && (
              <div className="space-y-2 border-l-2 border-amber-500 bg-amber-50/80 p-4 border-zinc-200">
                <h4 className="font-mono text-xs text-amber-900 uppercase tracking-wider font-bold">
                  Why I Built It
                </h4>
                <p className="font-sans text-sm text-zinc-800 italic leading-relaxed">
                  "{selectedProject.whyBuilt}"
                </p>
              </div>
            )}

            {/* How It Works / Key Features */}
            {selectedProject.features && (
              <div className="space-y-3">
                <h4 className="font-mono text-xs text-zinc-500 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> How It Works & Architecture
                </h4>
                <ul className="space-y-2 font-sans text-xs text-zinc-800 font-medium">
                  {selectedProject.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-zinc-50 p-2.5 border border-zinc-200">
                      <span className="font-mono text-amber-700 text-xs font-bold mt-0.5">0{idx + 1}.</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Footer Close */}
            <div className="pt-4 border-t border-zinc-200 flex justify-end">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2 font-mono text-xs text-zinc-900 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 transition-colors uppercase font-bold"
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
