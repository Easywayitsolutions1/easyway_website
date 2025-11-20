import React, { useMemo } from "react";
import "./BackgroundLayer.css";

const NUM_PARTICLES = 4; // Reduced for cleaner look
const NUM_LINES_PER_COLUMN = 1; // One line per column for full coverage

const randomBetween = (min, max) => Math.random() * (max - min) + min;

const directions = ["top", "bottom", "left", "right"];

const BackgroundLayer = () => {
  const particles = useMemo(() => {
    return new Array(NUM_PARTICLES).fill(0).map((_, i) => {
      const side = directions[Math.floor(Math.random() * directions.length)];

      let start = {};
      let animationName = "";

      switch (side) {
        case "top":
          start = { left: `${randomBetween(0, 100)}%`, top: `-10px` };
          animationName = "move-down";
          break;
        case "bottom":
          start = { left: `${randomBetween(0, 100)}%`, bottom: `-10px` };
          animationName = "move-up";
          break;
        case "left":
          start = { top: `${randomBetween(0, 100)}%`, left: `-10px` };
          animationName = "move-right";
          break;
        case "right":
          start = { top: `${randomBetween(0, 100)}%`, right: `-10px` };
          animationName = "move-left";
          break;
        default:
          break;
      }

      return {
        id: i,
        size: randomBetween(3, 7),
        opacity: randomBetween(0.5, 0.8),
        duration: randomBetween(12, 22),
        delay: randomBetween(0, 8),
        animationName,
        ...start,
      };
    });
  }, []);

  const movingLines = useMemo(() => {
    // Grid columns are 200px wide
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1400;
    const columnWidth = 200;
    const totalColumns = Math.ceil(screenWidth / columnWidth); // One line per column

    return Array.from({ length: totalColumns * NUM_LINES_PER_COLUMN }, (_, i) => {
      const columnIndex = Math.floor(i / NUM_LINES_PER_COLUMN);
      const leftPosition = columnIndex * columnWidth;

      // Random direction (top to bottom or bottom to top)
      const direction = Math.random() > 0.5 ? 'down' : 'up';

      return {
        id: `line-${i}`,
        leftPosition: `${leftPosition}px`,
        direction,
        delay: randomBetween(0, 5), // Reduced delay range for smoother overlap
        duration: randomBetween(8, 14), // Slightly longer for smoother motion
        opacity: randomBetween(0.5, 0.8), // Slightly lower opacity for subtlety
      };
    });
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {/* Grid background */}
      <div className="bg-grid absolute inset-0" />

      {/* Soft vignette */}
      {/* Enhanced moving lines over grid columns */}
      <div className="absolute inset-0 overflow-hidden">
        {movingLines.map((line) => (
          <div
            key={line.id}
            className={`moving-line vertical ${line.direction}`}
            style={{
              position: 'absolute',
              left: line.leftPosition,
              opacity: line.opacity,
              animation: `line-${line.direction} ${line.duration}s ease-in-out ${line.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <span
            key={p.id}
            className="particle block rounded-full bg-[var(--brand-color)]"
            style={{
              position: "absolute",
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animation: `${p.animationName} ${p.duration}s linear ${p.delay}s infinite`,
              ...p,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BackgroundLayer;