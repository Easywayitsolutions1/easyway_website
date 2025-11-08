import React, { useEffect, useState, useRef, memo } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";
import ScrollTextReveal from "../../Common Components/ScrollTextReveal";
import CircularText from "../../Common Components/CircularText";

/* --------------------------------------------------------------
   ULTRA-SMOOTH, SLOW IMAGE REVEAL (GPU ONLY, CINEMATIC)
   -------------------------------------------------------------- */
const ImageReveal = memo(function ImageReveal({
    src,
    alt,
    className = "",
    duration = 2.2,
    delay = 0,
}) {
    const controls = useAnimation();
    const overlayControls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
    const [loaded, setLoaded] = useState(false);
    const imgRef = useRef(null);

    // ✅ Preload + decode image for ultra-smooth reveal
    useEffect(() => {
        let cancelled = false;
        const img = new Image();
        img.src = src;
        img.decoding = "async";
        img.onload = async () => {
            if (cancelled) return;
            try {
                await img.decode();
            } catch { }
            if (imgRef.current) imgRef.current.src = src;
            requestAnimationFrame(() => setLoaded(true));
        };
        return () => {
            cancelled = true;
        };
    }, [src]);

    // ✅ Start animation once image is in view & loaded
    useEffect(() => {
        if (inView && loaded) {
            controls.set("hidden");
            overlayControls.set("initial");

            const timeout = setTimeout(() => {
                controls.start("visible");
                overlayControls.start("slide");
            }, delay * 1000);

            return () => clearTimeout(timeout);
        }
    }, [inView, loaded, delay, controls, overlayControls]);

    const imgVars = {
        hidden: { opacity: 0, scale: 1.06 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration, ease: [0.25, 1, 0.3, 1] },
        },
    };

    const overlayVars = {
        initial: { x: "0%" },
        slide: {
            x: "101%",
            transition: { duration: duration * 0.9, ease: [0.45, 0, 0.2, 1] },
        },
    };

    return (
        <div
            ref={ref}
            className={`relative overflow-hidden ${className}`}
            style={{
                contain: "layout paint style",
                backfaceVisibility: "hidden",
                transform: "translateZ(0)",
            }}
        >
            {/* Image layer */}
            <motion.div
                variants={imgVars}
                animate={controls}
                style={{
                    backgroundColor: "transparent",
                    width: "100%",
                    height: "100%",
                    willChange: "transform, opacity",
                    transform: "translateZ(0)",
                }}
            >
                <motion.img
                    ref={imgRef}
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover select-none"
                    style={{
                        opacity: loaded ? 1 : 0,
                        transition: "opacity 0.5s ease-out",
                        transform: "translateZ(0)",
                        backfaceVisibility: "hidden",
                    }}
                />
            </motion.div>

            {/* Overlay reveal layer */}
            <motion.div
                className="absolute inset-0 z-10"
                style={{
                    backgroundColor: "#101c27",
                    willChange: "transform",
                    transform: "translateZ(0)",
                    pointerEvents: "none",
                }}
                variants={overlayVars}
                animate={overlayControls}
            />
        </div>
    );
});

/* --------------------------------------------------------------
   ABOUT SECTION - FULLY RESPONSIVE
   -------------------------------------------------------------- */
export default function AboutSection() {
    // Preload all images early
    useEffect(() => {
        ["/Images/about_1.webp", "/Images/about_2.webp", "/Images/about_3.webp"].forEach(
            (src) => {
                const img = new Image();
                img.src = src;
            }
        );
    }, []);

    return (
        <section className="text-black py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Mobile/Tablet Layout - Stack vertically */}
                <div className="lg:hidden space-y-8 sm:space-y-10">
                    {/* Text Content - First on mobile */}
                    <div className="px-2 sm:px-4">
                        <p className="text-xs sm:text-sm text-gray-800 mb-2 sm:mb-3 tracking-wide uppercase">
                            About My EasyWay IT Solutions
                        </p>

                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug mb-4 sm:mb-6">
                            <ScrollTextReveal 
                                text=" We Create Digital Experiences that Transform Ideas into Impact." 
                                className="font-bold text-2xl sm:text-3xl md:text-4xl" 
                            />
                        </h2>

                        <p className="text-sm sm:text-base text-black mb-6 sm:mb-8 leading-relaxed">
                            At <span className="text-black font-semibold">EasyWay IT Solutions</span>, we blend
                            innovation with design to build powerful digital experiences that drive real growth.
                            From <span className="text-black font-medium">Web Development</span> and
                            <span className="text-black font-medium"> UI/UX Design</span> to
                            <span className="text-black font-medium"> Graphic Design</span> and
                            <span className="text-black font-medium"> Video Editing</span>,
                            we craft solutions that help brands connect, engage, and evolve.
                            <br /><br />
                            Our team is passionate about turning your vision into a seamless digital reality —
                            combining technology, creativity, and strategy to make your business stand out in the
                            modern world.
                        </p>

                        <button className="group relative inline-block px-6 sm:px-8 py-2.5 sm:py-3 rounded-[10px] text-sm sm:text-base font-medium border-2 border-white text-black hover:text-black overflow-hidden transition-colors duration-500 z-10">
                            <span className="relative z-10 flex justify-between items-center gap-2 sm:gap-3">
                                Discover Our Work <ArrowRight size={18} className="sm:w-5 sm:h-5" />
                            </span>
                            <span className="absolute top-full left-full w-[300px] h-[150px] bg-white rounded-full transition-all duration-700 ease-in-out group-hover:top-[-30px] group-hover:left-[-30px]" />
                        </button>
                    </div>

                    {/* Images Section - Second on mobile (below text) */}
                    <div className="relative flex justify-center items-center min-h-[380px] sm:min-h-[450px] md:min-h-[500px] mx-auto max-w-2xl">
                        {/* Circular Text Badge - Below Navbar (z-30) */}
                        <div className="absolute -left-[5%] top-[0px] z-30 bg-white rounded-full scale-[0.65] sm:scale-75 md:scale-90">
                            <CircularText
                                text="YEARS OF EXPERIENCE "
                                onHover="speedUp"
                                spinDuration={20}
                                className="custom-class"
                            />
                            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-2xl sm:text-3xl">1 +</p>
                        </div>

                        {/* Big image */}
                        <div className="absolute left-[5%] sm:left-[10%] z-20 w-[42%] sm:w-[45%] h-[300px] sm:h-[380px] md:h-[450px] rounded-[60px] sm:rounded-[80px] md:rounded-[100px] border-[5px] sm:border-[6px] md:border-[8px] border-[#101a24] overflow-hidden">
                            <ImageReveal
                                className="h-full"
                                src="/Images/about_1.webp"
                                alt="Team collaboration"
                                duration={2.2}
                                delay={0}
                            />
                        </div>

                        {/* Medium image */}
                        <div className="absolute right-[15%] sm:right-[18%] z-10 w-[40%] sm:w-[42%] h-[250px] sm:h-[320px] md:h-[380px] rounded-[60px] sm:rounded-[80px] md:rounded-[100px] border-[5px] sm:border-[6px] md:border-[8px] border-white overflow-hidden">
                            <ImageReveal
                                className="h-full"
                                src="/Images/about_2.webp"
                                alt="Office discussion"
                                duration={2.2}
                                delay={0}
                            />
                        </div>

                        {/* Small image - visible on tablet+ */}
                        <div className="absolute right-0 sm:right-[2%] hidden sm:block w-[32%] md:w-[35%] h-[220px] md:h-[280px] rounded-[50px] md:rounded-[70px] overflow-hidden border-[5px] sm:border-[6px] border-white">
                            <ImageReveal
                                className="h-full"
                                src="/Images/about_3.webp"
                                alt="Team planning"
                                duration={2.2}
                                delay={0}
                            />
                        </div>
                    </div>
                </div>

                {/* Desktop Layout - Side by side */}
                <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center">
                    {/* LEFT TEXT CONTENT */}
                    <div>
                        <p className="text-sm text-gray-800 mb-3 tracking-wide uppercase">
                            About My EasyWay IT Solutions
                        </p>

                        <h2 className="text-4xl lg:text-5xl font-bold leading-snug mb-6">
                            <ScrollTextReveal 
                                text=" We Create Digital Experiences that Transform Ideas into Impact." 
                                className="font-bold text-4xl lg:text-5xl" 
                            />
                        </h2>

                        <p className="text-base text-black mb-8 max-w-xl leading-relaxed">
                            At <span className="text-black font-semibold">EasyWay IT Solutions</span>, we blend
                            innovation with design to build powerful digital experiences that drive real growth.
                            From <span className="text-black font-medium">Web Development</span> and
                            <span className="text-black font-medium"> UI/UX Design</span> to
                            <span className="text-black font-medium"> Graphic Design</span> and
                            <span className="text-black font-medium"> Video Editing</span>,
                            we craft solutions that help brands connect, engage, and evolve.
                            <br /><br />
                            Our team is passionate about turning your vision into a seamless digital reality —
                            combining technology, creativity, and strategy to make your business stand out in the
                            modern world.
                        </p>

                        <button className="group relative inline-block px-8 py-3 rounded-[10px] text-[17px] font-medium border-2 border-black text-black hover:text-white overflow-hidden transition-colors duration-500 z-10">
                            <span className="relative z-10 flex justify-between items-center gap-3">
                                Discover Our Work <ArrowRight size={20} />
                            </span>
                            <span className="absolute top-full left-full w-[300px] h-[150px] bg-[#101c28] rounded-full transition-all duration-700 ease-in-out group-hover:top-[-30px] group-hover:left-[-30px]" />
                        </button>
                    </div>

                    {/* RIGHT IMAGES STACK - Desktop only */}
                    <div className="relative flex justify-center items-center min-h-[550px]">
                        {/* Circular Text Badge - Below Navbar (z-30) */}
                        <div className="absolute -left-[5%] top-[0px] z-30 bg-white rounded-full">
                            <CircularText
                                text="YEARS OF EXPERIENCE "
                                onHover="speedUp"
                                spinDuration={20}
                                className="custom-class"
                            />
                            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-3xl">1 +</p>
                        </div>

                        {/* Big image */}
                        <div className="absolute left-0 z-20 w-[50%] h-[550px] rounded-[150px] border-[10px] border-white overflow-hidden">
                            <ImageReveal
                                className="h-full"
                                src="/Images/about_1.webp"
                                alt="Team collaboration"
                                duration={2.2}
                                delay={0}
                            />
                        </div>

                        {/* Medium image */}
                        <div className="absolute right-[20%] z-10 w-[40%] h-[450px] rounded-[150px] border-[10px] border-white overflow-hidden">
                            <ImageReveal
                                className="h-full"
                                src="/Images/about_2.webp"
                                alt="Office discussion"
                                duration={2.2}
                                delay={0}
                            />
                        </div>

                        {/* Small image */}
                        <div className="absolute right-[-10px] w-48 h-[350px] rounded-[80px] overflow-hidden">
                            <ImageReveal
                                className="h-full"
                                src="/Images/about_3.webp"
                                alt="Team planning"
                                duration={2.2}
                                delay={0}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}