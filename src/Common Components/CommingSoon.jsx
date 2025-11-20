import { useState } from "react";

export default function ComingSoon() {
    return (
        <div className="bg-white text-black min-h-screen flex items-center justify-center p-6">

            {/* Poster Card */}
            <div className="w-full max-w-2xl text-center border rounded-2xl p-12 shadow-xl
                      border-black/10 bg-black/5 backdrop-blur-lg">

                <h2 className="text-sm uppercase tracking-widest opacity-70">
                    EasyWay IT Solutions
                </h2>

                <h1 className="text-5xl md:text-6xl font-black mt-3 leading-tight">
                    Coming <span className="text-[#101c27]">Soon</span>
                </h1>

                <p className="mt-4 text-lg opacity-80">
                    We’re crafting something powerful — complete digital solutions for your business.
                </p>

                <div className="mt-8 flex flex-col items-center gap-2 text-sm uppercase tracking-wide opacity-70">
                    <span>Web Development</span>
                    <span>UI / UX Design</span>
                    <span>Graphic Design</span>
                    <span>Social Media Design</span>
                    <span>Video Editing</span>
                </div>


                {/* Footer */}
                <p className="mt-10 text-xs opacity-60">
                    © {new Date().getFullYear()} EasyWay IT Solutions
                </p>
            </div>
        </div>
    );
}
