import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SEO from "../../Common Components/SEO";
import Footer from "../../Common Components/Footer";
import Header from "../../Common Components/Header";

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
      title: "Coming Soon",
      image: "/Images/project_3.png",
      link: null 
    },
    {
      title: "Coming Soon",
      image: "/Images/project_4.png",
      link: null 
    },
  ];

  return (
    <>
      <Header />
      <SEO
        title="Our Projects - Web Development & Software Development Portfolio | EasyWay IT Solutions Rajkot"
        description="View our portfolio of successful web development, software development, UI/UX design, and video editing projects. EasyWay IT Solutions - Best IT company in Rajkot, Gujarat."
        keywords="Web development projects Rajkot, Software development portfolio Rajkot, UI/UX design projects, Website development examples, IT solutions portfolio, Best IT company projects Rajkot"
        canonicalUrl="https://easywayitsolutions.com/projects"
      />
      <div ref={containerRef} className="min-h-screen w-full px-6 py-20">
        <div className="flex flex-col gap-32">
          {projects.map((item, index) => (
            <ProjectCard key={index} item={item} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

function ProjectCard({ item }) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.35, 1, 1, 0.35]);

  // ✅ Click Handler Function
  const handleClick = () => {
    if (item.link) {
      window.open(item.link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.div
      ref={ref}
      style={{ scale, y, opacity }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className={`
        w-[95%] mx-auto
        overflow-hidden rounded-3xl
        bg-neutral-900 border border-neutral-700
        shadow-2xl relative
        ${item.link ? 'cursor-pointer' : 'cursor-default'}
        transition-transform duration-300 hover:scale-[1.02]
      `}
    >
      <div className="w-full h-[500px] overflow-hidden relative">
        <motion.img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
          style={{
            scale: useTransform(scrollYProgress, [0, 1], [1.25, 1])
          }}
        />

        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.9,
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

        {/* ✅ View Project Button with Service Page Hover Effect */}
        {isHovered && item.link && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-6 right-6 z-10"
          >
            <button className="group relative inline-block px-6 py-3 rounded-xl text-base font-semibold border-2 border-white text-white hover:text-black overflow-hidden transition-colors duration-500">
              <span className="relative z-[2] flex items-center gap-2">
                View Project
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
              <span className="absolute z-[1] top-full left-full w-[250px] h-[150px] bg-white rounded-full transition-all duration-700 ease-in-out group-hover:top-[-30px] group-hover:left-[-30px]" />
            </button>
          </motion.div>
        )}
      </div>

      <div className="p-8">
        <h2 className="text-white text-4xl font-bold">{item.title}</h2>
        {item.link && (
          <p className="text-gray-400 text-sm mt-2">Click to visit website →</p>
        )}
      </div>
    </motion.div>
  );
}