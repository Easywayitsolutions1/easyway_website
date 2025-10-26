import React from 'react';
import { Code2, Zap, Globe } from 'lucide-react';

export default function WebDevHero() {
  const codeBlocks = [
    { text: 'const build = () => {', top: '10%', left: '5%' },
    { text: 'return <Component />;', top: '20%', left: '15%' },
    { text: 'function* generator() {}', top: '60%', left: '8%' },
    { text: 'async await promise', top: '70%', left: '12%' }
  ];

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center p-8">
      {/* Animated background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-black via-blue-950 to-black"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)'
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(59, 130, 246, 0.05) 25%, rgba(59, 130, 246, 0.05) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, 0.05) 75%, rgba(59, 130, 246, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(59, 130, 246, 0.05) 25%, rgba(59, 130, 246, 0.05) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, 0.05) 75%, rgba(59, 130, 246, 0.05) 76%, transparent 77%, transparent)',
        backgroundSize: '50px 50px'
      }} />

      {/* Main content - Left side */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <div className="text-left">
          {/* Main heading */}
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight leading-tight"
            style={{
              animation: `slideInDown 0.8s ease-out`,
              backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #3B82F6 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Build the Web
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-300 mb-6"
            style={{
              animation: `slideInUp 0.8s ease-out 0.2s both`
            }}
          >
            <span className="text-blue-400 font-semibold">React</span> • <span className="text-white">Tailwind</span> • <span className="text-blue-400">Innovation</span>
          </p>

          {/* Description */}
          <p className="text-gray-400 text-base md:text-lg mb-8 leading-relaxed"
            style={{
              animation: `slideInUp 0.8s ease-out 0.4s both`
            }}
          >
            Create stunning, responsive web experiences with modern tools and cutting-edge design patterns. Transform your ideas into reality.
          </p>

          {/* CTA Button */}
          <div
            style={{
              animation: `slideInUp 0.8s ease-out 0.6s both`
            }}
          >
            <button className="px-8 py-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              style={{
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)'
              }}
            >
              Start Coding <Zap className="inline ml-2" size={20} />
            </button>
          </div>

          {/* Features */}
          <div className="flex gap-8 mt-12 flex-wrap"
            style={{
              animation: `slideInUp 0.8s ease-out 0.8s both`
            }}
          >
            {[
              { icon: Code2, label: 'Clean Code' },
              { icon: Zap, label: 'Fast' },
              { icon: Globe, label: 'Global' }
            ].map((feature, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <feature.icon size={18} className="text-blue-400" />
                </div>
                <p className="text-gray-300 text-sm font-medium">{feature.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Image/Animation - Right side */}
        <div className="relative h-96 lg:h-full flex items-center justify-center"
          style={{
            animation: `slideInRight 0.8s ease-out 0.3s both`
          }}
        >
          {/* Main animated box */}
          <div
            className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.05) 100%)',
              border: '2px solid rgba(59, 130, 246, 0.3)',
              animation: `float 4s ease-in-out infinite`,
              backdropFilter: 'blur(10px)'
            }}
          >
            {/* Inner animated elements */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 overflow-hidden">
              
              {/* Animated code lines */}
              {codeBlocks.map((block, idx) => (
                <div
                  key={idx}
                  className="text-white text-xs md:text-sm font-mono opacity-70 mb-3"
                  style={{
                    color: '#3B82F6',
                    animation: `typingAnimation 3s ease-in-out infinite`,
                    animationDelay: `${idx * 0.3}s`
                  }}
                >
                  {block.text}
                </div>
              ))}

              {/* Glowing circles */}
              <div className="absolute bottom-4 left-4 w-3 h-3 bg-blue-400 rounded-full opacity-60"
                style={{
                  animation: `pulse 2s ease-in-out infinite`
                }}
              />
              <div className="absolute top-4 right-4 w-2 h-2 bg-blue-300 rounded-full opacity-40"
                style={{
                  animation: `pulse 2.5s ease-in-out infinite`
                }}
              />
            </div>

            {/* Outer glow ring */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                border: '1px solid rgba(59, 130, 246, 0.2)',
                animation: `spin 8s linear infinite`,
                boxShadow: '0 0 40px rgba(59, 130, 246, 0.2)'
              }}
            />
          </div>

          {/* Floating particles around */}
          {[...Array(4)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full opacity-50"
              style={{
                left: `${60 + Math.cos(i * Math.PI / 2) * 120}px`,
                top: `${60 + Math.sin(i * Math.PI / 2) * 120}px`,
                animation: `orbit 6s linear infinite`,
                animationDelay: `${i * 1.5}s`
              }}
            />
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
            transform: translateY(-20px);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.6;
            r: 6px;
          }
          50% {
            opacity: 1;
            r: 8px;
          }
        }

        @keyframes typingAnimation {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes orbit {
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