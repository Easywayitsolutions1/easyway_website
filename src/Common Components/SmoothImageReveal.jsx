import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function SmoothImageReveal({
  src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  alt = "Beautiful Scene",
  className = "",
  duration = 1.5,
  overlayColor = "#f3f4f6", // Tailwind gray-100
}) {
  const controls = useAnimation();
  const overlayControls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
      overlayControls.start("slide");
    }
  }, [inView, controls, overlayControls]);

  // Image reveal animation (clip-path + opacity + slight scale)
  const imageVariants = {
    hidden: {
      clipPath: "inset(0 100% 0 0)",
      opacity: 0.6,
      scale: 1.05,
    },
    visible: {
      clipPath: "inset(0 0% 0 0)",
      opacity: 1,
      scale: 1,
      transition: { duration, ease: [0.22, 0.8, 0.2, 1] },
    },
  };

  // Overlay wipe animation (left → right)
  const overlayVariants = {
    initial: { x: "0%" },
    slide: {
      x: "100%",
      transition: { duration: duration * 0.8, ease: [0.45, 0, 0.55, 1] },
    },
  };

  return (
    <div className="flex justify-center items-center min-h-[100vh] bg-gray-50">
      <div ref={ref} className="relative overflow-hidden rounded-2xl shadow-2xl" style={{ maxWidth: "720px" }}>
        {/* Image Reveal */}
        <motion.img
          src={src}
          alt={alt}
          className={`w-full object-cover ${className}`}
          initial="hidden"
          animate={controls}
          variants={imageVariants}
        />

        {/* Smooth overlay mask */}
        <motion.div
          className="absolute inset-0"
          style={{ backgroundColor: overlayColor }}
          initial="initial"
          animate={overlayControls}
          variants={overlayVariants}
        />
      </div>
    </div>
  );
}
