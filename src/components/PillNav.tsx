import React from 'react';

export interface PillNavItem {
  label: string;
  href: string;
  ariaLabel?: string;
}

export interface PillNavProps {
  logo?: string;
  logoAlt?: string;
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  onMobileMenuClick?: () => void;
  initialLoadAnimation?: boolean;
  onItemClick?: (href: string) => void;
}

export default function PillNav({
  items,
  activeHref,
  className = '',
  onItemClick
}: PillNavProps) {
  return (
    <nav className={`inline-flex items-center rounded-full border border-zinc-800 bg-[#0A122C]/80 p-1 backdrop-blur-md shadow-sm ${className}`}>
      <ul className="flex items-center gap-1 list-none m-0 p-0">
        {items.map((item) => {
          const isActive = activeHref === item.href;
          return (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => {
                  if (onItemClick) {
                    e.preventDefault();
                    onItemClick(item.href);
                  }
                }}
                className={`relative inline-block px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-colors duration-150 select-none ${
                  isActive
                    ? 'bg-[#FFFFFF] text-[#0A122C]'
                    : 'text-[#8E9AAF] hover:text-[#FFFFFF] hover:bg-zinc-800/50'
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
