import { Variants } from 'framer-motion';

// Detect if the device is mobile/tablet based on screen width
const isMobile = () => typeof window !== 'undefined' && window.innerWidth <= 768;

// Slide animations with reduced movement for mobile
export const slideInLeft: Variants = {
  hidden: {
    x: isMobile() ? -20 : -100,
    opacity: 0
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: isMobile() ? 0.2 : 0.4,
      duration: isMobile() ? 0.5 : 0.8
    }
  }
};

export const slideInRight: Variants = {
  hidden: {
    x: isMobile() ? 20 : 100,
    opacity: 0
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: isMobile() ? 0.2 : 0.4,
      duration: isMobile() ? 0.5 : 0.8
    }
  }
};

export const slideInTop: Variants = {
  hidden: {
    y: isMobile() ? -20 : -100,
    opacity: 0
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: isMobile() ? 0.2 : 0.4,
      duration: isMobile() ? 0.5 : 0.8
    }
  }
};

// Fade animations optimized for mobile
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: isMobile() ? 0.3 : 0.5
    }
  }
};

// Scale animations with reduced intensity for mobile
export const scaleUp: Variants = {
  hidden: {
    scale: isMobile() ? 0.95 : 0.8,
    opacity: 0
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: isMobile() ? 0.1 : 0.3,
      duration: isMobile() ? 0.4 : 0.6
    }
  }
};

// Stagger container for list items
export const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: isMobile() ? 0.1 : 0.2,
      delayChildren: isMobile() ? 0.1 : 0.3
    }
  }
};

// Stagger item with reduced animation for mobile
export const staggerItem: Variants = {
  hidden: {
    y: isMobile() ? 10 : 20,
    opacity: 0
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: isMobile() ? 0.1 : 0.3,
      duration: isMobile() ? 0.3 : 0.5
    }
  }
};

// Hover animations optimized for touch devices
export const hoverScale = {
  scale: isMobile() ? 1.02 : 1.05,
  transition: {
    type: "spring",
    bounce: isMobile() ? 0.2 : 0.4,
    duration: 0.3
  }
};

// Reduced motion preference check
export const shouldReduceMotion = () => 
  typeof window !== 'undefined' && 
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Animation variants that respect reduced motion preference
export const getAccessibleAnimationVariants = (variants: Variants): Variants => {
  if (shouldReduceMotion()) {
    return {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: { duration: 0.3 }
      }
    };
  }
  return variants;
};
