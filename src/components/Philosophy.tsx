import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Zap, Hammer, CheckSquare, Sparkles } from 'lucide-react';

interface Phase {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
}

export default function Philosophy() {
  const [activePhase, setActivePhase] = useState<string>('01');

  const phases: Phase[] = [
    {
      id: '01',
      number: 'PHASE 01',
      title: 'Conceptual Synthesis',
      subtitle: 'Intent Extraction & Structural Definition',
      description: 'Translating abstract digital ambitions into highly structured parameters. Before a single line of code is produced, we extract absolute functional requirements, define boundaries, and specify structural schemas.',
      icon: <Sparkles className="h-5 w-5" />,
      tags: ['Biases Mapping', 'Core Objective Setup', 'Metadata Alignment']
    },
    {
      id: '02',
      number: 'PHASE 02',
      title: 'Architectural Blueprinting',
      subtitle: 'Type Boundaries & Protocol Isolation',
      description: 'Designing system schemas and defining strictly-typed contracts. We isolate type structures, database schemas, and state flows early to prevent downstream compile-time noise and runtime anomalies.',
      icon: <Layers className="h-5 w-5" />,
      tags: ['Strict Typing', 'Schema Design', 'Module Mapping']
    },
    {
      id: '03',
      number: 'PHASE 03',
      title: 'Orchestrated Generation',
      subtitle: 'Rapid Assembly & Structural Engineering',
      description: 'Rapid prototyping at high velocity. We act as structural architects, orchestrating robust code generation to produce modular libraries and visual blocks, instantly bridging the gap between design and running app.',
      icon: <Zap className="h-5 w-5" />,
      tags: ['Context Optimization', 'System Code Orchestration', 'Functional Compiling']
    },
    {
      id: '04',
      number: 'PHASE 04',
      title: 'Rigorous Optimization',
      subtitle: 'Polishing Typographic Hierarchy & Speed',
      description: 'Crafting the ultimate user experience. Fine-tuning responsive fluidity, optimizing system loading metrics, refining micro-interactions, and establishing absolute high-contrast typography.',
      icon: <Hammer className="h-5 w-5" />,
      tags: ['Typography Fine-Tuning', 'Micro-Interactions', 'Zero-Waste CSS']
    }
  ];

  return (
    <section id="philosophy" className="relative border-t border-zinc-800 bg-black px-6 py-24 md:px-12 lg:px-24 overflow-hidden">
      <div className="absolute top-[40%] right-[5%] h-72 w-72 rounded-full bg-zinc-900/10 blur-[100px]" />
      
      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
          <div className="md:col-span-4">
            <span className="font-mono text-xs text-zinc-500 uppercase tracking-[0.2em] block mb-2">
              03 — System Philosophy
            </span>
            <h2 className="font-sans text-3xl font-light tracking-tight text-white md:text-4xl">
              Iterative Engineering
            </h2>
          </div>
          <div className="md:col-span-8 flex items-end">
            <p className="font-sans text-sm text-zinc-400 font-light max-w-xl">
              A high-velocity building methodology. Instead of getting bogged down in boilerplate code syntax, we maintain focus on architectural integrity while directing powerful automation tooling to assemble polished platforms.
            </p>
          </div>
        </div>

        {/* Philosophy Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Text Block */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-sans text-2xl font-light tracking-tight text-white">
              Translating architectural intent into physical structure at speed.
            </h3>
            <p className="font-sans text-sm text-zinc-400 leading-relaxed font-light">
              Modern digital construction requires a fundamental shift in perspective. True efficiency isn't achieved by typing characters faster, but by elevating the developer's role to that of an editor and conductor.
            </p>
            <p className="font-sans text-sm text-zinc-400 leading-relaxed font-light">
              By setting high-level design tokens, rigorous type models, and logical flow constraints, we direct automated models to compose cohesive digital structures. This hybrid loop compresses product cycles from months to days.
            </p>

            <div className="pt-4">
              <div className="inline-flex items-center gap-3 rounded-none border border-zinc-800 bg-zinc-950/20 px-4 py-2 font-mono text-xs text-zinc-400">
                <CheckSquare className="h-4 w-4 text-white" />
                <span>Result: Clean code, immediate execution, zero waste.</span>
              </div>
            </div>
          </div>

          {/* Right Interactive Workflow Tracker */}
          <div className="lg:col-span-7 space-y-4">
            <div className="border-b border-zinc-800 pb-2 mb-6">
              <span className="font-mono text-xs text-zinc-500 uppercase tracking-[0.15em] block">
                Interactive Methodology Explorer
              </span>
            </div>

            <div className="space-y-3">
              {phases.map((phase) => {
                const isActive = activePhase === phase.id;
                return (
                  <div
                    key={phase.id}
                    onClick={() => setActivePhase(phase.id)}
                    className={`group cursor-pointer border rounded-none p-5 transition-all duration-300 ${
                      isActive 
                        ? 'border-white bg-zinc-950/40' 
                        : 'border-zinc-800 bg-zinc-950/10 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className={`font-mono text-xs font-semibold ${
                          isActive ? 'text-white' : 'text-zinc-500'
                        }`}>
                          {phase.number}
                        </span>
                        <h4 className="font-sans text-base font-medium text-white">
                          {phase.title}
                        </h4>
                      </div>
                      <div className={`p-1.5 rounded-none transition-colors ${
                        isActive ? 'bg-white text-black' : 'bg-zinc-900 text-zinc-500'
                      }`}>
                        {phase.icon}
                      </div>
                    </div>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                          transition={{ duration: 0.13, ease: 'easeOut' }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-zinc-800 pt-4 space-y-4">
                            <span className="font-mono text-xs text-zinc-400 font-semibold italic block">
                              {phase.subtitle}
                            </span>
                            <p className="font-sans text-xs text-zinc-400 leading-relaxed font-light">
                              {phase.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-2 pt-2">
                              {phase.tags.map((t) => (
                                <span 
                                  key={t}
                                  className="font-mono text-[9px] text-white border border-zinc-850 px-2 py-0.5 rounded-none uppercase tracking-wider bg-black"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
