import React, { useState } from 'react';
import { ArrowUpRight, Clock, ShieldCheck, Heart, Sparkles, X, FolderOpen, Layers } from 'lucide-react';
import { Project } from '../types';
import Folder from './Folder';

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
      link: 'https://solvry.onrender.com'
    },
    {
      id: 'mint',
      name: 'Mint',
      tag: 'Tool',
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
      link: 'https://pulseapp-fptp.onrender.com/?fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGn_HLnIq1BtmdSwxEL72tFpVu5AjBpIIXmVja2V6McIIjsCzg0fjVqy7_Yu1k_aem_WqGPbmgZ5eM--4sOT2uqvw'
    }
  ];

  const folderItems = [
    <div key="p1" className="p-2 h-full flex flex-col items-center justify-center text-center font-sans bg-[#FDFBF7] text-black border border-zinc-200 shadow-sm">
      <h4 className="font-bold text-[12px] text-black tracking-tight leading-none">Solvry</h4>
    </div>,
    <div key="pmint" className="p-2 h-full flex flex-col items-center justify-center text-center font-sans bg-[#FDFBF7]/80 text-black border border-zinc-200 shadow-sm">
      <h4 className="font-bold text-[12px] text-black tracking-tight leading-none">Mint</h4>
    </div>,
    <div key="p2" className="p-2 h-full flex flex-col items-center justify-center text-center font-sans bg-[#FDFBF7] text-black border border-zinc-200 shadow-sm">
      <h4 className="font-bold text-[11px] text-black tracking-tight leading-none">StupidSimple.AI</h4>
    </div>,
    <div key="p3" className="p-2 h-full flex flex-col items-center justify-center text-center font-sans bg-[#FDFBF7]/80 text-black border border-zinc-200 shadow-sm">
      <h4 className="font-bold text-[12px] text-black tracking-tight leading-none">GoalHub</h4>
    </div>,
    <div key="p4" className="p-2 h-full flex flex-col items-center justify-center text-center font-sans bg-[#FDFBF7] text-black border border-zinc-200 shadow-sm">
      <h4 className="font-bold text-[11px] text-black tracking-tight leading-none">Scent Preview</h4>
    </div>,
    <div key="p5" className="p-2 h-full flex flex-col items-center justify-center text-center font-sans bg-[#FDFBF7]/80 text-black border border-zinc-200 shadow-sm">
      <h4 className="font-bold text-[12px] text-black tracking-tight leading-none">Pulse</h4>
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
    <section id="projects" className="relative overflow-hidden border-t border-zinc-200 bg-transparent px-6 py-24 md:px-12 lg:px-24">
      <div className="absolute inset-0 pointer-events-none z-0">
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-4">
            <span className="font-mono text-xs text-white uppercase tracking-[0.2em] block mb-2 font-bold [text-shadow:0_4px_20px_rgba(0,0,0,1),0_0_40px_rgba(0,0,0,0.8)]">
              Projects & Digital Assets
            </span>
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-white md:text-4xl [text-shadow:0_4px_20px_rgba(0,0,0,1),0_0_40px_rgba(0,0,0,0.8)]">
              Active Products
            </h2>
          </div>
          <div className="md:col-span-8 flex items-end">
            <p className="font-sans text-sm text-black font-light max-w-xl">
              Deploying functional products and proprietary platforms. Translating structural challenges into high-contrast interfaces, with a steady focus on speed and aesthetic consistency.
            </p>
          </div>
        </div>

        {/* Interactive Vault Folder Feature Banner */}
        <div className="mb-12 border border-zinc-200 bg-[#FDFBF7]/90 backdrop-blur-md p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-8 text-black shadow-xl rounded-sm">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 border border-zinc-300 bg-[#FDFBF7]/80 px-3 py-1 font-mono text-[10px] uppercase text-black tracking-wider font-semibold">
              <FolderOpen className="h-3.5 w-3.5 text-black" />
              <span>Interactive Asset Vault</span>
            </div>
            <h3 className="font-sans text-xl font-medium text-black tracking-tight">
              Click the folder to unfold active project files
            </h3>
            <p className="font-sans text-xs text-black font-normal leading-relaxed">
              Explore live deployment blueprints and structural drafts directly from the interactive repository folder.
            </p>
          </div>

          <div className="flex items-center justify-center min-h-[320px] w-full lg:w-1/2 px-2 sm:px-4 py-10 overflow-visible">
            <Folder
              color="#e4e4e7"
              className="transform scale-75 sm:scale-90 lg:scale-100"
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
            const isBuilding = proj.tag.toLowerCase().includes('building');

            return (
              <div
                key={proj.id}
                onClick={() => handleCardClick(proj)}
                className={`group relative flex flex-col justify-between overflow-hidden border p-6 sm:p-8 transition-all duration-300 rounded-sm shadow-md hover:shadow-2xl hover:-translate-y-1 ${
                  isBuilding
                    ? 'border-amber-300 bg-gradient-to-b from-amber-50/95 to-white text-black hover:border-amber-400 cursor-pointer'
                    : hasLink
                    ? 'border-zinc-200 bg-[#FDFBF7] text-black hover:border-zinc-400 hover:bg-[#FDFBF7]/80 cursor-pointer'
                    : 'border-zinc-200 bg-[#FDFBF7]/80 text-black cursor-default'
                }`}
                id={`project-card-${proj.id}`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold text-black uppercase tracking-wider">
                      {proj.role}
                    </span>
                    <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
                      isBuilding
                        ? 'border-amber-400 bg-amber-100 text-black font-semibold'
                        : 'border-zinc-300 bg-[#FDFBF7]/80 text-black font-medium'
                    }`}>
                      {proj.tag}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="mb-6">
                    <h3 className="font-sans text-2xl font-bold tracking-tight text-black group-hover:text-black transition-colors flex items-center gap-2">
                      {proj.name}
                      {hasLink ? (
                        <ArrowUpRight className="h-5 w-5 text-black group-hover:text-black transition-colors" />
                      ) : (
                        <Sparkles className="h-4 w-4 text-black group-hover:rotate-12 transition-transform" />
                      )}
                    </h3>
                    <p className="font-sans text-sm text-black font-normal mt-3 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  {/* Why I Built It Callout (if present) */}
                  {proj.whyBuilt && (
                    <div className="mb-6 border-l-2 border-amber-500 bg-amber-50/90 p-3.5 text-xs font-sans text-black italic leading-relaxed border-zinc-200">
                      <span className="font-mono text-[10px] text-black not-italic uppercase tracking-wider block mb-1 font-bold">
                        ★ Why I Built It
                      </span>
                      "{proj.whyBuilt}"
                    </div>
                  )}

                  {/* Features / How it works preview */}
                  {proj.features && proj.features.length > 0 && (
                    <div className="mb-6 space-y-2">
                      <span className="font-mono text-[10px] text-black font-bold uppercase tracking-wider block">
                        Core Capabilities
                      </span>
                      <ul className="space-y-1.5 text-xs font-sans text-black font-medium">
                        {proj.features.slice(0, 3).map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-black font-mono text-[10px] mt-0.5">•</span>
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
                    <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-black group-hover:underline underline-offset-4 decoration-zinc-400">
                      <span>Launch Site</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  ) : isBuilding ? (
                    <div className="w-full flex items-center justify-between font-mono text-xs">
                      <span className="text-black flex items-center gap-1.5 text-[11px] font-bold">
                        <Clock className="h-3.5 w-3.5 animate-pulse text-black" />
                        Est. Finish: {proj.estimatedCompletion || 'Dec 30th'}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(proj);
                        }}
                        className="text-[10px] text-black hover:text-black font-semibold uppercase tracking-wider border border-amber-300 bg-amber-100 px-2.5 py-1 hover:bg-amber-200 transition-colors"
                      >
                        Read Details
                      </button>
                    </div>
                  ) : (
                    <span className="font-mono text-xs text-black font-medium">* Active Build</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal for Projects */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent/70 backdrop-blur-md">
          <div className="relative w-full max-w-2xl border border-zinc-200 bg-[#FDFBF7] p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto text-black rounded-sm">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-zinc-200 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs text-black uppercase tracking-wider border border-amber-300 bg-amber-100 px-2 py-0.5 font-bold">
                    {selectedProject.tag}
                  </span>
                  <span className="font-mono text-xs text-black uppercase tracking-wider font-bold">
                    {selectedProject.role}
                  </span>
                </div>
                <h3 className="font-sans text-3xl font-bold text-black">{selectedProject.name}</h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-black hover:text-black transition-colors p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Completion Banner */}
            {selectedProject.estimatedCompletion && (
              <div className="flex items-center justify-between border border-amber-300 bg-amber-50 p-3 font-mono text-xs text-black">
                <span className="flex items-center gap-2 font-semibold">
                  <Clock className="h-4 w-4 text-black animate-pulse" />
                  Building Phase Active
                </span>
                <span className="font-bold text-black">Estimated Finish: {selectedProject.estimatedCompletion}</span>
              </div>
            )}

            {/* What is it */}
            <div className="space-y-2">
              <h4 className="font-mono text-xs text-black uppercase tracking-wider flex items-center gap-1.5 font-bold">
                <Sparkles className="h-3.5 w-3.5 text-black" /> What is {selectedProject.name}?
              </h4>
              <p className="font-sans text-sm text-black leading-relaxed font-normal">
                {selectedProject.description}
              </p>
            </div>

            {/* Why I Built It */}
            {selectedProject.whyBuilt && (
              <div className="space-y-2 border-l-2 border-amber-500 bg-amber-50/80 p-4 border-zinc-200">
                <h4 className="font-mono text-xs text-black uppercase tracking-wider font-bold">
                  Why I Built It
                </h4>
                <p className="font-sans text-sm text-black italic leading-relaxed">
                  "{selectedProject.whyBuilt}"
                </p>
              </div>
            )}

            {/* How It Works / Key Features */}
            {selectedProject.features && (
              <div className="space-y-3">
                <h4 className="font-mono text-xs text-black uppercase tracking-wider flex items-center gap-1.5 font-bold">
                  <ShieldCheck className="h-3.5 w-3.5 text-black" /> How It Works & Architecture
                </h4>
                <ul className="space-y-2 font-sans text-xs text-black font-medium">
                  {selectedProject.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-[#FDFBF7]/80 p-2.5 border border-zinc-200">
                      
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
                className="px-5 py-2 font-mono text-xs text-black bg-[#FDFBF7]/80 hover:bg-zinc-200 border border-zinc-300 transition-colors uppercase font-bold"
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
