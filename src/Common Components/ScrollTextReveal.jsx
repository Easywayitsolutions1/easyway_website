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
    offset: ["start 75%", "end 25%"]
  });

  // ✅ Words mein split - per word animation
  const words = text.split(" ");
  const segment = 0.6 / words.length;

  return (
    <div
      ref={ref}
      className="relative inline-block font-bold" // ✅ flex-wrap hata diya
      style={{ lineHeight: "1.1em" }}
    >
      {/* Base faint layer */}
      <div className="inline-block absolute top-0 left-0 pointer-events-none">
        {words.map((word, i) => (
          <React.Fragment key={`base-${i}`}>
            <span
              className={className}
              style={{
                color: `rgba(0,0,0,${baseOpacity})`,
              }}
            >
              {word}
            </span>
            {i < words.length - 1 && " "} {/* Space between words */}
          </React.Fragment>
        ))}
      </div>

      {/* Reveal layer */}
      <div className="inline-block pointer-events-none">
        {words.map((word, wordIndex) => {
          const chars = Array.from(word);
          const wordStart = segment * wordIndex;
          const wordEnd = segment * (wordIndex + 1);

          return (
            <React.Fragment key={`word-${wordIndex}`}>
              <span className="inline-block whitespace-nowrap"> {/* ✅ Words together */}
                {chars.map((char, charIndex) => {
                  const charStart = wordStart + (wordEnd - wordStart) * (charIndex / chars.length);
                  const charEnd = wordStart + (wordEnd - wordStart) * ((charIndex + 1) / chars.length);

                  const fill = useTransform(
                    scrollYProgress,
                    [charStart, charEnd],
                    [0, 100],
                    { clamp: true }
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
                            `linear-gradient(90deg, #101c27 ${v}%, transparent ${v + 1}%)`
                        ),
                        maskImage: useTransform(
                          fill,
                          (v) =>
                            `linear-gradient(90deg, #101c27 ${v}%, transparent ${v + 1}%)`
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
              </span>
              {wordIndex < words.length - 1 && " "} {/* Space between words */}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}