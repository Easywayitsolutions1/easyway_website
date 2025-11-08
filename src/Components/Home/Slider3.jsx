import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Code2, Palette, Video, Play, Pause } from 'lucide-react';
import Slide1Image from './Slide1Image';
import Slide2Image from './Slide2Image';
import Slide3Image from './Slide3Image';

const slides = [
  {
    id: 1,
    badge: 'Web Development',
    title: 'We Build Digital',
    titleAccent: 'Experiences',
    description: 'Transform your vision into powerful, scalable web applications that drive business growth and user engagement.',
    icon: Code2,
    accentColor: '#3b82f6',
    secondaryColor: '#60a5fa',
    bgGradient: 'from-blue-50 via-white to-indigo-50',
    // Use your actual image component or URL
    mediaType: 'image',
    mediaComponent: <Slide1Image />,
    mediaUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80',
    stats: [
      { label: 'Projects', value: '500+' },
      { label: 'Clients', value: '200+' },
      { label: 'Countries', value: '15+' }
    ]
  },
  {
    id: 2,
    badge: 'UI/UX Design',
    title: 'Design That',
    titleAccent: 'Converts',
    description: 'Create stunning user interfaces and seamless experiences that captivate your audience and boost conversions.',
    icon: Palette,
    accentColor: '#8b5cf6',
    secondaryColor: '#a78bfa',
    bgGradient: 'from-purple-50 via-white to-pink-50',
    mediaType: 'image',
    mediaComponent: <Slide2Image />,
    mediaUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80',
    stats: [
      { label: 'Designs', value: '1000+' },
      { label: 'Awards', value: '25+' },
      { label: 'Satisfaction', value: '99%' }
    ]
  },
  {
    id: 3,
    badge: 'Video Production',
    title: 'Stories That',
    titleAccent: 'Inspire',
    description: 'Professional video production and editing services that bring your brand story to life with cinematic quality.',
    icon: Video,
    accentColor: '#f59e0b',
    secondaryColor: '#fbbf24',
    bgGradient: 'from-orange-50 via-white to-amber-50',
    mediaType: 'video',
    mediaComponent: <Slide3Image />,
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-programmer-working-on-his-laptop-4904-large.mp4',
    stats: [
      { label: 'Videos', value: '300+' },
      { label: 'Hours', value: '5000+' },
      { label: 'Platforms', value: '20+' }
    ]
  }
];

export default function Slider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const videoRef = useRef(null);

  const currentSlide = slides[activeSlide];
  const Icon = currentSlide.icon;

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto play slider
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [activeSlide, isPaused]);

  // Handle video
  useEffect(() => {
    if (currentSlide.mediaType === 'video' && videoRef.current) {
      videoRef.current.load();
      setIsVideoPlaying(false);
    }
  }, [activeSlide]);

  const handleNext = () => {
    setDirection(1);
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    })
  };

  return (
    <section 
      className="relative min-h-screen overflow-hidden flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* PREMIUM CSS */}
      <style>{`
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        @keyframes scale-breath {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }

        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes pulse-border {
          0%, 100% { 
            box-shadow: 0 0 0 0 var(--accent-color);
          }
          50% { 
            box-shadow: 0 0 0 20px transparent;
          }
        }

        .card-glass {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(30px);
          border: 1px solid rgba(0, 0, 0, 0.06);
          box-shadow: 
            0 10px 40px rgba(0, 0, 0, 0.08),
            0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .gradient-text {
          background: linear-gradient(135deg, var(--accent-color), var(--secondary-color));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .btn-premium {
          position: relative;
          overflow: hidden;
        }

        .btn-premium::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .btn-premium:hover::before {
          width: 400px;
          height: 400px;
        }

        .image-container {
          position: relative;
          overflow: hidden;
          border-radius: 2rem;
        }

        .image-container::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, var(--accent-color), var(--secondary-color));
          border-radius: 2rem;
          padding: 2px;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: rotate-slow 8s linear infinite;
          z-index: -1;
        }

        .video-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 1;
          transition: opacity 0.3s;
        }

        .video-overlay.playing {
          opacity: 0;
        }

        .float-gentle {
          animation: float-gentle 6s ease-in-out infinite;
        }

        .scale-breath {
          animation: scale-breath 8s ease-in-out infinite;
        }

        .shimmer-wrap {
          position: relative;
          overflow: hidden;
        }

        .shimmer-wrap::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
          animation: shimmer 3s infinite;
        }
      `}</style>

      {/* Dynamic Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 bg-gradient-to-br ${currentSlide.bgGradient}`}
        />
      </AnimatePresence>

      {/* Animated Gradient Orbs */}
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl"
        style={{ 
          background: `radial-gradient(circle, ${currentSlide.accentColor}30, transparent)`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(${currentSlide.accentColor} 1px, transparent 1px),
            linear-gradient(90deg, ${currentSlide.accentColor} 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT: Text Content */}
          <div className="space-y-8">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 200, damping: 25 },
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.4 }
                }}
                className="space-y-8"
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-full card-glass"
                >
                  <Icon className="w-5 h-5" style={{ color: currentSlide.accentColor }} />
                  <span className="text-sm font-bold text-gray-700">
                    {currentSlide.badge}
                  </span>
                </motion.div>

                {/* Headline */}
                <div>
                  <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-5xl lg:text-7xl font-black leading-[1.05] text-gray-900"
                  >
                    {currentSlide.title}
                    <br />
                    <span 
                      className="gradient-text"
                      style={{ 
                        '--accent-color': currentSlide.accentColor,
                        '--secondary-color': currentSlide.secondaryColor,
                      }}
                    >
                      {currentSlide.titleAccent}
                    </span>
                  </motion.h1>
                </div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl"
                >
                  {currentSlide.description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-4"
                >
                  <motion.button 
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-premium group px-8 py-5 text-white rounded-2xl font-bold flex items-center gap-3 shadow-lg"
                    style={{ 
                      background: `linear-gradient(135deg, ${currentSlide.accentColor}, ${currentSlide.secondaryColor})`,
                    }}
                  >
                    <span className="relative z-10">Get Started</span>
                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-5 card-glass text-gray-700 rounded-2xl font-bold"
                  >
                    Learn More
                  </motion.button>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="grid grid-cols-3 gap-6 pt-6"
                >
                  {currentSlide.stats.map((stat, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      whileHover={{ scale: 1.1, y: -3 }}
                      className="text-center lg:text-left"
                    >
                      <p 
                        className="text-3xl lg:text-4xl font-black"
                        style={{ color: currentSlide.accentColor }}
                      >
                        {stat.value}
                      </p>
                      <p className="text-sm text-gray-500 mt-1 font-medium">{stat.label}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT: Image/Video Section */}
          <div 
            className="relative"
            style={{
              transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
              transition: 'transform 0.3s ease-out',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, scale: 0.9, rotateY: -30 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: 30 }}
                transition={{ duration: 0.8 }}
                className="relative w-full max-w-[600px] mx-auto"
              >
                {/* Main Media Container */}
                <motion.div 
                  className="float-gentle relative image-container aspect-[4/3] overflow-hidden shadow-2xl"
                  style={{
                    '--accent-color': currentSlide.accentColor,
                    '--secondary-color': currentSlide.secondaryColor,
                  }}
                >
                  {currentSlide.mediaType === 'image' ? (
                    <>
                      {/* Use your component or fallback to URL */}
                      <div className="w-full h-full">
                        {currentSlide.mediaComponent || (
                          <img 
                            src={currentSlide.mediaUrl}
                            alt={currentSlide.badge}
                            className="w-full h-full object-cover scale-breath"
                          />
                        )}
                      </div>
                      
                      {/* Image Overlay Effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                    </>
                  ) : (
                    <>
                      {/* Video */}
                      <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        loop
                        muted
                        playsInline
                      >
                        <source src={currentSlide.mediaUrl} type="video/mp4" />
                      </video>

                      {/* Video Controls Overlay */}
                      <div className={`video-overlay ${isVideoPlaying ? 'playing' : ''}`}>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={toggleVideo}
                          className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-2xl"
                        >
                          {isVideoPlaying ? (
                            <Pause className="w-8 h-8 text-gray-900" />
                          ) : (
                            <Play className="w-8 h-8 text-gray-900 ml-1" />
                          )}
                        </motion.button>
                      </div>
                    </>
                  )}

                  {/* Shimmer Effect on Hover */}
                  <div className="shimmer-wrap absolute inset-0 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
                </motion.div>

                {/* Floating Info Cards */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -left-6 top-1/4 card-glass rounded-2xl p-4 shadow-xl"
                  whileHover={{ scale: 1.05, x: -10 }}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `${currentSlide.accentColor}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: currentSlide.accentColor }} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{currentSlide.stats[0].value}</p>
                      <p className="text-xs text-gray-500">{currentSlide.stats[0].label}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="absolute -right-6 bottom-1/4 card-glass rounded-2xl p-4 shadow-xl"
                  whileHover={{ scale: 1.05, x: 10 }}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `${currentSlide.secondaryColor}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: currentSlide.secondaryColor }} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{currentSlide.stats[1].value}</p>
                      <p className="text-xs text-gray-500">{currentSlide.stats[1].label}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Decorative Circles */}
                <motion.div
                  className="absolute -z-10 -top-10 -right-10 w-32 h-32 rounded-full opacity-30 blur-2xl"
                  style={{ background: currentSlide.accentColor }}
                  animate={{ scale: [1, 1.2, 1], rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 rounded-full opacity-20 blur-2xl"
                  style={{ background: currentSlide.secondaryColor }}
                  animate={{ scale: [1, 1.3, 1], rotate: -360 }}
                  transition={{ duration: 10, repeat: Infinity }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Navigation */}
      <motion.button
        onClick={handlePrev}
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.9 }}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 card-glass rounded-full flex items-center justify-center text-gray-700"
      >
        <ChevronLeft className="w-7 h-7" />
      </motion.button>

      <motion.button
        onClick={handleNext}
        whileHover={{ scale: 1.1, x: 5 }}
        whileTap={{ scale: 0.9 }}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 card-glass rounded-full flex items-center justify-center text-gray-700"
      >
        <ChevronRight className="w-7 h-7" />
      </motion.button>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((slide, i) => (
          <motion.button
            key={slide.id}
            onClick={() => {
              setDirection(i > activeSlide ? 1 : -1);
              setActiveSlide(i);
            }}
            whileHover={{ scale: 1.2 }}
            className="relative"
          >
            <div 
              className="h-2 rounded-full transition-all duration-300"
              style={{ 
                width: i === activeSlide ? '48px' : '32px',
                backgroundColor: i === activeSlide ? currentSlide.accentColor : '#cbd5e1',
              }}
            />
            {!isPaused && i === activeSlide && (
              <motion.div
                className="absolute top-0 left-0 h-2 rounded-full"
                style={{ backgroundColor: currentSlide.accentColor }}
                initial={{ width: 0 }}
                animate={{ width: '48px' }}
                transition={{ duration: 6, ease: "linear" }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </section>
  );
}