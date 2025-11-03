import React, { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';

export default function VideoEditingHero() {
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
        y: e.clientY - rect.top,
      };

      if (!circlePos.show) {
        setCirclePos({
          x: targetPos.current.x,
          y: targetPos.current.y,
          show: true,
        });
      }
    }
  };

  const handleMouseLeave = () => {
    setCirclePos((prev) => ({ ...prev, show: false }));
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
  };

  // Smoother circle follow (easing 0.12)
  useEffect(() => {
    let animationId;
    const easing = 0.12; // Lower = smoother lag

    const animate = () => {
      if (circlePos.show && headingRef.current) {
        const rect = headingRef.current.getBoundingClientRect();
        const targetX = targetPos.current.x;
        const targetY = targetPos.current.y;

        setCirclePos((prev) => {
          const dx = targetX - prev.x;
          const dy = targetY - prev.y;
          return {
            ...prev,
            x: prev.x + dx * easing,
            y: prev.y + dy * easing,
          };
        });
      }
      animationId = requestAnimationFrame(animate);
    };

    if (circlePos.show) {
      animationId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [circlePos.show]);

  return (
    <div className="relative w-full min-h-screen bg-[#0a0e1a] overflow-hidden flex items-center justify-center py-12 lg:py-0">
      <style>{`
        @keyframes slideInDown {
          from { opacity: 0; transform: translateY(-40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
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
        @keyframes waveform {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1); }
        }
        .particle { animation: drift linear infinite; }
        .float { animation: float 6s ease-in-out infinite; }
        .float-reverse { animation: floatReverse 7s ease-in-out infinite; }
        .pulse { animation: pulse 3s ease-in-out infinite; }
        .rotate3d { animation: rotate3d 20s linear infinite; }
      `}</style>

      {/* Animated gradient blobs */}
      <div
        className="absolute top-0 left-0 w-96 h-96 opacity-5 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #1e3a5f 0%, transparent 70%)',
          animation: 'blob 8s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 opacity-5 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #2d1b4e 0%, transparent 70%)',
          animation: 'blob 8s ease-in-out infinite 2s',
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
              mixBlendMode: 'normal',
            }}
          >
            {/* White Circle that follows cursor (smooth) */}
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
                  zIndex: 10,
                }}
              />
            )}

            <span className="heading-text" style={{ position: 'relative', zIndex: 5 }}>
              Video Editing
              <br />
              & Production
            </span>
          </h1>

          {/* Subheading */}
          <p
            className="text-lg md:text-xl text-white mb-10 leading-relaxed"
            style={{
              animation: 'slideInUp 0.8s ease-out 0.3s both',
            }}
          >
            Transform raw footage into cinematic masterpieces. Professional video editing that tells your story with impact and emotion.
          </p>
          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4"
            style={{
              animation: 'slideInUp 0.8s ease-out 0.6s both',
            }}
          >
            <button className="group relative inline-block px-8 py-3 rounded-[10px] text-[17px] font-medium border-2 border-white text-white hover:text-black overflow-hidden transition-colors duration-500 z-10">
              <span className="relative z-10 flex justify-between items-center gap-3">
                Watch Showreel <Play size={20} />
              </span>
              <span className="absolute top-full left-full w-[250px] h-[150px] bg-white rounded-full transition-all duration-700 ease-in-out group-hover:top-[-30px] group-hover:left-[-30px]"></span>
            </button>
          </div>
        </div>

        {/* RIGHT SIDE - ANIMATED VISUAL */}
        <div
          className="relative w-full h-[500px] lg:h-[700px] flex items-center justify-center"
          style={{
            animation: 'slideInRight 0.8s ease-out 0.3s both',
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
                background: `radial-gradient(circle, ${
                  particle.id % 3 === 0 ? '#3b82f6' : particle.id % 3 === 1 ? '#8b5cf6' : '#ec4899'
                }, transparent)`,
                animationDuration: `${particle.duration}s`,
                animationDelay: `${particle.delay}s`,
                boxShadow: `0 0 ${particle.size * 3}px ${
                  particle.id % 3 === 0 ? '#3b82f6' : particle.id % 3 === 1 ? '#8b5cf6' : '#ec4899'
                }`,
              }}
            />
          ))}

          <div
            className="relative w-full h-full"
            style={{
              transform: `translate(${-mousePosition.x * 0.3}px, ${-mousePosition.y * 0.3}px)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            {/* Main Video Timeline - Center */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 md:w-[450px] h-72 sm:h-80 md:h-96 float z-20">
              <div
                className="relative w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-md rounded-2xl border border-blue-400/30 p-4 sm:p-6"
                style={{ boxShadow: '0 0 40px rgba(59, 130, 246, 0.4), inset 0 0 20px rgba(59, 130, 246, 0.1)' }}
              >
                {/* Video Preview Window */}
                <div className="w-full h-32 sm:h-40 bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-lg mb-4 relative overflow-hidden border border-blue-400/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-purple-600/30 to-pink-600/30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center pulse border border-white/30">
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    </div>
                  </div>
                  <div className="absolute top-2 left-2 text-xs font-mono text-white/80 bg-black/50 px-2 py-1 rounded">
                    00:01:23:45
                  </div>
                </div>

                {/* Timeline Tracks */}
                <div className="space-y-2">
                  <div className="h-8 bg-gray-800/50 rounded relative overflow-hidden border border-blue-400/20">
                    <div className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-blue-500/60 to-blue-600/60 rounded" />
                    <div className="absolute left-1/3 top-0 h-full w-1/4 bg-gradient-to-r from-purple-500/60 to-purple-600/60 rounded ml-1" />
                    <div className="absolute left-[60%] top-0 h-full w-1/5 bg-gradient-to-r from-pink-500/60 to-pink-600/60 rounded ml-1" />
                  </div>
                  <div className="h-8 bg-gray-800/50 rounded relative overflow-hidden border border-purple-400/20">
                    <div className="absolute left-[10%] top-0 h-full w-2/5 bg-gradient-to-r from-cyan-500/60 to-blue-600/60 rounded" />
                    <div className="absolute left-[55%] top-0 h-full w-1/4 bg-gradient-to-r from-violet-500/60 to-purple-600/60 rounded ml-1" />
                  </div>
                  <div className="h-12 bg-gray-800/50 rounded relative overflow-hidden border border-green-400/20 flex items-center px-2 gap-0.5">
                    {Array.from({ length: 60 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-green-400/60 rounded-sm"
                        style={{
                          height: `${Math.random() * 60 + 20}%`,
                          animation: `waveform ${Math.random() * 2 + 1}s ease-in-out infinite`,
                          animationDelay: `${i * 0.05}s`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="h-6 bg-gray-900/50 rounded relative border border-gray-600/30 flex items-center justify-between px-2 text-[10px] text-gray-400 font-mono">
                    <span>0:00</span>
                    <span>0:30</span>
                    <span>1:00</span>
                    <span>1:30</span>
                    <span>2:00</span>
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-red-500 shadow-lg"
                      style={{
                        left: '40%',
                        boxShadow: '0 0 10px #ef4444',
                      }}
                    >
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-red-500 rounded-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Effects Panel - Top Right */}
            <div className="absolute top-8 sm:top-12 right-4 sm:right-8 float-reverse z-10">
              <div
                className="w-32 h-44 sm:w-36 sm:h-48 bg-gradient-to-br from-purple-600/20 to-violet-600/20 backdrop-blur-md rounded-xl border border-purple-400/30 p-3 rotate-6"
                style={{ boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)' }}
              >
                <div className="space-y-2">
                  <div className="text-xs text-purple-300 font-semibold mb-2">EFFECTS</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="aspect-square bg-gradient-to-br from-blue-500/40 to-cyan-500/40 rounded flex items-center justify-center">
                      <svg className="w-5 h-5 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                    </div>
                    <div className="aspect-square bg-gradient-to-br from-purple-500/40 to-pink-500/40 rounded flex items-center justify-center pulse">
                      <svg className="w-5 h-5 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                      </svg>
                    </div>
                    <div className="aspect-square bg-gradient-to-br from-pink-500/40 to-rose-500/40 rounded flex items-center justify-center">
                      <svg className="w-5 h-5 text-rose-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div className="aspect-square bg-gradient-to-br from-violet-500/40 to-purple-500/40 rounded flex items-center justify-center">
                      <svg className="w-5 h-5 text-violet-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Film Strip - Top Left */}
            <div className="absolute top-16 sm:top-20 left-2 sm:left-6 float z-10">
              <div
                className="w-40 h-24 sm:w-44 sm:h-28 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md rounded-lg border border-gray-600/30 p-2 overflow-hidden relative"
                style={{ boxShadow: '0 0 25px rgba(0, 0, 0, 0.5)' }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-2 flex flex-col justify-around py-1">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-gray-700 rounded-sm" />
                  ))}
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-2 flex flex-col justify-around py-1">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-gray-700 rounded-sm" />
                  ))}
                </div>
                <div className="ml-3 mr-3 h-full flex gap-1 overflow-hidden">
                  <div className="w-12 h-full bg-gradient-to-br from-blue-600/40 to-purple-600/40 rounded flex-shrink-0" />
                  <div className="w-12 h-full bg-gradient-to-br from-purple-600/40 to-pink-600/40 rounded flex-shrink-0" />
                  <div className="w-12 h-full bg-gradient-to-br from-pink-600/40 to-rose-600/40 rounded flex-shrink-0" />
                </div>
              </div>
            </div>

            {/* Color Grading Panel - Left Bottom */}
            <div className="absolute bottom-12 sm:bottom-16 left-4 sm:left-8 float-reverse z-10">
              <div
                className="w-40 h-40 sm:w-44 sm:h-44 bg-gradient-to-br from-orange-600/20 to-red-600/20 backdrop-blur-md rounded-xl border border-orange-400/30 p-3 -rotate-6"
                style={{ boxShadow: '0 0 25px rgba(249, 115, 22, 0.3)' }}
              >
                <div className="space-y-3">
                  <div className="text-xs text-orange-300 font-semibold">COLOR</div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="aspect-square rounded-full bg-gradient-to-br from-red-500 via-yellow-500 to-blue-500 border border-orange-400/40 pulse" />
                    <div className="aspect-square rounded-full bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 border border-orange-400/40 pulse" style={{ animationDelay: '0.5s' }} />
                    <div className="aspect-square rounded-full bg-gradient-to-br from-green-500 via-yellow-500 to-orange-500 border border-orange-400/40 pulse" style={{ animationDelay: '1s' }} />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-red-400 w-3">R</span>
                      <div className="flex-1 h-2 bg-gray-800/50 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 rounded-full" style={{ width: '70%' }} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-green-400 w-3">G</span>
                      <div className="flex-1 h-2 bg-gray-800/50 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: '55%' }} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-blue-400 w-3">B</span>
                      <div className="flex-1 h-2 bg-gray-800/50 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '85%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Transition Effect - Right Bottom */}
            <div className="absolute bottom-8 sm:bottom-12 right-6 sm:right-12 float z-10">
              <div className="w-36 h-32 sm:w-40 sm:h-36 rotate3d" style={{ transformStyle: 'preserve-3d' }}>
                <div
                  className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-blue-600/30 backdrop-blur-md rounded-lg border border-cyan-400/40"
                  style={{
                    transform: 'translateZ(20px)',
                    boxShadow: '0 0 20px rgba(34, 211, 238, 0.5)',
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="relative w-16 h-16">
                      <div className="absolute inset-0 border-4 border-cyan-400/50 rounded-lg" />
                      <div className="absolute inset-2 border-4 border-blue-400/50 rounded-lg rotate-45" />
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full pulse" />
                    </div>
                  </div>
                </div>
                <div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-600/20 backdrop-blur-md rounded-lg border border-blue-400/40"
                  style={{
                    transform: 'translateZ(-20px)',
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
                  }}
                />
              </div>
            </div>

            {/* Export Settings - Right Middle */}
            <div className="absolute top-1/3 right-8 sm:right-16 float-reverse z-10">
              <div
                className="w-32 h-36 sm:w-36 sm:h-40 bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-md rounded-xl border border-green-400/30 p-3 rotate-12"
                style={{ boxShadow: '0 0 25px rgba(34, 197, 94, 0.3)' }}
              >
                <div className="space-y-2">
                  <div className="text-xs text-green-300 font-semibold">EXPORT</div>
                  <div className="space-y-1.5">
                    <div className="bg-green-500/30 rounded px-2 py-1 text-[10px] text-green-200 font-mono">MP4</div>
                    <div className="bg-emerald-500/20 rounded px-2 py-1 text-[10px] text-emerald-200 font-mono">1920x1080</div>
                    <div className="bg-green-500/20 rounded px-2 py-1 text-[10px] text-green-200 font-mono">60 FPS</div>
                  </div>
                  <div className="mt-3">
                    <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full pulse"
                        style={{ width: '65%' }}
                      />
                    </div>
                    <div className="text-[10px] text-green-300 mt-1 text-center">65%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Camera Icon - Top Left Corner */}
            <div className="absolute top-4 sm:top-8 left-16 sm:left-24 pulse z-10">
              <div
                className="w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-500/30 to-cyan-600/30 backdrop-blur-md rounded-full border border-blue-400/40 flex items-center justify-center"
                style={{ boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)' }}
              >
                <svg className="w-14 h-14 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            {/* Audio Mixer - Bottom Left Corner */}
            <div className="absolute bottom-1/4 left-8 sm:left-16 float z-10">
              <div
                className="w-28 h-36 sm:w-32 sm:h-40 bg-gradient-to-br from-indigo-600/20 to-blue-600/20 backdrop-blur-md rounded-xl border border-indigo-400/30 p-3"
                style={{ boxShadow: '0 0 25px rgba(79, 70, 229, 0.3)' }}
              >
                <div className="flex gap-2 h-full items-end justify-around">
                  {[60, 80, 45, 70, 55].map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col gap-1 items-center">
                      <div
                        className="w-full bg-gradient-to-t from-indigo-500 to-blue-500 rounded-full"
                        style={{
                          height: `${height}%`,
                          animation: `waveform ${2 + i * 0.3}s ease-in-out infinite`,
                        }}
                      />
                      <div className="w-3 h-3 bg-indigo-400 rounded-full border border-indigo-300" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Glowing orbs */}
            <div className="absolute top-0 right-1/4 w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-cyan-600 blur-2xl opacity-60 pulse pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/4 w-28 h-28 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 blur-2xl opacity-60 pulse pointer-events-none" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/3 right-8 w-20 h-20 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 blur-xl opacity-50 pulse pointer-events-none" style={{ animationDelay: '2s' }} />

            {/* Connecting lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0 0 5px rgba(59, 130, 246, 0.5))' }}>
              <line x1="20%" y1="35%" x2="50%" y2="50%" stroke="#3b82f6" strokeWidth="1" opacity="0.4" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
              </line>
              <line x1="85%" y1="25%" x2="50%" y2="50%" stroke="#8b5cf6" strokeWidth="1" opacity="0.4" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
              </line>
              <line x1="25%" y1="75%" x2="50%" y2="50%" stroke="#ec4899" strokeWidth="1" opacity="0.4" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
              </line>
              <line x1="80%" y1="70%" x2="50%" y2="50%" stroke="#3b82f6" strokeWidth="1" opacity="0.4" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1.2s" repeatCount="indefinite" />
              </line>
            </svg>

            {/* Floating dots */}
            <div className="absolute top-1/4 left-1/4 pulse pointer-events-none">
              <div className="w-4 h-4 rounded-full bg-blue-400 shadow-lg" style={{ boxShadow: '0 0 15px #3b82f6' }} />
            </div>
            <div className="absolute bottom-1/3 right-1/4 pulse pointer-events-none" style={{ animationDelay: '1s' }}>
              <div className="w-4 h-4 rounded-full bg-purple-400 shadow-lg" style={{ boxShadow: '0 0 15px #8b5cf6' }} />
            </div>
            <div className="absolute top-2/3 left-1/3 pulse pointer-events-none" style={{ animationDelay: '2s' }}>
              <div className="w-4 h-4 rounded-full bg-pink-400 shadow-lg" style={{ boxShadow: '0 0 15px #ec4899' }} />
            </div>
          </div>

          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-32 bg-gradient-to-t from-blue-500/20 via-purple-500/10 to-transparent blur-3xl pointer-events-none" />
        </div>
      </div>
    </div>
  );
}