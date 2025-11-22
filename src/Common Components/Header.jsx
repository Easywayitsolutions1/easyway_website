import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredSection, setHoveredSection] = useState(null);
  const leftContentRef = useRef(null);

  // NEW — Detect scroll only on Home page
  const [scrolled, setScrolled] = useState(false);

  const effectiveScrolled = isHomePage ? scrolled : true;

  useEffect(() => {
    if (!isHomePage) return; // No scroll check on other pages

    const handleScroll = () => {
      setScrolled(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

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
      `}</style>

      {/* HEADER */}
      <header className="w-full z-[9999] flex justify-center transition-all duration-500">
        <nav className="flex w-full max-w-[95%] justify-between items-center p-4">

          {/* Logo — now controlled by page + scroll */}
          <a href="/">
            <img
              src={effectiveScrolled ? "/Images/blue_logo.png" : "/Images/blue_logo.png"}
              alt="Logo"
              className="h-[100px] sm:h-[120px] transition-all duration-500"
            />
          </a>

          {/* Hamburger — also controlled by page + scroll */}
          <button
            onClick={toggleMenu}
            className="relative w-8 h-8 flex flex-col justify-center items-center z-50"
            aria-label="Toggle menu"
          >
            <span
              className="hamburger-line block w-6 h-0.5 my-1"
              style={{
                backgroundColor: effectiveScrolled ? "#101c27" : "#101c27",
                transform: (isMenuOpen || isClosing) ? 'rotate(45deg) translateY(10px)' : 'none',
              }}
            />
            <span
              className="hamburger-line block w-6 h-0.5 my-1"
              style={{
                backgroundColor: effectiveScrolled ? "#101c27" : "#101c27",
                opacity: (isMenuOpen || isClosing) ? 0 : 1,
              }}
            />
            <span
              className="hamburger-line block w-6 h-0.5 my-1"
              style={{
                backgroundColor: effectiveScrolled ? "#101c27" : "#101c27",
                transform: (isMenuOpen || isClosing) ? 'rotate(-45deg) translateY(-10px)' : 'none',
              }}
            />
          </button>

        </nav>
      </header>

      {/* LEFT SIDE SPLIT */}
      <div
        className={`split-left fixed top-0 left-0 w-1/2 h-full z-40 ${isMenuOpen ? 'active' : isClosing ? 'closing' : 'inactive'}`}
        style={{ background: '#FFFFFF' }}
      >
        <div
          ref={leftContentRef}
          className={`left-side-content scroll-content flex flex-col justify-center items-center h-full px-8 ${isMenuOpen ? 'active' : isClosing ? 'closing' : 'inactive'}`}
        >
          <div className="text-center w-full max-w-xl">
            <div
              className="text-9xl font-black text-gray-200 mb-8"
              style={{
                fontSize: 'clamp(6rem, 12vw, 10rem)',
                WebkitTextStroke: '2px rgba(16,28,39,0.3)',
                transform: `translateY(${scrollY * 0.3}px) scale(${1 + mousePosition.y * 0.05})`,
                transition: 'transform 0.3s ease-out',
              }}
            >
              {getSectionNumber()}
            </div>

            <div
              className="transition-all duration-500"
              style={{
                opacity: hoveredSection ? 1 : 0.7,
                transform: hoveredSection ? 'translateY(0)' : 'translateY(10px)',
              }}
            >
              <h3 className="text-4xl font-bold mb-4" style={{ color: '#101c27' }}>
                {getSectionContent().title}
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: '#101c27', opacity: 0.7 }}>
                {getSectionContent().description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE SPLIT */}
      <div
        className={`split-right fixed top-0 right-0 w-1/2 h-full z-40 ${isMenuOpen ? 'active' : isClosing ? 'closing' : 'inactive'}`}
        style={{ background: '#101c27' }}
      >

        {/* RIGHT SIDE CLOSE BUTTON */}
        <button
          onClick={toggleMenu}
          className="absolute top-8 right-10 z-50 flex flex-col justify-center items-center w-10 h-10 cursor-pointer"
        >
          <span className="block w-6 h-0.5 bg-white transform rotate-45 translate-y-0.5" />
          <span className="block w-6 h-0.5 bg-white transform -rotate-45 -translate-y-0.5" />
        </button>

        {/* DOT PARALLAX */}
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

        {/* MENU TEXT */}
        <div
          className={`menu-content flex flex-col justify-center h-full pl-12 md:pl-20 ${isMenuOpen ? 'active' : isClosing ? 'closing' : 'inactive'}`}
        >
          <div className="flex flex-col space-y-6 z-10">
            {[{ name: "Home", link: "/" },
            { name: "About Us", link: "/comingSoon" },
            { name: "Services", link: "/service" },
            { name: "Contact Us", link: "/contactUs" },].map((name, i) => (
              <a
                key={i}
                href={name.link}
                onMouseEnter={() => {
                  setHoveredIndex(i);
                  setHoveredSection(name.name);
                }}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                  setHoveredSection(null);
                }}
                className="inline-flex overflow-hidden font-bold text-[50px] tracking-[10px]"
                style={{
                  WebkitTextStroke: "1px white",
                  color: "transparent",
                }}
              >
                {name.name.split("").map((letter, index) => (
                  <span key={index} className="relative inline-block overflow-hidden">
                    <span
                      className={`block transition-transform duration-[600ms] ${hoveredIndex === i ? "-translate-y-full" : "translate-y-0"}`}
                      style={{ WebkitTextStroke: "1px white" }}
                    >
                      {letter}
                    </span>
                    <span
                      className={`absolute left-0 top-full block transition-transform duration-[600ms] ${hoveredIndex === i ? "-translate-y-full" : "translate-y-0"}`}
                      style={{ color: "white" }}
                    >
                      {letter}
                    </span>
                  </span>
                ))}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* FLOATING BLUE LOGO */}
      <div
        className="fixed top-8 left-8 z-50 transition-all duration-700"
        style={{
          opacity: isMenuOpen ? 1 : 0,
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
