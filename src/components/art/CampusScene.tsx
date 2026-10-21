import React from 'react';
import { motion, MotionValue, useTransform, useMotionValue } from 'framer-motion';

// Hand-built dusk illustration of the campus. Each <motion.g> is a depth layer;
// parents pass normalised pointer (-1..1) and scroll (0..1) values and the
// layers drift by different amounts to create the parallax.

interface Props {
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  scroll?: MotionValue<number>;
  className?: string;
  /** Hide the foreground trees, e.g. for short page banners */
  compact?: boolean;
  /** Slide the sun and campus right (viewBox units) to clear room for text on wide screens */
  buildingOffset?: number;
}

const STARS = [
  [120, 90, 1.4], [260, 160, 1], [410, 70, 1.6], [530, 210, 0.9], [690, 120, 1.2], [880, 60, 1],
  [960, 180, 1.5], [1180, 90, 1.1], [1320, 200, 1.3], [1450, 110, 1], [1540, 240, 0.8], [80, 260, 1],
  [340, 300, 0.8], [780, 260, 0.9], [1240, 300, 0.8], [600, 40, 1.1], [1400, 30, 1.2], [1020, 330, 0.7],
];

const Shikhara: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x="-22" y="-6" width="44" height="10" />
    <path d="M-18 -6 C -16 -34, -8 -62, 0 -84 C 8 -62, 16 -34, 18 -6 Z" />
    <path d="M-34 -6 C -32 -20, -28 -32, -24 -40 C -20 -32, -16 -20, -14 -6 Z" />
    <path d="M14 -6 C 16 -20, 20 -32, 24 -40 C 28 -32, 32 -20, 34 -6 Z" />
    <circle cx="0" cy="-90" r="4" />
    <rect x="-0.8" y="-110" width="1.6" height="18" />
  </g>
);

const Window: React.FC<{ x: number; y: number; lit?: boolean; arch?: boolean }> = ({ x, y, lit, arch }) =>
  arch ? (
    <path
      d={`M${x} ${y + 34} V${y + 10} a9 9 0 0 1 18 0 V${y + 34} Z`}
      fill={lit ? 'url(#cs-window)' : '#1A3057'}
      opacity={lit ? 1 : 0.9}
    />
  ) : (
    <rect x={x} y={y} width="16" height="24" rx="1.5" fill={lit ? 'url(#cs-window)' : '#1A3057'} />
  );

const CampusScene: React.FC<Props> = ({ pointerX, pointerY, scroll, className, compact, buildingOffset = 0 }) => {
  const zero = useMotionValue(0);
  const s = scroll ?? zero;

  // depth layers: 0 = sky (moves least) .. 1 = foreground (moves most)
  const skyX = useTransform(pointerX, (v) => v * -6);
  const sunX = useTransform(pointerX, (v) => v * -12);
  const sunY = useTransform([pointerY, s] as MotionValue[], ([p, sc]: number[]) => p * -6 + sc * 160);
  const farX = useTransform(pointerX, (v) => v * -18);
  const farY = useTransform([pointerY, s] as MotionValue[], ([p, sc]: number[]) => p * -4 + sc * 90);
  const midX = useTransform(pointerX, (v) => v * -30);
  const midY = useTransform([pointerY, s] as MotionValue[], ([p, sc]: number[]) => p * -6 + sc * 50);
  const nearX = useTransform(pointerX, (v) => v * -55);
  const nearY = useTransform([pointerY, s] as MotionValue[], ([p, sc]: number[]) => p * -10 + sc * 10);

  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        <linearGradient id="cs-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#060F21" />
          <stop offset="0.45" stopColor="#0E2145" />
          <stop offset="0.72" stopColor="#2A3A62" />
          <stop offset="0.9" stopColor="#7B6A55" />
          <stop offset="1" stopColor="#C9A055" />
        </linearGradient>
        <radialGradient id="cs-glow" cx="0.66" cy="0.7" r="0.5">
          <stop offset="0" stopColor="#F5EBCC" stopOpacity="0.55" />
          <stop offset="0.35" stopColor="#D2AA48" stopOpacity="0.22" />
          <stop offset="1" stopColor="#D2AA48" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cs-sun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FBF7EC" />
          <stop offset="0.5" stopColor="#ECD89C" />
          <stop offset="1" stopColor="#D2AA48" />
        </linearGradient>
        <linearGradient id="cs-window" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F5EBCC" />
          <stop offset="1" stopColor="#D2AA48" />
        </linearGradient>
        <linearGradient id="cs-path" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#E0C06A" stopOpacity="0.9" />
          <stop offset="1" stopColor="#E0C06A" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="cs-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.6" stopColor="#060F21" stopOpacity="0" />
          <stop offset="1" stopColor="#060F21" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <motion.g style={{ x: skyX }}>
        <rect x="-100" y="0" width="1800" height="900" fill="url(#cs-sky)" />
        <rect x="-100" y="0" width="1800" height="900" fill="url(#cs-glow)" />
        {STARS.map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="#FBF7EC" opacity={0.35 + (i % 4) * 0.12}>
            <animate attributeName="opacity" values="0.2;0.9;0.2" dur={`${3 + (i % 5)}s`} begin={`${i * 0.3}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </motion.g>

      {/* Sun with concentric rings, echoing the crest */}
      <motion.g style={{ x: sunX, y: sunY }}>
        <g transform={`translate(${buildingOffset * 0.6} 0)`}>
        {[330, 260, 205].map((r, i) => (
          <circle key={r} cx="1060" cy="600" r={r} fill="none" stroke="#E0C06A" strokeOpacity={0.08 + i * 0.05} strokeWidth="1" />
        ))}
        <circle cx="1060" cy="600" r="150" fill="url(#cs-sun)" opacity="0.95" />
        </g>
      </motion.g>

      {/* Birds */}
      <g stroke="#FBF7EC" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7">
        {[
          [0, 300, 0], [40, 280, 1.5], [80, 310, 3],
        ].map(([dx, y, delay], i) => (
          <path key={i} d={`M${dx} ${y} q 7 -7 14 0 q 7 -7 14 0`}>
            <animateTransform attributeName="transform" type="translate" from="-80 0" to="1700 -60" dur="38s" begin={`${delay}s`} repeatCount="indefinite" />
          </path>
        ))}
      </g>

      {/* Far hills with temple spires of the Braj region */}
      <motion.g style={{ x: farX, y: farY }}>
        <path
          d="M-100 640 C 120 590 300 615 520 588 C 720 562 900 604 1100 580 C 1290 558 1440 596 1700 566 L1700 900 L-100 900 Z"
          fill="#22385F"
        />
        <g fill="#22385F">
          <Shikhara x={260} y={606} s={0.9} />
          <Shikhara x={1380} y={588} s={1.05} />
          <Shikhara x={1470} y={590} s={0.6} />
        </g>
        <path
          d="M-100 680 C 160 650 340 676 600 660 C 860 644 1040 676 1300 652 C 1460 638 1580 660 1700 648 L1700 900 L-100 900 Z"
          fill="#1A3057"
        />
      </motion.g>

      {/* Campus building */}
      <motion.g style={{ x: midX, y: midY }}>
        <g transform={`translate(${buildingOffset} 0)`}>
        <g fill="#0E1F3C">
          {/* wings */}
          <rect x="380" y="612" width="170" height="120" />
          <rect x="1050" y="612" width="170" height="120" />
          <rect x="370" y="604" width="190" height="10" />
          <rect x="1040" y="604" width="190" height="10" />
          {/* main block */}
          <rect x="520" y="560" width="560" height="172" />
          <rect x="508" y="550" width="584" height="12" />
          {/* clock tower */}
          <rect x="764" y="392" width="72" height="80" />
          <rect x="756" y="384" width="88" height="10" />
          <path d="M760 384 Q800 330 840 384 Z" />
          <rect x="798.5" y="300" width="3" height="40" />
          {/* portico */}
          <path d="M672 520 L800 456 L928 520 Z" />
          <rect x="664" y="518" width="272" height="16" />
          <rect x="680" y="712" width="240" height="8" />
          <rect x="668" y="720" width="264" height="8" />
          <rect x="656" y="728" width="288" height="8" />
        </g>
        {/* flag */}
        <path d="M801 302 h26 l-6 7 6 7 h-26 Z" fill="#D2AA48">
          <animate attributeName="d" values="M801 302 h26 l-6 7 6 7 h-26 Z;M801 303 h26 l-4 7 4 6 h-26 Z;M801 302 h26 l-6 7 6 7 h-26 Z" dur="2.4s" repeatCount="indefinite" />
        </path>
        {/* clock */}
        <circle cx="800" cy="428" r="20" fill="#0B1A33" stroke="#E0C06A" strokeWidth="2" />
        <path d="M800 428 V414 M800 428 L810 433" stroke="#E0C06A" strokeWidth="2" strokeLinecap="round" />
        {/* pediment ornament */}
        <circle cx="800" cy="494" r="9" fill="none" stroke="#E0C06A" strokeOpacity="0.8" strokeWidth="1.5" />
        {/* columns */}
        <g fill="#16294A">
          {[690, 730, 770, 814, 854, 894].map((x) => (
            <rect key={x} x={x} y="534" width="16" height="178" />
          ))}
        </g>
        <g fill="#0B1A33">
          {[690, 730, 770, 814, 854, 894].map((x) => (
            <rect key={x} x={x - 3} y="534" width="22" height="6" />
          ))}
        </g>
        {/* door */}
        <path d="M786 712 V662 a14 14 0 0 1 28 0 V712 Z" fill="url(#cs-window)" />
        {/* windows */}
        {[548, 584, 620].map((x, i) => (
          <React.Fragment key={x}>
            <Window x={x} y={584} lit={i !== 1} arch />
            <Window x={x} y={650} lit={i === 1} arch />
          </React.Fragment>
        ))}
        {[962, 998, 1034].map((x, i) => (
          <React.Fragment key={x}>
            <Window x={x} y={584} lit={i !== 2} arch />
            <Window x={x} y={650} lit arch />
          </React.Fragment>
        ))}
        {[402, 436, 470, 504].map((x, i) => (
          <React.Fragment key={x}>
            <Window x={x} y={636} lit={i % 2 === 0} />
            <Window x={x} y={680} lit={i !== 3} />
          </React.Fragment>
        ))}
        {[1076, 1110, 1144, 1178].map((x, i) => (
          <React.Fragment key={x}>
            <Window x={x} y={636} lit={i % 2 === 1} />
            <Window x={x} y={680} lit={i !== 0} />
          </React.Fragment>
        ))}
        <rect x="782" y="402" width="36" height="6" fill="url(#cs-window)" opacity="0.6" />
        </g>
      </motion.g>

      {/* Ground + golden path to the door */}
      <motion.g style={{ x: midX, y: midY }}>
        <path d="M-100 736 C 300 726 520 738 800 734 C 1080 730 1300 740 1700 728 L1700 900 L-100 900 Z" fill="#0A1830" />
        <path transform={`translate(${buildingOffset} 0)`} d="M800 736 C 790 790 700 840 560 900 L1040 900 C 900 840 810 790 800 736 Z" fill="url(#cs-path)" opacity="0.35" />
      </motion.g>

      {!compact && (
        <motion.g style={{ x: nearX, y: nearY }}>
          {/* Banyan tree, a nod to the Gurukul under the tree on the crest */}
          <g fill="#060F21">
            <rect x="196" y="610" width="30" height="230" rx="6" />
            <path d="M210 640 C 180 600 120 590 90 610" stroke="#060F21" strokeWidth="14" fill="none" strokeLinecap="round" />
            <path d="M216 630 C 250 590 320 590 352 606" stroke="#060F21" strokeWidth="12" fill="none" strokeLinecap="round" />
            {[
              [60, 560, 90], [150, 520, 110], [270, 515, 115], [380, 560, 85], [210, 470, 95],
              [100, 610, 60], [340, 615, 60], [-10, 600, 70], [450, 605, 50],
            ].map(([cx, cy, r], i) => (
              <ellipse key={i} cx={cx} cy={cy} rx={r} ry={r * 0.72} />
            ))}
            {[70, 110, 300, 345, 395].map((x, i) => (
              <rect key={x} x={x} y={600} width="2.5" height={150 + (i % 3) * 40} opacity="0.85" />
            ))}
          </g>
          {/* Cypress row on the right */}
          <g fill="#060F21">
            {[
              [1330, 1.0], [1395, 1.25], [1470, 0.95], [1540, 1.35], [1610, 1.1],
            ].map(([x, sc]) => (
              <path
                key={x}
                transform={`translate(${x} 840) scale(${sc})`}
                d="M0 0 C -26 -40 -30 -120 -16 -170 C -8 -200 -2 -220 0 -236 C 2 -220 8 -200 16 -170 C 30 -120 26 -40 0 0 Z"
              />
            ))}
          </g>
          <path d="M-100 820 C 300 800 600 830 900 818 C 1200 806 1400 826 1700 806 L1700 900 L-100 900 Z" fill="#060F21" />
        </motion.g>
      )}

      <rect x="0" y="0" width="1600" height="900" fill="url(#cs-fade)" />
    </svg>
  );
};

export default CampusScene;
