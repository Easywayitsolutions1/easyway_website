import React, { useEffect, useState } from 'react'
import { ChevronRight } from 'lucide-react';
import Lottie from 'lottie-react';
import contactAnimation from '../../../public/Images/contact.json'

export default function ContactHeaderSection() {
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
        <div className="min-h-screen relative overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    animation: 'float 20s ease-in-out infinite'
                }}></div>
            </div>

            {/* Decorative Floating Elements */}
            <div className="absolute top-20 left-10 w-32 h-32 border-2 border-black/10 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 border-2 border-black/5 rounded-full" style={{ animation: 'float 15s ease-in-out infinite' }}></div>
            <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-black/20 rounded-full" style={{ animation: 'pulse 3s ease-in-out infinite' }}></div>
            <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-black/10 rounded-full" style={{ animation: 'pulse 4s ease-in-out infinite' }}></div>

            {/* Main Content Container */}
            <div className="relative z-20 flex flex-col">

                {/* Main Content */}
                <div className="flex-1 flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 py-12 sm:py-16 lg:py-20 gap-12 lg:gap-16">

                    {/* Left Side - Title and Content */}
                    <div className="space-y-8 sm:space-y-12 max-w-full sm:max-w-lg lg:max-w-2xl w-full">

                        {/* Main Title */}
                        <div className="space-y-4 sm:space-y-6">
                            <h1
                                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-black leading-none tracking-tight transition-all duration-300 ease-out"
                                style={{
                                    transform: `translateX(${scrollTransform}px)`,
                                    opacity: 1
                                }}
                            >
                                Contact Us
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
                                We’d love to connect with you! Whether you have a question, need support, or want to discuss a project, the EasyWay IT Solutions team is here to help with quick responses and clear guidance.
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        {/* <button onClick={scrollToContent} className="group relative px-10 py-4 bg-white border-2 border-black text-black font-bold overflow-hidden transition-all duration-300 hover:text-white">
                            <div className="absolute inset-0 flex">
                                <div className="w-1/5 h-full bg-black transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 delay-0"></div>
                                <div className="w-1/5 h-full bg-black transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 delay-75"></div>
                                <div className="w-1/5 h-full bg-black transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 delay-150"></div>
                                <div className="w-1/5 h-full bg-black transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 delay-225"></div>
                                <div className="w-1/5 h-full bg-black transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 delay-300"></div>
                            </div>
                            <p className='flex gap-2 items-center'>
                                <span className="relative z-10">Get in Touch</span>
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </p>
                        </button> */}
                    </div>

                    {/* Right Side - Contact Information Cards */}
                    <div
                        className="mt-12 lg:mt-0 w-full lg:w-auto opacity-0 hidden md:flex justify-center lg:justify-end"
                        style={{
                            animation: 'fadeInRight 1s ease-out 1s forwards',
                            transform: `translateY(-${imageTransform}px)`
                        }}
                    >
                        <Lottie
                            className='h-[400px] w-[400px]'
                            animationData={contactAnimation}
                            loop={true}
                        />
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

                @keyframes rotate {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
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
            `}</style>
        </div>
    )
}