import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScrollTheme } from './ScrollContext';

export default function ScrollToTop() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { theme } = useScrollTheme();
  
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = window.pageYOffset;
      const progress = (scrolled / scrollHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
      className="fixed right-4 top-1/2 -translate-y-1/2 z-[9999]"
    >
      <div 
        className="flex flex-col items-center gap-4 cursor-pointer group"
        onClick={scrollToTop}
      >
        {/* Vertical Line Container */}
        <div className="relative h-40 w-[2px]">
          {/* Background Line */}
          <div 
            className={`absolute inset-0 rounded-full transition-colors duration-300 ${
              isDark ? 'bg-white/30' : 'bg-black/30'
            }`}
          />
          
          {/* Progress Line */}
          <motion.div
            className={`absolute bottom-0 left-0 right-0 rounded-full origin-bottom transition-colors duration-300 ${
              isDark ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'bg-black shadow-[0_0_10px_rgba(0,0,0,0.3)]'
            }`}
            style={{
              height: `${scrollProgress}%`,
            }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          />
        </div>

        {/* Vertical Text */}
        <div 
          className={`text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
            isDark ? 'text-white' : 'text-black'
          } group-hover:tracking-[0.25em]`}
          style={{ 
            writingMode: 'vertical-rl', 
            textOrientation: 'mixed',
            letterSpacing: '0.15em',
            textShadow: isDark ? '0 2px 4px rgba(0, 0, 0, 0.5)' : '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
        >
          SCROLL TO TOP
        </div>
      </div>
    </motion.div>
  );
}