import React, { useEffect, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import SimpleParallax from "simple-parallax-js";

export default function MissionVisionValues() {
    const items = [
        {
            title: "Our Mission",
            text: "To build meaningful digital solutions that empower businesses with innovation, strategy, and seamless user experiences.",
            image: "/Images/project_1.png",
        },
        {
            title: "Our Vision",
            text: "To become a trusted global digital partner, creating impactful technology that transforms ideas into scalable digital realities.",
            image: "/Images/project_1.png",
        },
        {
            title: "Our Values",
            text: "We believe in creativity, transparency, dedication, and delivering excellence through continuous improvement.",
            image: "/Images/project_1.png",
        },
    ];

    return (
        <div className="w-[95%] mx-auto py-20 px-5">
            {items.map((item, index) => (
                <ScrollItem key={index} item={item} />
            ))}
        </div>
    );
}

function ScrollItem({ item }) {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 80%", "end 20%"]
    });

    const revealWidth = useTransform(
        scrollYProgress,
        [0, 0.2, 0.4, 0.6, 0.8, 1],
        [0, 20, 45, 70, 90, 100]
    );

    const scale = useTransform(
        scrollYProgress,
        [0, 0.2, 0.4, 0.6, 0.8, 1],
        [0.95, 1.02, 0.98, 1.03, 0.99, 1]
    );

    return (
        <div
            ref={ref}
            className="flex flex-col lg:flex-row items-stretch gap-10 my-20"
        >
            {/* Text Section */}
            {/* Text Section */}
            <div className="
    flex-1 
    bg-white/70 
    backdrop-blur-sm 
    p-6 
    rounded-2xl 
    shadow-md 
    border 
    border-gray-200 
    flex 
    items-center 
    transition-all 
    duration-300 
    hover:bg-[#1a2938] 
    hover:text-white
">
                <div className="text-center">
                    <h2 className="text-3xl font-semibold mb-4 heading-text">{item.title}</h2>
                    <p className="text-lg leading-relaxed">{item.text}</p>
                </div>
            </div>


            {/* Image Section (Equal Height) */}
            <div className="flex-1 flex">
                <motion.div
                    className="relative overflow-hidden rounded-xl shadow-lg border-2 border-gray-300 w-full h-full"
                    style={{
                        scale,
                        WebkitMaskImage: useTransform(
                            revealWidth,
                            (v) => `linear-gradient(90deg, #000 ${v}%, transparent ${v}%)`
                        ),
                        maskImage: useTransform(
                            revealWidth,
                            (v) => `linear-gradient(90deg, #000 ${v}%, transparent ${v}%)`
                        ),
                    }}
                >
                    <SimpleParallax orientation="right">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                        />
                    </SimpleParallax>
                </motion.div>
            </div>
        </div>
    );
}
