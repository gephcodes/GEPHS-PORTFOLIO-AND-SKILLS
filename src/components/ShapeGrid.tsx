import React, { useRef, useEffect } from 'react';
import './ShapeGrid.css';

export interface ShapeGridProps {
  direction?: 'diagonal' | 'up' | 'right' | 'down' | 'left';
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverFillColor?: string;
  shape?: 'square' | 'hexagon' | 'circle' | 'triangle';
  hoverTrailAmount?: number;
  className?: string;
}

const ShapeGrid: React.FC<ShapeGridProps> = ({
  direction = 'right',
  speed = 1,
  borderColor = '#27272a',
  squareSize = 40,
  hoverFillColor = '#31adb8',
  shape = 'square',
  hoverTrailAmount = 3,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number | null>(null);
  const gridOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mousePos = useRef<{ x: number; y: number; active: boolean }>({ x: -1, y: -1, active: false });
  const hoveredSquare = useRef<{ x: number; y: number } | null>(null);
  const trailCells = useRef<{ x: number; y: number }[]>([]);
  const cellOpacities = useRef<Map<string, { x: number; y: number; col: number; row: number; alpha: number }>>(new Map());
  const cachedGradient = useRef<CanvasGradient | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const isHex = shape === 'hexagon';
    const isTri = shape === 'triangle';
    const isCircle = shape === 'circle';
    const hexHoriz = squareSize * 1.5;
    const hexVert = squareSize * Math.sqrt(3);

    const resizeCanvas = () => {
      if (!canvas) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (w === 0 || h === 0) return;
      canvas.width = w;
      canvas.height = h;

      const grad = ctx.createRadialGradient(
        w / 2,
        h / 2,
        0,
        w / 2,
        h / 2,
        Math.sqrt(w * w + h * h) / 2
      );
      grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0.75)');
      cachedGradient.current = grad;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Helper path builders (without ctx.beginPath or ctx.stroke inside)
    const addHexPath = (cx: number, cy: number, size: number) => {
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const vx = cx + size * Math.cos(angle);
        const vy = cy + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(vx, vy);
        else ctx.lineTo(vx, vy);
      }
      ctx.closePath();
    };

    const addCirclePath = (cx: number, cy: number, size: number) => {
      ctx.moveTo(cx + size / 2, cy);
      ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
    };

    const addTrianglePath = (cx: number, cy: number, size: number, flip: boolean) => {
      if (flip) {
        ctx.moveTo(cx, cy + size / 2);
        ctx.lineTo(cx + size / 2, cy - size / 2);
        ctx.lineTo(cx - size / 2, cy - size / 2);
      } else {
        ctx.moveTo(cx, cy - size / 2);
        ctx.lineTo(cx + size / 2, cy + size / 2);
        ctx.lineTo(cx - size / 2, cy + size / 2);
      }
      ctx.closePath();
    };

    const processMouseHover = () => {
      if (!mousePos.current.active || !canvas) {
        if (hoveredSquare.current && hoverTrailAmount > 0) {
          trailCells.current.unshift({ ...hoveredSquare.current });
          if (trailCells.current.length > hoverTrailAmount) trailCells.current.length = hoverTrailAmount;
        }
        hoveredSquare.current = null;
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const mouseX = mousePos.current.x - rect.left;
      const mouseY = mousePos.current.y - rect.top;

      if (mouseX < 0 || mouseX > rect.width || mouseY < 0 || mouseY > rect.height) {
        if (hoveredSquare.current && hoverTrailAmount > 0) {
          trailCells.current.unshift({ ...hoveredSquare.current });
          if (trailCells.current.length > hoverTrailAmount) trailCells.current.length = hoverTrailAmount;
        }
        hoveredSquare.current = null;
        return;
      }

      let col = 0;
      let row = 0;

      if (isHex) {
        const colShift = Math.floor(gridOffset.current.x / hexHoriz);
        const offsetX = ((gridOffset.current.x % hexHoriz) + hexHoriz) % hexHoriz;
        const offsetY = ((gridOffset.current.y % hexVert) + hexVert) % hexVert;
        col = Math.round((mouseX - offsetX) / hexHoriz);
        const rowOffset = (col + colShift) % 2 !== 0 ? hexVert / 2 : 0;
        row = Math.round((mouseY - offsetY - rowOffset) / hexVert);
      } else if (isTri) {
        const halfW = squareSize / 2;
        const offsetX = ((gridOffset.current.x % halfW) + halfW) % halfW;
        const offsetY = ((gridOffset.current.y % squareSize) + squareSize) % squareSize;
        col = Math.round((mouseX - offsetX) / halfW);
        row = Math.floor((mouseY - offsetY) / squareSize);
      } else if (isCircle) {
        const offsetX = ((gridOffset.current.x % squareSize) + squareSize) % squareSize;
        const offsetY = ((gridOffset.current.y % squareSize) + squareSize) % squareSize;
        col = Math.round((mouseX - offsetX) / squareSize);
        row = Math.round((mouseY - offsetY) / squareSize);
      } else {
        const offsetX = ((gridOffset.current.x % squareSize) + squareSize) % squareSize;
        const offsetY = ((gridOffset.current.y % squareSize) + squareSize) % squareSize;
        col = Math.floor((mouseX - offsetX) / squareSize);
        row = Math.floor((mouseY - offsetY) / squareSize);
      }

      if (!hoveredSquare.current || hoveredSquare.current.x !== col || hoveredSquare.current.y !== row) {
        if (hoveredSquare.current && hoverTrailAmount > 0) {
          trailCells.current.unshift({ ...hoveredSquare.current });
          if (trailCells.current.length > hoverTrailAmount) trailCells.current.length = hoverTrailAmount;
        }
        hoveredSquare.current = { x: col, y: row };
      }
    };

    const updateCellOpacities = () => {
      const targets = new Map<string, { col: number; row: number; targetAlpha: number }>();

      if (hoveredSquare.current) {
        const key = `${hoveredSquare.current.x},${hoveredSquare.current.y}`;
        targets.set(key, { col: hoveredSquare.current.x, row: hoveredSquare.current.y, targetAlpha: 1 });
      }

      if (hoverTrailAmount > 0) {
        for (let i = 0; i < trailCells.current.length; i++) {
          const t = trailCells.current[i];
          const key = `${t.x},${t.y}`;
          if (!targets.has(key)) {
            const alpha = (trailCells.current.length - i) / (trailCells.current.length + 1);
            targets.set(key, { col: t.x, row: t.y, targetAlpha: alpha });
          }
        }
      }

      for (const [key, item] of targets) {
        if (!cellOpacities.current.has(key)) {
          cellOpacities.current.set(key, { x: 0, y: 0, col: item.col, row: item.row, alpha: 0 });
        }
      }

      for (const [key, record] of cellOpacities.current) {
        const targetObj = targets.get(key);
        const targetAlpha = targetObj ? targetObj.targetAlpha : 0;
        const nextAlpha = record.alpha + (targetAlpha - record.alpha) * 0.2;

        if (nextAlpha < 0.01) {
          cellOpacities.current.delete(key);
        } else {
          record.alpha = nextAlpha;
        }
      }
    };

    const drawGrid = () => {
      const width = canvas.width;
      const height = canvas.height;
      if (width === 0 || height === 0) return;

      ctx.clearRect(0, 0, width, height);

      // --- 1. DRAW HOVERED / TRAIL FILLS FIRST (Only for active cells in map) ---
      if (cellOpacities.current.size > 0) {
        if (isHex) {
          const colShift = Math.floor(gridOffset.current.x / hexHoriz);
          const offsetX = ((gridOffset.current.x % hexHoriz) + hexHoriz) % hexHoriz;
          const offsetY = ((gridOffset.current.y % hexVert) + hexVert) % hexVert;

          for (const [, record] of cellOpacities.current) {
            const cx = record.col * hexHoriz + offsetX;
            const cy = record.row * hexVert + ((record.col + colShift) % 2 !== 0 ? hexVert / 2 : 0) + offsetY;
            ctx.globalAlpha = record.alpha;
            ctx.fillStyle = hoverFillColor;
            ctx.beginPath();
            addHexPath(cx, cy, squareSize);
            ctx.fill();
          }
        } else if (isTri) {
          const halfW = squareSize / 2;
          const colShift = Math.floor(gridOffset.current.x / halfW);
          const rowShift = Math.floor(gridOffset.current.y / squareSize);
          const offsetX = ((gridOffset.current.x % halfW) + halfW) % halfW;
          const offsetY = ((gridOffset.current.y % squareSize) + squareSize) % squareSize;

          for (const [, record] of cellOpacities.current) {
            const cx = record.col * halfW + offsetX;
            const cy = record.row * squareSize + squareSize / 2 + offsetY;
            const flip = ((record.col + colShift + record.row + rowShift) % 2 + 2) % 2 !== 0;
            ctx.globalAlpha = record.alpha;
            ctx.fillStyle = hoverFillColor;
            ctx.beginPath();
            addTrianglePath(cx, cy, squareSize, flip);
            ctx.fill();
          }
        } else if (isCircle) {
          const offsetX = ((gridOffset.current.x % squareSize) + squareSize) % squareSize;
          const offsetY = ((gridOffset.current.y % squareSize) + squareSize) % squareSize;

          for (const [, record] of cellOpacities.current) {
            const cx = record.col * squareSize + squareSize / 2 + offsetX;
            const cy = record.row * squareSize + squareSize / 2 + offsetY;
            ctx.globalAlpha = record.alpha;
            ctx.fillStyle = hoverFillColor;
            ctx.beginPath();
            addCirclePath(cx, cy, squareSize);
            ctx.fill();
          }
        } else {
          const offsetX = ((gridOffset.current.x % squareSize) + squareSize) % squareSize;
          const offsetY = ((gridOffset.current.y % squareSize) + squareSize) % squareSize;

          for (const [, record] of cellOpacities.current) {
            const sx = record.col * squareSize + offsetX;
            const sy = record.row * squareSize + offsetY;
            ctx.globalAlpha = record.alpha;
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(sx, sy, squareSize, squareSize);
          }
        }
        ctx.globalAlpha = 1;
      }

      // --- 2. BATCH DRAW ALL BORDERS IN A SINGLE PATH ---
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1;
      ctx.beginPath();

      if (isHex) {
        const colShift = Math.floor(gridOffset.current.x / hexHoriz);
        const offsetX = ((gridOffset.current.x % hexHoriz) + hexHoriz) % hexHoriz;
        const offsetY = ((gridOffset.current.y % hexVert) + hexVert) % hexVert;
        const cols = Math.ceil(width / hexHoriz) + 3;
        const rows = Math.ceil(height / hexVert) + 3;

        for (let col = -2; col < cols; col++) {
          for (let row = -2; row < rows; row++) {
            const cx = col * hexHoriz + offsetX;
            const cy = row * hexVert + ((col + colShift) % 2 !== 0 ? hexVert / 2 : 0) + offsetY;
            addHexPath(cx, cy, squareSize);
          }
        }
      } else if (isTri) {
        const halfW = squareSize / 2;
        const colShift = Math.floor(gridOffset.current.x / halfW);
        const rowShift = Math.floor(gridOffset.current.y / squareSize);
        const offsetX = ((gridOffset.current.x % halfW) + halfW) % halfW;
        const offsetY = ((gridOffset.current.y % squareSize) + squareSize) % squareSize;
        const cols = Math.ceil(width / halfW) + 4;
        const rows = Math.ceil(height / squareSize) + 4;

        for (let col = -2; col < cols; col++) {
          for (let row = -2; row < rows; row++) {
            const cx = col * halfW + offsetX;
            const cy = row * squareSize + squareSize / 2 + offsetY;
            const flip = ((col + colShift + row + rowShift) % 2 + 2) % 2 !== 0;
            addTrianglePath(cx, cy, squareSize, flip);
          }
        }
      } else if (isCircle) {
        const offsetX = ((gridOffset.current.x % squareSize) + squareSize) % squareSize;
        const offsetY = ((gridOffset.current.y % squareSize) + squareSize) % squareSize;
        const cols = Math.ceil(width / squareSize) + 3;
        const rows = Math.ceil(height / squareSize) + 3;

        for (let col = -2; col < cols; col++) {
          for (let row = -2; row < rows; row++) {
            const cx = col * squareSize + squareSize / 2 + offsetX;
            const cy = row * squareSize + squareSize / 2 + offsetY;
            addCirclePath(cx, cy, squareSize);
          }
        }
      } else {
        const offsetX = ((gridOffset.current.x % squareSize) + squareSize) % squareSize;
        const offsetY = ((gridOffset.current.y % squareSize) + squareSize) % squareSize;
        const cols = Math.ceil(width / squareSize) + 3;
        const rows = Math.ceil(height / squareSize) + 3;

        for (let col = -2; col < cols; col++) {
          for (let row = -2; row < rows; row++) {
            const sx = col * squareSize + offsetX;
            const sy = row * squareSize + offsetY;
            ctx.rect(sx, sy, squareSize, squareSize);
          }
        }
      }

      ctx.stroke();

      // --- 3. VIGNETTE OVERLAY ---
      if (cachedGradient.current) {
        ctx.fillStyle = cachedGradient.current;
        ctx.fillRect(0, 0, width, height);
      }
    };

    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed, 0.1);
      const wrapX = isHex ? hexHoriz * 2 : squareSize;
      const wrapY = isHex ? hexVert : isTri ? squareSize * 2 : squareSize;

      switch (direction) {
        case 'right':
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + wrapX) % wrapX;
          break;
        case 'left':
          gridOffset.current.x = (gridOffset.current.x + effectiveSpeed + wrapX) % wrapX;
          break;
        case 'up':
          gridOffset.current.y = (gridOffset.current.y + effectiveSpeed + wrapY) % wrapY;
          break;
        case 'down':
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + wrapY) % wrapY;
          break;
        case 'diagonal':
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + wrapX) % wrapX;
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + wrapY) % wrapY;
          break;
        default:
          break;
      }

      processMouseHover();
      updateCellOpacities();
      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      mousePos.current.active = true;
    };

    const handleMouseLeave = () => {
      mousePos.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [direction, speed, borderColor, hoverFillColor, squareSize, shape, hoverTrailAmount]);

  return <canvas ref={canvasRef} className={`shapegrid-canvas ${className}`} />;
};

export default ShapeGrid;
