import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollWordReveal from "../../Common Components/ScrollWordReveal";

export default function About2() {
  const ref = useRef(null);

  // Track scroll progress relative to this section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"], // animation starts when section enters viewport
  });

  // Animate Y & opacity for whole group entrance
  const y = useTransform(scrollYProgress, [0, 0.3], [150, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  // Left & right image horizontal movement
  const leftX = useTransform(scrollYProgress, [0.3, 1], [0, -700]);
  const rightX = useTransform(scrollYProgress, [0.3, 1], [0, 700]);

  // Increased rotation (more tilt by default + stronger at end)
  const leftRotate = useTransform(scrollYProgress, [0, 0.3, 1], [-12, -10, -18]);
  const rightRotate = useTransform(scrollYProgress, [0, 0.3, 1], [12, 10, 18]);

  // Center image stays with slight zoom
  const centerScale = useTransform(scrollYProgress, [0.3, 1], [1, 1.05]);

  return (
    <div className="min-h-[120vh] w-full flex flex-col justify-center items-center py-20 bg-[#0d1117] overflow-hidden">
      <div className="w-[50%] max-w-[800px] text-center">
        {/* Scroll Word Reveal Text */}
        <ScrollWordReveal
          className="heading-text text-5xl leading-snug font-semibold text-white"
        />

        {/* Scroll-Aware Image Layout */}
        <motion.div
          ref={ref}
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
