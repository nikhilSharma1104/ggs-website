import React from 'react';
import { motion } from 'framer-motion';

// Line-art illustrations drawn in currentColor so they can sit on ivory or navy.

type ArtProps = { className?: string; animate?: boolean };

const draw = (animate?: boolean, delay = 0) =>
  animate
    ? {
        initial: { pathLength: 0, opacity: 0 },
        whileInView: { pathLength: 1, opacity: 1 },
        viewport: { once: true },
        transition: { duration: 1.6, delay, ease: 'easeInOut' as const },
      }
    : {};

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/** Concentric rings + petals, used as a slow-turning backdrop. */
export const Mandala: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 400 400" className={className} aria-hidden="true">
    <g {...base} strokeWidth={0.8}>
      {[190, 170, 140, 110, 70, 40].map((r) => (
        <circle key={r} cx="200" cy="200" r={r} />
      ))}
      {Array.from({ length: 24 }).map((_, i) => (
        <path key={i} d="M200 30 C 214 70 214 100 200 130 C 186 100 186 70 200 30 Z" transform={`rotate(${i * 15} 200 200)`} />
      ))}
      {Array.from({ length: 12 }).map((_, i) => (
        <path key={`s${i}`} d="M200 90 C 222 120 222 150 200 160 C 178 150 178 120 200 90 Z" transform={`rotate(${i * 30} 200 200)`} />
      ))}
      {Array.from({ length: 72 }).map((_, i) => (
        <line key={`t${i}`} x1="200" y1="10" x2="200" y2={i % 2 ? 18 : 24} transform={`rotate(${i * 5} 200 200)`} />
      ))}
    </g>
  </svg>
);

/** Small ornamental divider: line, lotus bud, line. */
export const Ornament: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 160 20" className={className} aria-hidden="true">
    <g {...base} strokeWidth={1}>
      <path d="M0 10 H62" />
      <path d="M98 10 H160" />
      <path d="M80 2 C 88 8 88 14 80 18 C 72 14 72 8 80 2 Z" />
      <path d="M80 10 C 72 4 66 6 64 10 C 66 14 72 16 80 10 Z" />
      <path d="M80 10 C 88 4 94 6 96 10 C 94 14 88 16 80 10 Z" />
    </g>
  </svg>
);

export const SaplingArt: React.FC<ArtProps> = ({ className, animate }) => (
  <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
    <g {...base}>
      <motion.circle cx="100" cy="100" r="86" strokeDasharray="2 6" {...draw(animate)} />
      <motion.path d="M66 150 H134 L126 178 H74 Z" {...draw(animate, 0.1)} />
      <motion.path d="M60 150 H140" {...draw(animate, 0.15)} />
      <motion.path d="M100 150 V92" {...draw(animate, 0.3)} />
      <motion.path d="M100 112 C 76 112 62 96 60 72 C 84 72 100 86 100 112 Z" {...draw(animate, 0.5)} />
      <motion.path d="M100 98 C 122 98 138 82 140 56 C 116 56 100 72 100 98 Z" {...draw(animate, 0.6)} />
      <motion.path d="M100 92 C 96 80 98 70 104 62" {...draw(animate, 0.7)} />
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.path key={i} d="M100 22 V34" transform={`rotate(${-50 + i * 25} 100 100)`} {...draw(animate, 0.8 + i * 0.05)} />
      ))}
    </g>
  </svg>
);

export const BookArt: React.FC<ArtProps> = ({ className, animate }) => (
  <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
    <g {...base}>
      <motion.circle cx="100" cy="100" r="86" strokeDasharray="2 6" {...draw(animate)} />
      <motion.path d="M100 150 C 80 138 56 136 34 140 V70 C 56 66 80 68 100 80 Z" {...draw(animate, 0.1)} />
      <motion.path d="M100 150 C 120 138 144 136 166 140 V70 C 144 66 120 68 100 80 Z" {...draw(animate, 0.2)} />
      <motion.path d="M100 80 V150" {...draw(animate, 0.3)} />
      {[88, 100, 112, 124].map((y, i) => (
        <motion.path key={y} d={`M46 ${y - 6} C 62 ${y - 9} 78 ${y - 7} 90 ${y - 1}`} {...draw(animate, 0.4 + i * 0.05)} />
      ))}
      {[88, 100, 112, 124].map((y, i) => (
        <motion.path key={`r${y}`} d={`M154 ${y - 6} C 138 ${y - 9} 122 ${y - 7} 110 ${y - 1}`} {...draw(animate, 0.5 + i * 0.05)} />
      ))}
      <motion.path d="M100 32 L104 44 L116 44 L106 52 L110 64 L100 56 L90 64 L94 52 L84 44 L96 44 Z" {...draw(animate, 0.8)} />
    </g>
  </svg>
);

export const AtomArt: React.FC<ArtProps> = ({ className, animate }) => (
  <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
    <g {...base}>
      <motion.circle cx="100" cy="100" r="86" strokeDasharray="2 6" {...draw(animate)} />
      {[0, 60, 120].map((deg, i) => (
        <motion.ellipse key={deg} cx="100" cy="100" rx="62" ry="22" transform={`rotate(${deg} 100 100)`} {...draw(animate, 0.2 + i * 0.15)} />
      ))}
      <motion.circle cx="100" cy="100" r="9" {...draw(animate, 0.7)} />
      <circle cx="162" cy="100" r="3.5" fill="currentColor" stroke="none" />
      <circle cx="69" cy="46" r="3.5" fill="currentColor" stroke="none" />
      <circle cx="69" cy="154" r="3.5" fill="currentColor" stroke="none" />
    </g>
  </svg>
);

export const GlobeArt: React.FC<ArtProps> = ({ className, animate }) => (
  <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
    <g {...base}>
      <motion.circle cx="100" cy="100" r="60" {...draw(animate)} />
      <motion.ellipse cx="100" cy="100" rx="26" ry="60" {...draw(animate, 0.2)} />
      <motion.path d="M40 100 H160 M48 70 H152 M48 130 H152 M100 40 V160" {...draw(animate, 0.3)} />
      <motion.path d="M150 52 C 176 64 186 92 178 120" strokeDasharray="3 5" {...draw(animate, 0.5)} />
      <motion.path d="M172 112 L178 122 L186 114" {...draw(animate, 0.6)} />
      <motion.path d="M30 52 h28 a6 6 0 0 1 6 6 v14 a6 6 0 0 1 -6 6 h-16 l-8 8 v-8 h-4 a6 6 0 0 1 -6 -6 v-14 a6 6 0 0 1 6 -6 z" {...draw(animate, 0.7)} />
    </g>
  </svg>
);

export const ChipArt: React.FC<ArtProps> = ({ className, animate }) => (
  <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
    <g {...base}>
      <motion.rect x="62" y="62" width="76" height="76" rx="10" {...draw(animate)} />
      <motion.rect x="80" y="80" width="40" height="40" rx="4" {...draw(animate, 0.2)} />
      {[76, 92, 108, 124].map((p, i) => (
        <motion.path key={p} d={`M${p} 62 V40 M${p} 138 V160 M62 ${p} H40 M138 ${p} H160`} {...draw(animate, 0.3 + i * 0.08)} />
      ))}
      {[[40, 40], [160, 40], [40, 160], [160, 160], [40, 92], [160, 108]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill="currentColor" stroke="none" />
      ))}
      <motion.path d="M92 108 L100 92 L108 108 M95 102 H105" {...draw(animate, 0.8)} />
    </g>
  </svg>
);

export const BulbArt: React.FC<ArtProps> = ({ className, animate }) => (
  <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
    <g {...base}>
      <motion.path d="M100 40 C 70 40 54 62 54 86 C 54 106 66 116 76 128 C 82 136 82 142 82 148 H118 C 118 142 118 136 124 128 C 134 116 146 106 146 86 C 146 62 130 40 100 40 Z" {...draw(animate)} />
      <motion.path d="M84 160 H116 M88 170 H112" {...draw(animate, 0.3)} />
      <motion.path d="M90 148 V112 L100 100 L110 112 V148" {...draw(animate, 0.4)} />
      {[-70, -35, 0, 35, 70].map((deg, i) => (
        <motion.path key={deg} d="M100 14 V26" transform={`rotate(${deg} 100 86)`} {...draw(animate, 0.6 + i * 0.05)} />
      ))}
    </g>
  </svg>
);

export const TrophyArt: React.FC<ArtProps> = ({ className, animate }) => (
  <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
    <g {...base}>
      <motion.path d="M70 40 H130 V84 C 130 104 116 118 100 118 C 84 118 70 104 70 84 Z" {...draw(animate)} />
      <motion.path d="M70 54 H50 C 50 76 58 88 72 92 M130 54 H150 C 150 76 142 88 128 92" {...draw(animate, 0.2)} />
      <motion.path d="M100 118 V140 M80 160 H120 L114 140 H86 Z" {...draw(animate, 0.4)} />
      <motion.path d="M100 60 L104 72 L116 72 L106 80 L110 92 L100 84 L90 92 L94 80 L84 72 L96 72 Z" {...draw(animate, 0.6)} />
    </g>
  </svg>
);

export const PaletteArt: React.FC<ArtProps> = ({ className, animate }) => (
  <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
    <g {...base}>
      <motion.path d="M100 40 C 58 40 34 70 34 102 C 34 136 62 160 96 160 C 110 160 114 150 108 140 C 102 130 108 120 120 120 H140 C 156 120 166 110 166 94 C 166 62 136 40 100 40 Z" {...draw(animate)} />
      {[[70, 82], [96, 64], [126, 70], [64, 116]].map(([cx, cy], i) => (
        <motion.circle key={i} cx={cx} cy={cy} r="9" {...draw(animate, 0.3 + i * 0.1)} />
      ))}
    </g>
  </svg>
);

export const LeafArt: React.FC<ArtProps> = ({ className, animate }) => (
  <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
    <g {...base}>
      <motion.path d="M50 150 C 50 80 100 44 160 40 C 160 104 124 150 50 150 Z" {...draw(animate)} />
      <motion.path d="M50 150 C 80 120 110 90 146 54" {...draw(animate, 0.3)} />
      {[0, 1, 2, 3].map((i) => (
        <motion.path key={i} d={`M${78 + i * 18} ${122 - i * 18} l${-6 + i} ${-22 + i * 2} M${78 + i * 18} ${122 - i * 18} l22 6`} {...draw(animate, 0.5 + i * 0.08)} />
      ))}
    </g>
  </svg>
);

export const ColumnsArt: React.FC<ArtProps> = ({ className, animate }) => (
  <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
    <g {...base}>
      <motion.path d="M40 74 L100 40 L160 74 Z" {...draw(animate)} />
      <motion.path d="M36 74 H164 M36 84 H164" {...draw(animate, 0.2)} />
      {[52, 80, 108, 136].map((x, i) => (
        <motion.path key={x} d={`M${x} 84 V146 M${x + 12} 84 V146`} {...draw(animate, 0.3 + i * 0.08)} />
      ))}
      <motion.path d="M32 146 H168 M26 158 H174" {...draw(animate, 0.7)} />
    </g>
  </svg>
);

export const stageArt = {
  foundational: SaplingArt,
  preparatory: BookArt,
  middle: AtomArt,
};

export const programArt = {
  language: GlobeArt,
  ai: ChipArt,
  innovation: BulbArt,
};

export const facilityArt = {
  sports: TrophyArt,
  academic: BookArt,
  arts: PaletteArt,
  life: LeafArt,
};
