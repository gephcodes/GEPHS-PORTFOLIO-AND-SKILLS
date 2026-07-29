import React, { useState } from 'react';
import './Folder.css';

const darkenColor = (hex: string, percent: number) => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color
      .split('')
      .map(c => c + c)
      .join('');
  }
  const num = parseInt(color.slice(0, 6), 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

export interface FolderProps {
  color?: string;
  size?: number;
  items?: React.ReactNode[];
  className?: string;
  onSelectPaper?: (index: number) => void;
}

const Folder: React.FC<FolderProps> = ({ color = '#5227FF', size = 1, items = [], className = '', onSelectPaper }) => {
  const maxItems = 5;
  const papers = items.slice(0, maxItems);
  while (papers.length < maxItems) {
    papers.push(null);
  }

  const [open, setOpen] = useState(false);

  const folderBackColor = darkenColor(color, 0.08);
  const paper1 = darkenColor('#ffffff', 0.16);
  const paper2 = darkenColor('#ffffff', 0.12);
  const paper3 = darkenColor('#ffffff', 0.08);
  const paper4 = darkenColor('#ffffff', 0.04);
  const paper5 = '#ffffff';

  const handleClick = () => {
    setOpen(prev => !prev);
  };

  const handlePaperClick = (e: React.MouseEvent, index: number) => {
    if (open) {
      e.stopPropagation();
      if (onSelectPaper) {
        onSelectPaper(index);
      }
    }
  };

  const handlePaperMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!open) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.15;
    const offsetY = (e.clientY - centerY) * 0.15;
    e.currentTarget.style.setProperty('--magnet-x', `${offsetX}px`);
    e.currentTarget.style.setProperty('--magnet-y', `${offsetY}px`);
  };

  const handlePaperMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty('--magnet-x', '0px');
    e.currentTarget.style.setProperty('--magnet-y', '0px');
  };

  const folderStyle = {
    '--folder-color': color,
    '--folder-back-color': folderBackColor,
    '--paper-1': paper1,
    '--paper-2': paper2,
    '--paper-3': paper3,
    '--paper-4': paper4,
    '--paper-5': paper5
  } as React.CSSProperties;

  const folderClassName = `folder ${open ? 'open' : ''}`.trim();
  const scaleStyle = { transform: `scale(${size})` };

  return (
    <div style={scaleStyle} className={className}>
      <div
        className={folderClassName}
        style={folderStyle}
        onClick={handleClick}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        tabIndex={0}
        role="button"
        aria-expanded={open}
        aria-label={open ? 'Close folder' : 'Open folder'}
      >
        <div className="folder__back">
          {papers.map((item, i) => (
            <div
              key={i}
              className={`paper paper-${i + 1}`}
              onClick={e => handlePaperClick(e, i)}
              onMouseMove={handlePaperMouseMove}
              onMouseLeave={handlePaperMouseLeave}
            >
              {item}
            </div>
          ))}
          <div className="folder__front"></div>
          <div className="folder__front right"></div>
        </div>
      </div>
    </div>
  );
};

export default Folder;
