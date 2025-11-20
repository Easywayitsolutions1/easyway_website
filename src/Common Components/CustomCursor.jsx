"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  // Smooth follow effect (ring)
  const springX = useSpring(0, { stiffness: 150, damping: 20 });
  const springY = useSpring(0, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const move = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      springX.set(e.clientX);
      springY.set(e.clientY);
    };

    window.addEventListener("mousemove", move);

    // Hover detection
    const hoverables = document.querySelectorAll("a, button, .cursor-hover");

    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", () => setHovering(true));
      el.addEventListener("mouseleave", () => setHovering(false));
    });

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      {/* Center Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          scale: hovering ? 0.5 : 1,
        }}
        style={{
          x: mousePos.x - 4,
          y: mousePos.y - 4,
        }}
      >
        <div className="w-2 h-2 bg-black rounded-full" />
      </motion.div>

      {/* Smooth Follow Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: springX.get() - 15,
          y: springY.get() - 15,
        }}
        animate={{
          scale: hovering ? 1.8 : 1,
          opacity: hovering ? 0.7 : 1,
        }}
      >
        <div className="w-[30px] h-[30px] rounded-full border-[2px] border-black"></div>
      </motion.div>
    </>
  );
}
