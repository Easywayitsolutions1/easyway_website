import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function ProjectShowcase() {
  const containerRef = useRef(null);

  const projects = [
    {
      title: "Plazer Associates",
      image: "/Images/project_1.png",
      link: "https://plazerassociates.com"
    },
    {
      title: "CB Imitation Jewellery",
      image: "/Images/project_2.png",
      link: "https://cbimitation.com"
    },
    {
      title: "Ambition Pipes",
      image: "/Images/project_3.png",
      link: "https://www.ambitionpipes.com"
    },
    {
      title: "Estrella Metals",
      image: "/Images/project_4.png",
      link: "https://www.estrellametals.com"
    },
  ];

  return (
    <div ref={containerRef} className="min-h-screen w-full px-6 py-20">

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .circle-marquee {
          animation: marquee 6s linear infinite;
        }
      `}</style>

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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.35, 1, 1, 0.35]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={ref}
      style={{ scale, y, opacity }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={() => {
        if (item.link) {
          window.open(item.link, "_blank");
        }
      }}
      className="
        w-[95%] mx-auto
        overflow-hidden rounded-3xl border border-neutral-700
        shadow-2xl relative cursor-pointer
      "
    >


      {/* Mouse-follow circle */}
      {isHovered && (
        <motion.div
          className="pointer-events-none absolute z-50 flex items-center justify-center"
          style={{
            left: mousePos.x - 75,
            top: mousePos.y - 75,
            width: 150,
            height: 150,
          }}
        >
          <div className="relative w-full h-full">
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/70 overflow-hidden flex items-center justify-center bg-black backdrop-blur-md"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
            >
              <div className="absolute w-[300%] whitespace-nowrap circle-marquee text-white text-[30px] font-black">
                {`View Project — `.repeat(20)}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      <div className="w-full h-full overflow-hidden relative">
        <motion.img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
          style={{
            scale: useTransform(scrollYProgress, [0, 1], [1, 1])
          }}
        />

        {/* Overlay marquee */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.6,
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
                    duration: 30,
                    ease: "linear",
                  },
                }}
              >
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="mx-6 inline-flex items-center gap-6 whitespace-nowrap">
                    <span className="heading-text text-8xl font-black text-white leading-none flex items-center">
                      {item.title}
                    </span>

                    <ArrowUpRight className="w-16 h-16 text-white flex-shrink-0" strokeWidth={5} />
                  </div>

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
