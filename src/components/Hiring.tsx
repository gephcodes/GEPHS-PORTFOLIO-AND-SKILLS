import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export default function Hiring() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hiringRoles = [
    {
      title: 'Marketing (CMO Track)',
      desc: 'Own marketing end to end at ScentPreview.',
      link: 'https://lnkd.in/gFrM_BAK',
      displayLink: 'lnkd.in/gFrM_BAK'
    },
    {
      title: 'Operations',
      desc: "Run order flow and fulfilment so the founder isn't doing everything.",
      link: 'https://lnkd.in/gsffK-Fv',
      displayLink: 'lnkd.in/gsffK-Fv'
    },
    {
      title: 'Sales',
      desc: 'Sell a real D2C clothing label and learn to close.',
      link: 'https://lnkd.in/gkqzSMMm',
      displayLink: 'lnkd.in/gkqzSMMm'
    },
    {
      title: 'Customer Support',
      desc: 'Be the frontline voice of the brand on WhatsApp, Instagram, and email.',
      link: 'https://forms.gle/tT7tUvqai1n55oKEA',
      displayLink: 'forms.gle/tT7tUvqai1n55oKEA'
    },
    {
      title: 'Social Media and Growth',
      desc: "Own the brand's content and posting cadence, and grow the audience.",
      link: 'https://forms.gle/tT7tUvqai1n55oKEA',
      displayLink: 'forms.gle/tT7tUvqai1n55oKEA'
    }
  ];

  return (
    <div className="w-full max-w-3xl mt-6 text-center sm:text-left">
      {/* Trigger Button - Clean typography, no small icons */}
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="group inline-flex items-center gap-2 px-5 py-3 rounded-none border border-zinc-700 bg-[#162248] hover:bg-[#FFFFFF] hover:text-[#0A122C] text-[#F9F6F0] transition-all cursor-pointer shadow-lg font-mono text-xs sm:text-sm font-bold uppercase tracking-wider"
      >
        <span>Gephel is Hiring,</span>
        <span className="text-[#8E9AAF] group-hover:text-[#0A122C]">Explore.</span>
      </button>

      {/* Side-by-Side Roles Modal (2 columns for both mobile and desktop) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0A122C]/90 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl border border-zinc-800 bg-[#0A122C] p-4 sm:p-8 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto text-[#F9F6F0] rounded-sm"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between border-b border-zinc-800 pb-4">
                <div>
                  <span className="font-mono text-[10px] sm:text-xs text-[#8E9AAF] uppercase tracking-widest font-bold block mb-1">
                    Direct Applications
                  </span>
                  <h3 className="font-sans text-lg sm:text-2xl font-extrabold text-[#FFFFFF] uppercase tracking-tight">
                    Gephel is Hiring for ScentPreview
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-[#8E9AAF] hover:text-[#FFFFFF] transition-colors p-1"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>

              {/* Roles Side-by-Side Grid (2 columns on mobile and desktop) */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-4 pt-1">
                {hiringRoles.map((job, idx) => (
                  <div 
                    key={idx} 
                    className="flex flex-col justify-between border border-zinc-800 bg-zinc-900/60 p-3 sm:p-4 rounded-sm space-y-2 hover:border-[#8E9AAF] transition-colors"
                  >
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] sm:text-[10px] text-[#8E9AAF] uppercase tracking-wider font-bold block">
                        Role 0{idx + 1}
                      </span>
                      <h4 className="font-sans text-xs sm:text-base font-bold text-[#FFFFFF] tracking-tight leading-snug">
                        {job.title}
                      </h4>
                      <p className="font-sans text-[10px] sm:text-xs text-[#8E9AAF] leading-relaxed">
                        {job.desc}
                      </p>
                    </div>

                    <div className="pt-2 sm:pt-3 border-t border-zinc-800/80 mt-auto">
                      <a
                        href={job.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[10px] sm:text-xs font-bold text-[#FFFFFF] hover:text-[#8E9AAF] underline underline-offset-4 break-all block"
                      >
                        Apply: {job.displayLink}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="border-t border-zinc-800 pt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 bg-[#FFFFFF] text-[#0A122C] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#8E9AAF] transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
