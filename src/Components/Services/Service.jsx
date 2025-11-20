import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import Footer from "../../Common Components/Footer";
import Header from "../../Common Components/Header";

export const Services = () => {
    return (
        <>
            <Header />
            <div className="bg-white">
                <TextParallaxContent
                    imgUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop"
                    subheading="Web Development"
                    heading="Build Better Websites"
                    // heading="Build Powerful & Responsive Websites."
                >
                    <WebDevContent />
                </TextParallaxContent>

                <TextParallaxContent
                    imgUrl="https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?q=80&w=2564&auto=format&fit=crop"
                    subheading="UI / UX Design"
                    heading="Smarter User Experience"
                    // heading="Designs That Create Better Experiences."
                >
                    <UIUXContent />
                </TextParallaxContent>

                <TextParallaxContent
                    imgUrl="https://images.unsplash.com/photo-1504610926078-a1611febcad3?q=80&w=2416&auto=format&fit=crop"
                    subheading="Video Editing"
                    heading="Edit. Enhance. Impress."
                    // heading="High-Impact Visual Stories That Convert."
                >
                    <VideoEditingContent />
                </TextParallaxContent>

                <TextParallaxContent
                    imgUrl="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2600&auto=format&fit=crop"
                    subheading="Social Media Management"
                    heading="Grow Your Online Presence"
                    // heading="Grow Your Brand With Strategic Content."
                >
                    <SocialMediaContent />
                </TextParallaxContent>

                <TextParallaxContent
                    imgUrl="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2600&auto=format&fit=crop"
                    subheading="Custom Development"
                    heading="Solutions That Fit You"
                    // heading="Tailored Software Solutions for Your Business."
                >
                    <CustomDevContent />
                </TextParallaxContent>
            </div>

            <Footer />
        </>
    );
};

const IMG_PADDING = 12;

const TextParallaxContent = ({ imgUrl, subheading, heading, children }) => {
    return (
        <div
            style={{
                paddingLeft: IMG_PADDING,
                paddingRight: IMG_PADDING,
            }}
        >
            <div className="relative h-[150vh]">
                <StickyImage imgUrl={imgUrl} />
                <OverlayCopy heading={heading} subheading={subheading} />
            </div>
            {children}
        </div>
    );
};

const StickyImage = ({ imgUrl }) => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["end end", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    return (
        <motion.div
            style={{
                backgroundImage: `url(${imgUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: `calc(100vh - ${IMG_PADDING * 2}px)`,
                top: IMG_PADDING,
                scale,
            }}
            ref={targetRef}
            className="sticky z-0 overflow-hidden rounded-3xl"
        >
            <motion.div
                className="absolute inset-0 bg-neutral-950/70"
                style={{
                    opacity,
                }}
            />
        </motion.div>
    );
};

const OverlayCopy = ({ subheading, heading }) => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
    const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

    return (
        <motion.div
            style={{
                y,
                opacity,
            }}
            ref={targetRef}
            className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
        >
            <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
                {subheading}
            </p>
            <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
        </motion.div>
    );
};

const WebDevContent = () => (
    <>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
            <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
                Powerful Websites That Drive Results
            </h2>
            <div className="col-span-1 md:col-span-8">
                <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
                    We create fast, responsive, and fully optimized websites designed to grow
                    your online presence. From portfolio sites to business dashboards, our
                    solutions are built to perform.
                </p>
                <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
                    Whether you need a landing page, e-commerce store, or full custom
                    platform—our web solutions are scalable, secure, and future-ready.
                </p>
                <button className="w-full rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit">
                    Learn more <FiArrowUpRight className="inline" />
                </button>
            </div>
        </div>
    </>
);

const UIUXContent = () => (
    <>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
            <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
                Designs That Users Love
            </h2>
            <div className="col-span-1 md:col-span-8">
                <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
                    We craft clean, modern, and user-focused designs that make digital
                    experiences simple, intuitive, and enjoyable for your customers.
                </p>
                <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
                    Our UI/UX process focuses on usability, brand consistency, and seamless
                    workflows—helping you convert more users effortlessly.
                </p>
                <button className="w-full rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit">
                    Learn more <FiArrowUpRight className="inline" />
                </button>
            </div>
        </div>
    </>
);

const VideoEditingContent = () => (
    <>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
            <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
                Professional Videos That Stand Out
            </h2>
            <div className="col-span-1 md:col-span-8">
                <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
                    From Instagram reels to promotional ads, we edit engaging, high-quality
                    videos that boost your brand and capture viewer attention instantly.
                </p>
                <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
                    With smooth transitions, crisp visuals, and impactful storytelling—your
                    content becomes impossible to ignore.
                </p>
                <button className="w-full rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit">
                    Learn more <FiArrowUpRight className="inline" />
                </button>
            </div>
        </div>
    </>
);

const SocialMediaContent = () => (
    <>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
            <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
                Grow Faster on Social Media
            </h2>
            <div className="col-span-1 md:col-span-8">
                <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
                    We handle content creation, posting, and engagement—so you can focus on
                    growing your business while your online presence expands.
                </p>
                <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
                    From Instagram to LinkedIn, we build strategies that increase reach,
                    boost followers, and convert audiences into customers.
                </p>
                <button className="w-full rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit">
                    Learn more <FiArrowUpRight className="inline" />
                </button>
            </div>
        </div>
    </>
);


const CustomDevContent = () => (
    <>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
            <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
                Custom Solutions for Your Business
            </h2>
            <div className="col-span-1 md:col-span-8">
                <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
                    We build tailored applications, tools, and systems based on your unique
                    business needs—ensuring flexibility, speed, and long-term scalability.
                </p>
                <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
                    Whether it’s automation, dashboards, or full-stack development, we bring
                    your ideas to life with precision and performance.
                </p>
                <button className="w-full rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit">
                    Learn more <FiArrowUpRight className="inline" />
                </button>
            </div>
        </div>
    </>
);
