import React, { useState } from 'react';
import { Mail, Twitter, Instagram, Copy, Check } from 'lucide-react';

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const [email] = useState('gephelchingtham08@gmail.com');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="relative border-t border-zinc-800 bg-black px-6 pt-24 pb-12 md:px-12 lg:px-24 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        
        {/* Centered Connection Matrix */}
        <div className="max-w-2xl mx-auto text-center space-y-12 mb-20">
          <div>
            <span className="font-mono text-xs text-zinc-500 uppercase tracking-[0.2em] block mb-2">
              05 — Connection Matrix
            </span>
            <h2 className="font-sans text-3xl font-light tracking-tight text-white md:text-4xl">
              Get In Touch
            </h2>
            <p className="font-sans text-sm text-zinc-400 font-light mt-4 leading-relaxed mx-auto max-w-md">
              Discussing system automation, asset portfolios, or strategic investments. Reach out directly or copy the communication token to your client.
            </p>
          </div>

          {/* Email Token Card */}
          <div className="border border-zinc-800 bg-zinc-950/20 p-6 rounded-none space-y-4 max-w-md mx-auto text-left">
            <span className="font-mono text-[9px] text-zinc-500 uppercase block">Direct Communication Line</span>
            
            <div className="flex items-center justify-between gap-4 border border-zinc-800 bg-black px-4 py-3 rounded-none">
              <span className="font-mono text-xs text-white truncate">{email}</span>
              <button
                onClick={handleCopyEmail}
                className="flex h-8 w-8 items-center justify-center rounded-none bg-white text-black hover:bg-zinc-200 transition-colors shrink-0"
                aria-label="Copy email address"
                id="copy-email-btn"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>

            {copied && (
              <p className="font-mono text-[10px] text-emerald-400 text-center">
                ✔ Email address copied successfully to clipboard.
              </p>
            )}
          </div>

          {/* Social Links List */}
          <div className="space-y-4 pt-2 max-w-md mx-auto text-left">
            <span className="font-mono text-[9px] text-zinc-500 uppercase block text-center">Registered Handles</span>
            
            <div className="flex flex-col gap-3 font-mono text-xs">
              <a 
                href="https://x.com/8geph" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors group py-1 border-b border-zinc-950 hover:border-zinc-800"
              >
                <Twitter className="h-4 w-4" />
                <span>X / Twitter: <strong className="text-white">@8geph</strong></span>
                <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a>
              
              <a 
                href="https://instagram.com/cgphl" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors group py-1 border-b border-zinc-950 hover:border-zinc-800"
              >
                <Instagram className="h-4 w-4" />
                <span>Instagram: <strong className="text-white">@cgphl</strong></span>
                <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a>

              <div 
                onClick={handleCopyEmail}
                className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors group py-1 cursor-pointer border-b border-zinc-950 hover:border-zinc-800"
              >
                <Mail className="h-4 w-4" />
                <span>Email: <strong className="text-white">{email}</strong></span>
                <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider & Strict Copyright notice */}
        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] text-zinc-500">
          <span>PORTFOLIO CODEBASE STATUS: DEPLOYED</span>
          <span>Portfolio © 2026 Gephel Chingtham</span>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-help">LATENCY: 14MS</span>
            <span className="hover:text-white cursor-help">SECURITY: VERIFIED</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
