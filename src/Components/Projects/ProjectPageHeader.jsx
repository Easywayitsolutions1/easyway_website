import React, { useEffect, useState } from 'react'
import { ChevronRight } from 'lucide-react';

export default function ProjectPageHeader() {
    const [scrollY, setScrollY] = useState(0);

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
                                Our Projects
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
                                Explore our portfolio of successful projects where innovation meets execution. Each project represents our commitment to delivering exceptional results, showcasing our technical expertise and creative problem-solving capabilities.
                            </p>
                        </div>
                    </div>

                    {/* Right Side - Projects Animation */}
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
                                    <linearGradient id="projectGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: '#000', stopOpacity: 0.8 }} />
                                        <stop offset="100%" style={{ stopColor: '#000', stopOpacity: 0.3 }} />
                                    </linearGradient>
                                    <linearGradient id="projectGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                                        <stop offset="0%" style={{ stopColor: '#000', stopOpacity: 0.2 }} />
                                        <stop offset="100%" style={{ stopColor: '#000', stopOpacity: 0.6 }} />
                                    </linearGradient>
                                    <linearGradient id="screenGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: '#fff', stopOpacity: 0.4 }} />
                                        <stop offset="100%" style={{ stopColor: '#fff', stopOpacity: 0.1 }} />
                                    </linearGradient>
                                </defs>

                                {/* Project Development Timeline/Workflow */}
                                <g className="timeline-base">
                                    {/* Main workflow line */}
                                    <path 
                                        d="M 50 80 Q 100 100 150 120 T 250 160 T 350 200" 
                                        fill="none" 
                                        stroke="#000" 
                                        strokeWidth="3"
                                        strokeDasharray="600"
                                        strokeDashoffset="600"
                                        opacity="0.4"
                                    >
                                        <animate 
                                            attributeName="stroke-dashoffset" 
                                            from="600" 
                                            to="0" 
                                            dur="3s" 
                                            fill="freeze"
                                        />
                                    </path>
                                </g>

                                {/* Stage 1 - Idea/Planning */}
                                <g className="project-stage-1" style={{ animation: 'stageAppear1 0.5s ease-out 0.5s forwards' }} opacity="0">
                                    <circle cx="50" cy="80" r="25" fill="url(#projectGrad1)" />
                                    <circle cx="50" cy="80" r="18" fill="none" stroke="#000" strokeWidth="2" opacity="0.3" />
                                    
                                    {/* Lightbulb - Idea */}
                                    <circle cx="50" cy="77" r="7" fill="none" stroke="#fff" strokeWidth="2" opacity="0.9" />
                                    <path d="M 47 84 L 53 84 L 52 89 L 48 89 Z" fill="#fff" opacity="0.9" />
                                    <line x1="50" y1="70" x2="50" y2="66" stroke="#fff" strokeWidth="1.5" opacity="0.8" />
                                    <line x1="56" y1="73" x2="59" y2="70" stroke="#fff" strokeWidth="1.5" opacity="0.8" />
                                    <line x1="44" y1="73" x2="41" y2="70" stroke="#fff" strokeWidth="1.5" opacity="0.8" />
                                    
                                    {/* Label */}
                                    <text x="50" y="115" textAnchor="middle" fill="#000" fontSize="10" opacity="0.7" fontWeight="600">PLAN</text>
                                </g>

                                {/* Stage 2 - Design */}
                                <g className="project-stage-2" style={{ animation: 'stageAppear2 0.5s ease-out 1s forwards' }} opacity="0">
                                    <circle cx="150" cy="120" r="25" fill="url(#projectGrad1)" />
                                    <circle cx="150" cy="120" r="18" fill="none" stroke="#000" strokeWidth="2" opacity="0.3" />
                                    
                                    {/* Pencil/Ruler - Design */}
                                    <rect x="143" y="112" width="14" height="3" fill="#fff" opacity="0.9" />
                                    <path d="M 143 115 L 143 125 L 147 127 L 151 125 L 157 125 L 157 115 Z" fill="#fff" opacity="0.9" />
                                    <rect x="145" y="117" width="2" height="6" fill="#000" opacity="0.3" />
                                    <rect x="151" y="117" width="2" height="6" fill="#000" opacity="0.3" />
                                    
                                    {/* Label */}
                                    <text x="150" y="155" textAnchor="middle" fill="#000" fontSize="10" opacity="0.7" fontWeight="600">DESIGN</text>
                                </g>

                                {/* Stage 3 - Development */}
                                <g className="project-stage-3" style={{ animation: 'stageAppear1 0.5s ease-out 1.5s forwards' }} opacity="0">
                                    <circle cx="250" cy="160" r="25" fill="url(#projectGrad1)" />
                                    <circle cx="250" cy="160" r="18" fill="none" stroke="#000" strokeWidth="2" opacity="0.3" />
                                    
                                    {/* Code brackets - Development */}
                                    <path d="M 242 155 L 237 160 L 242 165" stroke="#fff" strokeWidth="2.5" fill="none" opacity="0.9" />
                                    <path d="M 258 155 L 263 160 L 258 165" stroke="#fff" strokeWidth="2.5" fill="none" opacity="0.9" />
                                    <line x1="246" y1="155" x2="254" y2="165" stroke="#fff" strokeWidth="2" opacity="0.9" />
                                    
                                    {/* Label */}
                                    <text x="250" y="195" textAnchor="middle" fill="#000" fontSize="10" opacity="0.7" fontWeight="600">DEVELOP</text>
                                    
                                    {/* Coding activity indicator */}
                                    <g style={{ animation: 'codePulse 2s ease-in-out infinite' }}>
                                        <circle cx="265" cy="150" r="3" fill="#000" opacity="0.6" />
                                        <circle cx="272" cy="153" r="2.5" fill="#000" opacity="0.5" />
                                        <circle cx="278" cy="148" r="2" fill="#000" opacity="0.4" />
                                    </g>
                                </g>

                                {/* Stage 4 - Launch */}
                                <g className="project-stage-4" style={{ animation: 'stageAppear2 0.5s ease-out 2s forwards' }} opacity="0">
                                    <circle cx="350" cy="200" r="25" fill="url(#projectGrad1)" />
                                    <circle cx="350" cy="200" r="18" fill="none" stroke="#000" strokeWidth="2" opacity="0.3" />
                                    
                                    {/* Rocket - Launch */}
                                    <path d="M 350 188 L 345 203 L 350 200 L 355 203 Z" fill="#fff" opacity="0.9" />
                                    <ellipse cx="350" cy="193" rx="3" ry="5" fill="#000" opacity="0.3" />
                                    <path d="M 345 203 L 343 208 L 345 206 Z" fill="#fff" opacity="0.7" />
                                    <path d="M 355 203 L 357 208 L 355 206 Z" fill="#fff" opacity="0.7" />
                                    
                                    {/* Launch flames */}
                                    <g style={{ animation: 'flameFlicker 0.5s ease-in-out infinite' }}>
                                        <path d="M 348 203 Q 347 208 348 211" stroke="#000" strokeWidth="1.5" fill="none" opacity="0.4" />
                                        <path d="M 350 204 Q 350 209 350 213" stroke="#000" strokeWidth="1.5" fill="none" opacity="0.5" />
                                        <path d="M 352 203 Q 353 208 352 211" stroke="#000" strokeWidth="1.5" fill="none" opacity="0.4" />
                                    </g>
                                    
                                    {/* Label */}
                                    <text x="350" y="235" textAnchor="middle" fill="#000" fontSize="10" opacity="0.7" fontWeight="600">LAUNCH</text>
                                </g>

                                {/* Central Project Display - Multiple Screens */}
                                <g className="project-screens">
                                    {/* Desktop Screen */}
                                    <g style={{ animation: 'screenFloat1 4s ease-in-out infinite' }}>
                                        <rect x="120" y="240" width="90" height="60" rx="3" fill="#000" opacity="0.8" stroke="#000" strokeWidth="2">
                                            <animate attributeName="opacity" values="0;0.8;0.8" dur="2s" begin="2.5s" fill="freeze" />
                                        </rect>
                                        <rect x="125" y="245" width="80" height="45" fill="url(#screenGlow)" opacity="0">
                                            <animate attributeName="opacity" values="0;0.6;0.6" dur="2s" begin="2.5s" fill="freeze" />
                                        </rect>
                                        {/* Screen content lines */}
                                        <line x1="130" y1="252" x2="170" y2="252" stroke="#000" strokeWidth="2" opacity="0.3" />
                                        <line x1="130" y1="260" x2="190" y2="260" stroke="#000" strokeWidth="2" opacity="0.3" />
                                        <line x1="130" y1="268" x2="160" y2="268" stroke="#000" strokeWidth="2" opacity="0.3" />
                                        <rect x="130" y="275" width="15" height="10" fill="#000" opacity="0.4" />
                                        <rect x="150" y="275" width="15" height="10" fill="#000" opacity="0.4" />
                                        
                                        {/* Monitor stand */}
                                        <rect x="157" y="300" width="16" height="8" fill="#000" opacity="0.7" />
                                        <rect x="145" y="308" width="40" height="3" fill="#000" opacity="0.7" />
                                    </g>

                                    {/* Mobile Phone */}
                                    <g style={{ animation: 'screenFloat2 4.5s ease-in-out infinite' }}>
                                        <rect x="230" y="250" width="35" height="60" rx="4" fill="#000" opacity="0.8" stroke="#000" strokeWidth="2">
                                            <animate attributeName="opacity" values="0;0.8;0.8" dur="2s" begin="2.7s" fill="freeze" />
                                        </rect>
                                        <rect x="235" y="258" width="25" height="42" rx="1" fill="url(#screenGlow)" opacity="0">
                                            <animate attributeName="opacity" values="0;0.6;0.6" dur="2s" begin="2.7s" fill="freeze" />
                                        </rect>
                                        {/* Screen content */}
                                        <line x1="238" y1="265" x2="255" y2="265" stroke="#000" strokeWidth="1.5" opacity="0.3" />
                                        <line x1="238" y1="271" x2="252" y2="271" stroke="#000" strokeWidth="1.5" opacity="0.3" />
                                        <rect x="238" y="277" width="8" height="8" fill="#000" opacity="0.4" />
                                        <rect x="248" y="277" width="8" height="8" fill="#000" opacity="0.4" />
                                        <circle cx="247.5" cy="305" r="2.5" fill="#fff" opacity="0.4" />
                                    </g>

                                    {/* Tablet */}
                                    <g style={{ animation: 'screenFloat1 5s ease-in-out infinite' }}>
                                        <rect x="280" y="255" width="60" height="50" rx="3" fill="#000" opacity="0.8" stroke="#000" strokeWidth="2">
                                            <animate attributeName="opacity" values="0;0.8;0.8" dur="2s" begin="2.9s" fill="freeze" />
                                        </rect>
                                        <rect x="285" y="260" width="50" height="38" rx="1" fill="url(#screenGlow)" opacity="0">
                                            <animate attributeName="opacity" values="0;0.6;0.6" dur="2s" begin="2.9s" fill="freeze" />
                                        </rect>
                                        {/* Screen content */}
                                        <line x1="290" y1="267" x2="320" y2="267" stroke="#000" strokeWidth="1.5" opacity="0.3" />
                                        <line x1="290" y1="274" x2="325" y2="274" stroke="#000" strokeWidth="1.5" opacity="0.3" />
                                        <rect x="290" y="281" width="12" height="10" fill="#000" opacity="0.4" />
                                        <rect x="305" y="281" width="12" height="10" fill="#000" opacity="0.4" />
                                        <circle cx="310" cy="302" r="2" fill="#fff" opacity="0.4" />
                                    </g>
                                </g>

                                {/* Project Files/Documents */}
                                <g className="project-files">
                                    <g opacity="0" style={{ animation: 'fileAppear 0.5s ease-out 3.2s forwards' }}>
                                        <rect x="60" y="320" width="30" height="40" rx="2" fill="#000" opacity="0.7" stroke="#000" strokeWidth="1.5" />
                                        <path d="M 60 320 L 60 325 L 70 335 L 90 335 L 90 320 Z" fill="#000" opacity="0.5" />
                                        <line x1="65" y1="340" x2="85" y2="340" stroke="#fff" strokeWidth="1.5" opacity="0.4" />
                                        <line x1="65" y1="345" x2="80" y2="345" stroke="#fff" strokeWidth="1.5" opacity="0.4" />
                                        <line x1="65" y1="350" x2="85" y2="350" stroke="#fff" strokeWidth="1.5" opacity="0.4" />
                                    </g>
                                    
                                    <g opacity="0" style={{ animation: 'fileAppear 0.5s ease-out 3.4s forwards' }}>
                                        <rect x="45" y="310" width="30" height="40" rx="2" fill="#000" opacity="0.6" stroke="#000" strokeWidth="1.5" />
                                        <path d="M 45 310 L 45 315 L 55 325 L 75 325 L 75 310 Z" fill="#000" opacity="0.4" />
                                        <line x1="50" y1="330" x2="70" y2="330" stroke="#fff" strokeWidth="1.5" opacity="0.3" />
                                        <line x1="50" y1="335" x2="65" y2="335" stroke="#fff" strokeWidth="1.5" opacity="0.3" />
                                        <line x1="50" y1="340" x2="70" y2="340" stroke="#fff" strokeWidth="1.5" opacity="0.3" />
                                    </g>
                                    
                                    <g opacity="0" style={{ animation: 'fileAppear 0.5s ease-out 3.6s forwards' }}>
                                        <rect x="30" y="300" width="30" height="40" rx="2" fill="#000" opacity="0.5" stroke="#000" strokeWidth="1.5" />
                                        <path d="M 30 300 L 30 305 L 40 315 L 60 315 L 60 300 Z" fill="#000" opacity="0.3" />
                                        <line x1="35" y1="320" x2="55" y2="320" stroke="#fff" strokeWidth="1.5" opacity="0.2" />
                                        <line x1="35" y1="325" x2="50" y2="325" stroke="#fff" strokeWidth="1.5" opacity="0.2" />
                                        <line x1="35" y1="330" x2="55" y2="330" stroke="#fff" strokeWidth="1.5" opacity="0.2" />
                                    </g>
                                </g>

                                {/* Success Metrics/Results */}
                                <g className="success-metrics">
                                    {/* Chart bars */}
                                    <g opacity="0" style={{ animation: 'metricsAppear 1s ease-out 3.5s forwards' }}>
                                        <rect x="95" y="190" width="15" height="0" fill="#000" opacity="0.6">
                                            <animate attributeName="height" values="0;35;35" dur="1s" begin="3.5s" fill="freeze" />
                                            <animate attributeName="y" values="190;155;155" dur="1s" begin="3.5s" fill="freeze" />
                                        </rect>
                                        <rect x="115" y="190" width="15" height="0" fill="#000" opacity="0.7">
                                            <animate attributeName="height" values="0;50;50" dur="1s" begin="3.7s" fill="freeze" />
                                            <animate attributeName="y" values="190;140;140" dur="1s" begin="3.7s" fill="freeze" />
                                        </rect>
                                        <rect x="135" y="190" width="15" height="0" fill="#000" opacity="0.8">
                                            <animate attributeName="height" values="0;65;65" dur="1s" begin="3.9s" fill="freeze" />
                                            <animate attributeName="y" values="190;125;125" dur="1s" begin="3.9s" fill="freeze" />
                                        </rect>
                                        
                                        {/* Checkmarks */}
                                        <path d="M 98 148 L 102 153 L 108 145" stroke="#fff" strokeWidth="2" fill="none" opacity="0">
                                            <animate attributeName="opacity" values="0;0.8;0.8" dur="0.5s" begin="4.5s" fill="freeze" />
                                        </path>
                                        <path d="M 118 133 L 122 138 L 128 130" stroke="#fff" strokeWidth="2" fill="none" opacity="0">
                                            <animate attributeName="opacity" values="0;0.8;0.8" dur="0.5s" begin="4.7s" fill="freeze" />
                                        </path>
                                        <path d="M 138 118 L 142 123 L 148 115" stroke="#fff" strokeWidth="2" fill="none" opacity="0">
                                            <animate attributeName="opacity" values="0;0.8;0.8" dur="0.5s" begin="4.9s" fill="freeze" />
                                        </path>
                                    </g>
                                </g>

                                {/* Collaboration Network */}
                                <g className="collaboration-network" opacity="0.3">
                                    <circle cx="310" cy="310" r="12" fill="#000" opacity="0.5">
                                        <animate attributeName="opacity" values="0.5;0.7;0.5" dur="3s" repeatCount="indefinite" />
                                    </circle>
                                    <circle cx="340" cy="285" r="12" fill="#000" opacity="0.5">
                                        <animate attributeName="opacity" values="0.5;0.7;0.5" dur="3.2s" repeatCount="indefinite" />
                                    </circle>
                                    <circle cx="365" cy="315" r="12" fill="#000" opacity="0.5">
                                        <animate attributeName="opacity" values="0.5;0.7;0.5" dur="3.4s" repeatCount="indefinite" />
                                    </circle>
                                    
                                    <line x1="310" y1="310" x2="340" y2="285" stroke="#000" strokeWidth="1.5" strokeDasharray="3,3">
                                        <animate attributeName="stroke-dashoffset" from="0" to="6" dur="1s" repeatCount="indefinite" />
                                    </line>
                                    <line x1="340" y1="285" x2="365" y2="315" stroke="#000" strokeWidth="1.5" strokeDasharray="3,3">
                                        <animate attributeName="stroke-dashoffset" from="0" to="6" dur="1s" repeatCount="indefinite" />
                                    </line>
                                    <line x1="310" y1="310" x2="365" y2="315" stroke="#000" strokeWidth="1.5" strokeDasharray="3,3">
                                        <animate attributeName="stroke-dashoffset" from="0" to="6" dur="1s" repeatCount="indefinite" />
                                    </line>
                                </g>

                                {/* Quality Badge */}
                                <g className="quality-badge" opacity="0" style={{ animation: 'badgeAppear 0.8s ease-out 4.5s forwards' }}>
                                    <circle cx="360" cy="100" r="22" fill="#000" opacity="0.8" />
                                    <circle cx="360" cy="100" r="16" fill="none" stroke="#fff" strokeWidth="2" opacity="0.9" />
                                    <path d="M 353 100 L 358 105 L 367 94" stroke="#fff" strokeWidth="2.5" fill="none" opacity="0.9" />
                                    
                                    {/* Star points */}
                                    <path d="M 360 82 L 363 88 L 360 85 L 357 88 Z" fill="#000" opacity="0.6" />
                                    <path d="M 378 100 L 372 103 L 375 100 L 372 97 Z" fill="#000" opacity="0.6" />
                                    <path d="M 360 118 L 357 112 L 360 115 L 363 112 Z" fill="#000" opacity="0.6" />
                                    <path d="M 342 100 L 348 97 L 345 100 L 348 103 Z" fill="#000" opacity="0.6" />
                                </g>

                                {/* Innovation Particles */}
                                <g className="innovation-particles">
                                    <circle cx="80" cy="200" r="2.5" fill="#000" opacity="0.5">
                                        <animate attributeName="cy" values="200;180;200" dur="3s" repeatCount="indefinite" />
                                        <animate attributeName="opacity" values="0.5;0.2;0.5" dur="3s" repeatCount="indefinite" />
                                    </circle>
                                    <circle cx="190" cy="210" r="2" fill="#000" opacity="0.4">
                                        <animate attributeName="cy" values="210;190;210" dur="3.5s" repeatCount="indefinite" />
                                        <animate attributeName="opacity" values="0.4;0.2;0.4" dur="3.5s" repeatCount="indefinite" />
                                    </circle>
                                    <circle cx="300" cy="230" r="2.5" fill="#000" opacity="0.5">
                                        <animate attributeName="cy" values="230;210;230" dur="4s" repeatCount="indefinite" />
                                        <animate attributeName="opacity" values="0.5;0.2;0.5" dur="4s" repeatCount="indefinite" />
                                    </circle>
                                    <circle cx="365" cy="250" r="2" fill="#000" opacity="0.4">
                                        <animate attributeName="cy" values="250;230;250" dur="3.2s" repeatCount="indefinite" />
                                        <animate attributeName="opacity" values="0.4;0.2;0.4" dur="3.2s" repeatCount="indefinite" />
                                    </circle>
                                </g>

                                {/* Progress Circle */}
                                <g className="progress-indicator">
                                    <circle cx="40" cy="180" r="18" fill="none" stroke="#000" strokeWidth="3" opacity="0.2" />
                                    <circle 
                                        cx="40" 
                                        cy="180" 
                                        r="18" 
                                        fill="none" 
                                        stroke="#000" 
                                        strokeWidth="3" 
                                        opacity="0.7"
                                        strokeDasharray="113"
                                        strokeDashoffset="113"
                                        transform="rotate(-90 40 180)"
                                    >
                                        <animate 
                                            attributeName="stroke-dashoffset" 
                                            from="113" 
                                            to="0" 
                                            dur="5s" 
                                            fill="freeze"
                                        />
                                    </circle>
                                    <text x="40" y="185" textAnchor="middle" fill="#000" fontSize="12" opacity="0.8" fontWeight="700">
                                        <animate attributeName="opacity" values="0;0.8;0.8" dur="5s" fill="freeze" />
                                        100%
                                    </text>
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

                @keyframes stageAppear1 {
                    from {
                        opacity: 0;
                        transform: scale(0.5) translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }

                @keyframes stageAppear2 {
                    from {
                        opacity: 0;
                        transform: scale(0.5) translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }

                @keyframes screenFloat1 {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }

                @keyframes screenFloat2 {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-12px);
                    }
                }

                @keyframes codePulse {
                    0%, 100% {
                        opacity: 0.3;
                    }
                    50% {
                        opacity: 0.8;
                    }
                }

                @keyframes flameFlicker {
                    0%, 100% {
                        opacity: 0.4;
                        transform: scaleY(1);
                    }
                    50% {
                        opacity: 0.7;
                        transform: scaleY(1.2);
                    }
                }

                @keyframes fileAppear {
                    from {
                        opacity: 0;
                        transform: translateX(-20px) rotate(-5deg);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0) rotate(0deg);
                    }
                }

                @keyframes metricsAppear {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes badgeAppear {
                    from {
                        opacity: 0;
                        transform: scale(0) rotate(-180deg);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) rotate(0deg);
                    }
                }
            `}</style>
        </div>
    )
}