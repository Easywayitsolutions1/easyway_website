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
    offset: ["start 100%", "end 20%"],
  });

  // Smooth spring animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    mass: 0.5,
  });

  const words = text.split(" ");
  
  // Calculate total characters for progress distribution
  let totalChars = 0;
  words.forEach((word) => {
    totalChars += word.length;
  });
  
  let charCounter = 0;
  const charSegment = 1 / totalChars;

  return (
    <div
      ref={ref}
      className="heading-text relative inline-block font-bold"
      style={{ lineHeight: "1.1em", }}
    >
      <div className="inline-block">
        {words.map((word, wordIndex) => {
          const chars = [...word];
          
          return (
            <React.Fragment key={`word-${wordIndex}`}>
              {/* Wrap each word to prevent breaking */}
              <span className="inline-block" style={{ whiteSpace: "nowrap" }}>
                {chars.map((char, charIndex) => {
                  const charStart = charSegment * charCounter;
                  const charEnd = charSegment * (charCounter + 1);
                  charCounter++;

                  const fill = useTransform(
                    smoothProgress,
                    [charStart, charEnd],
                    [0, 100]
                  );

                  return (
                    <span
                      key={`char-${wordIndex}-${charIndex}`}
                      className="relative inline-block"
                    >
                      {/* Base light character */}
                      <span
                        className={className}
                        style={{
                          color: `rgba(0,0,0,${baseOpacity})`,
                        }}
                      >
                        {char}
                      </span>

                      {/* Dark reveal character */}
                      <motion.span
                        className={className}
                        style={{
                          color: "#101c27",
                          position: "absolute",
                          top: 0,
                          left: 0,
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
                    </span>
                  );
                })}
              </span>
              {/* Add space after each word except the last */}
              {wordIndex < words.length - 1 && " "}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}