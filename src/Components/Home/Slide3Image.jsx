// src/components/VideoEditingSceneOptimized.jsx
import React, { useEffect, useState } from 'react';

export default function VideoEditingSceneOptimized() {
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const onMove = (e) => {
            // Throttle mouse movement for better performance
            requestAnimationFrame(() => {
                setMouse({
                    x: (e.clientX / window.innerWidth - 0.5) * 15,
                    y: (e.clientY / window.innerHeight - 0.5) * 15,
                });
            });
        };
        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
    }, []);

    return (
        <div className="relative w-full h-[500px] lg:h-[700px] flex items-center justify-center overflow-hidden">
            {/* Optimized CSS animations */}
            <style jsx>{`
                @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-15px)} }
                @keyframes pulse { 0%,100%{opacity:.7;transform:scale(1)} 50%{opacity:1;transform:scale(1.03)} }
                @keyframes glow { 0%,100%{opacity:.5} 50%{opacity:.8} }
                @keyframes slideWave { 0%{transform:scaleY(.4)} 50%{transform:scaleY(1)} 100%{transform:scaleY(.4)} }
                
                .float { animation: float 4s ease-in-out infinite; }
                .pulse { animation: pulse 2.5s ease-in-out infinite; }
                .glow { animation: glow 3s ease-in-out infinite; }
            `}</style>

            {/* Background gradient orbs - static for performance */}
            <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl" />

            {/* Parallax container */}
            <div
                className="relative w-full h-full transition-transform duration-200 ease-out"
                style={{
                    transform: `translate(${-mouse.x * 0.2}px, ${-mouse.y * 0.2}px)`,
                }}
            >
                {/* MAIN TIMELINE - Center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 md:w-[450px] h-72 sm:h-80 md:h-96 float z-20">
                    <div className="relative w-full h-full bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl border border-blue-500/30 p-4 sm:p-6 shadow-2xl">
                        {/* Video Preview */}
                        <div className="w-full h-32 sm:h-40 bg-gradient-to-br from-slate-950 to-slate-900 rounded-lg mb-4 relative overflow-hidden border border-blue-500/20">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center pulse border border-white/20">
                                    <svg className="w-8 h-8 text-white ml-1" fill="white" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7L8 5z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="absolute top-2 left-2 text-xs font-mono text-white/70 bg-black/60 px-2 py-1 rounded">
                                00:01:23
                            </div>
                        </div>

                        {/* Timeline Tracks */}
                        <div className="space-y-2">
                            {/* Video Track 1 */}
                            <div className="h-8 bg-slate-900/80 rounded relative overflow-hidden border border-blue-500/20">
                                <div className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-blue-500/70 to-blue-600/70 rounded" />
                                <div className="absolute left-1/3 top-0 h-full w-1/4 bg-gradient-to-r from-purple-500/70 to-purple-600/70 rounded ml-1" />
                                <div className="absolute left-[60%] top-0 h-full w-1/5 bg-gradient-to-r from-pink-500/70 to-pink-600/70 rounded ml-1" />
                            </div>
                            
                            {/* Video Track 2 */}
                            <div className="h-8 bg-slate-900/80 rounded relative overflow-hidden border border-purple-500/20">
                                <div className="absolute left-[10%] top-0 h-full w-2/5 bg-gradient-to-r from-cyan-500/70 to-blue-600/70 rounded" />
                                <div className="absolute left-[55%] top-0 h-full w-1/4 bg-gradient-to-r from-violet-500/70 to-purple-600/70 rounded ml-1" />
                            </div>
                            
                            {/* Audio Waveform - Simplified */}
                            <div className="h-12 bg-slate-900/80 rounded relative overflow-hidden border border-green-500/20 flex items-center px-2 gap-0.5">
                                {Array.from({ length: 40 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="flex-1 bg-green-400/70 rounded-sm"
                                        style={{
                                            height: `${30 + Math.sin(i * 0.5) * 30}%`,
                                            animation: `slideWave ${1.5 + (i % 3) * 0.5}s ease-in-out infinite`,
                                            animationDelay: `${i * 0.03}s`,
                                        }}
                                    />
                                ))}
                            </div>
                            
                            {/* Timecode Ruler */}
                            <div className="h-6 bg-slate-950/80 rounded relative border border-slate-700/50 flex items-center justify-between px-2 text-[10px] text-slate-400 font-mono">
                                <span>0:00</span><span>0:30</span><span>1:00</span><span>1:30</span><span>2:00</span>
                                <div className="absolute top-0 bottom-0 w-0.5 bg-red-500 left-[40%] glow">
                                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-red-500 rounded-sm shadow-lg shadow-red-500/50" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Effects Panel - Top Right */}
                <div className="absolute top-8 sm:top-12 right-4 sm:right-8 float z-10" style={{animationDelay: '0.5s'}}>
                    <div className="w-32 h-40 sm:w-36 sm:h-44 bg-gradient-to-br from-purple-900/80 to-violet-900/80 backdrop-blur-xl rounded-xl border border-purple-500/30 p-3 shadow-xl">
                        <div className="space-y-2">
                            <div className="text-xs text-purple-300 font-semibold mb-2">EFFECTS</div>
                            <div className="grid grid-cols-2 gap-2">
                                {[
                                    { icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4z", color: 'from-blue-500/50 to-cyan-500/50' },
                                    { icon: "M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1", color: 'from-purple-500/50 to-pink-500/50' },
                                    { icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707", color: 'from-pink-500/50 to-rose-500/50' },
                                    { icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z", color: 'from-violet-500/50 to-purple-500/50' }
                                ].map((item, idx) => (
                                    <div key={idx} className={`aspect-square bg-gradient-to-br ${item.color} rounded flex items-center justify-center pulse`} style={{animationDelay: `${idx * 0.2}s`}}>
                                        <svg className="w-5 h-5 text-white/90" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                                        </svg>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Film Strip - Top Left */}
                <div className="absolute top-16 sm:top-20 left-2 sm:left-6 float z-10" style={{animationDelay: '0.3s'}}>
                    <div className="w-40 h-24 sm:w-44 sm:h-28 bg-slate-900/90 backdrop-blur-xl rounded-lg border border-slate-600/30 p-2 overflow-hidden relative shadow-xl">
                        <div className="absolute inset-y-0 left-0 w-2 flex flex-col justify-around py-1">
                            {[...Array(6)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-slate-700 rounded-sm" />)}
                        </div>
                        <div className="absolute inset-y-0 right-0 w-2 flex flex-col justify-around py-1">
                            {[...Array(6)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-slate-700 rounded-sm" />)}
                        </div>
                        <div className="ml-3 mr-3 h-full flex gap-1">
                            <div className="w-12 h-full bg-gradient-to-br from-blue-600/60 to-purple-600/60 rounded flex-shrink-0" />
                            <div className="w-12 h-full bg-gradient-to-br from-purple-600/60 to-pink-600/60 rounded flex-shrink-0" />
                            <div className="w-12 h-full bg-gradient-to-br from-pink-600/60 to-rose-600/60 rounded flex-shrink-0" />
                        </div>
                    </div>
                </div>

                {/* Color Grading - Bottom Left */}
                <div className="absolute bottom-12 sm:bottom-16 left-4 sm:left-8 float z-10" style={{animationDelay: '0.7s'}}>
                    <div className="w-40 h-40 sm:w-44 sm:h-44 bg-gradient-to-br from-orange-900/80 to-red-900/80 backdrop-blur-xl rounded-xl border border-orange-500/30 p-3 shadow-xl">
                        <div className="space-y-3">
                            <div className="text-xs text-orange-300 font-semibold">COLOR</div>
                            <div className="grid grid-cols-3 gap-2">
                                {['from-red-500 to-yellow-500', 'from-cyan-500 to-purple-500', 'from-green-500 to-orange-500'].map((g, i) => (
                                    <div key={i} className={`aspect-square rounded-full bg-gradient-to-br ${g} border border-orange-400/30 pulse`} style={{animationDelay: `${i * 0.3}s`}} />
                                ))}
                            </div>
                            {['R', 'G', 'B'].map((c, i) => (
                                <div key={c} className="flex items-center gap-2">
                                    <span className={`text-[10px] w-3 font-bold ${c === 'R' ? 'text-red-400' : c === 'G' ? 'text-green-400' : 'text-blue-400'}`}>{c}</span>
                                    <div className="flex-1 h-2 bg-slate-900/60 rounded-full overflow-hidden">
                                        <div className={`h-full rounded-full ${c === 'R' ? 'bg-red-500' : c === 'G' ? 'bg-green-500' : 'bg-blue-500'}`} style={{width: `${[70, 55, 85][i]}%`}} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Export Settings - Right Middle */}
                <div className="absolute top-1/3 right-8 sm:right-16 float z-10" style={{animationDelay: '0.9s'}}>
                    <div className="w-32 h-36 sm:w-36 sm:h-40 bg-gradient-to-br from-green-900/80 to-emerald-900/80 backdrop-blur-xl rounded-xl border border-green-500/30 p-3 shadow-xl">
                        <div className="space-y-2">
                            <div className="text-xs text-green-300 font-semibold">EXPORT</div>
                            {[
                                { text: 'MP4', color: 'green' },
                                { text: '1920x1080', color: 'emerald' },
                                { text: '60 FPS', color: 'green' }
                            ].map((item, i) => (
                                <div key={i} className={`bg-${item.color}-500/30 rounded px-2 py-1 text-[10px] text-${item.color}-200 font-mono`}>
                                    {item.text}
                                </div>
                            ))}
                            <div className="mt-3">
                                <div className="h-2 bg-slate-900/60 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full pulse" style={{width: '65%'}} />
                                </div>
                                <div className="text-[10px] text-green-300 mt-1 text-center">65%</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Camera Icon - Top Left Corner */}
                <div className="absolute top-4 sm:top-8 left-16 sm:left-24 pulse z-10">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-blue-500/30 to-cyan-600/30 backdrop-blur-xl rounded-full border border-blue-400/40 flex items-center justify-center shadow-xl">
                        <svg className="w-12 h-12 text-blue-200" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    </div>
                </div>

                {/* Simple connecting lines - optimized */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                    <line x1="30%" y1="30%" x2="50%" y2="50%" stroke="#3b82f6" strokeWidth="1" strokeDasharray="5,5" />
                    <line x1="70%" y1="30%" x2="50%" y2="50%" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="5,5" />
                    <line x1="30%" y1="70%" x2="50%" y2="50%" stroke="#ec4899" strokeWidth="1" strokeDasharray="5,5" />
                </svg>
            </div>

            {/* Bottom glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-32 bg-gradient-to-t from-blue-500/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none" />
        </div>
    );
}