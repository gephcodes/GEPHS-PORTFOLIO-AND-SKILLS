import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import PillNav from './PillNav';

interface NavbarProps {
  onContactClick: () => void;
  onWorkClick: () => void;
  onLogoClick: () => void;
}

export default function Navbar({ onContactClick, onWorkClick, onLogoClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setIsScrolled(currentScrollY > 20);

          // Calculate scroll progress
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            setScrollProgress(Math.min(100, Math.max(0, (currentScrollY / totalHeight) * 100)));
          }

          // Track active section
          const sections = ['hero', 'projects', 'skills', 'contact'];
          for (const sectionId of sections) {
            const el = document.getElementById(sectionId);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= 150 && rect.bottom >= 150) {
                setActiveSection(sectionId);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Work with me', href: '#work' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (href: string) => {
    if (href === '#work') {
      onWorkClick();
      return;
    }
    if (href === '#contact') {
      onContactClick();
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-200 py-1.5 ${
          isScrolled 
            ? 'border-neutral-800 bg-black/85 backdrop-blur-md shadow-lg' 
            : 'border-transparent bg-black/40 backdrop-blur-sm'
        }`}
      >
        {/* Scroll Progress Bar */}
        <div 
          className="absolute top-0 left-0 h-[2px] bg-emerald-400 transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
        
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="flex h-14 items-center justify-between gap-4">
            {/* Logo/Monogram */}
            <button 
              onClick={onLogoClick}
              className="font-display font-semibold text-base sm:text-lg tracking-tighter uppercase hover:opacity-85 transition-opacity text-left text-white shrink-0"
            >
              Gephel Chingtham
            </button>

            {/* Desktop Pill Navigation with GSAP */}
            <div className="hidden md:block">
              <PillNav
                items={navItems}
                activeHref={`#${activeSection}`}
                baseColor="#000000"
                pillColor="#18181b"
                pillTextColor="#ffffff"
                hoveredPillTextColor="#000000"
                initialLoadAnimation={true}
                onItemClick={handleNavClick}
              />
            </div>

            {/* Action CTA Buttons */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              <button
                onClick={onWorkClick}
                className="group flex items-center gap-1.5 border border-white px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-zinc-900"
              >
                Work with me
                <span className="text-emerald-400 animate-pulse">●</span>
              </button>
              <button
                onClick={onContactClick}
                className="group flex items-center gap-1.5 bg-white px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-neutral-200"
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
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    handleNavClick(item.href);
                  }}
                  className={`font-display text-xl font-medium tracking-tight ${
                    activeSection === item.href.replace('#', '') ? 'text-white' : 'text-neutral-400'
                  }`}
                >
                  {item.label}
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
