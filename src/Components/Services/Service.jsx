import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import Footer from "../../Common Components/Footer";
import Header from "../../Common Components/Header";
import SEO from "../../Common Components/SEO";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Services = () => {
    return (
        <>
            <SEO
                title="Our Services - Web Development, Software Development, UI/UX Design, Video Editing | EasyWay IT Solutions Rajkot"
                description="EasyWay IT Solutions offers professional IT services in Rajkot: Web Development, Software Development, UI/UX Design, Video Editing, and Custom IT Solutions. Best IT service provider in Rajkot, Gujarat."
                keywords="Web development company in Rajkot, Website developer in Rajkot, Best web development services Rajkot, Custom website development in Rajkot, Ecommerce website development Rajkot, Website designer in Rajkot, Web design company in Rajkot Gujarat, Responsive website design Rajkot, Software development company in Rajkot, Custom software development Rajkot, Software developers in Rajkot, Mobile app development company Rajkot, UI/UX design company in Rajkot, UI designer in Rajkot, UX designer in Rajkot, Video editing services in Rajkot, Professional video editor in Rajkot"
                canonicalUrl="https://easywayitsolutions.com/service"
            />
            <Header />
            <div className="bg-white">
                <TextParallaxContent
                    imgUrl="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=2000&q=80"
                    subheading="Web Development"
                    heading="Build Better Websites"
                >
                    <WebDevContent />
                </TextParallaxContent>

                <TextParallaxContent
                    imgUrl="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=2000&q=80"
                    subheading="UI / UX Design"
                    heading="Smarter User Experience"
                >
                    <UIUXContent />
                </TextParallaxContent>

                <TextParallaxContent
                    imgUrl="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=2000&q=80"
                    subheading="Video Editing"
                    heading="Edit. Enhance. Impress."
                >
                    <VideoEditingContent />
                </TextParallaxContent>

                <TextParallaxContent
                    imgUrl="https://images.unsplash.com/photo-1579869847514-7c1a19d2d2ad?w=2000&q=80"
                    subheading="Social Media Management"
                    heading="Grow Your Online Presence"
                >
                    <SocialMediaContent />
                </TextParallaxContent>

                <TextParallaxContent
                    imgUrl="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=2000&q=80"
                    subheading="Custom Development"
                    heading="Solutions That Fit You"
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

const WebDevContent = () => {
    const navigate = useNavigate(); 

    const handleClick = () => {
        navigate("/contactUs");
        setTimeout(() => window.scrollTo(0, 0), 0);
    };

    return (
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
                <button onClick={handleClick} className="group relative inline-block w-full md:w-fit px-9 py-4 rounded-xl text-xl font-semibold border-2 border-neutral-900 text-neutral-900 hover:text-white overflow-hidden transition-colors duration-500">
                    <span className="relative z-[2] flex items-center justify-center gap-3">
                        Let's Start <FiArrowUpRight className="inline" />
                    </span>
                    <span className="absolute z-[1] top-full left-full w-[350px] h-[180px] bg-neutral-900 rounded-full transition-all duration-700 ease-in-out group-hover:top-[-40px] group-hover:left-[-40px]" />
                </button>
            </div>
        </div>
    );
};

const UIUXContent = () => {
    const navigate = useNavigate(); 

    const handleClick = () => {
        navigate("/contactUs");
        setTimeout(() => window.scrollTo(0, 0), 0);
    };

    return (
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
                <button onClick={handleClick} className="group relative inline-block w-full md:w-fit px-9 py-4 rounded-xl text-xl font-semibold border-2 border-neutral-900 text-neutral-900 hover:text-white overflow-hidden transition-colors duration-500">
                    <span className="relative z-[2] flex items-center justify-center gap-3">
                        Let's Start <FiArrowUpRight className="inline" />
                    </span>
                    <span className="absolute z-[1] top-full left-full w-[350px] h-[180px] bg-neutral-900 rounded-full transition-all duration-700 ease-in-out group-hover:top-[-40px] group-hover:left-[-40px]" />
                </button>
            </div>
        </div>
    );
};

const VideoEditingContent = () => {
    const navigate = useNavigate(); 

    const handleClick = () => {
        navigate("/contactUs");
        setTimeout(() => window.scrollTo(0, 0), 0);
    };

    return (
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
                <button onClick={handleClick} className="group relative inline-block w-full md:w-fit px-9 py-4 rounded-xl text-xl font-semibold border-2 border-neutral-900 text-neutral-900 hover:text-white overflow-hidden transition-colors duration-500">
                    <span className="relative z-[2] flex items-center justify-center gap-3">
                        Let's Start <FiArrowUpRight className="inline" />
                    </span>
                    <span className="absolute z-[1] top-full left-full w-[350px] h-[180px] bg-neutral-900 rounded-full transition-all duration-700 ease-in-out group-hover:top-[-40px] group-hover:left-[-40px]" />
                </button>
            </div>
        </div>
    );
};

const SocialMediaContent = () => {
    const navigate = useNavigate(); 

    const handleClick = () => {
        navigate("/contactUs");
        setTimeout(() => window.scrollTo(0, 0), 0);
    };

    return (
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
                <button onClick={handleClick} className="group relative inline-block w-full md:w-fit px-9 py-4 rounded-xl text-xl font-semibold border-2 border-neutral-900 text-neutral-900 hover:text-white overflow-hidden transition-colors duration-500">
                    <span className="relative z-[2] flex items-center justify-center gap-3">
                        Let's Start <FiArrowUpRight className="inline" />
                    </span>
                    <span className="absolute z-[1] top-full left-full w-[350px] h-[180px] bg-neutral-900 rounded-full transition-all duration-700 ease-in-out group-hover:top-[-40px] group-hover:left-[-40px]" />
                </button>
            </div>
        </div>
    );
};

const CustomDevContent = () => {
    const navigate = useNavigate(); 

    const handleClick = () => {
        navigate("/contactUs");
        setTimeout(() => window.scrollTo(0, 0), 0);
    };

    return (
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
                    Whether it's automation, dashboards, or full-stack development, we bring
                    your ideas to life with precision and performance.
                </p>
                <button onClick={handleClick} className="group relative inline-block w-full md:w-fit px-9 py-4 rounded-xl text-xl font-semibold border-2 border-neutral-900 text-neutral-900 hover:text-white overflow-hidden transition-colors duration-500">
                    <span className="relative z-[2] flex items-center justify-center gap-3">
                        Let's Start <FiArrowUpRight className="inline" />
                    </span>
                    <span className="absolute z-[1] top-full left-full w-[350px] h-[180px] bg-neutral-900 rounded-full transition-all duration-700 ease-in-out group-hover:top-[-40px] group-hover:left-[-40px]" />
                </button>
            </div>
        </div>
    );
};