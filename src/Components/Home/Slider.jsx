import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function EasyWayHero() {
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
    <div className="relative w-full min-h-screen bg-[#101c27] overflow-hidden flex items-center justify-center py-12 lg:py-0">
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

        @keyframes scan {
          0%, 100% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
        }

        .particle {
          animation: drift linear infinite;
        }

        .float { animation: float 6s ease-in-out infinite; }
        .float-reverse { animation: floatReverse 7s ease-in-out infinite; }
        .pulse { animation: pulse 3s ease-in-out infinite; }
        .rotate3d { animation: rotate3d 20s linear infinite; }
      `}</style>

      {/* Animated gradient blobs */}
      <div
        className="absolute top-0 left-0 w-96 h-96 opacity-5 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #1d2d39 0%, transparent 70%)',
          animation: 'blob 8s ease-in-out infinite'
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 opacity-5 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #1d2d39 0%, transparent 70%)',
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
              Web Design
              <br />
              & Development
            </span>
          </h1>

          {/* Subheading */}
          <p
            className="text-lg md:text-xl text-white mb-10 leading-relaxed"
            style={{
              animation: 'slideInUp 0.8s ease-out 0.3s both'
            }}
          >
            Transform your vision into powerful, responsive digital experiences. We craft websites that captivate, engage, and convert.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4"
            style={{
              animation: 'slideInUp 0.8s ease-out 0.6s both'
            }}
          >
            

            <button className="group relative inline-block px-8 py-3 rounded-[10px] text-[17px] font-medium border-2 border-white text-white hover:text-black overflow-hidden transition-colors duration-500 z-10">
              <span className="relative z-10 flex justify-between items-center gap-3">Get Started <ArrowRight size={20} /></span>
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
                background: `radial-gradient(circle, ${particle.id % 3 === 0 ? '#00f5ff' : particle.id % 3 === 1 ? '#bf00ff' : '#ff00ea'}, transparent)`,
                animationDuration: `${particle.duration}s`,
                animationDelay: `${particle.delay}s`,
                boxShadow: `0 0 ${particle.size * 3}px ${particle.id % 3 === 0 ? '#00f5ff' : particle.id % 3 === 1 ? '#bf00ff' : '#ff00ea'}`,
              }}
            />
          ))}

          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `linear-gradient(#00f5ff 1px, transparent 1px), linear-gradient(90deg, #00f5ff 1px, transparent 1px)`,
                backgroundSize: '50px 50px',
                transform: `perspective(500px) rotateX(60deg) translateY(-50%)`,
              }}
            />
          </div>

          <div
            className="relative w-full h-full"
            style={{
              transform: `translate(${-mousePosition.x * 0.3}px, ${-mousePosition.y * 0.3}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 sm:w-80 md:w-96 h-56 sm:h-64 md:h-72 float z-20">
              <div className="relative w-full h-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-md rounded-2xl border border-cyan-400/30 p-4 sm:p-6"
                style={{ boxShadow: '0 0 40px rgba(0, 245, 255, 0.3), inset 0 0 20px rgba(0, 245, 255, 0.1)' }}>
                <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-30 pointer-events-none">
                  <div className="w-full h-20 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
                    style={{ animation: 'scan 3s linear infinite' }} />
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <div className="flex gap-2 mb-3 sm:mb-4">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-400/70" />
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-400/70" />
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-400/70" />
                  </div>
                  <div className="h-2 sm:h-3 bg-cyan-400/60 rounded w-3/4" />
                  <div className="h-2 sm:h-3 bg-purple-400/60 rounded w-1/2" />
                  <div className="h-16 sm:h-20 md:h-24 bg-gradient-to-br from-blue-500/40 to-purple-500/40 rounded-lg flex items-center justify-center">
                    <svg className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-cyan-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-8 sm:h-10 md:h-12 bg-cyan-500/30 rounded" />
                    <div className="h-8 sm:h-10 md:h-12 bg-purple-500/30 rounded" />
                    <div className="h-8 sm:h-10 md:h-12 bg-pink-500/30 rounded" />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-4 sm:top-10 right-0 sm:right-4 float-reverse z-10">
              <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-xl border border-purple-400/30 p-3 sm:p-4 rotate-12"
                style={{ boxShadow: '0 0 30px rgba(191, 0, 255, 0.3)' }}>
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-400" />
                    <div className="h-0.5 sm:h-1 bg-purple-400/50 rounded flex-1" />
                  </div>
                  <div className="h-1 sm:h-1.5 bg-purple-400/70 rounded w-full" />
                  <div className="h-1 sm:h-1.5 bg-pink-400/70 rounded w-3/4" />
                  <div className="h-1 sm:h-1.5 bg-purple-400/70 rounded w-1/2" />
                  <div className="h-1 sm:h-1.5 bg-pink-400/70 rounded w-5/6" />
                  <div className="h-1 sm:h-1.5 bg-purple-400/70 rounded w-2/3" />
                  <div className="h-1 sm:h-1.5 bg-pink-400/70 rounded w-full" />
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 left-2 sm:left-4 md:left-8 float z-10">
              <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rotate3d" style={{ transformStyle: 'preserve-3d' }}>
                <div className="absolute inset-0 border-2 border-cyan-400/50 rounded-lg"
                  style={{
                    transform: 'translateZ(30px)',
                    boxShadow: '0 0 20px rgba(0, 245, 255, 0.5)'
                  }} />
                <div className="absolute inset-0 border-2 border-purple-400/50 rounded-lg"
                  style={{
                    transform: 'translateZ(-30px)',
                    boxShadow: '0 0 20px rgba(191, 0, 255, 0.5)'
                  }} />
                <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-cyan-400/50 to-purple-400/50" style={{ transform: 'rotateY(90deg) translateZ(24px)' }} />
                <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-cyan-400/50 to-purple-400/50" style={{ transform: 'rotateY(90deg) translateZ(-24px)' }} />
              </div>
            </div>

            <div className="absolute top-16 sm:top-20 md:top-24 left-0 sm:left-2 pulse z-10">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-cyan-500/30 to-blue-600/30 backdrop-blur-md rounded-full border border-cyan-400/40 flex items-center justify-center"
                style={{ boxShadow: '0 0 30px rgba(0, 245, 255, 0.4)' }}>
                <svg className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
            </div>

            <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-2 sm:right-4 md:right-8 float-reverse z-10">
              <div className="w-40 h-28 sm:w-48 sm:h-32 md:w-56 md:h-36 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-md rounded-lg border border-gray-700/50 p-1.5 sm:p-2"
                style={{ boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)' }}>
                <div className="w-full h-full bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded flex items-center justify-center relative overflow-hidden"
                  style={{ boxShadow: 'inset 0 0 20px rgba(0, 245, 255, 0.2)' }}>
                  <div className="w-full px-3 sm:px-4 space-y-1.5 sm:space-y-2">
                    <div className="h-1.5 sm:h-2 bg-gray-700/50 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" style={{ width: '70%', animation: 'pulse 2s ease-in-out infinite' }} />
                    </div>
                    <div className="h-1.5 sm:h-2 bg-gray-700/50 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full" style={{ width: '85%', animation: 'pulse 2.5s ease-in-out infinite' }} />
                    </div>
                    <div className="h-1.5 sm:h-2 bg-gray-700/50 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full" style={{ width: '60%', animation: 'pulse 3s ease-in-out infinite' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-1/3 right-8 sm:right-12 md:right-16 float z-10">
              <div className="w-20 h-28 sm:w-24 sm:h-32 bg-gradient-to-br from-pink-600/20 to-purple-600/20 backdrop-blur-md rounded-lg border border-pink-400/30 p-2 sm:p-3"
                style={{ boxShadow: '0 0 25px rgba(255, 0, 234, 0.3)' }}>
                <div className="w-full h-10 sm:h-12 bg-gradient-to-br from-pink-500/40 to-purple-500/40 rounded mb-1.5 sm:mb-2" />
                <div className="space-y-1 sm:space-y-1.5">
                  <div className="h-1 sm:h-1.5 bg-pink-400/60 rounded" />
                  <div className="h-1 sm:h-1.5 bg-purple-400/60 rounded w-3/4" />
                  <div className="h-1 sm:h-1.5 bg-pink-400/60 rounded w-1/2" />
                </div>
              </div>
            </div>

            <div className="absolute top-0 right-1/4 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 blur-2xl opacity-60 pulse pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/4 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 blur-2xl opacity-60 pulse pointer-events-none" />
            <div className="absolute top-1/3 right-12 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-pink-600 to-purple-600 blur-xl opacity-50 pulse pointer-events-none" />

            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0 0 5px rgba(0, 245, 255, 0.5))' }}>
              <line x1="20%" y1="35%" x2="50%" y2="50%" stroke="#00f5ff" strokeWidth="1" opacity="0.4" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
              </line>
              <line x1="85%" y1="25%" x2="50%" y2="50%" stroke="#bf00ff" strokeWidth="1" opacity="0.4" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
              </line>
              <line x1="30%" y1="80%" x2="50%" y2="50%" stroke="#ff00ea" strokeWidth="1" opacity="0.4" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
              </line>
              <line x1="80%" y1="75%" x2="50%" y2="50%" stroke="#00f5ff" strokeWidth="1" opacity="0.4" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1.2s" repeatCount="indefinite" />
              </line>
            </svg>

            <div className="absolute top-1/4 left-1/3 pulse pointer-events-none">
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-cyan-400 shadow-lg" style={{ boxShadow: '0 0 15px #00f5ff' }} />
            </div>
            <div className="absolute bottom-1/3 right-1/3 pulse pointer-events-none" style={{ animationDelay: '1s' }}>
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-purple-400 shadow-lg" style={{ boxShadow: '0 0 15px #bf00ff' }} />
            </div>
            <div className="absolute top-2/3 left-1/4 pulse pointer-events-none" style={{ animationDelay: '2s' }}>
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-pink-400 shadow-lg" style={{ boxShadow: '0 0 15px #ff00ea' }} />
            </div>
          </div>

          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-32 bg-gradient-to-t from-cyan-500/20 via-purple-500/10 to-transparent blur-3xl pointer-events-none" />
        </div>
      </div>
    </div>
  );
}