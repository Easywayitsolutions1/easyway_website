import React from "react";
import { useAnimate } from "framer-motion";

export const Example = () => {
    return (
        <div className="bg-[#101c28] px-4 py-14">
            <div className="mx-auto max-w-7xl">
                <ClipPathLinks />
            </div>
        </div>
    );
};

const ClipPathLinks = () => {
    return (
        <div className="overflow-hidden divide-y divide-white/30 rounded-[14px] border border-white/40 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.35)]">

            {/* Row 1 */}
            <div className="grid grid-cols-2 divide-x divide-white/30">
                <LinkBox label="Home" />
                <LinkBox label="About" />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-3 divide-x divide-white/30">
                <LinkBox label="Services" />
                <LinkBox label="Projects" />
                <LinkBox label="Contact Us" />
            </div>

            {/* Info Section */}
            <div className="grid grid-cols-2 divide-x divide-white/30">
                <InfoHoverBox
                    title="Contact"
                    content="+91 70160 69441"
                />
                <InfoHoverBox
                    title="Email"
                    content="info@easywayitsolutions.com"
                />
            </div>
        </div>
    );
};

/* ───────────── Clip Animations ───────────── */

const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

const ENTRANCE_KEYFRAMES = {
    left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
    bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
    top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
    right: [TOP_LEFT_CLIP, NO_CLIP],
};

const EXIT_KEYFRAMES = {
    left: [NO_CLIP, TOP_RIGHT_CLIP],
    bottom: [NO_CLIP, TOP_RIGHT_CLIP],
    top: [NO_CLIP, TOP_RIGHT_CLIP],
    right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

/* ───────────── Shared Hover Logic ───────────── */

const useDirectionAwareHover = () => {
    const [scope, animate] = useAnimate();

    const getNearestSide = (e) => {
        const box = e.currentTarget.getBoundingClientRect();
        const sides = [
            { side: "left", proximity: Math.abs(box.left - e.clientX) },
            { side: "right", proximity: Math.abs(box.right - e.clientX) },
            { side: "top", proximity: Math.abs(box.top - e.clientY) },
            { side: "bottom", proximity: Math.abs(box.bottom - e.clientY) },
        ];
        return sides.sort((a, b) => a.proximity - b.proximity)[0].side;
    };

    const onEnter = (e) =>
        animate(
            scope.current,
            { clipPath: ENTRANCE_KEYFRAMES[getNearestSide(e)] },
            { duration: 0.45, ease: "easeOut" }
        );

    const onLeave = (e) =>
        animate(
            scope.current,
            { clipPath: EXIT_KEYFRAMES[getNearestSide(e)] },
            { duration: 0.35, ease: "easeIn" }
        );

    return { scope, onEnter, onLeave };
};

/* ───────────── Menu Links ───────────── */

const LinkBox = ({ label }) => {
    const { scope, onEnter, onLeave } = useDirectionAwareHover();

    return (
        <div
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            className="group relative grid h-20 sm:h-28 md:h-48 place-content-center cursor-pointer overflow-hidden"
        >
            <span className="heading-text text-white text-sm sm:text-lg md:text-[30px] font-semibold tracking-wide transition-transform duration-300 group-hover:scale-95">
                {label}
            </span>

            <div
                ref={scope}
                style={{ clipPath: BOTTOM_RIGHT_CLIP }}
                className="absolute inset-0 grid place-content-center bg-white text-[#101c28]"
            >
                <span className="text-sm sm:text-lg md:text-[30px] font-semibold tracking-wide">
                    {label}
                </span>
            </div>
        </div>
    );
};

/* ───────────── Info Boxes with SAME Hover ───────────── */

const InfoHoverBox = ({ title, content }) => {
    const { scope, onEnter, onLeave } = useDirectionAwareHover();

    return (
        <div
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            className="group relative grid h-20 sm:h-28 md:h-48 place-content-center text-center px-4 cursor-pointer overflow-hidden"
        >
            {/* Base Content */}
            <div className="relative z-10 transition-opacity duration-300 group-hover:opacity-0">
                <h4 className="text-white text-sm sm:text-[30px] font-semibold tracking-wide mb-1">
                    {title}
                </h4>
                <p className="text-white/70 text-xs sm:text-[16px] leading-relaxed">
                    {content}
                </p>
            </div>

            {/* Hover Overlay */}
            <div
                ref={scope}
                style={{ clipPath: BOTTOM_RIGHT_CLIP }}
                className="absolute inset-0 z-20 grid place-content-center bg-white text-[#101c28] text-center px-4"
            >
                <h4 className="text-sm sm:text-[30px] font-semibold mb-1">
                    {title}
                </h4>
                <p className="text-xs sm:text-[16px]">
                    {content}
                </p>
            </div>
        </div>
    );
};
