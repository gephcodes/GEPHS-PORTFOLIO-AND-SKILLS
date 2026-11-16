import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

interface NasaCertificatePageProps {
  onBackToPortfolio: () => void;
}

const CERTIFICATE_IMAGE =
  '/assets/aistudio/certificate_geph_2026__n_a_s_a__space__apps__challenge_6d24f40f.png';

export default function NasaCertificatePage({ onBackToPortfolio }: NasaCertificatePageProps) {
  const handleBackClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onBackToPortfolio();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:px-8 relative">
      <a
        href="/"
        onClick={handleBackClick}
        className="fixed top-5 left-5 sm:top-7 sm:left-8 z-20 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#F9F6F0]/80 hover:text-[#FFFFFF] bg-[#0A122C]/70 border border-zinc-800/80 px-3 py-1.5 rounded-sm backdrop-blur-md transition-colors group"
      >
        <ArrowLeft className="h-3.5 w-3.5 text-[#8E9AAF] group-hover:-translate-x-0.5 group-hover:text-[#FFFFFF] transition-all" />
        <span>Back</span>
      </a>

      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-4xl rounded-xl border border-zinc-700/70 bg-[#0A122C]/75 p-2 sm:p-3.5 backdrop-blur-md shadow-[0_25px_80px_rgba(0,0,0,0.75)]"
      >
        <img
          src={CERTIFICATE_IMAGE}
          alt="2026 NASA Space Apps Challenge Certificate presented to Gephel Chingtham"
          className="w-full h-auto rounded-lg block select-none"
          loading="eager"
        />
      </motion.div>
    </div>
  );
}
