import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import PillNav from './PillNav';

interface NavbarProps {
  onContactClick: () => void;
  onWorkClick: () => void;
  onLogoClick: () => void;
}

const navItems = [
  { label: 'Projects', href: '#projects' },
  { label: 'Certificates', href: '#certificates' }
];

export default function Navbar({ onContactClick, onWorkClick, onLogoClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setIsScrolled(currentScrollY > 15);

          const sections = ['hero', 'projects', 'certificates', 'contact'];
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
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 py-1.5 ${
          isScrolled 
            ? 'border-zinc-800/80 bg-[#0A122C]/90 backdrop-blur-md shadow-xl' 
            : 'border-transparent bg-[#0A122C]/50 backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="flex h-14 items-center justify-between gap-4">
            <button 
              onClick={onLogoClick}
              className="font-display font-extrabold text-base sm:text-lg tracking-tighter uppercase hover:opacity-85 transition-opacity text-left text-[#FFFFFF] shrink-0"
            >
              Gephel Chingtham
            </button>

            <div className="hidden md:block">
              <PillNav
                items={navItems}
                activeHref={`#${activeSection}`}
                baseColor="#0A122C"
                pillColor="#FFFFFF"
                pillTextColor="#0A122C"
                hoveredPillTextColor="#FFFFFF"
                initialLoadAnimation={true}
                onItemClick={handleNavClick}
              />
            </div>

            <div className="hidden md:flex items-center gap-3 shrink-0">
              <button
                onClick={onWorkClick}
                className="group flex items-center gap-1.5 border border-zinc-700 px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#F9F6F0] transition-all hover:bg-zinc-800"
              >
                Work with me
                <span className="text-[#FFFFFF] animate-pulse">●</span>
              </button>
              <button
                onClick={onContactClick}
                className="group flex items-center gap-1.5 bg-[#FFFFFF] px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#0A122C] transition-all hover:bg-[#8E9AAF]"
              >
                Contact
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-zinc-800 text-[#F9F6F0] hover:text-[#FFFFFF] md:hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {isOpen && (
        <div className="fixed inset-x-0 top-16 z-40 border-b border-zinc-800 bg-[#0A122C]/95 px-6 py-8 backdrop-blur-lg md:hidden max-h-[calc(100vh-4rem)] overflow-y-auto text-[#F9F6F0]">
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
                  activeSection === item.href.replace('#', '') ? 'text-[#FFFFFF]' : 'text-[#8E9AAF]'
                }`}
              >
                {item.label}
              </a>
            ))}
            <hr className="border-zinc-800 my-2" />
            <button
              onClick={() => {
                setIsOpen(false);
                onWorkClick();
              }}
              className="flex w-full items-center justify-between text-left font-display text-xl font-medium tracking-tight text-[#F9F6F0] hover:text-[#FFFFFF]"
            >
              <span>Work with me</span>
              <span className="text-[#FFFFFF] animate-pulse text-sm">●</span>
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                onContactClick();
              }}
              className="flex w-full items-center justify-between text-left font-display text-xl font-medium tracking-tight text-[#F9F6F0] hover:text-[#FFFFFF]"
            >
              <span>Contact</span>
              <ArrowUpRight className="h-5 w-5 text-[#8E9AAF]" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
