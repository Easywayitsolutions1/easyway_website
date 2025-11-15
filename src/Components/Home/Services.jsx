import React, { useRef } from "react";
import ScrollTextReveal from "../../Common Components/ScrollTextReveal";
import { motion, useScroll, useTransform } from "framer-motion";

export default function StickyCardScroll() {
  const cardsRef = useRef(null);

  // Scroll progress for entire cards section
  const { scrollYProgress } = useScroll({
    target: cardsRef,
    offset: ["start start", "end end"],
  });

  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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
    <div className="min-h-screen bg-white text-black">
      <div className="relative" ref={cardsRef}>

        {/* Sticky Heading Section */}
        <div className="sticky top-0 z-[50] bg-white/80 backdrop-blur-lg py-10">
          <div className="w-full max-w-[95%] mx-auto px-6 md:px-12">

            {/* Top Small Label */}
            <p className="text-sm md:text-base uppercase tracking-[0.25em] text-gray-500 font-medium mb-4">
              Services
            </p>

            {/* Main Heading */}
            <div className="relative">
              <ScrollTextReveal
                text="We Deliver Comprehensive Solutions to Help Businesses Grow and Thrive."
                className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-snug text-[#101c27] max-w-5xl"
              />

              {/* Scroll Progress Bar */}
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
        {cards.map((card) => (
          <div
            key={card.id}
            className="sticky top-24 sm:top-28 md:top-32 min-h-screen py-20 flex items-center justify-center bg-white"
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="w-full max-w-[95%] px-4 sm:px-6 lg:px-10 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 items-start"
            >

              {/* LEFT SECTION */}
              <div className="group text-center md:text-left">
                <div className="flex justify-center md:justify-start items-center gap-4 mb-6">
                  <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-400 group-hover:border-black transition-all duration-300 flex items-center justify-center text-base sm:text-lg font-bold text-gray-700 group-hover:text-black">
                    {card.id}
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#101c27] group-hover:tracking-widest transition-all duration-300">
                  {card.title}
                </h1>
              </div>

              {/* IMAGE SECTION */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4 }}
                className="flex justify-center"
              >
                <div className="relative w-full max-w-[420px] sm:max-w-[480px] md:w-[500px] h-[240px] sm:h-[300px] md:h-[320px] rounded-3xl overflow-hidden shadow-xl group">
                  <img
                    src={card.image}
                    alt="card"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-90"
                  />

                  {/* Glow Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                </div>
              </motion.div>

              {/* RIGHT SECTION */}
              <div className="group text-center md:text-left">
                <h2 className="text-xl sm:text-2xl font-semibold mb-5 flex justify-center md:justify-start items-center gap-2 text-gray-700">
                  <span className="w-3 h-3 bg-black/70 rotate-45 inline-block"></span>
                  {card.title} Services
                </h2>

                <ul className="space-y-3 sm:space-y-4 text-base sm:text-lg text-gray-500">
                  {card.services.map((service, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 group/item hover:text-black transition-all duration-200 justify-center md:justify-start"
                    >
                      <span className="w-1.5 h-1.5 bg-black/40 rounded-full group-hover/item:bg-black transition-all duration-300"></span>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>

            </motion.div>
          </div>
        ))}

      </div>
    </div>
  );
}
