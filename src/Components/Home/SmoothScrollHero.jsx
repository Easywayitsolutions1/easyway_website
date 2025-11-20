import { ReactLenis } from "lenis/dist/lenis-react";
import {
    motion,
    useMotionTemplate,
    useScroll,
    useTransform,
} from "framer-motion";
import { SiSpacex } from "react-icons/si";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { useRef } from "react";
import Header from "../../Common Components/Header";

export const SmoothScrollHero = () => {
    return (
        <div className="bg-white">
            <ReactLenis
                root
                options={{
                    // Learn more -> https://github.com/darkroomengineering/lenis?tab=readme-ov-file#instance-settings
                    lerp: 0.05,
                    //   infinite: true,
                    //   syncTouch: true,
                }}
            >
                <Header />
                <Hero />
            </ReactLenis>
        </div>
    );
};


const SECTION_HEIGHT = 1500;

const Hero = () => {
    return (
        <div
            style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
            className="relative w-full"
        >
            <CenterImage />

            <ParallaxImages />

            <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950/50" />
        </div>
    );
};
const CenterImage = () => {
    const { scrollY } = useScroll();

    const scale = useTransform(scrollY, [0, SECTION_HEIGHT + 500], [1.7, 1]);
    const opacity = useTransform(scrollY, [SECTION_HEIGHT, SECTION_HEIGHT + 500], [1, 0]);

    return (
        <motion.div
            className="sticky top-0 h-screen w-full flex items-center justify-center"
            style={{ opacity }}
        >
            {/* <motion.h1
                style={{ scale }}
                className="heading-text text-[4vw] font-black leading-none text-[#0b1521] tracking-tight"
            > */}
            {/* THINK. DESIGN. DEVELOP. */}
            {/* Complete Digital Solutions for Your Business
            </motion.h1> */}
            <motion.h1
                style={{ scale }}
                className="heading-text text-[15px] sm:text-[25px] md:text-[30px] lg:text-[40px] xl:text-[50px] 2xl:text-[55px] font-black leading-none text-[#0b1521] tracking-tight text-center max-w-[70%]"
            >
                {/* Complete Digital Solutions for Your Business */}
                DESIGN. DEVELOP. ELEVATE.
            </motion.h1>
        </motion.div>
    );
};

const ParallaxImages = () => {
    return (
        <div className="mx-auto max-w-6xl px-4 pt-[200px]">
            <ParallaxImg
                src="/Images/slide_1.jpg"
                alt="And example of a space launch"
                start={200}
                end={200}
                className="h-[300px] sm:h-[420px] md:h-[520px] lg:h-[500px]"
            />
            <ParallaxImg
                src="/Images/slide_2.jpg"
                alt="An example of a space launch"
                start={0}
                end={-250}
                className="h-[300px] sm:h-[420px] md:h-[520px] lg:h-[500px] ms-[28%]"
            />
            <ParallaxImg
                src="/Images/slide_3.jpg"
                alt="Orbiting satellite"
                start={-300}
                end={-450}
                className="ml-auto h-[300px] sm:h-[420px] md:h-[520px] lg:h-[500px]"
            />
            {/* <ParallaxImg
                src="https://images.unsplash.com/photo-1494022299300-899b96e49893?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Orbiting satellite"
                start={0}
                end={-500}
                className="ml-24 w-5/12"
            /> */}
        </div>
    );
};

const ParallaxImg = ({ className, alt, src, start, end }) => {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: [`${start}px end`, `end ${end * -1}px`],
    });

    const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
    const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

    const y = useTransform(scrollYProgress, [0, 1], [start, end]);
    const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

    return (
        <motion.img
            src={src}
            alt={alt}
            className={className}
            ref={ref}
            style={{ transform, opacity }}
        />
    );
};

const Schedule = () => {
    return (
        <section
            id="launch-schedule"
            className="mx-auto max-w-5xl px-4 py-48 text-white"
        >
            <motion.h1
                initial={{ y: 48, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ ease: "easeInOut", duration: 0.75 }}
                className="mb-20 text-4xl font-black uppercase text-zinc-50"
            >
                Launch Schedule
            </motion.h1>
            <ScheduleItem title="NG-21" date="Dec 9th" location="Florida" />
            <ScheduleItem title="Starlink" date="Dec 20th" location="Texas" />
            <ScheduleItem title="Starlink" date="Jan 13th" location="Florida" />
            <ScheduleItem title="Turksat 6A" date="Feb 22nd" location="Florida" />
            <ScheduleItem title="NROL-186" date="Mar 1st" location="California" />
            <ScheduleItem title="GOES-U" date="Mar 8th" location="California" />
            <ScheduleItem title="ASTRA 1P" date="Apr 8th" location="Texas" />
        </section>
    );
};

const ScheduleItem = ({ title, date, location }) => {
    return (
        <motion.div
            initial={{ y: 48, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.75 }}
            className="mb-9 flex items-center justify-between border-b border-zinc-800 px-3 pb-9"
        >
            <div>
                <p className="mb-1.5 text-xl text-zinc-50">{title}</p>
                <p className="text-sm uppercase text-zinc-500">{date}</p>
            </div>
            <div className="flex items-center gap-1.5 text-end text-sm uppercase text-zinc-500">
                <p>{location}</p>
                <FiMapPin />
            </div>
        </motion.div>
    );
};