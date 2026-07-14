import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onContactClick: () => void;
  onWorkClick: () => void;
  onLogoClick: () => void;
}

export default function Navbar({ onContactClick, onWorkClick, onLogoClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // Calculate scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((currentScrollY / totalHeight) * 100);
      }

      // Track active section
      const sections = ['hero', 'projects', 'philosophy', 'skills', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Philosophy', href: '#philosophy', id: 'philosophy' },
    { name: 'Skills', href: '#skills', id: 'skills' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const opacity = isOpen ? 1 : Math.max(0, Math.min(1, 1 - scrollY / 250));

  return (
    <>
      <header 
        className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-900 bg-black/40 backdrop-blur-md transition-all duration-300 ease-out"
        style={{ 
          opacity,
          pointerEvents: opacity <= 0.05 ? 'none' : 'auto',
          transform: `translateY(-${(1 - opacity) * 15}px)`
        }}
      >
        {/* Scroll Progress Bar */}
        <div 
          className="absolute top-0 left-0 h-[1px] bg-white transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
        
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="flex h-16 items-center justify-between">
            {/* Logo/Monogram */}
            <button 
              onClick={onLogoClick}
              className="font-display font-semibold text-base sm:text-lg tracking-tighter uppercase hover:opacity-85 transition-opacity text-left text-white"
            >
              Gephel Chingtham
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`font-mono text-xs tracking-wider uppercase transition-all duration-300 relative py-1 ${
                    activeSection === link.id 
                      ? 'text-white' 
                      : 'text-zinc-500 hover:text-white hover:underline underline-offset-4 decoration-zinc-500'
                  }`}
                >
                  {link.name}
                  {activeSection === link.id && (
                    <motion.div 
                      layoutId="activeNavLine"
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-white"
                      transition={{ type: 'spring', stiffness: 550, damping: 35 }}
                    />
                  )}
                </a>
              ))}
            </nav>

            {/* Action CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={onWorkClick}
                className="group flex items-center gap-1.5 border border-white px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-zinc-900"
              >
                Work with me
                <span className="text-emerald-400 animate-pulse">●</span>
              </button>
              <button
                onClick={onContactClick}
                className="group flex items-center gap-1.5 bg-white px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-neutral-200"
              >
                Get in touch
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-neutral-800 text-neutral-400 hover:text-white md:hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.12, ease: 'easeOut' }}
            className="fixed inset-x-0 top-16 z-40 border-b border-neutral-900 bg-black/95 px-6 py-8 backdrop-blur-lg md:hidden max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`font-display text-xl font-medium tracking-tight ${
                    activeSection === link.id ? 'text-white' : 'text-neutral-400'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-neutral-900" />
              <button
                onClick={() => {
                  setIsOpen(false);
                  onWorkClick();
                }}
                className="flex w-full items-center justify-between rounded-none border border-white p-3 font-mono text-sm font-semibold uppercase tracking-wider text-white hover:bg-zinc-900"
              >
                <span>Work with me</span>
                <span className="text-emerald-400 animate-pulse">●</span>
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onContactClick();
                }}
                className="flex w-full items-between rounded-none bg-white p-3 font-mono text-sm font-semibold uppercase tracking-wider text-black hover:bg-neutral-200 justify-between"
              >
                <span>Get in touch</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
