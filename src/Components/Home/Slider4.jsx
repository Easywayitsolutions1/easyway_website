import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Code, Palette, Video, ChevronLeft, ChevronRight } from 'lucide-react';
import Slide1Image from './Slide1Image';
import Slide2Image from './Slide2Image';
import Slide3Image from './Slide3Image';

const slides = [
  {
    id: 1,
    category: 'Development',
    title: 'Build Powerful',
    subtitle: 'Web Applications',
    description: 'Transform ideas into scalable digital products with cutting-edge technology.',
    color: '#3b82f6',
    lightColor: '#dbeafe',
    icon: Code,
    image: <Slide1Image />,
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80',
    features: ['React & Next.js', 'Cloud Native', 'API Integration']
  },
  {
    id: 2,
    category: 'Design',
    title: 'Create Beautiful',
    subtitle: 'User Experiences',
    description: 'Design interfaces that users love with modern UI/UX principles.',
    color: '#8b5cf6',
    lightColor: '#ede9fe',
    icon: Palette,
    image: <Slide2Image />,
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80',
    features: ['Figma to Code', 'Responsive Design', 'Brand Identity']
  },
  {
    id: 3,
    category: 'Production',
    title: 'Produce Cinematic',
    subtitle: 'Video Content',
    description: 'Tell compelling stories through professional video production.',
    color: '#f59e0b',
    lightColor: '#fef3c7',
    icon: Video,
    image: <Slide3Image />,
    imageUrl: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=1200&q=80',
    features: ['4K Quality', 'Motion Graphics', 'Color Grading']
  }
];

export default function Slider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const currentSlide = slides[activeSlide];
  const Icon = currentSlide.icon;

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouseX((e.clientX / window.innerWidth - 0.5) * 30);
      setMouseY((e.clientY / window.innerHeight - 0.5) * 30);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [activeSlide]);

  const handleNext = () => {
    setDirection(1);
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      <style>{`
        @keyframes wave-float {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          33% { transform: translateY(-20px) translateX(10px) rotate(2deg); }
          66% { transform: translateY(10px) translateX(-10px) rotate(-2deg); }
        }

        @keyframes diagonal-slide {
          0% { transform: translateX(-100%) translateY(-100%) rotate(-45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(-45deg); }
        }

        @keyframes bubble-float {
          0% { transform: translateY(0) scale(1); opacity: 0.6; }
          50% { transform: translateY(-30px) scale(1.1); opacity: 1; }
          100% { transform: translateY(-60px) scale(1); opacity: 0; }
        }

        @keyframes spin-smooth {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes tilt-card {
          0%, 100% { transform: perspective(1000px) rotateY(0deg) rotateX(0deg); }
          50% { transform: perspective(1000px) rotateY(5deg) rotateX(5deg); }
        }

        .split-bg {
          clip-path: polygon(0 0, 60% 0, 55% 100%, 0 100%);
        }

        .card-tilt {
          transform: perspective(1000px) rotateY(var(--rotate-y)) rotateX(var(--rotate-x));
          transition: transform 0.3s ease-out;
        }

        .image-reveal {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          transition: clip-path 0.8s cubic-bezier(0.65, 0, 0.35, 1);
        }

        .text-stroke {
          -webkit-text-stroke: 2px currentColor;
          -webkit-text-fill-color: transparent;
        }

        .glass-modern {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(0, 0, 0, 0.05);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
        }

        .bubble {
          animation: bubble-float 3s ease-in-out infinite;
        }

        .diagonal-shine {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%);
          animation: diagonal-slide 3s ease-in-out infinite;
        }
      `}</style>

      {/* Animated Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
        >
          {/* Left Color Block */}
          <motion.div
            className="split-bg absolute inset-0"
            style={{ backgroundColor: currentSlide.lightColor }}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
          
          {/* Right White Space */}
          <div className="absolute inset-0 bg-white" />

          {/* Floating Bubbles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="bubble absolute rounded-full"
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: `${currentSlide.color}20`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i}s`,
              }}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* LEFT: Content */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
                style={{
                  transform: `translate(${mouseX * 0.5}px, ${mouseY * 0.5}px)`,
                }}
              >
                {/* Category Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-modern"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  >
                    <Icon className="w-5 h-5" style={{ color: currentSlide.color }} />
                  </motion.div>
                  <span className="font-bold text-sm" style={{ color: currentSlide.color }}>
                    {currentSlide.category}
                  </span>
                </motion.div>

                {/* Headline */}
                <div className="space-y-2">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-6xl lg:text-8xl font-black leading-[0.95]"
                  >
                    <span className="block text-gray-900">
                      {currentSlide.title}
                    </span>
                    <span 
                      className="block text-stroke"
                      style={{ 
                        color: currentSlide.color,
                        WebkitTextStroke: `2px ${currentSlide.color}`,
                      }}
                    >
                      {currentSlide.subtitle}
                    </span>
                  </motion.h1>
                </div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-gray-600 leading-relaxed max-w-lg"
                >
                  {currentSlide.description}
                </motion.p>

                {/* Features */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-3"
                >
                  {currentSlide.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      whileHover={{ scale: 1.05, y: -3 }}
                      className="px-4 py-2 rounded-full glass-modern text-sm font-semibold text-gray-700"
                    >
                      {feature}
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex gap-4 pt-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative px-10 py-5 rounded-2xl font-bold text-white overflow-hidden group"
                    style={{ backgroundColor: currentSlide.color }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Let's Talk
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </span>
                    <div className="diagonal-shine" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-5 rounded-2xl font-bold glass-modern"
                    style={{ color: currentSlide.color }}
                  >
                    View Work
                  </motion.button>
                </motion.div>

                {/* Counter */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex items-center gap-6 pt-6"
                >
                  <div className="text-center">
                    <p className="text-4xl font-black" style={{ color: currentSlide.color }}>
                      {activeSlide + 1}
                    </p>
                    <p className="text-sm text-gray-500">of {slides.length}</p>
                  </div>
                  <div className="h-12 w-px bg-gray-300" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Next Project</p>
                    <p className="font-bold text-gray-900">
                      {slides[(activeSlide + 1) % slides.length].category}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* RIGHT: Image with Tilt Effect */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                transition={{ duration: 0.8 }}
                className="relative"
                style={{
                  transform: `translate(${-mouseX}px, ${-mouseY}px)`,
                }}
              >
                {/* Main Image Card */}
                <motion.div
                  className="card-tilt relative rounded-[3rem] overflow-hidden shadow-2xl"
                  style={{
                    '--rotate-y': `${mouseX * 0.3}deg`,
                    '--rotate-x': `${-mouseY * 0.3}deg`,
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Image */}
                  <div className="aspect-[4/5] relative">
                    {currentSlide.image || (
                      <img
                        src={currentSlide.imageUrl}
                        alt={currentSlide.category}
                        className="w-full h-full object-cover"
                      />
                    )}
                    
                    {/* Gradient Overlay */}
                    <div 
                      className="absolute inset-0 opacity-20"
                      style={{
                        background: `linear-gradient(135deg, ${currentSlide.color}, transparent)`,
                      }}
                    />
                  </div>

                  {/* Floating Info Card */}
                  <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute bottom-8 left-8 right-8 glass-modern rounded-2xl p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Featured Project</p>
                        <p className="text-xl font-bold text-gray-900">
                          {currentSlide.category} Excellence
                        </p>
                      </div>
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${currentSlide.color}20` }}
                      >
                        <Sparkles className="w-6 h-6" style={{ color: currentSlide.color }} />
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Decorative Elements */}
                <motion.div
                  className="absolute -z-10 top-10 -right-10 w-72 h-72 rounded-full blur-3xl opacity-30"
                  style={{ backgroundColor: currentSlide.color }}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{ duration: 20, repeat: Infinity }}
                />

                <motion.div
                  className="absolute -z-10 -bottom-10 -left-10 w-64 h-64 rounded-full blur-3xl opacity-20"
                  style={{ backgroundColor: currentSlide.color }}
                  animate={{ 
                    scale: [1, 1.3, 1],
                    rotate: [0, -180, -360],
                  }}
                  transition={{ duration: 15, repeat: Infinity }}
                />

                {/* Corner Badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.6, type: 'spring' }}
                  className="absolute top-8 right-8 w-16 h-16 rounded-full glass-modern flex items-center justify-center"
                  whileHover={{ scale: 1.2, rotate: 180 }}
                >
                  <Icon className="w-8 h-8" style={{ color: currentSlide.color }} />
                </motion.div>
              </motion.div>
            </AnimatePresence>

          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6">
        <motion.button
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePrev}
          className="w-14 h-14 rounded-full glass-modern flex items-center justify-center"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </motion.button>

        <div className="flex gap-3">
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
              <motion.div
                className="h-2 rounded-full"
                style={{
                  width: i === activeSlide ? '48px' : '32px',
                  backgroundColor: i === activeSlide ? currentSlide.color : '#d1d5db',
                }}
                animate={{
                  scale: i === activeSlide ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  scale: { duration: 1, repeat: Infinity },
                }}
              />
            </motion.button>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNext}
          className="w-14 h-14 rounded-full glass-modern flex items-center justify-center"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </motion.button>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 right-8 flex flex-col items-center gap-2"
      >
        <p className="text-xs text-gray-400 font-medium tracking-wider rotate-90 origin-center">
          SCROLL
        </p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-16 bg-gray-300"
        />
      </motion.div>
    </div>
  );
}