import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ImageOptimizerProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

const ImageOptimizer: React.FC<ImageOptimizerProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {
    // Only load non-priority images when they're close to the viewport
    if (!priority) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setImageSrc(src);
              observer.disconnect();
            }
          });
        },
        { rootMargin: '50px' }
      );

      const element = document.getElementById(`image-${src}`);
      if (element) {
        observer.observe(element);
      }

      return () => observer.disconnect();
    } else {
      setImageSrc(src);
    }
  }, [src, priority]);

  // Generate srcset for responsive images
  const generateSrcSet = () => {
    if (!width) return undefined;

    const sizes = [0.5, 1, 1.5, 2];
    return sizes
      .map((size) => {
        const w = Math.round(width * size);
        return `${src}?w=${w} ${w}w`;
      })
      .join(', ');
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setError(true);
    // Load a fallback image or show error state
  };

  return (
    <motion.div
      id={`image-${src}`}
      className={`relative overflow-hidden ${className}`}
      style={{ width: width ? `${width}px` : '100%', height: height ? `${height}px` : 'auto' }}
    >
      {imageSrc && (
        <motion.img
          src={imageSrc}
          alt={alt}
          srcSet={generateSrcSet()}
          sizes={width ? `${width}px` : '100vw'}
          className={`w-full h-full object-cover ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={handleLoad}
          onError={handleError}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          loading={priority ? 'eager' : 'lazy'}
        />
      )}

      {/* Loading state */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">Failed to load image</span>
        </div>
      )}
    </motion.div>
  );
};

export default ImageOptimizer;
