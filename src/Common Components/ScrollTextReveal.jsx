import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export default function ScrollLetterFillSequential({
  text = "Our Featured Projects",
  className = "",
  baseOpacity = 0.25,
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 15%"]

  });

  const chars = Array.from(text);

  // each letter gets equal scroll time
  const segment = 0.7 / chars.length;


  return (
    <div
      ref={ref}
      className="relative flex flex-wrap font-bold"
      style={{ lineHeight: "1.1em" }}
    >
      {/* Base faint layer */}
      <div className="flex flex-wrap absolute top-0 left-0 pointer-events-none">
        {chars.map((char, i) => (
          <span
            key={`base-${i}`}
            className={className}
            style={{
              color: `rgba(0,0,0,${baseOpacity})`,
              whiteSpace: char === " " ? "pre" : "normal",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>

      {/* Reveal layer */}
      <div className="flex flex-wrap pointer-events-none">
        {chars.map((char, i) => {
          // each letter has its OWN TIME SLOT
          const start = segment * i;
          const end = segment * (i + 1);

          const fill = useTransform(scrollYProgress, [start, end], [0, 100], {
            clamp: true,
          });

          return (
            <motion.span
              key={`mask-${i}`}
              className={className}
              style={{
                color: "black",
                whiteSpace: char === " " ? "pre" : "normal",

                WebkitMaskImage: useTransform(
                  fill,
                  (v) =>
                    `linear-gradient(90deg, #000 ${v}%, transparent ${v + 1
                    }%)`
                ),
                maskImage: useTransform(
                  fill,
                  (v) =>
                    `linear-gradient(90deg, #000 ${v}%, transparent ${v + 1
                    }%)`
                ),

                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",
                willChange: "mask-image",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}
