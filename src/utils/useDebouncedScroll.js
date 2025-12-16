import { useEffect, useState, useRef } from 'react';

/**
 * Debounced scroll hook for performance optimization
 * Reduces scroll event frequency to improve performance
 */
export function useDebouncedScroll(callback, delay = 16) {
  const timeoutRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Cancel previous timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Use requestAnimationFrame for smooth updates
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        timeoutRef.current = setTimeout(() => {
          callback();
        }, delay);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [callback, delay]);
}

/**
 * Debounced resize hook for performance optimization
 */
export function useDebouncedResize(callback, delay = 150) {
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback();
      }, delay);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [callback, delay]);
}

/**
 * Optimized scroll position hook with throttling
 */
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return scrollY;
}

