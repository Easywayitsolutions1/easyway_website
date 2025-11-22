import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ProjectShowcase() {
  const containerRef = useRef(null);

  const projects = [
    { title: "Project One", image: "/Images/project_1.png" },
    { title: "Project Two", image: "/Images/project_2.png" },
    { title: "Project Three", image: "/Images/project_3.png" },
    { title: "Project Four", image: "/Images/project_4.png" },
  ];

  return (
    <div ref={containerRef} className="min-h-screen w-full px-6 py-20">
      <div className="flex flex-col gap-32">
        {projects.map((item, index) => (
          <ProjectCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ item }) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"], // smoother & slower scroll window
  });

  // ⭐ Slower, smoother scroll transforms
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 1], [120, -120]); // slower upward movement
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.35, 1, 1, 0.35]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, y, opacity }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="
        w-[95%] mx-auto
        overflow-hidden rounded-3xl
        bg-neutral-900 border border-neutral-700
        shadow-2xl relative cursor-pointer
      "
    >
      <div className="w-full h-[500px] overflow-hidden relative">
        <motion.img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
          style={{
            scale: useTransform(scrollYProgress, [0, 1], [1.25, 1]) // slow zoom reveal
          }}
        />

        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.9,        // smooth fade in
              ease: "easeOut"
            }}
            className="absolute inset-0 flex items-center justify-center bg-black/40 overflow-hidden"
          >
            <div className="relative w-full">
              <motion.div
                className="flex whitespace-nowrap"
                animate={{ x: [0, -1200] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30, // slower scrolling
                    ease: "linear",
                  },
                }}
              >
                {[...Array(20)].map((_, i) => (
                  <span
                    key={i}
                    className="text-7xl font-black text-white mx-8"
                  >
                    {item.title}
                  </span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}

      </div>

      <div className="p-8">
        <h2 className="text-white text-4xl font-bold">{item.title}</h2>
      </div>
    </motion.div>
  );
}
