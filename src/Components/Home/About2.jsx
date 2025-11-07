import React from "react";
import ScrollWordReveal from "../../Common Components/ScrollWordReveal";

export default function About2() {
  return (
    <div className="min-h-[100vh] w-full border flex flex-col justify-center items-center py-20 bg-[#0d1117]">
      <div className="w-[50%] max-w-[800px] text-center">
        {/* Scroll Word Reveal Text */}
        <ScrollWordReveal
          className="heading-text text-5xl leading-snug font-semibold text-white"
        />

        {/* 3-Image Overlap Layout */}
        <div className="relative flex justify-center items-center w-full h-[400px] mt-[150px]">
          {/* Left Image */}
          <img
            src="/Images/about_1.webp"
            alt="Left"
            className="absolute w-[260px] rounded-2xl shadow-xl -rotate-6 left-[20%] top-[10%] z-0"
          />

          {/* Center Image */}
          <img
            src="/Images/about_2.webp"
            alt="Center"
            className="absolute w-[300px] rounded-2xl shadow-2xl z-10"
          />

          {/* Right Image */}
          <img
            src="/Images/about_3.webp"
            alt="Right"
            className="absolute w-[260px] rounded-2xl shadow-xl rotate-6 right-[20%] top-[10%] z-0"
          />
        </div>
      </div>
    </div>
  );
}
