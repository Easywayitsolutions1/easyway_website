import React, { useRef, useState } from "react";
import ScrollTextReveal from "../../Common Components/ScrollTextReveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react"; // <-- NEW ARROW ICON

export default function Services() {
  const cardsRef = useRef(null);

  // Scroll progress for entire cards section
  const { scrollYProgress } = useScroll({
    target: cardsRef,
    offset: ["start start", "end end"],
  });

  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Cursor follower state
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorDarkBg, setCursorDarkBg] = useState(true);
  const [spotlightText, setSpotlightText] = useState("");

  // true = dark bg, false = white bg

  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  const cards = [
    {
      id: "01",
      title: "Web Design & Development",
      image: "/Images/service_1.png",
      services: [
        "Custom Web Development (Static & Dynamic)",
        "E-Commerce Website Development",
        "Business Portfolio Websites",
        "Mobile-Responsive Design",
        "Website Maintenance & Updates",
      ],
    },
    {
      id: "02",
      title: "UI/UX & Graphic Design",
      image: "/Images/service_2.png",
      services: [
        "Logo Design",
        "Brochure & Flyer Design",
        "Visiting Card Design",
        "Social Media Post Design",
        "UI/UX Wireframing & Interface Design",
      ],
    },
    {
      id: "03",
      title: "Video Editing",
      image: "/Images/service_3.png",
      services: [
        "Business Promotional Reels",
        "Social Media Reels Editing",
        "Product/Service Highlight Videos",
        "Color Correction & Audio Enhancement",
      ],
    },
    {
      id: "04",
      title: "Social Media Marketing",
      image: "/Images/service_4.png",
      services: [
        "Social Media Posts & Reels Creation",
        "Complete Social Media Account Management",
        "Boosted Post Management",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black mt-[150px]">
      <div className="relative" ref={cardsRef}>

        {/* Floating Cursor Circle */}
        <motion.div
          animate={{
            x: cursorPos.x - 50,
            y: cursorPos.y - 50,
            opacity: cursorVisible ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 250, damping: 25 }}
          className={`pointer-events-none fixed top-0 left-0 z-[999] w-[120px] h-[120px]
            rounded-full flex flex-col items-center justify-center
            text-[13px] font-medium gap-1
            ${cursorDarkBg ? "bg-[#101c27] text-white" : "bg-white text-[#101c27] border border-gray-300"}
          `}
        >
          <ArrowUpRight
            size={20}
            className={`${cursorDarkBg ? "text-white" : "text-[#101c27]"}`}
          />
          <span className="font-bold text-[16px]">View Details</span>

        </motion.div>

        {/* Sticky Heading Section */}
        <div className="sticky top-0 z-[50] bg-white py-5">
          <div className="w-full max-w-[95%] mx-auto px-6 md:px-12">
            <p className="text-sm md:text-base uppercase tracking-[0.25em] text-gray-500 font-medium mb-4">
              Services
            </p>

            <div className="relative">
              

              <h2 className="text-2xl sm:text-3xl md:text-4xl leading-snug mb-4 sm:mb-6">
                <ScrollTextReveal
                  text="Our Services"
                  className="font-black text-2xl sm:text-3xl md:text-7xl text-[#101c27]"
                />
              </h2>

              <div className="mt-4 w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  style={{ width }}
                  className="h-full bg-[#101c27] rounded-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Cards Section */}
        {cards.map((card, index) => {
          const isDark = index % 2 !== 0;

          return (
            <div
              key={card.id}
              className={`sticky top-32 py-20 flex items-center justify-center ${isDark ? "bg-[#101c27] text-white" : "bg-white text-black"
                }`}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => {
                setCursorVisible(true);
                setCursorDarkBg(!isDark); // If background dark → cursor becomes white
              }}
              onMouseLeave={() => setCursorVisible(false)}
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full max-w-[95%] px-4 sm:px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start"
              >
                {/* LEFT SIDE */}
                <div className="flex flex-col gap-10 md:gap-12">
                  <div className="flex items-center gap-4">
                    <span
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border ${isDark
                        ? "border-gray-300 text-white"
                        : "border-gray-400 text-gray-700"
                        } flex items-center justify-center text-lg sm:text-xl font-bold`}
                    >
                      {card.id}
                    </span>
                  </div>

                  <h1
                    className={`heading-text text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-[#101c27]"
                      }`}
                  >
                    {card.title}
                  </h1>

                  <ul className="space-y-3 sm:space-y-4 text-base sm:text-lg">
                    {card.services.map((service, i) => (
                      <li
                        key={i}
                        className={`flex items-center gap-3 ${isDark
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-600 hover:text-black"
                          }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${isDark ? "bg-white/40 hover:bg-white" : "bg-black/40 hover:bg-black"
                            }`}
                        ></span>
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* RIGHT SIDE — IMAGE */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="flex justify-center items-end w-full h-full"
                >
                  <div className="relative w-full max-w-[500px] h-[260px] sm:h-[320px] md:h-[360px] overflow-hidden shadow-xl">
                    <img
                      src={card.image}
                      alt="card"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
