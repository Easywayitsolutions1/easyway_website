import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "Development",
    subtitle: "Building Digital Experiences",
    description:
      "Clean code, modern frameworks, and seamless performance — we develop digital products that don’t just work beautifully, they feel effortless.",
    image: "/Images/slide1.png",
  },
  {
    title: "Designing",
    subtitle: "Crafting Visual Impact",
    description:
      "Every design tells a story — from sleek user interfaces to bold brand visuals. We turn concepts into timeless visuals that captivate and connect.",
    image: "/Images/slide2.png",
  },
  {
    title: "Video Editing",
    subtitle: "Motion that Inspires",
    description:
      "Through cinematic storytelling, transitions, and rhythm — we edit visuals that move emotions, crafting stories that stay in memory long after they end.",
    image: "/Images/slide3.png",
  },
];

export default function AdvancedSlider() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // Spotlight refs
  const titleRef = useRef(null);
  const spotlightRef = useRef(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const smoothRef = useRef({ x: 0, y: 0 });
  const activeRef = useRef(false);

  const nextSlide = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => nextSlide(), 7000);
    return () => clearInterval(timer);
  }, []);

  // Ultra-smooth spotlight animation (pure DOM-based)
  useEffect(() => {
    let anim;
    const follow = () => {
      const dx = targetRef.current.x - smoothRef.current.x;
      const dy = targetRef.current.y - smoothRef.current.y;
      smoothRef.current.x += dx * 0.12;
      smoothRef.current.y += dy * 0.12;

      if (activeRef.current && spotlightRef.current) {
        const el = spotlightRef.current;
        el.style.left = `${smoothRef.current.x}px`;
        el.style.top = `${smoothRef.current.y}px`;
      }

      anim = requestAnimationFrame(follow);
    };
    anim = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(anim);
  }, []);

  const handleMouseMove = (e) => {
    if (!titleRef.current) return;
    const rect = titleRef.current.getBoundingClientRect();
    targetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    activeRef.current = true;
    if (spotlightRef.current) spotlightRef.current.style.opacity = 1;
  };

  const handleMouseLeave = () => {
    activeRef.current = false;
    if (spotlightRef.current) spotlightRef.current.style.opacity = 0;
  };

  // Reset spotlight on slide change
  useEffect(() => {
    activeRef.current = false;
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = 0;
    }
  }, [index]);

  // Motion Variants
  const slideVariants = {
    initial: (dir) => ({
      y: dir > 0 ? "-120%" : "120%",
      opacity: 0.6,
      scale: 1.03,
    }),
    animate: {
      y: "0%",
      opacity: 1,
      scale: 1,
      transition: { duration: 3, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (dir) => ({
      y: dir > 0 ? "100%" : "-100%",
      opacity: 0.6,
      scale: 0.98,
      transition: { duration: 3, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  };

  const imageVariants = {
    initial: { scale: 1.1 },
    animate: {
      scale: 1,
      transition: { duration: 2.2, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const subtitleVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.4 },
    },
    exit: { opacity: 0, y: -30, transition: { duration: 0.5 } },
  };

  const titleVariantsContainer = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.4 } },
    exit: { opacity: 0, transition: { staggerChildren: 0.04, staggerDirection: -1 } },
  };

  const titleWaveVariants = {
    initial: { y: 60, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
    exit: { y: -50, opacity: 0, transition: { duration: 0.45 } },
  };

  const descriptionVariants = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.9 } },
    exit: { opacity: 0, y: -40, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <AnimatePresence custom={direction} mode="popLayout">
        <motion.div
          key={index}
          custom={direction}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0"
        >
          <motion.div
            variants={imageVariants}
            initial="initial"
            animate="animate"
            className="absolute inset-0"
          >
            <img
              src={slides[index].image}
              alt={slides[index].title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent z-10" />

          <motion.div
            className="absolute inset-0 z-10"
            style={{
              background: "radial-gradient(circle at center, transparent 35%, black 100%)",
            }}
            animate={{ opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:pl-24 z-20 max-w-5xl">
            <motion.span
              key={`subtitle-${index}`}
              variants={subtitleVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="inline-block text-white/90 uppercase tracking-[0.28em] text-xs md:text-base px-4 py-2 border border-white/30 rounded-full backdrop-blur-md bg-white/5"
            >
              {slides[index].subtitle}
            </motion.span>

            {/* Ultra-smooth Spotlight Title */}
            <motion.h1
              ref={titleRef}
              key={`title-${index}`}
              className="relative text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none my-6 md:my-8 flex flex-wrap cursor-pointer select-none"
              style={{ textShadow: "0 15px 50px rgba(0,0,0,0.75)" }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              variants={titleVariantsContainer}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {/* smoother DOM element spotlight */}
              <span
                ref={spotlightRef}
                className="absolute pointer-events-none"
                style={{
                  left: 0,
                  top: 0,
                  width: "180px",
                  height: "180px",
                  borderRadius: "50%",
                  background: "white",
                  mixBlendMode: "difference",
                  opacity: 0,
                  transform: "translate(-50%, -50%)",
                  transition: "opacity 0.3s ease",
                  zIndex: 10,
                }}
              />

              {slides[index].title.split("").map((char, i) => (
                <motion.span key={`${index}-${i}`} variants={titleWaveVariants}>
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              key={`desc-${index}`}
              variants={descriptionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-gray-200 text-base md:text-xl leading-relaxed max-w-xl backdrop-blur-sm bg-black/20 p-4 md:p-5 rounded-xl shadow-2xl"
            >
              {slides[index].description}
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 1 }}
              className="h-0.5 w-28 md:w-32 bg-gradient-to-r from-white via-white/70 to-transparent mt-6 md:mt-8 origin-left"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6 md:gap-10 z-30">
        <motion.button
          onClick={prevSlide}
          whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.18)" }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.25 }}
          className="w-12 h-12 md:w-14 md:h-14 border-2 border-white/40 rounded-full flex items-center justify-center backdrop-blur-md bg-white/5 hover:border-white/60"
        >
          <span className="text-white text-2xl md:text-3xl font-light">‹</span>
        </motion.button>

        <div className="flex items-center gap-3 text-white/80 text-base md:text-lg font-light backdrop-blur-md bg-white/5 px-5 md:px-6 py-2 rounded-full border border-white/10">
          <AnimatePresence mode="wait">
            <motion.span
              key={`current-${index}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {String(index + 1).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
          <div className="w-12 md:w-16 h-px bg-white/40" />
          <span>{String(slides.length).padStart(2, "0")}</span>
        </div>

        <motion.button
          onClick={nextSlide}
          whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.18)" }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.25 }}
          className="w-12 h-12 md:w-14 md:h-14 border-2 border-white/40 rounded-full flex items-center justify-center backdrop-blur-md bg-white/5 hover:border-white/60"
        >
          <span className="text-white text-2xl md:text-3xl font-light">›</span>
        </motion.button>
      </div>
    </div>
  );
}