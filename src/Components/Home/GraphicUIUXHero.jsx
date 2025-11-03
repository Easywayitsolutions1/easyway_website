import React, { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function GraphicUIUXHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const [circlePos, setCirclePos] = useState({ x: 0, y: 0, show: false });
  const headingRef = useRef(null);
  const rafRef = useRef(null);
  const targetPos = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (headingRef.current) {
      const rect = headingRef.current.getBoundingClientRect();
      targetPos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };

      if (!circlePos.show) {
        setCirclePos({
          x: targetPos.current.x,
          y: targetPos.current.y,
          show: true
        });
      }
    }
  };

  const handleMouseLeave = () => {
    setCirclePos(prev => ({ ...prev, show: false }));
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
  };

  useEffect(() => {
    const animate = () => {
      if (circlePos.show) {
        setCirclePos(prev => {
          const dx = targetPos.current.x - prev.x;
          const dy = targetPos.current.y - prev.y;

          return {
            ...prev,
            x: prev.x + dx * 0.15,
            y: prev.y + dy * 0.15
          };
        });
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    if (circlePos.show) {
      rafRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [circlePos.show]);

  return (
    <div className="relative w-full min-h-screen bg-[#1a0e2e] overflow-hidden flex items-center justify-center py-12 lg:py-0">
      <style>{`
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes floatReverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(20px) rotate(-5deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }

        @keyframes drift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(100vw, -100vh); }
        }

        @keyframes rotate3d {
          0% { transform: rotateY(0deg) rotateX(10deg); }
          100% { transform: rotateY(360deg) rotateX(10deg); }
        }

        @keyframes colorShift {
          0%, 100% { filter: hue-rotate(0deg); }
          50% { filter: hue-rotate(30deg); }
        }

        @keyframes drawCircle {
          0% { stroke-dashoffset: 440; }
          100% { stroke-dashoffset: 0; }
        }

        .particle {
          animation: drift linear infinite;
        }

        .float { animation: float 6s ease-in-out infinite; }
        .float-reverse { animation: floatReverse 7s ease-in-out infinite; }
        .pulse { animation: pulse 3s ease-in-out infinite; }
        .rotate3d { animation: rotate3d 20s linear infinite; }
        .color-shift { animation: colorShift 5s ease-in-out infinite; }
      `}</style>

      {/* Animated gradient blobs */}
      <div
        className="absolute top-0 left-0 w-96 h-96 opacity-5 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #4a1b6f 0%, transparent 70%)',
          animation: 'blob 8s ease-in-out infinite'
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 opacity-5 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #6b2d8f 0%, transparent 70%)',
          animation: 'blob 8s ease-in-out infinite 2s'
        }}
      />

      {/* Main content container */}
      <div className="relative z-10 w-[95%] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* LEFT SIDE - TEXT CONTENT */}
        <div className="text-left">
          {/* Main heading with highlights */}
          <h1
            ref={headingRef}
            className="heading-text font-bold text-5xl md:text-6xl lg:text-7xl leading-tight mb-8 text-white relative cursor-pointer select-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              animation: 'slideInDown 0.8s ease-out 0.15s both',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
              mixBlendMode: 'normal'
            }}
          >
            {/* White Circle that follows cursor */}
            {circlePos.show && (
              <span
                className="absolute pointer-events-none"
                style={{
                  left: circlePos.x,
                  top: circlePos.y,
                  transform: 'translate(-50%, -50%)',
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  background: 'white',
                  mixBlendMode: 'difference',
                  zIndex: 10
                }}
              />
            )}

            <span className='heading-text' style={{ position: 'relative', zIndex: 5 }}>
              Graphic Design
              <br />
              & UI/UX
            </span>
          </h1>

          {/* Subheading */}
          <p
            className="text-lg md:text-xl text-white mb-10 leading-relaxed"
            style={{
              animation: 'slideInUp 0.8s ease-out 0.3s both'
            }}
          >
            Crafting stunning visuals and intuitive user experiences that bring your brand to life. Where creativity meets functionality.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4"
            style={{
              animation: 'slideInUp 0.8s ease-out 0.6s both'
            }}
          >
            <button className="group relative inline-block px-8 py-3 rounded-[10px] text-[17px] font-medium border-2 border-white text-white hover:text-black overflow-hidden transition-colors duration-500 z-10">
              <span className="relative z-10 flex justify-between items-center gap-3">View Portfolio <Sparkles size={20} /></span>
              <span className="absolute top-full left-full w-[250px] h-[150px] bg-white rounded-full transition-all duration-700 ease-in-out group-hover:top-[-30px] group-hover:left-[-30px]"></span>
            </button>
          </div>
        </div>

        {/* RIGHT SIDE - ANIMATED VISUAL */}
        <div
          className="relative w-full h-[500px] lg:h-[700px] flex items-center justify-center"
          style={{
            animation: 'slideInRight 0.8s ease-out 0.3s both'
          }}
        >
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="particle absolute rounded-full pointer-events-none"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                background: `radial-gradient(circle, ${particle.id % 3 === 0 ? '#ff6b9d' : particle.id % 3 === 1 ? '#c084fc' : '#fbbf24'}, transparent)`,
                animationDuration: `${particle.duration}s`,
                animationDelay: `${particle.delay}s`,
                boxShadow: `0 0 ${particle.size * 3}px ${particle.id % 3 === 0 ? '#ff6b9d' : particle.id % 3 === 1 ? '#c084fc' : '#fbbf24'}`,
              }}
            />
          ))}

          <div
            className="relative w-full h-full"
            style={{
              transform: `translate(${-mousePosition.x * 0.3}px, ${-mousePosition.y * 0.3}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            {/* Main Design Canvas - Center */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 md:w-[420px] h-64 sm:h-80 md:h-96 float z-20">
              <div className="relative w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-3xl border border-purple-400/30 p-6 sm:p-8"
                style={{ boxShadow: '0 0 40px rgba(192, 132, 252, 0.4), inset 0 0 20px rgba(192, 132, 252, 0.1)' }}>
                
                {/* Color Palette */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 color-shift" style={{ boxShadow: '0 4px 15px rgba(255, 107, 157, 0.5)' }} />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-violet-500 color-shift" style={{ boxShadow: '0 4px 15px rgba(192, 132, 252, 0.5)', animationDelay: '1s' }} />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 color-shift" style={{ boxShadow: '0 4px 15px rgba(251, 191, 36, 0.5)', animationDelay: '2s' }} />
                </div>

                {/* Design Grid */}
                <div className="mt-16 space-y-4">
                  {/* Typography Section */}
                  <div className="space-y-2">
                    <div className="h-6 bg-gradient-to-r from-pink-400/60 to-purple-400/60 rounded-lg w-3/4" />
                    <div className="h-4 bg-purple-400/50 rounded w-1/2" />
                  </div>

                  {/* Image Placeholder */}
                  <div className="h-32 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-xl flex items-center justify-center relative overflow-hidden">
                    <svg className="w-20 h-20 text-purple-300/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {/* Diagonal stripes */}
                    <div className="absolute inset-0 opacity-20" style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)'
                    }} />
                  </div>

                  {/* Button Layout */}
                  <div className="flex gap-3">
                    <div className="flex-1 h-10 bg-gradient-to-r from-pink-500/50 to-rose-500/50 rounded-lg pulse" />
                    <div className="flex-1 h-10 bg-purple-500/30 rounded-lg border border-purple-400/40" />
                  </div>
                </div>
              </div>
            </div>

            {/* Color Picker Tool - Top Right */}
            <div className="absolute top-8 sm:top-12 right-4 sm:right-8 float-reverse z-10">
              <div className="w-32 h-40 sm:w-36 sm:h-44 bg-gradient-to-br from-pink-600/20 to-rose-600/20 backdrop-blur-md rounded-2xl border border-pink-400/30 p-4 rotate-6"
                style={{ boxShadow: '0 0 30px rgba(255, 107, 157, 0.3)' }}>
                <div className="space-y-3">
                  {/* Color wheel representation */}
                  <div className="w-full h-20 rounded-lg bg-gradient-to-br from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400 relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 border-2 border-white rounded-full pulse" />
                  </div>
                  {/* Color sliders */}
                  <div className="space-y-2">
                    <div className="h-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full" />
                    <div className="h-2 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full" />
                    <div className="h-2 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Pen Tool Icon - Top Left */}
            <div className="absolute top-16 sm:top-20 left-2 sm:left-6 pulse z-10">
              <div className="w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-br from-purple-500/30 to-violet-600/30 backdrop-blur-md rounded-full border border-purple-400/40 flex items-center justify-center"
                style={{ boxShadow: '0 0 30px rgba(192, 132, 252, 0.4)' }}>
                <svg className="w-16 h-16 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
            </div>

            {/* Typography Card - Left Bottom */}
            <div className="absolute bottom-12 sm:bottom-16 left-4 sm:left-8 float z-10">
              <div className="w-36 h-44 sm:w-40 sm:h-48 bg-gradient-to-br from-amber-600/20 to-orange-600/20 backdrop-blur-md rounded-xl border border-amber-400/30 p-4 -rotate-6"
                style={{ boxShadow: '0 0 25px rgba(251, 191, 36, 0.3)' }}>
                <div className="space-y-3">
                  <div className="text-amber-300 font-bold text-xl">Aa</div>
                  <div className="space-y-2">
                    <div className="h-3 bg-amber-400/70 rounded w-full" />
                    <div className="h-2 bg-orange-400/60 rounded w-3/4" />
                    <div className="h-2 bg-amber-400/60 rounded w-5/6" />
                    <div className="h-3 bg-orange-400/70 rounded w-2/3" />
                    <div className="h-2 bg-amber-400/60 rounded w-4/5" />
                  </div>
                  <div className="flex gap-2 mt-3">
                    <div className="w-8 h-8 bg-amber-400/40 rounded flex items-center justify-center text-xs font-bold text-amber-200">B</div>
                    <div className="w-8 h-8 bg-orange-400/40 rounded flex items-center justify-center text-xs italic text-orange-200">I</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Layers Panel - Right Bottom */}
            <div className="absolute bottom-8 sm:bottom-12 right-6 sm:right-12 float-reverse z-10">
              <div className="w-44 h-36 sm:w-48 sm:h-40 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-md rounded-xl border border-gray-700/50 p-3"
                style={{ boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)' }}>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 bg-purple-500/20 rounded p-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded" />
                    <div className="flex-1 h-2 bg-purple-400/60 rounded" />
                  </div>
                  <div className="flex items-center gap-2 bg-pink-500/10 rounded p-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded" />
                    <div className="flex-1 h-2 bg-pink-400/50 rounded" />
                  </div>
                  <div className="flex items-center gap-2 bg-amber-500/10 rounded p-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded" />
                    <div className="flex-1 h-2 bg-amber-400/50 rounded" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bezier Curve Tool - Right Middle */}
            <div className="absolute top-1/3 right-12 sm:right-20 float z-10">
              <div className="w-32 h-32 sm:w-36 sm:h-36 rotate3d" style={{ transformStyle: 'preserve-3d' }}>
                {/* Front face */}
                <div className="absolute inset-0 border-2 border-pink-400/50 rounded-lg bg-gradient-to-br from-pink-500/10 to-purple-500/10"
                  style={{
                    transform: 'translateZ(20px)',
                    boxShadow: '0 0 20px rgba(255, 107, 157, 0.5)'
                  }}>
                  <svg className="w-full h-full p-4" viewBox="0 0 100 100">
                    <path d="M 10,90 Q 30,10 90,50" stroke="#ff6b9d" strokeWidth="2" fill="none" className="pulse" />
                    <circle cx="10" cy="90" r="3" fill="#ff6b9d" />
                    <circle cx="30" cy="10" r="3" fill="#c084fc" />
                    <circle cx="90" cy="50" r="3" fill="#fbbf24" />
                  </svg>
                </div>
                {/* Back face */}
                <div className="absolute inset-0 border-2 border-purple-400/50 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10"
                  style={{
                    transform: 'translateZ(-20px)',
                    boxShadow: '0 0 20px rgba(192, 132, 252, 0.5)'
                  }} />
              </div>
            </div>

            {/* Blend Modes Indicator - Top Left Corner */}
            <div className="absolute top-4 sm:top-8 left-16 sm:left-24 float-reverse z-10">
              <div className="w-24 h-24 sm:w-28 sm:h-28 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full opacity-60 blur-sm" />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full opacity-60 blur-sm translate-x-4 translate-y-4" style={{ mixBlendMode: 'screen' }} />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full opacity-60 blur-sm translate-x-2 translate-y-8" style={{ mixBlendMode: 'screen' }} />
              </div>
            </div>

            {/* Gradient Tool */}
            <div className="absolute bottom-1/4 left-8 sm:left-12 pulse z-10" style={{ animationDelay: '1s' }}>
              <div className="w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-2xl border border-purple-400/30 p-3 flex items-center justify-center"
                style={{ boxShadow: '0 0 25px rgba(192, 132, 252, 0.3)' }}>
                <div className="w-full h-20 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-amber-500" />
                  <div className="absolute top-1/2 left-0 w-3 h-3 bg-white rounded-full border-2 border-pink-500 transform -translate-y-1/2" />
                  <div className="absolute top-1/2 right-0 w-3 h-3 bg-white rounded-full border-2 border-amber-500 transform -translate-y-1/2" />
                </div>
              </div>
            </div>

            {/* Glowing orbs */}
            <div className="absolute top-0 right-1/4 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-pink-400 to-rose-600 blur-2xl opacity-60 pulse pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/4 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-purple-600 to-violet-600 blur-2xl opacity-60 pulse pointer-events-none" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/3 right-8 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 blur-xl opacity-50 pulse pointer-events-none" style={{ animationDelay: '2s' }} />

            {/* Connecting lines between elements */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0 0 5px rgba(192, 132, 252, 0.5))' }}>
              <line x1="20%" y1="35%" x2="50%" y2="50%" stroke="#ff6b9d" strokeWidth="1" opacity="0.4" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
              </line>
              <line x1="85%" y1="25%" x2="50%" y2="50%" stroke="#c084fc" strokeWidth="1" opacity="0.4" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
              </line>
              <line x1="25%" y1="75%" x2="50%" y2="50%" stroke="#fbbf24" strokeWidth="1" opacity="0.4" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
              </line>
              <line x1="80%" y1="70%" x2="50%" y2="50%" stroke="#ff6b9d" strokeWidth="1" opacity="0.4" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1.2s" repeatCount="indefinite" />
              </line>
            </svg>

            {/* Floating dots */}
            <div className="absolute top-1/4 left-1/4 pulse pointer-events-none">
              <div className="w-4 h-4 rounded-full bg-pink-400 shadow-lg" style={{ boxShadow: '0 0 15px #ff6b9d' }} />
            </div>
            <div className="absolute bottom-1/3 right-1/4 pulse pointer-events-none" style={{ animationDelay: '1s' }}>
              <div className="w-4 h-4 rounded-full bg-purple-400 shadow-lg" style={{ boxShadow: '0 0 15px #c084fc' }} />
            </div>
            <div className="absolute top-2/3 left-1/3 pulse pointer-events-none" style={{ animationDelay: '2s' }}>
              <div className="w-4 h-4 rounded-full bg-amber-400 shadow-lg" style={{ boxShadow: '0 0 15px #fbbf24' }} />
            </div>
          </div>

          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-32 bg-gradient-to-t from-purple-500/20 via-pink-500/10 to-transparent blur-3xl pointer-events-none" />
        </div>
      </div>
    </div>
  );
}