import React from "react";
import ScrollTextReveal from "../../Common Components/ScrollTextReveal";

export default function OurClients() {
  const logos = [
    "/Images/client_1.png",
    "/Images/client_2.png",
    "/Images/client_3.png",
    "/Images/client_4.png",
    "/Images/client_5.png",
    "/Images/client_6.png",
    "/Images/client_7.png",
  ];

  // Create a 4x long track to ensure perfectly seamless looping
  const marqueeLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <>
      <style>{`
        .marquee-wrapper {
          overflow: hidden;
          width: 100%;
        }

        .marquee-track {
          display: flex;
          gap: 60px;
          animation: scroll 20s linear infinite;
          will-change: transform;
        }

        .marquee-wrapper:hover .marquee-track {
          animation-play-state: paused;
        }

        @keyframes scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      <div className="w-full py-10 bg-white overflow-x-hidden">

        <div className="w-[90%] mx-auto mb-12 sm:mb-16">
          <div className="text-left">
            <p className="text-xs sm:text-sm text-gray-800 mb-2 sm:mb-3 uppercase tracking-[0.25em]">
              Our Expertise
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-4xl leading-snug mb-4 sm:mb-6">
              <ScrollTextReveal
                text="Our Clients"
                className="font-black text-2xl sm:text-3xl md:text-7xl text-[#101c27]"
              />
            </h2>
          </div>
        </div>

        <div className="marquee-wrapper">
          <div className="marquee-track">

            {marqueeLogos.map((logo, i) => (
              <img
                key={i}
                src={logo}
                className="h-[100px] w-auto object-contain opacity-100 transition"
                alt="client-logo"
              />
            ))}

          </div>
        </div>
      </div>
    </>
  );
}
