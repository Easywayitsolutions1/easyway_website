import React from 'react';
import { Code2, Palette, Smartphone, Eye, Zap, Layers, ArrowRight } from 'lucide-react';

export default function EasyWayHero() {
  return (
    <div className="relative w-full h-screen bg-white overflow-hidden flex items-center justify-center">
      {/* Animated background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 50%, #f0f4f8 100%)',
        }}
      />
      
      {/* Animated gradient blobs */}
      <div 
        className="absolute top-0 left-0 w-96 h-96 opacity-5"
        style={{
          background: 'radial-gradient(circle, #1d2d39 0%, transparent 70%)',
          animation: 'blob 8s ease-in-out infinite'
        }}
      />
      <div 
        className="absolute bottom-0 right-0 w-96 h-96 opacity-5"
        style={{
          background: 'radial-gradient(circle, #1d2d39 0%, transparent 70%)',
          animation: 'blob 8s ease-in-out infinite 2s'
        }}
      />

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* LEFT SIDE - TEXT CONTENT */}
        <div className="text-left">
          {/* Badge with animation */}
          <div
            className="inline-flex items-center gap-2 mb-6 px-5 py-3 rounded-full backdrop-blur-sm"
            style={{
              background: 'rgba(29, 45, 57, 0.08)',
              border: '1px solid rgba(29, 45, 57, 0.15)',
              animation: 'slideInDown 0.8s ease-out'
            }}
          >
            <Zap size={16} style={{ color: '#1d2d39' }} />
            <span className="text-sm font-bold" style={{ color: '#1d2d39' }}>Innovative Solutions</span>
          </div>

          {/* Main heading with highlights */}
          <h1 
            className="text-6xl md:text-7xl font-black leading-tight mb-8"
            style={{
              animation: 'slideInDown 0.8s ease-out 0.15s both'
            }}
          >
            <span
              style={{
                background: 'linear-gradient(135deg, #1d2d39 0%, #1d2d39 40%, #0066ff 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: 'inherit',
                fontWeight: 'inherit'
              }}
            >
              Web Design
            </span>
            <br />
            <span style={{ color: '#1d2d39' }}>& </span>
            <span
              style={{
                background: 'linear-gradient(135deg, #0066ff 0%, #1d2d39 60%, #1d2d39 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: 'inherit',
                fontWeight: 'inherit'
              }}
            >
              Development
            </span>
          </h1>

          {/* Subheading */}
          <p 
            className="text-lg md:text-xl mb-10 leading-relaxed"
            style={{
              color: '#555555',
              animation: 'slideInUp 0.8s ease-out 0.3s both'
            }}
          >
            Transform your vision into powerful, responsive digital experiences. We craft websites that captivate, engage, and convert.
          </p>

     

          {/* CTA Buttons */}
          <div
            className="flex gap-4"
            style={{
              animation: 'slideInUp 0.8s ease-out 0.6s both'
            }}
          >
            <button 
              className="px-8 py-4 font-bold rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 text-lg"
              style={{
                background: 'linear-gradient(135deg, #1d2d39 0%, #2d3f51 100%)',
                color: '#ffffff',
                boxShadow: '0 8px 25px rgba(29, 45, 57, 0.3)'
              }}
            >
              Get Started <ArrowRight size={20} />
            </button>
            <button 
              className="px-8 py-4 font-bold rounded-xl transition-all duration-300 transform hover:scale-105 text-lg border-2"
              style={{
                color: '#1d2d39',
                borderColor: '#1d2d39',
                background: 'transparent',
                hover: { background: 'rgba(29, 45, 57, 0.05)' }
              }}
            >
              Learn More
            </button>
          </div>
        </div>

        {/* RIGHT SIDE - ANIMATED VISUAL */}
        <div 
          className="relative h-96 lg:h-full min-h-96 flex items-center justify-center"
          style={{
            animation: 'slideInRight 0.8s ease-out 0.3s both'
          }}
        >
          {/* Animated backdrop circles */}
          <div
            className="absolute w-80 h-80 rounded-full opacity-10"
            style={{
              background: '#1d2d39',
              animation: 'pulse-ring 3s ease-out infinite'
            }}
          />
          <div
            className="absolute w-96 h-96 rounded-full opacity-5"
            style={{
              background: '#1d2d39',
              animation: 'pulse-ring 3s ease-out infinite 0.5s'
            }}
          />

          {/* Main container with gradient */}
          <div
            className="relative w-80 h-96 lg:w-full lg:max-w-md rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #1d2d39 0%, #2d3f51 100%)',
              boxShadow: '0 30px 80px rgba(29, 45, 57, 0.2)',
              animation: 'float 4s ease-in-out infinite',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Browser window mockup */}
            <div className="w-full h-full flex flex-col">
              {/* Browser header */}
              <div 
                className="px-5 py-4 flex items-center gap-3 border-b"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.08)',
                  borderColor: 'rgba(255, 255, 255, 0.1)'
                }}
              >
                <div className="w-3 h-3 rounded-full" style={{ background: '#ff6b6b' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#ffd93d' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#6bcf7f' }} />
                <div className="flex-1 ml-2 text-center text-xs text-white opacity-50">www.easyway-solutions.com</div>
              </div>

              {/* Website content area */}
              <div className="flex-1 bg-white p-8 flex flex-col items-center justify-center relative overflow-hidden">
                {/* Animated background elements */}
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, #1d2d39 0%, transparent 50%)',
                    animation: 'drift 8s ease-in-out infinite'
                  }}
                />

                <div className="relative z-10 w-full flex flex-col items-center">
                  {/* Heading lines */}
                  <div 
                    className="w-4/5 h-3 rounded-full mb-4"
                    style={{ 
                      background: '#1d2d39',
                      animation: 'shimmer 2s infinite'
                    }}
                  />
                  <div 
                    className="w-3/5 h-2 rounded-full mb-6" 
                    style={{ 
                      background: '#e0e0e0',
                      animation: 'shimmer 2s infinite 0.3s'
                    }} 
                  />

                  {/* Feature boxes */}
                  <div className="flex gap-3 w-full justify-center mb-6">
                    {[1, 2, 3].map((i) => (
                      <div 
                        key={i}
                        className="w-14 h-14 rounded-lg flex-shrink-0 flex items-center justify-center text-white font-bold text-xs"
                        style={{ 
                          background: `linear-gradient(135deg, hsl(${200 + i * 40}, 80%, 60%), hsl(${200 + i * 40}, 80%, 50%))`,
                          animation: `pulse-box 2s ease-in-out infinite ${i * 0.2}s`,
                          boxShadow: `0 4px 15px hsla(${200 + i * 40}, 80%, 60%, 0.3)`
                        }}
                      >
                        {i === 1 && <Palette size={18} />}
                        {i === 2 && <Code2 size={18} />}
                        {i === 3 && <Eye size={18} />}
                      </div>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2">
                    <div 
                      className="px-4 py-2 rounded-lg text-xs font-bold text-white"
                      style={{ 
                        background: '#1d2d39',
                        animation: 'slide-up 1s ease-out infinite'
                      }}
                    >
                      Design
                    </div>
                    <div 
                      className="px-4 py-2 rounded-lg text-xs font-bold text-white"
                      style={{ 
                        background: '#0066ff',
                        animation: 'slide-up 1s ease-out infinite 0.2s'
                      }}
                    >
                      Develop
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Glowing border effect */}
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                boxShadow: 'inset 0 0 40px rgba(255, 255, 255, 0.15)',
                pointerEvents: 'none'
              }}
            />
          </div>

          {/* Floating icons around main box */}
          {[
            { icon: Palette, delay: '0s', x: '-100px', y: '-100px' },
            { icon: Code2, delay: '0.5s', x: '100px', y: '-100px' },
            { icon: Layers, delay: '1s', x: '100px', y: '100px' },
            { icon: Zap, delay: '1.5s', x: '-100px', y: '100px' }
          ].map((item, i) => (
            <div
              key={`icon-${i}`}
              className="absolute w-14 h-14 rounded-2xl flex items-center justify-center text-white backdrop-blur-sm"
              style={{
                background: 'rgba(29, 45, 57, 0.15)',
                border: '2px solid rgba(29, 45, 57, 0.3)',
                animation: `orbit-icon 6s linear infinite`,
                animationDelay: item.delay,
                animation: `float-around 6s ease-in-out infinite`,
                animationDelay: item.delay
              }}
            >
              <item.icon size={24} />
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animations */}
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

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-25px);
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

        @keyframes pulse-ring {
          0% {
            transform: scale(0.8);
            opacity: 0.15;
          }
          50% {
            transform: scale(1);
            opacity: 0.08;
          }
          100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }

        @keyframes shimmer {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }

        @keyframes pulse-box {
          0%, 100% { 
            transform: scale(1);
            opacity: 1;
          }
          50% { 
            transform: scale(1.05);
            opacity: 0.8;
          }
        }

        @keyframes slide-up {
          0%, 100% { 
            transform: translateY(0);
          }
          50% { 
            transform: translateY(-8px);
          }
        }

        @keyframes drift {
          0%, 100% { 
            transform: translate(0, 0);
          }
          50% { 
            transform: translate(20px, 20px);
          }
        }

        @keyframes float-around {
          0% { 
            transform: translate(0, 0) scale(0.8);
            opacity: 0;
          }
          10% { 
            opacity: 1;
          }
          90% { 
            opacity: 1;
          }
          100% { 
            transform: translate(0, 0) scale(0.8);
            opacity: 0;
          }
        }

        @keyframes orbit-icon {
          from {
            transform: rotate(0deg) translateX(120px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(120px) rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
}