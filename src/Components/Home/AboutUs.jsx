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
  const scrollEnd = 0.7;

  // ✨ Smooth entrance (from bottom)
  const y = useTransform(scrollYProgress, [0, 0.15 * scrollEnd], [150, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.1 * scrollEnd], [0, 1]);

  // ↔️ Image motion (finish early at 70%)
  // 📱 Responsive offset for mobile screens - memoized to avoid recalculation
  const [mobileOffset, setMobileOffset] = React.useState(350);
  
  React.useEffect(() => {
    const updateOffset = () => {
      setMobileOffset(window.innerWidth < 640 ? 120 : 350);
    };
    updateOffset();
    window.addEventListener('resize', updateOffset, { passive: true });
    return () => window.removeEventListener('resize', updateOffset);
  }, []);

  // ↔️ Image motion (finish early at 70%)
  const leftX = useTransform(scrollYProgress, [0.15, scrollEnd], [0, -mobileOffset]);
  const rightX = useTransform(scrollYProgress, [0.15, scrollEnd], [0, mobileOffset]);

  // 🔄 Rotation animation synced & capped
  const leftRotate = useTransform(scrollYProgress, [0, 0.15, scrollEnd], [-12, -10, -20]);
  const rightRotate = useTransform(scrollYProgress, [0, 0.15, scrollEnd], [12, 10, 20]);

  // 🎯 Center image subtle zoom
  const centerScale = useTransform(scrollYProgress, [0.15, scrollEnd], [1, 1.07]);

  return (
    <div
      ref={ref}
      className="h-auto sm:min-h-[180vh] w-full flex flex-col justify-center items-center pt-20 sm:py-20 bg-white overflow-hidden"
    >
      <div className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[70%] text-center">
        {/* Heading Text */}
        <ScrollWordReveal
          className="heading-text text-3xl sm:text-4xl md:text-6xl leading-snug font-bold text-[#0b1521]"
        />

        {/* Scroll-Aware Image Layout */}
        <motion.div
          style={{ y, opacity }}
          className="relative flex justify-center items-center w-full h-[350px] sm:h-[450px] md:h-[500px] lg:h-[600px] mt-[100px] sm:mt-[130px] md:mt-[150px]"
        >
          {/* Left Image */}
          <motion.img
            src="/Images/about_1.jpg"
            alt="Left"
            loading="lazy"
            decoding="async"
            style={{ x: leftX, rotate: leftRotate, willChange: 'transform' }}
            className="absolute w-auto h-[220px] sm:h-[320px] md:h-[420px] lg:h-[500px] rounded-2xl shadow-xl z-0"
          />

          {/* Center Image */}
          <motion.img
            src="/Images/about_2.jpg"
            alt="Center"
            loading="lazy"
            decoding="async"
            style={{ scale: centerScale, willChange: 'transform' }}
            className="absolute w-auto h-[300px] sm:h-[420px] md:h-[520px] lg:h-[600px] rounded-2xl shadow-2xl z-10"
          />

          {/* Right Image */}
          <motion.img
            src="/Images/about_3.jpg"
            alt="Right"
            loading="lazy"
            decoding="async"
            style={{ x: rightX, rotate: rightRotate, willChange: 'transform' }}
            className="absolute w-auto h-[220px] sm:h-[320px] md:h-[420px] lg:h-[500px] rounded-2xl shadow-xl z-0"
          />
        </motion.div>
      </div>
    </div>
  );
}
