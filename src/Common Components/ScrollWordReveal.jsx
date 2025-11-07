import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* --------------------------------------------------------------
   SMOOTH SCROLL WORD REVEAL (Centered + Balanced Version)
   - Each word rises up & fades in gradually
   - Auto-expands height (no overflow issues)
   - Perfect for hero/about storytelling sections
-------------------------------------------------------------- */
export default function ScrollWordReveal({
  text = "At EasyWay IT Solutions we blend innovation with design to build powerful digital experiences that drive real growth.",
  className = "",
  distance = 50,
  smoothness = 0.6,
  baseOpacity = 0,
}) {
  const ref = useRef(null);

  // Track scroll progress relative to this section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 10%"],
  });

  const words = text.split(" ");

  return (
    <div
      ref={ref}
      className="flex flex-wrap justify-center text-center leading-snug font-semibold text-white"
      style={{
        overflow: "hidden",
        lineHeight: "1.5em",
        maxWidth: "100%", // Prevents horizontal overflow
        margin: "0 auto",
      }}
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;

        const opacity = useTransform(
          scrollYProgress,
          [start - smoothness, start, end],
          [baseOpacity, baseOpacity, 1],
          { clamp: true }
        );

        const y = useTransform(
          scrollYProgress,
          [start - smoothness, start, end],
          [distance, distance * 0.3, 0],
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
            {word}&nbsp;
          </motion.span>
        );
      })}
    </div>
  );
}
