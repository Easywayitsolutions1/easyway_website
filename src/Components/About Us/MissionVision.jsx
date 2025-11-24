import React, { useEffect, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import SimpleParallax from "simple-parallax-js";

export default function MissionVisionValues() {
    const items = [
        {
            title: "Our Mission",
            text: "To build meaningful digital solutions that empower businesses with innovation, strategy, and seamless user experiences.",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
        },
        {
            title: "Our Vision",
            text: "To become a trusted global digital partner, creating impactful technology that transforms ideas into scalable digital realities.",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
        },
        {
            title: "Our Values",
            text: "We believe in creativity, transparency, dedication, and delivering excellence through continuous improvement.",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
        },
    ];

    return (
        <div className="w-[95%] mx-auto py-20 px-5">
            {items.map((item, index) => (
                <ScrollItem key={index} item={item} index={index} />
            ))}
        </div>
    );
}

function ScrollItem({ item, index }) {
    const ref = useRef(null);

    const isImageRight = index % 2 === 0;

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 95%", "start 50%"]
    });

    const revealWidth = useTransform(
        scrollYProgress,
        [0, 0.4, 0.7, 1],
        [0, 50, 85, 100]
    );

    const scale = useTransform(
        scrollYProgress,
        [0, 0.4, 0.7, 1],
        [0.95, 1.02, 0.99, 1]
    );

    return (
        <div
            ref={ref}
            className={`flex flex-col ${
                isImageRight ? 'lg:flex-row' : 'lg:flex-row-reverse'
            } items-stretch gap-10 my-20`}
        >
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

            {/* Image Section */}
            <div className="flex-1 flex">
                <motion.div
                    className="relative overflow-hidden rounded-xl shadow-lg border-2 border-gray-300 w-full h-[300px]"
                    style={{
                        scale,
                        WebkitMaskImage: useTransform(
                            revealWidth,
                            (v) => isImageRight 
                                ? `linear-gradient(90deg, #000 ${v}%, transparent ${v}%)`  // Left to Right
                                : `linear-gradient(270deg, #000 ${v}%, transparent ${v}%)` // Right to Left
                        ),
                        maskImage: useTransform(
                            revealWidth,
                            (v) => isImageRight 
                                ? `linear-gradient(90deg, #000 ${v}%, transparent ${v}%)`  // Left to Right
                                : `linear-gradient(270deg, #000 ${v}%, transparent ${v}%)` // Right to Left
                        ),
                    }}
                >
                    <SimpleParallax orientation={isImageRight ? "right" : "left"}>
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