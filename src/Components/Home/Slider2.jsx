import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "Design",
    subtitle: "A Beautiful Studio",
    description:
      "The perfect interior brings an emotion to every space — elegant, minimal, and timeless.",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1920&q=80",
  },
  {
    title: "Architecture",
    subtitle: "Inspired Spaces",
    description:
      "Merging creativity with precision to craft architectural excellence that inspires.",
    image:
      "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1920&q=80",
  },
  {
    title: "Innovation",
    subtitle: "Modern Approach",
    description:
      "Pushing boundaries through innovation, blending design and technology seamlessly.",
    image:
      "https://images.unsplash.com/photo-1505691723518-36a1aa832d53?auto=format&fit=crop&w=1920&q=80",
  },
];

export default function ModernSlider() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

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

  const variants = {
    enter: (dir) => ({
      y: dir > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.05,
      filter: "blur(10px)",
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: [0.55, 0.05, 0.1, 0.9],
      },
    },
    exit: (dir) => ({
      y: dir > 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.95,
      filter: "blur(10px)",
      transition: {
        duration: 1.2,
        ease: [0.55, 0.05, 0.1, 0.9],
      },
    }),
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          {/* BACKGROUND IMAGE */}
          <motion.img
            src={slides[index].image}
            alt="slide"
            className="w-full h-full object-cover"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6, ease: "easeOut" }}
          />

          {/* SLIDING OVERLAY DIV (adds cinematic transition) */}
          <motion.div
            key={`overlay-${index}`}
            initial={{ y: "100%" }}
            animate={{ y: "-100%" }}
            transition={{
              duration: 1.4,
              ease: [0.6, 0.05, 0.01, 0.9],
            }}
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent z-10"
          />

          {/* TEXT CONTAINER */}
          <div className="absolute inset-0 flex items-center justify-center text-center z-20">
            <motion.div
              key={`text-${index}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{
                duration: 1,
                delay: 0.3,
                ease: [0.45, 0, 0.55, 1],
              }}
              className="max-w-4xl px-8"
            >
              <div className="mb-5">
                <motion.span
                  key={`sub-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="px-6 py-2 border border-white/30 rounded-full text-white/80 text-sm uppercase tracking-[0.3em] backdrop-blur-sm"
                >
                  {slides[index].subtitle}
                </motion.span>
              </div>

              <motion.h1
                key={`title-${index}`}
                initial={{ opacity: 0, y: 80, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -60, scale: 1.05 }}
                transition={{ duration: 1.2, ease: [0.6, 0.05, 0.01, 0.9] }}
                className="text-[8rem] md:text-[10rem] font-black leading-none text-white mb-8"
              >
                {slides[index].title}
              </motion.h1>

              <motion.p
                key={`desc-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-gray-300 text-xl md:text-2xl leading-relaxed font-light"
              >
                {slides[index].description}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* BUTTONS */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex items-center gap-8 z-30">
        <button
          onClick={prevSlide}
          className="w-14 h-14 border border-white/30 rounded-full flex items-center justify-center hover:bg-white/10 hover:border-white transition-all"
        >
          <span className="text-white text-3xl">‹</span>
        </button>

        <div className="flex items-center gap-3 text-white/60">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <div className="w-16 h-px bg-white/30" />
          <span>{String(slides.length).padStart(2, "0")}</span>
        </div>

        <button
          onClick={nextSlide}
          className="w-14 h-14 border border-white/30 rounded-full flex items-center justify-center hover:bg-white/10 hover:border-white transition-all"
        >
          <span className="text-white text-3xl">›</span>
        </button>
      </div>

      {/* DOT INDICATORS */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-30">
        {slides.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
            className="relative w-3 h-3 rounded-full"
            whileHover={{ scale: 1.3 }}
          >
            <motion.div
              animate={{
                scale: i === index ? 1.5 : 1,
                opacity: i === index ? 1 : 0.4,
              }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 rounded-full bg-white"
            />
          </motion.button>
        ))}
      </div>

      {/* CORNER BRANDING */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="absolute top-12 left-12 z-30"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-white/40 backdrop-blur-sm" />
          <div className="text-white font-light tracking-wider">STUDIO</div>
        </div>
      </motion.div>
    </div>
  );
}
