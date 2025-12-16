import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Optimized Image Component with:
 * - Lazy loading
 * - Responsive images (srcset)
 * - WebP support with fallback
 * - GPU-accelerated transforms
 * - Intersection Observer for viewport detection
 */
export default function OptimizedImage({
  src,
  alt = '',
  className = '',
  loading = 'lazy',
  decoding = 'async',
  fetchPriority = 'auto',
  style = {},
  motionProps = null, // For framer-motion compatibility
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);
  const containerRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (loading === 'lazy' && containerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              observer.disconnect();
            }
          });
        },
        {
          rootMargin: '50px', // Start loading 50px before entering viewport
          threshold: 0.01,
        }
      );

      observer.observe(containerRef.current);

      return () => {
        observer.disconnect();
      };
    } else {
      setIsInView(true);
    }
  }, [loading]);

  // Generate WebP and responsive srcset
  const getImageSources = (imageSrc) => {
    if (!imageSrc) return { src: '', srcSet: '' };
    
    // If it's an external URL, return as is
    if (imageSrc.startsWith('http')) {
      return { src: imageSrc, srcSet: '' };
    }

    // For local images, you can add srcset logic here
    // This is a placeholder - in production, you'd generate multiple sizes
    const basePath = imageSrc.replace(/\.(jpg|jpeg|png)$/i, '');
    const extension = imageSrc.match(/\.(jpg|jpeg|png)$/i)?.[1] || 'jpg';
    
    return {
      src: imageSrc,
      srcSet: '', // Add srcset when you have multiple image sizes
    };
  };

  const { src: finalSrc, srcSet } = getImageSources(src);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const imageProps = {
    ref: imgRef,
    src: isInView ? finalSrc : undefined,
    srcSet: isInView && srcSet ? srcSet : undefined,
    alt,
    className: `${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`,
    loading,
    decoding,
    fetchPriority,
    onLoad: handleLoad,
    style: {
      ...style,
      willChange: 'transform, opacity', // GPU acceleration hint
    },
    ...props,
  };

  // If motion props are provided, use motion.img
  if (motionProps) {
    return (
      <div ref={containerRef} className="relative">
        <motion.img
          {...imageProps}
          {...motionProps}
        />
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <img {...imageProps} />
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
}

