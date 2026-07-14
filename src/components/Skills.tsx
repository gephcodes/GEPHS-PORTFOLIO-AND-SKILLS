import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Code2, LineChart, Shield, Music, CheckCircle, ChevronDown, Check } from 'lucide-react';
import { SkillCategory } from '../types';

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState<{ name: string; details: string } | null>({
    name: 'Product Development',
    details: 'Guiding digital assets from abstract market hypotheses to finalized, functional web platforms.'
  });

  const categories: SkillCategory[] = [
    {
      title: 'Technical & Building',
      skills: [
        { name: 'Product Development', details: 'Guiding digital assets from abstract market hypotheses to finalized, functional web platforms.' },
        { name: 'Software Prototyping', details: 'Assembling responsive frontend layouts and modular API endpoints within tight iterative loops.' },
        { name: 'AI-Assisted Engineering', details: 'Mastery over high-velocity, orchestrator-led software assembly. Directly interfacing with artificial intelligence systems to construct robust full-stack software products in compressed cycles.' },
        { name: 'Digital Content Automation', details: 'Developing custom scripts and web-scrapers to automate repetitive media pipelines and data feeds.' },
        { name: 'User Experience (UX) Design', details: 'Crafting ultra-clean, high-contrast digital interfaces adhering to standard Swiss and Apple design rules.' },
        { name: 'Data Analysis', details: 'Using statistical models and quantitative structures to clean, process, and analyze complex datasets.' }
      ]
    },
    {
      title: 'Financial & Entrepreneurial',
      skills: [
        { name: 'Financial Literacy', details: 'Thorough comprehension of macroeconomics, interest rate spreads, asset valuations, and currency balances.' },
        { name: 'Market Research', details: 'Locating asymmetrical opportunities across digital content spaces and niche asset categories.' },
        { name: 'Entrepreneurship', details: 'Synthesizing scalable cashflow-producing models, managing small collaborative pods, and optimizing unit economics.' },
        { name: 'Strategic Planning', details: 'Organizing long-range roadmaps, setting quarterly objectives, and aligning operational effort with growth milestones.' },
        { name: 'Portfolio Management', details: 'Systematically managing proprietary financial assets with quantitative rules across multiple liquid pairs.' },
        { name: 'Risk Assessment', details: 'Managing risk using mathematics: calculating optimal trade sizing and strictly maintaining a maximum 1% risk threshold.' }
      ]
    },
    {
      title: 'Creative & Personal',
      skills: [
        { name: 'Piano Performance', details: 'Trinity College London certified. Developing high dexterity, rhythmic timing, structural focus, and auditory depth.' },
        { name: 'Personal Branding', details: 'Cultivating digital authority and clean styling to construct authentic, authoritative professional presence.' },
        { name: 'Curation & Aesthetics', details: 'Applying high-contrast themes, premium typographic hierarchy, and extreme whitespace guidelines.' },
        { name: 'Self-Directed Learning', details: 'Rapidly processing thick manuals, textbooks, and developer documentations without secondary instruction.' },
        { name: 'Project Management', details: 'Structuring project repositories, setting action checklists, and shipping features reliably under strict schedules.' },
        { name: 'Creative Discipline', details: 'Maintaining consistent focus and operational routines over years of independent digital creation.' }
      ]
    }
  ];

  return (
    <section id="skills" className="relative border-t border-zinc-800 bg-black px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
          <div className="md:col-span-4">
            <span className="font-mono text-xs text-zinc-500 uppercase tracking-[0.2em] block mb-2">
              04 — Skill Inventory
            </span>
            <h2 className="font-sans text-3xl font-light tracking-tight text-white md:text-4xl">
              Capabilities
            </h2>
          </div>
          <div className="md:col-span-8 flex items-end">
            <p className="font-sans text-sm text-zinc-400 font-light max-w-xl">
              An intersection of software building, capital optimization, and classical creative discipline. Click on any specific skill to inspect its practical application details.
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Interactive Categories list */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat, idx) => (
              <div 
                key={cat.title} 
                className="border border-zinc-800 rounded-none p-6 bg-zinc-950/20 space-y-6"
              >
                <div className="border-b border-zinc-850 pb-3">
                  <span className="font-mono text-[9px] text-zinc-500 uppercase block mb-1">
                    SET 0{idx + 1}
                  </span>
                  <h3 className="font-sans text-sm font-semibold text-white tracking-tight">
                    {cat.title}
                  </h3>
                </div>

                <div className="space-y-3">
                  {cat.skills.map((skill) => {
                    const isSelected = selectedSkill?.name === skill.name;
                    return (
                      <div key={skill.name} className="space-y-1">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedSkill({ name: skill.name, details: skill.details || '' });
                          }}
                          className={`w-full text-left flex items-center justify-between p-2.5 rounded-none transition-all text-xs font-sans ${
                            isSelected 
                              ? 'bg-white text-black font-semibold border-l-2 border-black pl-3' 
                              : 'text-zinc-400 hover:text-white hover:bg-zinc-900/40'
                          }`}
                        >
                          <span className="truncate">{skill.name}</span>
                          {isSelected && <Check className="h-3.5 w-3.5 ml-1 shrink-0 text-black" />}
                        </button>
                        <AnimatePresence initial={false}>
                          {isSelected && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.12, ease: 'easeOut' }}
                              className="overflow-hidden bg-zinc-900/30 border-l border-zinc-700 pl-3 pr-2 py-2 text-[11px] text-zinc-300 font-sans leading-relaxed space-y-2"
                            >
                              <div>{skill.details}</div>
                              {/* Inline badges specifically styled and loaded for mobile/tablet screen sizes (hidden on desktop lg views) */}
                              <div className="lg:hidden mt-2 pt-1">
                                {skill.name === 'Piano Performance' && (
                                  <div className="rounded-none border border-zinc-850 bg-black p-2.5 flex items-center gap-2">
                                    <Music className="h-4 w-4 text-white shrink-0 animate-pulse" />
                                    <div className="font-mono text-[9px] leading-tight text-left">
                                      <span className="text-white font-semibold uppercase block">TCL Certified Practitioner</span>
                                      <span className="text-zinc-500">Graded performance, scale structures & auditory reading.</span>
                                    </div>
                                  </div>
                                )}
                                {skill.name === 'AI-Assisted Engineering' && (
                                  <div className="rounded-none border border-zinc-850 bg-black p-2.5 flex items-center gap-2">
                                    <Code2 className="h-4 w-4 text-white shrink-0" />
                                    <div className="font-mono text-[9px] leading-tight text-left">
                                      <span className="text-white font-semibold uppercase block">System Assembly velocity</span>
                                      <span className="text-zinc-500">Orchestrating multi-agent chains and strict type schemas.</span>
                                    </div>
                                  </div>
                                )}
                                {skill.name === 'Risk Assessment' && (
                                  <div className="rounded-none border border-zinc-850 bg-black p-2.5 flex items-center gap-2">
                                    <Shield className="h-4 w-4 text-white shrink-0" />
                                    <div className="font-mono text-[9px] leading-tight text-left">
                                      <span className="text-white font-semibold uppercase block">Mathematical Guardrail</span>
                                      <span className="text-zinc-500">Strict max 1% capital allocation. Fully mechanical parameters.</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Dynamic Insight Inspector */}
          <div className="lg:col-span-4 sticky top-24 hidden lg:block" id="skill-inspector-box">
            <div className="border border-zinc-800 rounded-none p-6 bg-zinc-950/40 flex flex-col justify-between min-h-[300px]">
              <div>
                <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block mb-1">
                  Skill Inspector
                </span>
                <h3 className="font-sans text-xl font-medium text-white border-b border-zinc-850 pb-4">
                  Asset Detail View
                </h3>

                <AnimatePresence mode="wait">
                  {selectedSkill ? (
                    <motion.div
                      key={selectedSkill.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.12 }}
                      className="mt-6 space-y-4"
                    >
                      <h4 className="font-mono text-xs font-bold uppercase text-white tracking-wider flex items-center gap-2">
                        {selectedSkill.name === 'Piano Performance' && <Music className="h-4 w-4 text-zinc-400" />}
                        {selectedSkill.name === 'AI-Assisted Engineering' && <Code2 className="h-4 w-4 text-zinc-400" />}
                        {selectedSkill.name.includes('Portfolio') && <LineChart className="h-4 w-4 text-zinc-400" />}
                        {selectedSkill.name.includes('Risk') && <Shield className="h-4 w-4 text-zinc-400" />}
                        {!['Piano Performance', 'AI-Assisted Engineering'].includes(selectedSkill.name) && !selectedSkill.name.includes('Portfolio') && !selectedSkill.name.includes('Risk') && (
                          <Award className="h-4 w-4 text-zinc-400" />
                        )}
                        <span>{selectedSkill.name}</span>
                      </h4>
                      <p className="font-sans text-xs text-zinc-400 leading-relaxed font-light">
                        {selectedSkill.details}
                      </p>

                      {/* Special extra badges depending on specific clicked skill to demonstrate maximum craftsmanship */}
                      {selectedSkill.name === 'Piano Performance' && (
                        <div className="rounded-none border border-zinc-850 bg-black p-3 flex items-center gap-3 mt-4">
                          <Music className="h-5 w-5 text-white animate-pulse" />
                          <div className="font-mono text-[10px]">
                            <span className="text-white font-semibold uppercase block">TCL Certified Practitioner</span>
                            <span className="text-zinc-500">Graded performance, scale structures & auditory reading.</span>
                          </div>
                        </div>
                      )}

                      {selectedSkill.name === 'AI-Assisted Engineering' && (
                        <div className="rounded-none border border-zinc-850 bg-black p-3 flex items-center gap-3 mt-4">
                          <Code2 className="h-5 w-5 text-white" />
                          <div className="font-mono text-[10px]">
                            <span className="text-white font-semibold uppercase block">System Assembly velocity</span>
                            <span className="text-zinc-500">Orchestrating multi-agent chains and strict type schemas.</span>
                          </div>
                        </div>
                      )}

                      {selectedSkill.name === 'Risk Assessment' && (
                        <div className="rounded-none border border-zinc-850 bg-black p-3 flex items-center gap-3 mt-4">
                          <Shield className="h-5 w-5 text-white" />
                          <div className="font-mono text-[10px]">
                            <span className="text-white font-semibold uppercase block">Mathematical Guardrail</span>
                            <span className="text-zinc-500">Strict max 1% capital allocation. Fully mechanical parameters.</span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <div className="mt-12 text-center text-xs font-mono text-zinc-500">
                      Select a specific capability to review deployment records.
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {selectedSkill && (
                <div className="border-t border-zinc-850 pt-4 mt-6 text-[10px] font-mono text-zinc-500 flex items-center gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-white shrink-0" />
                  <span>Verified asset of Gephel Chingtham portfolio.</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tech Stack & Infrastructure */}
        <div className="mt-20 border-t border-zinc-800 pt-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-[0.2em] block mb-1">
                05 — Core Infrastructure
              </span>
              <h3 className="font-sans text-sm font-semibold text-white tracking-tight">
                Tech Stack & Infrastructure
              </h3>
            </div>
            
            {/* Horizontal Text-Only Badges */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs text-zinc-400">
              <span className="hover:text-white transition-colors duration-300 cursor-default">React</span>
              <span className="text-zinc-800">/</span>
              <span className="hover:text-white transition-colors duration-300 cursor-default">Next.js</span>
              <span className="text-zinc-800">/</span>
              <span className="hover:text-white transition-colors duration-300 cursor-default">Tailwind CSS</span>
              <span className="text-zinc-800">/</span>
              <span className="hover:text-white transition-colors duration-300 cursor-default">TypeScript</span>
              <span className="text-zinc-800">/</span>
              <span className="hover:text-white transition-colors duration-300 cursor-default">Node.js</span>
              <span className="text-zinc-800">/</span>
              <span className="hover:text-white transition-colors duration-300 cursor-default text-white font-medium">AI-driven development tools</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
