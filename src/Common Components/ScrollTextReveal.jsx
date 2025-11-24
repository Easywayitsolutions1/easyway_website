import React, { useRef } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";

export default function ScrollLetterFillSequential({
  text = "Our Featured Projects",
  className = "",
  baseOpacity = 0.25,
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 10%"], // FIXED — starts early, ends smooth
  });

  // Smoother spring but with better response (less delay)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    mass: 0.5,
  });

  const words = text.split(" ");
  const segment = 1 / words.length;

  return (
    <div
      ref={ref}
      className="relative inline-block font-bold"
      style={{
        lineHeight: "1.1em",
        whiteSpace: "pre-wrap",
      }}
    >
      {/* Base faint text */}
      <div className="absolute top-0 left-0 pointer-events-none inline-block">
        {words.map((word, i) => (
          <span key={`base-${i}`} className="inline-block">
            <span
              className={className}
              style={{ color: `rgba(0,0,0,${baseOpacity})` }}
            >
              {word}
            </span>
            {"\u00A0"}
          </span>
        ))}
      </div>

      {/* Reveal Layer */}
      <div className="inline-block pointer-events-none">
        {words.map((word, wordIndex) => {
          const chars = [...word];

          const wordStart = segment * wordIndex;
          const wordEnd = segment * (wordIndex + 1);

          return (
            <span key={`word-${wordIndex}`} className="inline-block">
              {chars.map((char, charIndex) => {
                const slowFactor = 0.45; // a bit slow but responsive

                const charStart =
                  wordStart +
                  (wordEnd - wordStart) *
                    ((charIndex / chars.length) * slowFactor);

                const charEnd =
                  wordStart +
                  (wordEnd - wordStart) *
                    (((charIndex + 1) / chars.length) * slowFactor);

                const fill = useTransform(
                  smoothProgress,
                  [charStart, charEnd],
                  [0, 100]
                );

                return (
                  <motion.span
                    key={`char-${wordIndex}-${charIndex}`}
                    className={className}
                    style={{
                      color: "#101c27",
                      display: "inline-block",

                      WebkitMaskImage: useTransform(
                        fill,
                        (v) =>
                          `linear-gradient(90deg, #000 ${v}%, transparent ${v + 1}%)`
                      ),
                      maskImage: useTransform(
                        fill,
                        (v) =>
                          `linear-gradient(90deg, #000 ${v}%, transparent ${v + 1}%)`
                      ),

                      WebkitMaskSize: "100% 100%",
                      maskSize: "100% 100%",
                      willChange: "mask-image",
                    }}
                  >
                    {char}
                  </motion.span>
                );
              })}

              {"\u00A0"}
            </span>
          );
        })}
      </div>
    </div>
  );
}
