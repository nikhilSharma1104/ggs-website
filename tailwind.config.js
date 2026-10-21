/** @type {import('tailwindcss').Config} */

// Palette taken from the school crest: deep navy ribbon, antique gold shield, ivory paper.
const ink = {
  50: '#EEF2F8',
  100: '#D5DEEC',
  200: '#AABBD6',
  300: '#7A93BA',
  400: '#4E6C9C',
  500: '#2F4F82',
  600: '#223D69',
  700: '#1A3057',
  800: '#122445',
  900: '#0B1A33',
  950: '#060F21',
};

const gold = {
  50: '#FBF7EC',
  100: '#F5EBCC',
  200: '#ECD89C',
  300: '#E0C06A',
  400: '#D2AA48',
  500: '#BA9032',
  600: '#9A7326',
  700: '#795920',
  800: '#5B431B',
  900: '#3E2E14',
};

module.exports = {
  future: {
    // Touch screens keep :hover "stuck" after a tap; only apply hover styles where hover exists.
    hoverOnlyWhenSupported: true,
  },
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink,
        gold,
        // Legacy names kept so older components keep rendering in-palette.
        primary: ink,
        secondary: gold,
        ivory: { DEFAULT: '#FAF7F0', 100: '#F6F1E6', 200: '#EFE7D6', 300: '#E4D8BF' },
        maroon: { DEFAULT: '#7A1F2B', 600: '#651923' },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        devanagari: ['"Tiro Devanagari Hindi"', 'serif'],
        sans: ['Manrope', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        // Old pages referenced font-comic; map it to the body face instead of Comic Sans.
        comic: ['Manrope', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        eyebrow: '0.28em',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(11,26,51,0.04), 0 8px 24px -8px rgba(11,26,51,0.12)',
        lift: '0 2px 4px rgba(11,26,51,0.06), 0 24px 48px -16px rgba(11,26,51,0.28)',
        glow: '0 0 0 1px rgba(210,170,72,0.35), 0 12px 40px -12px rgba(210,170,72,0.45)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        shimmer: 'shimmer 3s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 60s linear infinite',
      },
    },
  },
  plugins: [],
};
