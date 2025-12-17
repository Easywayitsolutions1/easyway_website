import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Example } from "./ClipPathLinks";

export default function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredSection, setHoveredSection] = useState(null);

  // Detect scroll only on Home page
  const [scrolled, setScrolled] = useState(false);
  const effectiveScrolled = isHomePage ? scrolled : true;

  useEffect(() => {
    if (!isHomePage) return;

    let rafId = null;
    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 500);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isHomePage]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Mouse move parallax when menu is open
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    if (isMenuOpen) {
      // Instant closing animation start
      setIsClosing(true);
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsClosing(false);
      }, 600);
    } else {
      setIsMenuOpen(true);
      setIsClosing(false);
    }
  };

  const handleMenuClick = (sectionName) => {
    setActiveSection(sectionName);
    setIsClosing(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsClosing(false);
    }, 600);
  };

  const getSectionNumber = () => {
    const map = {
      "Home": "01",
      "About Us": "02",
      "Services": "03",
      "Projects": "04",
      "Contact Us": "05",
    };
    return map[hoveredSection || activeSection] || "01";
  };

  return (
    <div className="relative">
      <style>{`
        .menu-overlay {
          clip-path: circle(0% at calc(100% - 50px) 50px);
          transition: clip-path 1s cubic-bezier(0.65, 0, 0.35, 1);
        }

        .menu-overlay.active {
          clip-path: circle(150% at calc(100% - 50px) 50px);
        }

        .menu-overlay.closing {
          clip-path: circle(0% at calc(100% - 50px) 50px);
          transition: clip-path 0.5s cubic-bezier(0.85, 0, 0.15, 1);
        }

        @media (max-width: 640px) {
          .menu-overlay {
            clip-path: circle(0% at calc(100% - 40px) 40px);
          }
          .menu-overlay.active {
            clip-path: circle(150% at calc(100% - 40px) 40px);
          }
          .menu-overlay.closing {
            clip-path: circle(0% at calc(100% - 40px) 40px);
          }
        }

        .menu-content {
          transition: all 0.8s cubic-bezier(0.65, 0, 0.35, 1);
          transition-delay: 0.3s;
          will-change: transform, opacity;
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }

        .menu-content.active {
          opacity: 1;
          transform: scale(1) translateY(0);
        }

        .menu-content.inactive {
          opacity: 0;
          transform: scale(0.95) translateY(20px);
        }

        .menu-content.closing {
          opacity: 0;
          transform: scale(0.95) translateY(-20px);
          transition: all 0.3s cubic-bezier(0.85, 0, 0.15, 1);
          transition-delay: 0s;
        }
      `}</style>

      {/* HEADER */}
      <header className="w-full z-[9999] flex justify-center transition-all duration-500">
        <nav className="flex w-full max-w-[95%] justify-between items-center p-4">
          {/* Logo */}
          <a href="/">
            <img
              src="/Images/blue_logo.png"
              alt="Logo"
              className="h-[60px] sm:h-[80px] md:h-[100px] lg:h-[120px] transition-all duration-500"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </a>

          {/* Hamburger */}
          <button
            onClick={toggleMenu}
            className="relative w-8 h-8 flex flex-col justify-center items-center z-50"
            aria-label="Toggle menu"
          >
            <span
              className="hamburger-line block w-6 h-0.5 my-1 transition-all duration-300"
              style={{
                backgroundColor: "#101c27",
                transform:
                  isMenuOpen || isClosing
                    ? "rotate(45deg) translateY(10px)"
                    : "none",
              }}
            />
            <span
              className="hamburger-line block w-6 h-0.5 my-1 transition-all duration-300"
              style={{
                backgroundColor: "#101c27",
                opacity: isMenuOpen || isClosing ? 0 : 1,
              }}
            />
            <span
              className="hamburger-line block w-6 h-0.5 my-1 transition-all duration-300"
              style={{
                backgroundColor: "#101c27",
                transform:
                  isMenuOpen || isClosing
                    ? "rotate(-45deg) translateY(-10px)"
                    : "none",
              }}
            />
          </button>
        </nav>
      </header>

      {/* FULL SCREEN DARK MENU */}
      <div
        className={`menu-overlay fixed top-0 right-0 w-full h-full z-50 ${isMenuOpen ? "active" : isClosing ? "closing" : "inactive"
          }`}
        style={{ background: "#101c27" }}
      >
        {/* Close Button */}
        <button
          onClick={toggleMenu}
          className="absolute top-6 right-6 sm:top-8 sm:right-10 z-50 flex flex-col justify-center items-center w-8 h-8 sm:w-10 sm:h-10 cursor-pointer"
        >
          <span className="block w-5 h-0.5 sm:w-6 sm:h-0.5 bg-white transform rotate-45 translate-y-0.5" />
          <span className="block w-5 h-0.5 sm:w-6 sm:h-0.5 bg-white transform -rotate-45 -translate-y-0.5" />
        </button>

        {/* DOT PARALLAX */}
        <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
          <div
            style={{
              width: "200%",
              height: "200%",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
              transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20
                }px)`,
              transition: "transform 0.3s ease-out",
            }}
          />
        </div>

        {/* MENU CONTENT */}
        <div
          className={`menu-content flex items-center justify-center h-full px-4 sm:px-8 md:px-12 lg:px-20 ${isMenuOpen ? "active" : isClosing ? "closing" : "inactive"
            }`}
        >
         
          <div className="w-full">
            <Example />
          </div>
        </div>
      </div>

      {/* FLOATING LOGO */}
      <div
        className="fixed top-6 left-6 sm:top-8 sm:left-8 z-50 transition-all duration-700"
        style={{
          opacity: isMenuOpen ? 1 : 0,
          transform: isMenuOpen ? "scale(1)" : "scale(0.8)",
        }}
      >
        <div
          style={{
            transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5
              }px)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          <img src="/Images/logo.png" alt="Logo" className="h-[60px] sm:h-[80px]" loading="lazy" decoding="async" />
        </div>
      </div>
    </div>
  );
}