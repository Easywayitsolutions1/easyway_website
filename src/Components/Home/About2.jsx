import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollWordReveal from "../../Common Components/ScrollWordReveal";

export default function About2() {
  const ref = useRef(null);

  // 🧭 Scroll tracking (from section start to end)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // 🕹️ Animate only within 70% scroll range
  const scrollEnd = 0.7; // where animation finishes (70%)

  // ✨ Smooth entrance (from bottom)
  const y = useTransform(scrollYProgress, [0, 0.15 * scrollEnd], [150, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.1 * scrollEnd], [0, 1]);

  // ↔️ Image motion (finish early at 70%)
  const leftX = useTransform(scrollYProgress, [0.15, scrollEnd], [0, -350]);
  const rightX = useTransform(scrollYProgress, [0.15, scrollEnd], [0, 350]);

  // 🔄 Rotation animation synced & capped
  const leftRotate = useTransform(scrollYProgress, [0, 0.15, scrollEnd], [-12, -10, -20]);
  const rightRotate = useTransform(scrollYProgress, [0, 0.15, scrollEnd], [12, 10, 20]);

  // 🎯 Center image subtle zoom (complete by 70%)
  const centerScale = useTransform(scrollYProgress, [0.15, scrollEnd], [1, 1.07]);

  return (
    <div
      ref={ref}
      className="min-h-[160vh] w-full flex flex-col justify-center items-center py-20 bg-white overflow-hidden"
    >
      <div className="w-[50%] max-w-[800px] text-center">
        {/* Heading Text */}
        <ScrollWordReveal
          className="heading-text text-5xl leading-snug font-semibold text-black"
        />

        {/* Scroll-Aware Image Layout */}
        <motion.div
          style={{ y, opacity }}
          className="relative flex justify-center items-center w-full h-[500px] mt-[150px]"
        >
          {/* Left Image */}
          <motion.img
            src="/Images/about_1.webp"
            alt="Left"
            style={{ x: leftX, rotate: leftRotate }}
            className="absolute w-auto h-[500px] rounded-2xl shadow-xl z-0"
          />

          {/* Center Image */}
          <motion.img
            src="/Images/about_2.webp"
            alt="Center"
            style={{ scale: centerScale }}
            className="absolute w-auto h-[600px] rounded-2xl shadow-2xl z-10"
          />

          {/* Right Image */}
          <motion.img
            src="/Images/about_3.webp"
            alt="Right"
            style={{ x: rightX, rotate: rightRotate }}
            className="absolute w-auto h-[500px] rounded-2xl shadow-xl z-0"
          />
        </motion.div>
      </div>
    </div>
  );
}
