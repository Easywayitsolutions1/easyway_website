import React, { useEffect, useState } from 'react'
import { ChevronRight } from 'lucide-react';

export default function AboutHeaderSection() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
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
                                className="heading-text text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-black leading-none tracking-tight transition-all duration-300 ease-out"
                                style={{
                                    transform: `translateX(${scrollTransform}px)`,
                                    opacity: 1
                                }}
                            >
                                About Us
                            </h1>

                            {/* Decorative Line */}
                            <div
                                className="w-24 h-1 bg-black opacity-0"
                                style={{ animation: 'expandWidth 1s ease-out 0.6s forwards' }}
                            ></div>
                        </div>

                        {/* Description */}
                        <div className="space-y-4 pb-4 sm:pb-6">
                            <p
                                className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl opacity-0"
                                style={{ animation: 'fadeInUp 1s ease-out 0.8s forwards' }}
                            >
                                At EasyWay IT Solutions, we're passionate about transforming ideas into innovative digital solutions. With a dedicated team of experts and a commitment to excellence, we deliver cutting-edge technology services that drive business growth and success.
                            </p>
                        </div>
                    </div>

                    {/* Right Side - About Us Animation */}
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
                                    {/* Gradient for growth */}
                                    <linearGradient id="growthGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                                        <stop offset="0%" style={{ stopColor: '#000', stopOpacity: 0.3 }} />
                                        <stop offset="100%" style={{ stopColor: '#000', stopOpacity: 0.8 }} />
                                    </linearGradient>
                                </defs>

                                {/* Central Building/Company Foundation */}
                                <g className="company-building">
                                    {/* Base/Foundation */}
                                    <rect x="140" y="280" width="120" height="10" fill="#000" opacity="0.9" />
                                    
                                    {/* Building structure */}
                                    <rect x="150" y="180" width="100" height="100" fill="#000" opacity="0.7" stroke="#000" strokeWidth="2">
                                        <animate attributeName="height" values="0;100;100" dur="2s" fill="freeze" />
                                        <animate attributeName="y" values="280;180;180" dur="2s" fill="freeze" />
                                    </rect>
                                    
                                    {/* Windows - representing different departments/teams */}
                                    <g className="windows">
                                        <rect x="165" y="200" width="20" height="20" fill="#fff" opacity="0.6">
                                            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
                                        </rect>
                                        <rect x="215" y="200" width="20" height="20" fill="#fff" opacity="0.5">
                                            <animate attributeName="opacity" values="0.5;1;0.5" dur="2.3s" repeatCount="indefinite" />
                                        </rect>
                                        <rect x="165" y="235" width="20" height="20" fill="#fff" opacity="0.7">
                                            <animate attributeName="opacity" values="0.7;1;0.7" dur="1.8s" repeatCount="indefinite" />
                                        </rect>
                                        <rect x="215" y="235" width="20" height="20" fill="#fff" opacity="0.6">
                                            <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" />
                                        </rect>
                                    </g>
                                    
                                    {/* Door - welcoming entrance */}
                                    <rect x="185" y="250" width="30" height="30" fill="#fff" opacity="0.4" />
                                    <circle cx="208" cy="265" r="2" fill="#000" opacity="0.6" />
                                </g>

                                {/* Team Members - People icons around the building */}
                                <g className="team-members">
                                    {/* Person 1 - Front Left */}
                                    <g style={{ animation: 'personWalk1 4s ease-in-out infinite' }}>
                                        <circle cx="110" cy="260" r="12" fill="#000" opacity="0.8" />
                                        <rect x="104" y="272" width="12" height="20" rx="2" fill="#000" opacity="0.8" />
                                    </g>
                                    
                                    {/* Person 2 - Front Right */}
                                    <g style={{ animation: 'personWalk2 4.5s ease-in-out infinite' }}>
                                        <circle cx="290" cy="260" r="12" fill="#000" opacity="0.8" />
                                        <rect x="284" y="272" width="12" height="20" rx="2" fill="#000" opacity="0.8" />
                                    </g>
                                    
                                    {/* Person 3 - Left Side */}
                                    <g style={{ animation: 'personFloat1 3s ease-in-out infinite' }}>
                                        <circle cx="80" cy="220" r="10" fill="#000" opacity="0.7" />
                                        <rect x="75" y="230" width="10" height="16" rx="2" fill="#000" opacity="0.7" />
                                    </g>
                                    
                                    {/* Person 4 - Right Side */}
                                    <g style={{ animation: 'personFloat2 3.5s ease-in-out infinite' }}>
                                        <circle cx="320" cy="220" r="10" fill="#000" opacity="0.7" />
                                        <rect x="315" y="230" width="10" height="16" rx="2" fill="#000" opacity="0.7" />
                                    </g>
                                </g>

                                {/* Growth Arrow/Chart - representing company growth */}
                                <g className="growth-chart" opacity="0.6">
                                    {/* Chart base */}
                                    <line x1="50" y1="320" x2="350" y2="320" stroke="#000" strokeWidth="2" opacity="0.4" />
                                    <line x1="50" y1="140" x2="50" y2="320" stroke="#000" strokeWidth="2" opacity="0.4" />
                                    
                                    {/* Growth line */}
                                    <polyline 
                                        points="50,310 100,280 150,260 200,220 250,200 300,160" 
                                        fill="none" 
                                        stroke="#000" 
                                        strokeWidth="3"
                                        strokeDasharray="400"
                                        strokeDashoffset="400"
                                        opacity="0.7"
                                    >
                                        <animate 
                                            attributeName="stroke-dashoffset" 
                                            from="400" 
                                            to="0" 
                                            dur="3s" 
                                            fill="freeze"
                                        />
                                    </polyline>
                                    
                                    {/* Data points */}
                                    <circle cx="100" cy="280" r="4" fill="#000" opacity="0">
                                        <animate attributeName="opacity" values="0;0.8;0.8" dur="3s" fill="freeze" />
                                    </circle>
                                    <circle cx="150" cy="260" r="4" fill="#000" opacity="0">
                                        <animate attributeName="opacity" values="0;0;0.8;0.8" dur="3s" fill="freeze" />
                                    </circle>
                                    <circle cx="200" cy="220" r="4" fill="#000" opacity="0">
                                        <animate attributeName="opacity" values="0;0;0;0.8;0.8" dur="3s" fill="freeze" />
                                    </circle>
                                    <circle cx="250" cy="200" r="4" fill="#000" opacity="0">
                                        <animate attributeName="opacity" values="0;0;0;0;0.8;0.8" dur="3s" fill="freeze" />
                                    </circle>
                                    <circle cx="300" cy="160" r="4" fill="#000" opacity="0">
                                        <animate attributeName="opacity" values="0;0;0;0;0;0.8" dur="3s" fill="freeze" />
                                    </circle>
                                    
                                    {/* Upward arrow at end */}
                                    <path d="M 300 160 L 295 170 L 305 170 Z" fill="#000" opacity="0">
                                        <animate attributeName="opacity" values="0;0;0;0;0;0.8" dur="3s" fill="freeze" />
                                    </path>
                                </g>

                                {/* Vision/Target - Top element */}
                                <g className="vision-target">
                                    <circle cx="200" cy="80" r="35" fill="none" stroke="#000" strokeWidth="2" opacity="0.3" />
                                    <circle cx="200" cy="80" r="25" fill="none" stroke="#000" strokeWidth="2" opacity="0.4" />
                                    <circle cx="200" cy="80" r="15" fill="none" stroke="#000" strokeWidth="2" opacity="0.5" />
                                    <circle cx="200" cy="80" r="6" fill="#000" opacity="0.8">
                                        <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
                                    </circle>
                                    
                                    {/* Shooting star/Achievement */}
                                    <g style={{ animation: 'shootingStar 3s ease-in-out infinite' }}>
                                        <path d="M 180 60 L 185 70 L 175 70 Z" fill="#000" opacity="0.6" />
                                        <line x1="180" y1="60" x2="175" y2="50" stroke="#000" strokeWidth="1" opacity="0.4" />
                                    </g>
                                </g>

                                {/* Values/Pillars - represented by columns */}
                                <g className="value-pillars" opacity="0.4">
                                    <rect x="60" y="300" width="15" height="0" fill="url(#growthGrad)">
                                        <animate attributeName="height" values="0;60;60" dur="2s" begin="0.5s" fill="freeze" />
                                        <animate attributeName="y" values="300;240;240" dur="2s" begin="0.5s" fill="freeze" />
                                    </rect>
                                    <rect x="100" y="300" width="15" height="0" fill="url(#growthGrad)">
                                        <animate attributeName="height" values="0;80;80" dur="2s" begin="0.7s" fill="freeze" />
                                        <animate attributeName="y" values="300;220;220" dur="2s" begin="0.7s" fill="freeze" />
                                    </rect>
                                    <rect x="285" y="300" width="15" height="0" fill="url(#growthGrad)">
                                        <animate attributeName="height" values="0;80;80" dur="2s" begin="0.9s" fill="freeze" />
                                        <animate attributeName="y" values="300;220;220" dur="2s" begin="0.9s" fill="freeze" />
                                    </rect>
                                    <rect x="325" y="300" width="15" height="0" fill="url(#growthGrad)">
                                        <animate attributeName="height" values="0;60;60" dur="2s" begin="1.1s" fill="freeze" />
                                        <animate attributeName="y" values="300;240;240" dur="2s" begin="1.1s" fill="freeze" />
                                    </rect>
                                </g>

                                {/* Connection lines - Team collaboration */}
                                <g className="collaboration-lines" opacity="0.2">
                                    <line x1="110" y1="260" x2="150" y2="240" stroke="#000" strokeWidth="1.5" strokeDasharray="3,3">
                                        <animate attributeName="stroke-dashoffset" from="0" to="6" dur="1s" repeatCount="indefinite" />
                                    </line>
                                    <line x1="290" y1="260" x2="250" y2="240" stroke="#000" strokeWidth="1.5" strokeDasharray="3,3">
                                        <animate attributeName="stroke-dashoffset" from="0" to="6" dur="1s" repeatCount="indefinite" />
                                    </line>
                                    <line x1="80" y1="220" x2="150" y2="210" stroke="#000" strokeWidth="1.5" strokeDasharray="3,3">
                                        <animate attributeName="stroke-dashoffset" from="0" to="6" dur="1s" repeatCount="indefinite" />
                                    </line>
                                    <line x1="320" y1="220" x2="250" y2="210" stroke="#000" strokeWidth="1.5" strokeDasharray="3,3">
                                        <animate attributeName="stroke-dashoffset" from="0" to="6" dur="1s" repeatCount="indefinite" />
                                    </line>
                                </g>

                                {/* Idea bulbs - Innovation */}
                                <g className="idea-bulb" style={{ animation: 'bulbGlow 2s ease-in-out infinite' }}>
                                    <circle cx="340" cy="120" r="15" fill="none" stroke="#000" strokeWidth="2" opacity="0.6" />
                                    <path d="M 335 135 L 345 135 L 343 145 L 337 145 Z" fill="#000" opacity="0.6" />
                                    <line x1="340" y1="115" x2="340" y2="108" stroke="#000" strokeWidth="2" opacity="0.4" />
                                    <line x1="350" y1="115" x2="355" y2="110" stroke="#000" strokeWidth="2" opacity="0.4" />
                                    <line x1="355" y1="120" x2="362" y2="120" stroke="#000" strokeWidth="2" opacity="0.4" />
                                </g>

                                {/* Handshake - Partnership/Values */}
                                <g className="handshake" opacity="0.5" transform="translate(60, 140)">
                                    <rect x="0" y="10" width="20" height="15" rx="3" fill="#000" opacity="0.7" />
                                    <rect x="15" y="10" width="20" height="15" rx="3" fill="#000" opacity="0.7" />
                                    <circle cx="17" cy="17" r="8" fill="#fff" opacity="0.3" />
                                </g>

                                {/* Floating particles - Energy and innovation */}
                                <circle cx="120" cy="150" r="2" fill="#000" opacity="0.4">
                                    <animate attributeName="cy" values="150;130;150" dur="3s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" values="0.4;0.1;0.4" dur="3s" repeatCount="indefinite" />
                                </circle>
                                <circle cx="280" cy="180" r="2.5" fill="#000" opacity="0.3">
                                    <animate attributeName="cy" values="180;160;180" dur="3.5s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" values="0.3;0.1;0.3" dur="3.5s" repeatCount="indefinite" />
                                </circle>
                                <circle cx="160" cy="130" r="2" fill="#000" opacity="0.4">
                                    <animate attributeName="cy" values="130;110;130" dur="4s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" values="0.4;0.1;0.4" dur="4s" repeatCount="indefinite" />
                                </circle>

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

                @keyframes pulse {
                    0%, 100% {
                        opacity: 0.3;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.6;
                        transform: scale(1.5);
                    }
                }

                @keyframes personWalk1 {
                    0%, 100% {
                        transform: translateX(0px);
                    }
                    50% {
                        transform: translateX(10px);
                    }
                }

                @keyframes personWalk2 {
                    0%, 100% {
                        transform: translateX(0px);
                    }
                    50% {
                        transform: translateX(-10px);
                    }
                }

                @keyframes personFloat1 {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-8px);
                    }
                }

                @keyframes personFloat2 {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }

                @keyframes shootingStar {
                    0%, 100% {
                        transform: translate(0, 0);
                        opacity: 0.6;
                    }
                    50% {
                        transform: translate(30px, -20px);
                        opacity: 0;
                    }
                }

                @keyframes bulbGlow {
                    0%, 100% {
                        opacity: 1;
                        filter: drop-shadow(0 0 5px rgba(0,0,0,0.3));
                    }
                    50% {
                        opacity: 0.6;
                        filter: drop-shadow(0 0 10px rgba(0,0,0,0.5));
                    }
                }
            `}</style>
        </div>
    )
}