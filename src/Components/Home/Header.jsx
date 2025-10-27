import React, { useState, useEffect, useRef } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredSection, setHoveredSection] = useState(null);
  const leftContentRef = useRef(null);

  // Mouse move parallax when menu is open
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    const handleScroll = () => {
      if (leftContentRef.current) {
        setScrollY(leftContentRef.current.scrollTop);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    leftContentRef.current?.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      leftContentRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsClosing(true);
      setTimeout(() => setIsMenuOpen(false), 800);
      setTimeout(() => setIsClosing(false), 1600);
    } else {
      setIsMenuOpen(true);
    }
  };

  const handleMenuClick = (sectionName) => {
    setActiveSection(sectionName);
    setIsClosing(true);
    setTimeout(() => setIsMenuOpen(false), 800);
    setTimeout(() => setIsClosing(false), 1600);
  };

  const getSectionNumber = () => {
    const map = {
      'Home': '01',
      'About Us': '02',
      'Services': '03',
      'Contact Us': '04',
    };
    return map[hoveredSection || activeSection] || '01';
  };

  const getSectionContent = () => {
    const content = {
      'Home': {
        title: 'Welcome',
        description: 'Discover our innovative solutions and creative approach to design'
      },
      'About Us': {
        title: 'Our Story',
        description: 'Learn about our journey, values, and the team behind our success'
      },
      'Services': {
        title: 'What We Do',
        description: 'Explore our comprehensive range of professional services and solutions'
      },
      'Contact Us': {
        title: 'Get In Touch',
        description: 'Connect with us to start your next project or ask any questions'
      },
    };
    return content[hoveredSection || activeSection] || content['Home'];
  };

  const menuItems = [
    { name: 'Home', section: 'HOME', path: '/' },
    { name: 'About Us', section: 'ABOUT US', path: '/aboutUs' },
    { name: 'Services', section: 'SERVICES', path: '/services' },
    { name: 'Contact Us', section: 'CONTACT US', path: '/contactUs' },
  ];

  return (
    <div className="relative">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        .split-left, .split-right {
          will-change: transform;
          backface-visibility: hidden;
          transform: translateZ(0);
        }

        .split-left { transition: transform 1.4s cubic-bezier(0.65, 0, 0.35, 1); }
        .split-left.active { transform: translateX(0); }
        .split-left.inactive, .split-left.closing { transform: translateX(-100%); }

        .split-right { transition: transform 1.4s cubic-bezier(0.65, 0, 0.35, 1); }
        .split-right.active { transform: translateX(0); }
        .split-right.inactive, .split-right.closing { transform: translateX(100%); }

        .menu-content, .left-side-content {
          transition: all 1.2s cubic-bezier(0.65, 0, 0.35, 1);
          transition-delay: 0.4s;
          will-change: transform, opacity;
        }

        .menu-content.active, .left-side-content.active {
          opacity: 1;
          transform: scale(1) translateY(0);
        }

        .menu-content.inactive, .left-side-content.inactive {
          opacity: 0;
          transform: scale(0.9) translateY(30px);
        }

        .menu-content.closing, .left-side-content.closing {
          opacity: 0;
          transform: scale(0.9) translateY(-30px);
          transition-delay: 0s;
        }

        .menu-item {
          transition: all 0.4s cubic-bezier(0.77, 0, 0.175, 1);
          position: relative;
        }

        .menu-item::before {
          content: '';
          position: absolute;
          left: -30px;
          top: 50%;
          width: 20px;
          height: 3px;
          background: linear-gradient(90deg, transparent, currentColor);
          transform: translateY(-50%) scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.77, 0, 0.175, 1);
        }

        .menu-item:hover::before {
          transform: translateY(-50%) scaleX(1);
        }

        .menu-item:hover {
          transform: translateX(20px) scale(1.05);
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
        }

        .hamburger-line {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform, opacity;
        }

        .scroll-content {
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(16, 28, 39, 0.3) transparent;
        }

        .scroll-content::-webkit-scrollbar {
          width: 6px;
        }

        .scroll-content::-webkit-scrollbar-track {
          background: transparent;
        }

        .scroll-content::-webkit-scrollbar-thumb {
          background: rgba(16, 28, 39, 0.3);
          border-radius: 3px;
        }

        .scroll-content::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 28, 39, 0.5);
        }
      `}</style>

      {/* Fixed Header */}
      <header className="fixed top-0 w-full z-30 flex justify-center">
        <nav className="flex w-full max-w-[95%] justify-between items-center p-4">
          <a href="/">
            <img src="/Images/logo.png" alt="Logo" className="h-20 transition-opacity duration-300" />
          </a>

          <button
            onClick={toggleMenu}
            className="relative w-8 h-8 flex flex-col justify-center items-center z-50 focus:outline-none"
            aria-label="Toggle menu"
          >
            <span
              className="hamburger-line block w-6 h-0.5 my-1 bg-white"
              style={{
                transform: (isMenuOpen || isClosing) ? 'rotate(45deg) translateY(10px)' : 'none',
              }}
            />
            <span
              className="hamburger-line block w-6 h-0.5 my-1 bg-white"
              style={{ opacity: (isMenuOpen || isClosing) ? 0 : 1 }}
            />
            <span
              className="hamburger-line block w-6 h-0.5 my-1 bg-white"
              style={{
                transform: (isMenuOpen || isClosing) ? 'rotate(-45deg) translateY(-10px)' : 'none',
              }}
            />
          </button>
        </nav>
      </header>

      {/* Left Split Panel */}
      <div
        className={`split-left fixed top-0 left-0 w-1/2 h-full z-40 ${isMenuOpen ? 'active' : isClosing ? 'closing' : 'inactive'
          }`}
        style={{ background: '#FFFFFF', boxShadow: isMenuOpen ? '10px 0 40px rgba(0,0,0,0.3)' : 'none' }}
      >
        <div
          ref={leftContentRef}
          className={`left-side-content scroll-content flex flex-col justify-center items-center h-full px-8 ${isMenuOpen ? 'active' : isClosing ? 'closing' : 'inactive'
            }`}
        >
          <div className="text-center w-full max-w-xl">
            <div
              className="text-9xl font-black text-gray-200 mb-8"
              style={{
                fontSize: 'clamp(6rem, 12vw, 10rem)',
                textShadow: '0 10px 30px rgba(0,0,0,0.1)',
                WebkitTextStroke: '2px rgba(16,28,39,0.3)',
                transform: `translateY(${scrollY * 0.3}px) scale(${1 + mousePosition.y * 0.05})`,
                transition: 'transform 0.3s ease-out',
              }}
            >
              {getSectionNumber()}
            </div>
            
            {/* Section Content */}
            <div 
              className="transition-all duration-500"
              style={{
                opacity: hoveredSection ? 1 : 0.7,
                transform: hoveredSection ? 'translateY(0)' : 'translateY(10px)',
              }}
            >
              <h3 
                className="text-4xl font-bold mb-4"
                style={{
                  color: '#101c27',
                  textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                }}
              >
                {getSectionContent().title}
              </h3>
              <p 
                className="text-lg leading-relaxed"
                style={{
                  color: '#101c27',
                  opacity: 0.7,
                }}
              >
                {getSectionContent().description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Split Panel */}
      <div
        className={`split-right fixed top-0 right-0 w-1/2 h-full z-40 ${isMenuOpen ? 'active' : isClosing ? 'closing' : 'inactive'
          }`}
        style={{ background: '#101c27' }}
      >
        {/* Parallax Background Dots */}
        <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
          <div
            style={{
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
              transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
              transition: 'transform 0.3s ease-out',
            }}
          />
        </div>

        {/* Menu Content */}
        <div
          className={`menu-content flex flex-col justify-center h-full pl-12 md:pl-20 ${isMenuOpen ? 'active' : isClosing ? 'closing' : 'inactive'
            }`}
        >
          {/* Close Button */}
          <button
            onClick={toggleMenu}
            className="absolute top-0 right-0 w-14 h-14 m-8 flex items-center justify-center text-white rounded-full border-2 border-white/20 bg-white/5 transition-all duration-300"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.transform = 'rotate(90deg) scale(1.1)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(255,255,255,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            aria-label="Close menu"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Menu Items */}
          {/* Menu Items with Stagger Animation */}
          <div className="flex flex-col space-y-6 z-10">

            {[
              { name: 'Home', path: '/', section: 'HOME' },
              { name: 'About Us', path: '/aboutUs', section: 'ABOUT US' },
              { name: 'Services', path: '/services', section: 'SERVICES' },
              { name: 'Contact Us', path: '/contactUs', section: 'CONTACT US' },
            ].map((item, i) => {
              const isHovered = hoveredIndex === i;
              return (
                <a
                  key={i}
                  href={item.path}
                  onMouseEnter={() => {
                    setHoveredIndex(i);
                    setHoveredSection(item.name);
                  }}
                  onMouseLeave={() => {
                    setHoveredIndex(null);
                    setHoveredSection(null);
                  }}
                  className="inline-flex overflow-hidden font-bold text-[50px] tracking-[10px] no-underline relative"
                  style={{
                    WebkitTextStroke: "1px white",
                    color: "transparent",
                  }}
                >
                  {item.section.split("").map((letter, index) => (
                    <span
                      key={index}
                      className="relative inline-block overflow-hidden h-auto"
                      style={{
                        transitionDelay: `${index * 0.05}s`,
                      }}
                    >
                      {/* Top Layer (Outline Text) */}
                      <span
                        className={`block transition-transform duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${isHovered ? "-translate-y-full" : "translate-y-0"
                          }`}
                        style={{
                          transitionDelay: `${index * 0.05}s`,
                          WebkitTextStroke: "1px white",
                          color: "transparent",
                        }}
                      >
                        {letter.trim() === "" ? "\u00A0" : letter}
                      </span>

                      {/* Bottom Layer (Filled Text on Hover) */}
                      <span
                        className={`absolute left-0 top-full block transition-transform duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${isHovered ? "-translate-y-full" : "translate-y-0"
                          }`}
                        style={{
                          transitionDelay: `${index * 0.05}s`,
                          color: "white",
                        }}
                      >
                        {letter.trim() === "" ? "\u00A0" : letter}
                      </span>
                    </span>
                  ))}
                </a>
              )
            })}
          </div>
        </div>
      </div>

      {/* Floating Logo (when menu open) */}
      <div
        className="fixed top-8 left-8 z-50 transition-all duration-700"
        style={{
          opacity: isMenuOpen ? 1 : 0,
          pointerEvents: isMenuOpen ? 'auto' : 'none',
          transform: isMenuOpen ? 'scale(1)' : 'scale(0.8)',
        }}
      >
        <div
          style={{
            transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          <img src="/Images/blue_logo.png" alt="Logo" className="h-[100px]" />
        </div>
      </div>
    </div>
  );
}