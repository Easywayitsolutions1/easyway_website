import React, { useRef, useState, useEffect } from "react";
import ScrollTextReveal from "../../Common Components/ScrollTextReveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useScrollTheme } from "../../Common Components/ScrollContext";

export default function Services() {
  const cardsRef = useRef(null);
  const { setTheme } = useScrollTheme();

  const { scrollYProgress } = useScroll({
    target: cardsRef,
    offset: ["start start", "end end"],
  });

  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const cards = [
    {
      id: "01",
      title: "Web Design & Development",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
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
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
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
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
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
      image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&q=80",
      services: [
        "Social Media Posts & Reels Creation",
        "Complete Social Media Account Management",
        "Boosted Post Management",
      ],
    },
  ];

  const navigate = useNavigate("");

  const handleNavigate = () => {
    navigate("/service");
    window.scrollTo(0, 0);
  };

  // Initial theme set karo - white background
  useEffect(() => {
    setTheme('light');
  }, [setTheme]);

  // Scroll ke saath theme detect karo
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      // Har card ka position check karo
      const cardElements = document.querySelectorAll('[data-card-theme]');
      cardElements.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardTop = rect.top + window.scrollY;
        const cardBottom = cardTop + rect.height;
        
        // Agar scroll position card ke beech mein hai
        if (scrollPosition >= cardTop && scrollPosition <= cardBottom) {
          const theme = card.getAttribute('data-card-theme');
          setTheme(theme);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [setTheme]);

  return (
    <div className="min-h-screen bg-white text-black mt-[150px]">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .circle-marquee {
          animation: marquee 6s linear infinite;
        }
      `}</style>

      <div className="relative" ref={cardsRef}>
        {/* Sticky Heading Section */}
        <div className="sticky top-0 z-[40] bg-white py-5">
          <div className="w-full max-w-[95%] mx-auto px-6 md:px-12">
            <p className="text-sm md:text-base uppercase tracking-[0.25em] text-gray-500 font-medium mb-4">
              Services
            </p>

            <div className="relative">
              <h2 className="text-2xl sm:text-3xl md:text-4xl leading-snug mb-4 sm:mb-6">
                <ScrollTextReveal
                  text="Our Services"
                  className="heading-text font-bold text-2xl sm:text-3xl md:text-7xl text-[#101c27]"
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
            <ServiceCard
              key={card.id}
              card={card}
              isDark={isDark}
              handleNavigate={handleNavigate}
            />
          );
        })}
      </div>
    </div>
  );
}

function ServiceCard({ card, isDark, handleNavigate }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div
      ref={cardRef}
      data-card-theme={isDark ? 'dark' : 'light'}
      className={`sticky top-32 py-20 flex items-center justify-center relative ${
        isDark ? "bg-[#101c27] text-white" : "bg-white text-black"
      }`}
      onClick={handleNavigate}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
              className={`absolute inset-0 rounded-full border-2 overflow-hidden backdrop-blur-md ${
                isDark
                  ? "border-white/70 bg-white/90"
                  : "border-black/70 bg-black/90"
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
            >
              <div className="absolute top-[-25px] inset-0 flex flex-col items-center justify-center">
                {/* Static Icon - moved up */}
                <ArrowUpRight
                  size={28}
                  strokeWidth={3}
                  className={`z-10 -translate-y-2 ${isDark ? "text-black" : "text-white"}`}
                />
              </div>

              {/* Marquee Text Behind - moved down */}
              <div
                className={`absolute left-0 w-[300%] whitespace-nowrap circle-marquee text-[24px] font-black ${
                  isDark ? "text-black" : "text-white"
                }`}
                style={{ top: "calc(50% + 0px)", transform: "translateY(-50%)" }}
              >
                {`View Details · `.repeat(20)}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

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
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border ${
                isDark
                  ? "border-gray-300 text-white"
                  : "border-gray-400 text-gray-700"
              } flex items-center justify-center text-lg sm:text-xl font-bold`}
            >
              {card.id}
            </span>
          </div>

          <h1
            className={`heading-text text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight ${
              isDark ? "text-white" : "text-[#101c27]"
            }`}
          >
            {card.title}
          </h1>

          <ul className="space-y-3 sm:space-y-4 text-base sm:text-lg">
            {card.services.map((service, i) => (
              <li
                key={i}
                className={`flex items-center gap-3 ${
                  isDark
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isDark
                      ? "bg-white/40 hover:bg-white"
                      : "bg-black/40 hover:bg-black"
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
}