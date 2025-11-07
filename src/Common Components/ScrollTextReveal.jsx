import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* --------------------------------------------------------------
   TRUE CONTINUOUS SCROLL-BOUND CHARACTER REVEAL (with base opacity)
   - Each character starts at 0.4 opacity
   - Smoothly increases to 1 as you scroll
   - GPU accelerated, partial reveal visible
-------------------------------------------------------------- */
export default function ScrollTextReveal({
  text = "We Create Digital Experiences that Transform Ideas into Impact.",
  className = "",
  distance = 40, // lift distance (px)
  smoothness = 0.25, // reveal curve softness
  baseOpacity = 0.4, // default opacity before reveal
}) {
  const ref = useRef(null);

  // Track scroll progress for the section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 15%"],
  });

  const chars = Array.from(text);

  return (
    <div
      ref={ref}
      className="flex flex-wrap leading-snug font-semibold text-white"
      style={{ overflow: "hidden", lineHeight: "1.1em" }}
    >
      {chars.map((char, i) => {
        const start = i / chars.length;
        const end = (i + 1) / chars.length;

        // Opacity: starts at baseOpacity, smoothly goes to 1, stays clamped
        const opacity = useTransform(
          scrollYProgress,
          [start - smoothness, start, end, end + smoothness],
          [baseOpacity, baseOpacity, 1, 1],
          { clamp: true }
        );

        // Subtle vertical lift (optional; currently no movement)
        const y = useTransform(
          scrollYProgress,
          [start - smoothness, start, end, end + smoothness],
          [distance * 0, 0, 0, 0],
          { clamp: true }
        );

        return (
          <motion.span
            key={i}
            style={{
              opacity,
              y,
              willChange: "opacity, transform",
              display: "inline-block",
            }}
            className={className}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        );
      })}
    </div>
  );
}
