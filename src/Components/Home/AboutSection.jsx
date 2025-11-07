import React, { useEffect, useState, useRef, memo } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";
import ScrollTextReveal from "../../Common Components/ScrollTextReveal";

/* --------------------------------------------------------------
   ULTRA-SMOOTH, SLOW IMAGE REVEAL (GPU ONLY, CINEMATIC)
   -------------------------------------------------------------- */
const ImageReveal = memo(function ImageReveal({
    src,
    alt,
    className = "",
    duration = 2.2, // ⏳ Increased duration (was 1.2)
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
            transition: { duration, ease: [0.25, 1, 0.3, 1] }, // smooth ease-out
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
   ABOUT SECTION
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
        <section className="text-white py-20 px-6 lg:px-20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                {/* LEFT TEXT CONTENT */}
                <div>
                    <p className="text-sm text-gray-400 mb-3 tracking-wide uppercase">
                        About My EasyWay IT Solutions
                    </p>

                    <h2 className="text-4xl lg:text-5xl font-bold leading-snug mb-6">
                        {/* We Create Digital Experiences
                        that */}
                        {/* <span className="bg-gradient-to-r from-[#3da6ff] via-[#71b8a6] to-[#e86951] bg-clip-text text-transparent">
                            World called success to your brand.
                        </span> */}
                        <ScrollTextReveal text=" We Create Digital Experiences that Transform Ideas into Impact." className="font-bold text-4xl lg:text-5xl" />
                    </h2>

                    <p className="text-gray-400 mb-8 max-w-xl">
                        At <span className="text-white font-semibold">My EasyWay IT Solutions</span>, we blend
                        innovation with design to build powerful digital experiences that drive real growth.
                        From <span className="text-white font-medium">Web Development</span> and
                        <span className="text-white font-medium"> UI/UX Design</span> to
                        <span className="text-white font-medium"> Graphic Design</span> and
                        <span className="text-white font-medium"> Video Editing</span>,
                        we craft solutions that help brands connect, engage, and evolve.
                        <br /><br />
                        Our team is passionate about turning your vision into a seamless digital reality —
                        combining technology, creativity, and strategy to make your business stand out in the
                        modern world.
                    </p>

                    <button className="group relative inline-block px-8 py-3 rounded-[10px] text-[17px] font-medium border-2 border-white text-white hover:text-black overflow-hidden transition-colors duration-500 z-10">
                        <span className="relative z-10 flex justify-between items-center gap-3">
                            Discover Our Work <ArrowRight size={20} />
                        </span>
                        <span className="absolute top-full left-full w-[300px] h-[150px] bg-white rounded-full transition-all duration-700 ease-in-out group-hover:top-[-30px] group-hover:left-[-30px]" />
                    </button>
                </div>

                {/* RIGHT IMAGES STACK */}
                <div className="relative flex justify-center items-center">
                    {/* Big image */}
                    <div className="absolute left-0 z-20 w-[50%] h-[550px] rounded-[150px] border-[10px] border-[#101a24] overflow-hidden">
                        <ImageReveal
                            className="h-full"
                            src="/Images/about_1.webp"
                            alt="Team collaboration"
                            duration={2.2}
                            delay={0}
                        />
                    </div>

                    {/* Medium image */}
                    <div className="absolute right-[20%] z-10 w-[40%] h-[450px] rounded-[150px] border-[10px] border-[#101a24] overflow-hidden">
                        <ImageReveal
                            className="h-full"
                            src="/Images/about_2.webp"
                            alt="Office discussion"
                            duration={2.2}
                            delay={0}
                        />
                    </div>

                    {/* Small image */}
                    <div className="absolute right-[-10px] hidden lg:block w-48 h-[350px] rounded-[80px] overflow-hidden">
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
        </section>
    );
}
