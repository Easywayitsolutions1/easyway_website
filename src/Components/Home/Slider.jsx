// src/components/HeroSlider.jsx
import React, { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { ArrowRight } from 'lucide-react';
import Slide1Image from './Slide1Image';
import Slide2Image from './Slide2Image';
import Slide3Image from './Slide3Image';

const slides = [
  {
    title: (
      <>
        Web Design
        <br />
        & Development
      </>
    ),
    subtitle:
      'Transform your vision into powerful, responsive digital experiences. We craft websites that captivate, engage, and convert.',
    image: (
      <>
        <Slide1Image />
      </>
    )
  },
  {
    title: (
      <>
        Graphic Design
        <br />
        & UI/UX
      </>
    ),
    subtitle:
      'Crafting stunning visuals and intuitive user experiences that bring your brand to life. Where creativity meets functionality.',
    image: (
      <>
        <Slide2Image />
      </>
    )
  },
  {
    title: (
      <>
        Video Editing
        <br />
        & Production
      </>
    ),
    subtitle:
      'Transform raw footage into cinematic masterpieces. Professional video editing that tells your story with impact and emotion.',
    image: (
      <>
        <Slide3Image />
      </>
    )
  },
];

export default function HeroSlider() {
  const headingRefs = useRef([]);
  const circleStates = useRef(slides.map(() => ({ x: 0, y: 0, show: false })));
  const targetPos = useRef(slides.map(() => ({ x: 0, y: 0 })));
  const rafRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [circlePositions, setCirclePositions] = useState(slides.map(() => ({ x: 0, y: 0, show: false })));

  // Handle mouse move on heading
  const handleMouseMove = (e, idx) => {
    if (!headingRefs.current[idx]) return;
    const rect = headingRefs.current[idx].getBoundingClientRect();
    const newTarget = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    targetPos.current[idx] = newTarget;

    if (!circleStates.current[idx].show) {
      circleStates.current[idx] = { 
        x: newTarget.x, 
        y: newTarget.y, 
        show: true 
      };
      setCirclePositions(prev => {
        const updated = [...prev];
        updated[idx] = { x: newTarget.x, y: newTarget.y, show: true };
        return updated;
      });
    }
  };

  const handleMouseLeave = (idx) => {
    circleStates.current[idx].show = false;
    setCirclePositions(prev => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], show: false };
      return updated;
    });
  };

  // Smooth animation loop
  useEffect(() => {
    let animationId;

    const animate = () => {
      let needsUpdate = false;

      slides.forEach((_, idx) => {
        const state = circleStates.current[idx];
        const target = targetPos.current[idx];

        if (state.show && target) {
          const dx = target.x - state.x;
          const dy = target.y - state.y;

          // Smoother easing with higher lerp factor
          const lerpFactor = 0.2;
          
          state.x += dx * lerpFactor;
          state.y += dy * lerpFactor;

          needsUpdate = true;
        }
      });

      if (needsUpdate) {
        setCirclePositions(slides.map((_, idx) => ({
          x: circleStates.current[idx].x,
          y: circleStates.current[idx].y,
          show: circleStates.current[idx].show
        })));
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    rafRef.current = animationId;

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#101c27] overflow-hidden flex items-center justify-center py-12 lg:py-0">
      {/* Global styles */}
      <style>{`
        @keyframes slideInDown { from {opacity:0;transform:translateY(-40px)} to {opacity:1;transform:translateY(0)} }
        @keyframes slideInUp   { from {opacity:0;transform:translateY(40px)}  to {opacity:1;transform:translateY(0)} }
        @keyframes slideInRight{ from {opacity:0;transform:translateX(60px)} to {opacity:1;transform:translateX(0)} }
        @keyframes blob {0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(30px,-50px) scale(1.1)}66%{transform:translate(-20px,20px) scale(0.9)}}
        @keyframes float {0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-20px) rotate(5deg)}}
        @keyframes floatReverse {0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(20px) rotate(-5deg)}}
        @keyframes pulse {0%,100%{opacity:.6;transform:scale(1)}50%{opacity:1;transform:scale(1.05)}}
        @keyframes drift {0%{transform:translate(0,0)}100%{transform:translate(100vw,-100vh)}}
        @keyframes rotate3d {0%{transform:rotateY(0) rotateX(10deg)}100%{transform:rotateY(360deg) rotateX(10deg)}}
        @keyframes scan {0%,100%{transform:translateY(-100%)}50%{transform:translateY(100%)}}
        .particle{animation:drift linear infinite}
        .float{animation:float 6s ease-in-out infinite}
        .float-reverse{animation:floatReverse 7s ease-in-out infinite}
        .pulse{animation:pulse 3s ease-in-out infinite}
        .rotate3d{animation:rotate3d 20s linear infinite}
      `}</style>

      {/* Gradient blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle,#1d2d39 0%,transparent 70%)', animation: 'blob 8s ease-in-out infinite' }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle,#1d2d39 0%,transparent 70%)', animation: 'blob 8s ease-in-out infinite 2s' }} />

      {/* Swiper */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="w-[95%] mx-auto"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slides.map((item, idx) => (
          <SwiperSlide key={idx}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center px-6 md:px-12">
              {/* LEFT – TEXT */}
              <div className="text-left">
                <h1
                  ref={(el) => (headingRefs.current[idx] = el)}
                  className="font-bold text-5xl md:text-6xl lg:text-7xl leading-tight mb-8 text-white relative cursor-pointer select-none"
                  style={{
                    animation: 'slideInDown 0.8s ease-out 0.15s both',
                    textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                  }}
                  onMouseMove={(e) => handleMouseMove(e, idx)}
                  onMouseLeave={() => handleMouseLeave(idx)}
                >
                  {/* White Circle Follower */}
                  {circlePositions[idx].show && (
                    <span
                      className="absolute pointer-events-none"
                      style={{
                        left: circlePositions[idx].x,
                        top: circlePositions[idx].y,
                        transform: 'translate(-50%, -50%)',
                        width: '150px',
                        height: '150px',
                        borderRadius: '50%',
                        background: 'white',
                        mixBlendMode: 'difference',
                        zIndex: 10,
                        willChange: 'transform',
                      }}
                    />
                  )}

                  <span style={{ position: 'relative', zIndex: 5 }}>{item.title}</span>
                </h1>

                <p
                  className="text-lg md:text-xl text-white mb-10 leading-relaxed"
                  style={{ animation: 'slideInUp 0.8s ease-out 0.3s both' }}
                >
                  {item.subtitle}
                </p>

                <div
                  className="flex flex-col sm:flex-row gap-4"
                  style={{ animation: 'slideInUp 0.8s ease-out 0.6s both' }}
                >
                  <button className="group relative inline-block px-8 py-3 rounded-[10px] text-[17px] font-medium border-2 border-white text-white hover:text-black overflow-hidden transition-colors duration-500 z-10">
                    <span className="relative z-10 flex justify-between items-center gap-3">
                      Get Started <ArrowRight size={20} />
                    </span>
                    <span className="absolute top-full left-full w-[250px] h-[150px] bg-white rounded-full transition-all duration-700 ease-in-out group-hover:top-[-30px] group-hover:left-[-30px]" />
                  </button>
                </div>
              </div>

              <div className="flex justify-center items-center">
                {activeIndex === idx && (
                  <div className="w-full h-full flex justify-center items-center">
                    {item.image}
                  </div>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}