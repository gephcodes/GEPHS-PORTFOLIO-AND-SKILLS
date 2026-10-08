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
    <footer id="contact" className="relative border-t border-zinc-800 bg-transparent px-6 pt-24 pb-12 md:px-12 lg:px-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
      </div>
      <div className="relative z-10 mx-auto max-w-7xl">
        
        {/* Centered Connection Matrix */}
        <div className="max-w-2xl mx-auto text-center space-y-12 mb-20">
          <div>
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-[#FFFFFF] md:text-4xl uppercase">
              GET AT ME
            </h2>
          </div>

          {/* Email Token Card */}
          <div className="border border-zinc-800 bg-zinc-900/90 p-6 rounded-none space-y-4 max-w-md mx-auto text-left text-[#F9F6F0]">
            <span className="font-mono text-[9px] text-[#8E9AAF] uppercase block">Direct Communication Line</span>
            
            <div className="flex items-center justify-between gap-4 border border-zinc-800 bg-[#0A122C] px-4 py-3 rounded-none">
              <span className="font-mono text-xs text-[#F9F6F0] truncate">{email}</span>
              <button
                onClick={handleCopyEmail}
                className="flex h-8 w-8 items-center justify-center rounded-none bg-[#FFFFFF] text-[#0A122C] hover:bg-[#8E9AAF] transition-colors shrink-0"
                aria-label="Copy email address"
                id="copy-email-btn"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>

            {copied && (
              <p className="font-mono text-[10px] text-[#FFFFFF] text-center">
                ✔ Email address copied successfully to clipboard.
              </p>
            )}
          </div>

          {/* Social Links List */}
          <div className="space-y-4 pt-2 max-w-md mx-auto text-left">
            <span className="font-mono text-[9px] text-[#8E9AAF] uppercase block text-center">Registered Handles</span>
            
            <div className="flex flex-col gap-3 font-mono text-xs">
              <a 
                href="https://x.com/8geph" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 text-[#F9F6F0] hover:text-[#FFFFFF] transition-colors group py-1 border-b border-zinc-800 hover:border-zinc-700"
              >
                <Twitter className="h-4 w-4 text-[#8E9AAF]" />
                <span>X / Twitter: <strong className="text-[#FFFFFF]">@8geph</strong></span>
                <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a>
              
              <a 
                href="https://www.instagram.com/gephelchingtham/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 text-[#F9F6F0] hover:text-[#FFFFFF] transition-colors group py-1 border-b border-zinc-800 hover:border-zinc-700"
              >
                <Instagram className="h-4 w-4 text-[#8E9AAF]" />
                <span>Instagram: <strong className="text-[#FFFFFF]">@gephelchingtham</strong></span>
                <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a>

              <div 
                onClick={handleCopyEmail}
                className="flex items-center gap-3 text-[#F9F6F0] hover:text-[#FFFFFF] transition-colors group py-1 cursor-pointer border-b border-zinc-800 hover:border-zinc-700"
              >
                <Mail className="h-4 w-4 text-[#8E9AAF]" />
                <span>Email: <strong className="text-[#FFFFFF]">{email}</strong></span>
                <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
