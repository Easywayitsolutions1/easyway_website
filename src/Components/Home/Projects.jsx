import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import ScrollTextReveal from "../../Common Components/ScrollTextReveal";

export default function Projects() {
    const sectionRef = useRef(null);

    const projects = [
        {
            id: "01",
            title: "Plazer Associates Website",
            category: "Web Development",
            image: "/Images/project_1.png",
            tech: ["React", "Tailwind", "Node Js"],
            description:
                "A modern, professional website developed for Plazer Associates to enhance their digital presence with fast performance and clean UI.",
        },
        {
            id: "02",
            title: "CB Imitation Jewellery",
            category: "E-Commerce",
            image: "/Images/project_2.png",
            tech: ["React", "Tailwind", "Node Js"],
            description:
                "An online storefront featuring exquisite imitation jewellery with elegant design and seamless shopping experience.",
        },
        // {
        //     id: "03",
        //     title: "Tech Startup Dashboard",
        //     category: "Web Application",
        //     image: "/Images/project_3.png",
        //     tech: ["Next.js", "TypeScript", "MongoDB"],
        //     description:
        //         "A comprehensive analytics dashboard for startups to track KPIs, user engagement, and business metrics in real-time.",
        // },
        // {
        //     id: "04",
        //     title: "Fitness Tracking App",
        //     category: "Mobile App",
        //     image: "/Images/project_4.png",
        //     tech: ["React Native", "Firebase", "Redux"],
        //     description:
        //         "A mobile application for fitness enthusiasts to track workouts, nutrition, and progress with personalized insights.",
        // },
    ];

    // hovered card id
    const [hoveredCard, setHoveredCard] = useState(null);

    // FOLLOW CIRCLE logic (unchanged)
    const [circlePositions, setCirclePositions] = useState({});
    const circleTargets = useRef({});

    // Refs for DOM nodes and tilt internal state
    const cardRefs = useRef({}); // DOM nodes for outer wrappers
    const tiltTargets = useRef({}); // desired { rx, ry, s }
    const tiltCurrents = useRef({}); // current { rx, ry, s }

    // Smooth follow circle handlers
    const handleMouseMove = (e, cardId) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // update circle follow target
        circleTargets.current[cardId] = { x, y };

        // compute tilt targets
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10; // deg
        const rotateY = ((x - centerX) / centerX) * 10; // deg
        const scale = 1.02;

        tiltTargets.current[cardId] = {
            rx: rotateX,
            ry: rotateY,
            s: scale,
        };
    };

    const handleMouseEnter = (e, cardId) => {
        setHoveredCard(cardId);
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        circleTargets.current[cardId] = { x, y };

        // initialize targets & currents if not present
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        tiltTargets.current[cardId] = { rx: rotateX, ry: rotateY, s: 1.02 };
        if (!tiltCurrents.current[cardId]) {
            tiltCurrents.current[cardId] = { rx: 0, ry: 0, s: 1 };
        }
    };

    const handleMouseLeave = (cardId) => {
        setHoveredCard(null);
        // set target back to neutral
        tiltTargets.current[cardId] = { rx: 0, ry: 0, s: 1 };
        // also clear circle target so it won't keep moving
        circleTargets.current[cardId] = circleTargets.current[cardId] || null;
    };

    // animation loop for smooth tilt + circle follow
    useEffect(() => {
        let rafId;

        const lerp = (a, b, t) => a + (b - a) * t;

        const animate = () => {
            // animate tilt for each card
            Object.keys(cardRefs.current).forEach((cardId) => {
                const el = cardRefs.current[cardId];
                if (!el) return;

                // initialize target/current if missing
                if (!tiltTargets.current[cardId]) {
                    tiltTargets.current[cardId] = { rx: 0, ry: 0, s: 1 };
                }
                if (!tiltCurrents.current[cardId]) {
                    tiltCurrents.current[cardId] = { rx: 0, ry: 0, s: 1 };
                }

                const target = tiltTargets.current[cardId];
                const current = tiltCurrents.current[cardId];

                // use a smooth factor (higher = snappier). tweak to taste.
                const ease = 0.16;

                current.rx = lerp(current.rx, target.rx, ease);
                current.ry = lerp(current.ry, target.ry, ease);
                current.s = lerp(current.s, target.s, ease);

                // apply transform directly to DOM for smoothness
                // keep preserve-3d declared via style property (not transition)
                el.style.transform = `perspective(1000px) rotateX(${current.rx}deg) rotateY(${current.ry}deg) scale3d(${current.s}, ${current.s}, ${current.s})`;
            });

            // animate follow circle positions
            setCirclePositions((prev) => {
                const newPositions = { ...prev };
                Object.keys(circleTargets.current).forEach((cardId) => {
                    const target = circleTargets.current[cardId];
                    if (!target) return;
                    const current = prev[cardId] || { x: target.x, y: target.y };
                    newPositions[cardId] = {
                        x: current.x + (target.x - current.x) * 0.15,
                        y: current.y + (target.y - current.y) * 0.15,
                    };
                });
                return newPositions;
            });

            rafId = requestAnimationFrame(animate);
        };

        rafId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafId);
    }, []);

    // ensure cardRefs are cleaned up if components unmount/update (not strictly necessary here)
    useEffect(() => {
        return () => {
            cardRefs.current = {};
            tiltTargets.current = {};
            tiltCurrents.current = {};
            circleTargets.current = {};
        };
    }, []);

    return (
        <div ref={sectionRef} className="relative w-full py-16 sm:py-20 md:py-24 overflow-hidden">
            {/* Section Header */}
            <div className="w-[90%] mx-auto mb-12 sm:mb-16">
                <div className="text-left">
                    <p className="text-xs sm:text-sm text-gray-800 mb-2 sm:mb-3 uppercase tracking-[0.25em]">
                        Our Featured Work
                    </p>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl leading-snug mb-4 sm:mb-6">
                        <ScrollTextReveal
                            text="Our Featured Projects"
                            className="font-black text-2xl sm:text-3xl md:text-7xl text-[#101c27]"
                        />
                    </h2>
                </div>
            </div>

            {/* Grid */}
            <div className="w-[90%] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            viewport={{ once: true }}
                            className="relative"
                            style={{ perspective: "1000px" }}
                        >
                            {/* OUTER WRAPPER WITH BORDER + PADDING (tilt applied directly to DOM node) */}
                            <div
                                onMouseEnter={(e) => handleMouseEnter(e, project.id)}
                                onMouseLeave={() => handleMouseLeave(project.id)}
                                onMouseMove={(e) => handleMouseMove(e, project.id)}
                                // capture ref for direct DOM updates
                                ref={(el) => {
                                    if (el) {
                                        cardRefs.current[project.id] = el;
                                        // ensure initial style for smoothness
                                        el.style.transformStyle = "preserve-3d";
                                        el.style.transition = "box-shadow 0.3s ease";
                                    } else {
                                        delete cardRefs.current[project.id];
                                    }
                                }}
                                className="p-3 border border-black rounded-2xl bg-white/5 backdrop-blur-sm transition-all duration-200 will-change-transform"
                                style={{
                                    // no transform set here — animation loop writes it
                                    transformStyle: "preserve-3d",
                                }}
                            >
                                {/* INNER CARD (unchanged) */}
                                <div
                                    className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl 
                                        cursor-pointer h-[400px] sm:h-[450px] md:h-[450px]"
                                    style={{
                                        transformStyle: "preserve-3d",
                                        transition: "transform 0.1s ease-out, box-shadow 0.3s ease",
                                    }}
                                >
                                    {/* Full Screen Background Image */}
                                    <div className="absolute inset-0 w-full h-full">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className={`w-full h-full object-cover transition-all duration-700 
                                                ${hoveredCard === project.id ? "scale-110" : "scale-100"}`}
                                        />

                                        <div
                                            className={`absolute inset-0 bg-gradient-to-t transition-all duration-500
                                                ${hoveredCard === project.id
                                                    ? "from-black/90 via-black/60 to-black/30"
                                                    : "from-black/80 via-black/40 to-black/20"}`}
                                        />
                                    </div>

                                    {/* Category Badge */}
                                    <div
                                        className="absolute top-4 right-4 z-20"
                                        style={{ transform: "translateZ(50px)" }}
                                    >
                                        <span
                                            className={`px-3 py-1.5 backdrop-blur-sm text-xs 
                                                font-semibold rounded-full shadow-lg border transition-all duration-300
                                                ${hoveredCard === project.id
                                                    ? "bg-white text-[#101c27] border-white"
                                                    : "bg-white/20 text-white border-white/30"}`}
                                        >
                                            {project.category}
                                        </span>
                                    </div>

                                    {/* Content Overlay */}
                                    <div
                                        className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8 z-30"
                                        style={{ transform: "translateZ(60px)" }}
                                    >
                                        <h3
                                            className={`text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 
                                                transition-transform duration-300
                                                ${hoveredCard === project.id ? "translate-y-[-5px]" : ""}`}
                                        >
                                            {project.title}
                                        </h3>
                                    </div>

                                    {/* Bottom Accent Line */}
                                    <div
                                        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r 
                                            from-white via-white/80 to-white transform transition-transform duration-500 origin-left z-40
                                            ${hoveredCard === project.id ? "scale-x-100" : "scale-x-0"}`}
                                    />

                                    {/* Edge Glow */}
                                    <div
                                        className={`absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none
                                            ${hoveredCard === project.id ? "opacity-100" : "opacity-0"}`}
                                        style={{
                                            boxShadow: "inset 0 0 30px rgba(255,255,255,0.1)",
                                        }}
                                    />
                                </div>
                            </div>

                            {/* FOLLOW CIRCLE */}
                            {circlePositions[project.id] && (
                                <div
                                    className="pointer-events-none text-[16px] absolute font-bold z-50 flex flex-col items-center justify-center bg-black text-white text-xs rounded-full"
                                    style={{
                                        width: 120,
                                        height: 120,
                                        opacity: hoveredCard === project.id ? 1 : 0,
                                        left: 0,
                                        top: 0,
                                        transform: `translate3d(${circlePositions[project.id].x - 45}px, ${circlePositions[project.id].y - 45}px, 0)`,
                                        transition: "opacity 0.25s ease",
                                    }}
                                >
                                    <ArrowUpRight size={20} />
                                    View Projects
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Button */}
                <div className="flex justify-center mt-12 sm:mt-16">
                    <button
                        className="group relative inline-block px-10 py-4 rounded-xl
                        text-lg font-semibold border-2 border-[#101c27] text-[#101c27] 
                        hover:text-white overflow-hidden transition-colors duration-500"
                    >
                        <span className="relative z-[2] flex items-center gap-3">
                            View All Projects <ArrowRight size={22} />
                        </span>

                        <span
                            className="absolute z-[1] top-full left-full w-[350px] h-[180px] 
                            bg-black rounded-full transition-all duration-700 ease-in-out
                            group-hover:top-[-40px] group-hover:left-[-40px]"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}
