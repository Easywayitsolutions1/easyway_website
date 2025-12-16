import React, { useEffect, useState } from 'react'
import { ChevronRight } from 'lucide-react';
import { useScrollTheme } from '../../Common Components/ScrollContext';

export default function ServicePageHeader() {
    const [scrollY, setScrollY] = useState(0); 
    const { setTheme } = useScrollTheme();

    useEffect(() => {
        // Agar black background hai to 'dark' set karo
        setTheme('light');
    }, [setTheme]);

    useEffect(() => {
        let rafId = null;
        const handleScroll = () => {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                setScrollY(window.scrollY);
            });
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    const scrollToContent = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };

    // Calculate scroll-based transform
    const scrollTransform = Math.min(scrollY * 0.1, 200);
    const imageTransform = Math.min(scrollY * 0.3, 50);

    return (
        <div className="relative overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    animation: 'float 20s ease-in-out infinite'
                }}></div>
            </div>

            {/* Main Content Container */}
            <div className="relative z-20 flex flex-col">

                {/* Main Content */}
                <div className="flex-1 flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 py-12 sm:py-16 lg:py-20 gap-12 lg:gap-16">

                    {/* Left Side - Title and Content */}
                    <div className="space-y-8 sm:space-y-12 max-w-full sm:max-w-lg lg:max-w-2xl w-full">

                        {/* Main Title */}
                        <div className="space-y-4 sm:space-y-6">
                            <h1
                                className="heading-text text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#101c27] leading-none tracking-tight transition-all duration-300 ease-out"
                                style={{
                                    transform: `translateX(${scrollTransform}px)`,
                                    opacity: 1
                                }}
                            >
                                Our Services
                            </h1>

                            {/* Decorative Line */}
                            <div
                                className="w-24 h-1 bg-[#101c27] opacity-0"
                                style={{ animation: 'expandWidth 1s ease-out 0.6s forwards' }}
                            ></div>
                        </div>

                        {/* Description */}
                        <div className="space-y-4 pb-4 sm:pb-6">
                            <p
                                className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl opacity-0"
                                style={{ animation: 'fadeInUp 1s ease-out 0.8s forwards' }}
                            >
                                We offer comprehensive IT solutions tailored to meet your business needs. From custom software development to cloud infrastructure, our expert team delivers innovative services that drive digital transformation and maximize your competitive advantage.
                            </p>
                        </div>
                    </div>

                    {/* Right Side - Services Animation */}
                    <div
                        className="mt-12 lg:mt-0 w-full lg:w-auto opacity-0 hidden md:flex justify-center lg:justify-end"
                        style={{
                            animation: 'fadeInRight 1s ease-out 1s forwards',
                            transform: `translateY(-${imageTransform}px)`
                        }}
                    >
                        <div className="relative w-[400px] h-[400px]">
                            <svg viewBox="0 0 400 400" className="w-full h-full">
                                <defs>
                                    {/* Gradients */}
                                    <linearGradient id="serviceGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: '#000', stopOpacity: 0.8 }} />
                                        <stop offset="100%" style={{ stopColor: '#000', stopOpacity: 0.4 }} />
                                    </linearGradient>
                                    <linearGradient id="serviceGrad2" x1="0%" y1="100%" x2="0%" y2="0%">
                                        <stop offset="0%" style={{ stopColor: '#000', stopOpacity: 0.3 }} />
                                        <stop offset="100%" style={{ stopColor: '#000', stopOpacity: 0.7 }} />
                                    </linearGradient>
                                </defs>

                                {/* Central Hub - Main Services Platform */}
                                <g className="central-hub">
                                    <circle cx="200" cy="200" r="45" fill="none" stroke="#000" strokeWidth="3" opacity="0.8">
                                        <animate attributeName="r" values="45;48;45" dur="3s" repeatCount="indefinite" />
                                    </circle>
                                    <circle cx="200" cy="200" r="35" fill="#000" opacity="0.2">
                                        <animate attributeName="opacity" values="0.2;0.4;0.2" dur="2s" repeatCount="indefinite" />
                                    </circle>

                                    {/* Center icon - gear/cog */}
                                    <g className="center-gear" style={{ animation: 'rotateGear 8s linear infinite', transformOrigin: '200px 200px' }}>
                                        <path d="M 200 175 L 210 185 L 210 215 L 200 225 L 190 215 L 190 185 Z" fill="#000" opacity="0.7" />
                                        <path d="M 175 200 L 185 190 L 215 190 L 225 200 L 215 210 L 185 210 Z" fill="#000" opacity="0.7" />
                                        <circle cx="200" cy="200" r="12" fill="#fff" opacity="0.4" />
                                    </g>
                                </g>

                                {/* Service Node 1 - Web Development (Top) */}
                                <g className="service-node" style={{ animation: 'nodeFloat1 3s ease-in-out infinite' }}>
                                    <circle cx="200" cy="80" r="28" fill="url(#serviceGrad1)" opacity="0">
                                        <animate attributeName="opacity" values="0;0.9;0.9" dur="2s" begin="0.2s" fill="freeze" />
                                    </circle>
                                    <circle cx="200" cy="80" r="20" fill="none" stroke="#000" strokeWidth="2" opacity="0">
                                        <animate attributeName="opacity" values="0;0.7;0.7" dur="2s" begin="0.2s" fill="freeze" />
                                    </circle>
                                    {/* Code brackets icon */}
                                    <path d="M 190 75 L 185 80 L 190 85" stroke="#fff" strokeWidth="2" fill="none" opacity="0.8" />
                                    <path d="M 210 75 L 215 80 L 210 85" stroke="#fff" strokeWidth="2" fill="none" opacity="0.8" />
                                    <line x1="195" y1="75" x2="205" y2="85" stroke="#fff" strokeWidth="2" opacity="0.8" />

                                    {/* Connecting line */}
                                    <line x1="200" y1="108" x2="200" y2="155" stroke="#000" strokeWidth="2" opacity="0" strokeDasharray="5,5">
                                        <animate attributeName="opacity" values="0;0.4;0.4" dur="2s" begin="0.4s" fill="freeze" />
                                        <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" />
                                    </line>
                                </g>

                                {/* Service Node 2 - Mobile Development (Top Right) */}
                                <g className="service-node" style={{ animation: 'nodeFloat2 3.2s ease-in-out infinite' }}>
                                    <circle cx="310" cy="130" r="28" fill="url(#serviceGrad1)" opacity="0">
                                        <animate attributeName="opacity" values="0;0.9;0.9" dur="2s" begin="0.4s" fill="freeze" />
                                    </circle>
                                    <circle cx="310" cy="130" r="20" fill="none" stroke="#000" strokeWidth="2" opacity="0">
                                        <animate attributeName="opacity" values="0;0.7;0.7" dur="2s" begin="0.4s" fill="freeze" />
                                    </circle>
                                    {/* Mobile phone icon */}
                                    <rect x="302" y="122" width="16" height="24" rx="2" fill="none" stroke="#fff" strokeWidth="2" opacity="0.8" />
                                    <circle cx="310" cy="142" r="1.5" fill="#fff" opacity="0.8" />

                                    {/* Connecting line */}
                                    <line x1="280" y1="150" x2="230" y2="180" stroke="#000" strokeWidth="2" opacity="0" strokeDasharray="5,5">
                                        <animate attributeName="opacity" values="0;0.4;0.4" dur="2s" begin="0.6s" fill="freeze" />
                                        <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" />
                                    </line>
                                </g>

                                {/* Service Node 3 - Cloud Solutions (Right) */}
                                <g className="service-node" style={{ animation: 'nodeFloat1 3.5s ease-in-out infinite' }}>
                                    <circle cx="330" cy="220" r="28" fill="url(#serviceGrad1)" opacity="0">
                                        <animate attributeName="opacity" values="0;0.9;0.9" dur="2s" begin="0.6s" fill="freeze" />
                                    </circle>
                                    <circle cx="330" cy="220" r="20" fill="none" stroke="#000" strokeWidth="2" opacity="0">
                                        <animate attributeName="opacity" values="0;0.7;0.7" dur="2s" begin="0.6s" fill="freeze" />
                                    </circle>
                                    {/* Cloud icon */}
                                    <path d="M 318 218 Q 318 212 323 212 Q 325 208 330 208 Q 335 208 337 212 Q 342 212 342 218 Q 342 223 337 223 L 323 223 Q 318 223 318 218 Z" fill="#fff" opacity="0.8" />

                                    {/* Connecting line */}
                                    <line x1="285" y1="220" x2="245" y2="205" stroke="#000" strokeWidth="2" opacity="0" strokeDasharray="5,5">
                                        <animate attributeName="opacity" values="0;0.4;0.4" dur="2s" begin="0.8s" fill="freeze" />
                                        <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" />
                                    </line>
                                </g>

                                {/* Service Node 4 - Data Analytics (Bottom Right) */}
                                <g className="service-node" style={{ animation: 'nodeFloat2 3.3s ease-in-out infinite' }}>
                                    <circle cx="290" cy="300" r="28" fill="url(#serviceGrad1)" opacity="0">
                                        <animate attributeName="opacity" values="0;0.9;0.9" dur="2s" begin="0.8s" fill="freeze" />
                                    </circle>
                                    <circle cx="290" cy="300" r="20" fill="none" stroke="#000" strokeWidth="2" opacity="0">
                                        <animate attributeName="opacity" values="0;0.7;0.7" dur="2s" begin="0.8s" fill="freeze" />
                                    </circle>
                                    {/* Chart icon */}
                                    <rect x="280" y="305" width="4" height="8" fill="#fff" opacity="0.8" />
                                    <rect x="286" y="300" width="4" height="13" fill="#fff" opacity="0.8" />
                                    <rect x="292" y="295" width="4" height="18" fill="#fff" opacity="0.8" />
                                    <rect x="298" y="302" width="4" height="11" fill="#fff" opacity="0.8" />

                                    {/* Connecting line */}
                                    <line x1="265" y1="280" x2="225" y2="230" stroke="#000" strokeWidth="2" opacity="0" strokeDasharray="5,5">
                                        <animate attributeName="opacity" values="0;0.4;0.4" dur="2s" begin="1s" fill="freeze" />
                                        <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" />
                                    </line>
                                </g>

                                {/* Service Node 5 - UI/UX Design (Bottom) */}
                                <g className="service-node" style={{ animation: 'nodeFloat1 3.7s ease-in-out infinite' }}>
                                    <circle cx="180" cy="320" r="28" fill="url(#serviceGrad1)" opacity="0">
                                        <animate attributeName="opacity" values="0;0.9;0.9" dur="2s" begin="1s" fill="freeze" />
                                    </circle>
                                    <circle cx="180" cy="320" r="20" fill="none" stroke="#000" strokeWidth="2" opacity="0">
                                        <animate attributeName="opacity" values="0;0.7;0.7" dur="2s" begin="1s" fill="freeze" />
                                    </circle>
                                    {/* Palette icon */}
                                    <circle cx="180" cy="320" r="10" fill="none" stroke="#fff" strokeWidth="2" opacity="0.8" />
                                    <circle cx="177" cy="315" r="2" fill="#fff" opacity="0.8" />
                                    <circle cx="183" cy="315" r="2" fill="#fff" opacity="0.8" />
                                    <circle cx="180" cy="323" r="2" fill="#fff" opacity="0.8" />

                                    {/* Connecting line */}
                                    <line x1="185" y1="295" x2="195" y2="245" stroke="#000" strokeWidth="2" opacity="0" strokeDasharray="5,5">
                                        <animate attributeName="opacity" values="0;0.4;0.4" dur="2s" begin="1.2s" fill="freeze" />
                                        <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" />
                                    </line>
                                </g>

                                {/* Service Node 6 - Consulting (Left) */}
                                <g className="service-node" style={{ animation: 'nodeFloat2 3.4s ease-in-out infinite' }}>
                                    <circle cx="70" cy="220" r="28" fill="url(#serviceGrad1)" opacity="0">
                                        <animate attributeName="opacity" values="0;0.9;0.9" dur="2s" begin="1.2s" fill="freeze" />
                                    </circle>
                                    <circle cx="70" cy="220" r="20" fill="none" stroke="#000" strokeWidth="2" opacity="0">
                                        <animate attributeName="opacity" values="0;0.7;0.7" dur="2s" begin="1.2s" fill="freeze" />
                                    </circle>
                                    {/* Lightbulb icon */}
                                    <circle cx="70" cy="217" r="6" fill="none" stroke="#fff" strokeWidth="2" opacity="0.8" />
                                    <path d="M 67 223 L 73 223 L 72 228 L 68 228 Z" fill="#fff" opacity="0.8" />
                                    <line x1="70" y1="211" x2="70" y2="207" stroke="#fff" strokeWidth="1.5" opacity="0.8" />

                                    {/* Connecting line */}
                                    <line x1="98" y1="210" x2="155" y2="200" stroke="#000" strokeWidth="2" opacity="0" strokeDasharray="5,5">
                                        <animate attributeName="opacity" values="0;0.4;0.4" dur="2s" begin="1.4s" fill="freeze" />
                                        <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" />
                                    </line>
                                </g>

                                {/* Service Node 7 - Security (Top Left) */}
                                <g className="service-node" style={{ animation: 'nodeFloat1 3.6s ease-in-out infinite' }}>
                                    <circle cx="90" cy="130" r="28" fill="url(#serviceGrad1)" opacity="0">
                                        <animate attributeName="opacity" values="0;0.9;0.9" dur="2s" begin="1.4s" fill="freeze" />
                                    </circle>
                                    <circle cx="90" cy="130" r="20" fill="none" stroke="#000" strokeWidth="2" opacity="0">
                                        <animate attributeName="opacity" values="0;0.7;0.7" dur="2s" begin="1.4s" fill="freeze" />
                                    </circle>
                                    {/* Shield icon */}
                                    <path d="M 90 120 L 85 122 L 85 132 Q 85 138 90 140 Q 95 138 95 132 L 95 122 Z" fill="none" stroke="#fff" strokeWidth="2" opacity="0.8" />
                                    <path d="M 88 128 L 90 131 L 94 126" stroke="#fff" strokeWidth="1.5" fill="none" opacity="0.8" />

                                    {/* Connecting line */}
                                    <line x1="120" y1="150" x2="170" y2="180" stroke="#000" strokeWidth="2" opacity="0" strokeDasharray="5,5">
                                        <animate attributeName="opacity" values="0;0.4;0.4" dur="2s" begin="1.6s" fill="freeze" />
                                        <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" />
                                    </line>
                                </g>

                                {/* Service Node 8 - Support (Bottom Left) */}
                                <g className="service-node" style={{ animation: 'nodeFloat2 3.8s ease-in-out infinite' }}>
                                    <circle cx="110" cy="290" r="28" fill="url(#serviceGrad1)" opacity="0">
                                        <animate attributeName="opacity" values="0;0.9;0.9" dur="2s" begin="1.6s" fill="freeze" />
                                    </circle>
                                    <circle cx="110" cy="290" r="20" fill="none" stroke="#000" strokeWidth="2" opacity="0">
                                        <animate attributeName="opacity" values="0;0.7;0.7" dur="2s" begin="1.6s" fill="freeze" />
                                    </circle>
                                    {/* Headset icon */}
                                    <path d="M 102 288 Q 102 282 110 282 Q 118 282 118 288" stroke="#fff" strokeWidth="2" fill="none" opacity="0.8" />
                                    <rect x="100" y="287" width="4" height="6" rx="1" fill="#fff" opacity="0.8" />
                                    <rect x="116" y="287" width="4" height="6" rx="1" fill="#fff" opacity="0.8" />
                                    <line x1="110" y1="282" x2="110" y2="279" stroke="#fff" strokeWidth="2" opacity="0.8" />

                                    {/* Connecting line */}
                                    <line x1="135" y1="270" x2="175" y2="230" stroke="#000" strokeWidth="2" opacity="0" strokeDasharray="5,5">
                                        <animate attributeName="opacity" values="0;0.4;0.4" dur="2s" begin="1.8s" fill="freeze" />
                                        <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" />
                                    </line>
                                </g>

                                {/* Data Flow Particles */}
                                <g className="data-particles">
                                    <circle cx="200" cy="120" r="2" fill="#000" opacity="0.6">
                                        <animateMotion dur="4s" repeatCount="indefinite" path="M 0,0 Q 30,-20 50,-30" />
                                    </circle>
                                    <circle cx="250" cy="180" r="2" fill="#000" opacity="0.5">
                                        <animateMotion dur="3.5s" repeatCount="indefinite" path="M 0,0 Q 20,15 40,10" />
                                    </circle>
                                    <circle cx="150" cy="230" r="2" fill="#000" opacity="0.6">
                                        <animateMotion dur="4.5s" repeatCount="indefinite" path="M 0,0 Q -25,10 -35,25" />
                                    </circle>
                                </g>

                                {/* Outer Ring - Services Ecosystem */}
                                <circle cx="200" cy="200" r="145" fill="none" stroke="#000" strokeWidth="1" opacity="0.2" strokeDasharray="10,5">
                                    <animate attributeName="stroke-dashoffset" from="0" to="30" dur="20s" repeatCount="indefinite" />
                                </circle>
                                <circle cx="200" cy="200" r="160" fill="none" stroke="#000" strokeWidth="1" opacity="0.15" strokeDasharray="8,8">
                                    <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="25s" repeatCount="indefinite" />
                                </circle>

                                {/* Innovation Sparks */}
                                <g className="innovation-sparks">
                                    <circle cx="360" cy="180" r="3" fill="#000" opacity="0">
                                        <animate attributeName="opacity" values="0;0.8;0" dur="2s" repeatCount="indefinite" />
                                        <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite" />
                                    </circle>
                                    <circle cx="40" cy="250" r="3" fill="#000" opacity="0">
                                        <animate attributeName="opacity" values="0;0.7;0" dur="2.5s" begin="0.5s" repeatCount="indefinite" />
                                        <animate attributeName="r" values="2;4;2" dur="2.5s" begin="0.5s" repeatCount="indefinite" />
                                    </circle>
                                    <circle cx="200" cy="50" r="3" fill="#000" opacity="0">
                                        <animate attributeName="opacity" values="0;0.6;0" dur="3s" begin="1s" repeatCount="indefinite" />
                                        <animate attributeName="r" values="2;4;2" dur="3s" begin="1s" repeatCount="indefinite" />
                                    </circle>
                                </g>

                            </svg>
                        </div>
                    </div>
                </div>

            </div>

            {/* Decorative Side Elements */}
            <div className="absolute top-1/2 left-0 w-1 h-32 sm:h-40 bg-gradient-to-b from-transparent via-black to-transparent opacity-20"></div>
            <div className="absolute top-1/2 right-0 w-1 h-32 sm:h-40 bg-gradient-to-b from-transparent via-black to-transparent opacity-20"></div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeInRight {
                    from {
                        opacity: 0;
                        transform: translateX(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes expandWidth {
                    from {
                        width: 0;
                        opacity: 0;
                    }
                    to {
                        width: 6rem;
                        opacity: 1;
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

                @keyframes rotateGear {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }

                @keyframes nodeFloat1 {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-8px);
                    }
                }

                @keyframes nodeFloat2 {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }

                @keyframes pulse {
                    0%, 100% {
                        opacity: 0.6;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1.05);
                    }
                }
            `}</style>
        </div>
    )
}