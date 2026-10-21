import React from 'react';
import { motion, MotionValue, useMotionValue, useTransform } from 'framer-motion';
import { Photo } from '../../data/photos';
import { Mandala } from './Illustrations';

// Photographic counterpart to CampusScene: the photo drifts slowly against the
// pointer and scroll while a gold ring layer moves the opposite way for depth.

interface Props {
  photo: Photo;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  scroll?: MotionValue<number>;
  className?: string;
  /** Hide the ring overlay, e.g. inside small frames */
  plain?: boolean;
}

const PhotoLayer: React.FC<Props> = ({ photo, pointerX, pointerY, scroll, className = '', plain }) => {
  const zero = useMotionValue(0);
  const s = scroll ?? zero;
  const x = useTransform(pointerX, (v) => v * -18);
  const y = useTransform([pointerY, s] as MotionValue[], ([p, sc]: number[]) => p * -10 + sc * 140);
  const ringX = useTransform(pointerX, (v) => v * 30);
  const ringY = useTransform(pointerY, (v) => v * 30);

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden={plain ? undefined : true}>
      <motion.img
        src={photo.src}
        alt={photo.alt}
        style={{ x, y, objectPosition: photo.focus ?? '50% 50%' }}
        initial={{ scale: 1.18, opacity: 0 }}
        animate={{ scale: 1.1, opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {!plain && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-ink-950/40" />
          <motion.div style={{ x: ringX, y: ringY }} className="pointer-events-none absolute -right-40 top-1/2 h-[46rem] w-[46rem] -translate-y-1/2 text-gold-300/15">
            <Mandala className="h-full w-full animate-spin-slow" />
          </motion.div>
        </>
      )}
    </div>
  );
};

export default PhotoLayer;
