import React from 'react';
import ScrollTextReveal from '../../Common Components/ScrollTextReveal'
// Single-file React component using Tailwind CSS
// Place this file in your React project and render <AboutSection /> where needed.
// Image used from the uploaded path below (already referenced):
const imageUrl = "/mnt/data/c0a302b7-5434-42a9-b406-9d524e9e607a.png";

export default function About() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT: big headline */}
          <div className="lg:col-span-8">
            <div className="mb-8 flex items-center gap-3">
              <span className="w-3 h-3 bg-[#1a2938] rounded-full block"></span>
              <span className="uppercase text-sm font-semibold tracking-widest text-gray-800">About us</span>
            </div>

            <ScrollTextReveal className='text-7xl text-[#1a2938]' text='Unlock your brands potential with our creative solutions.' />

            <div className="mt-10">
              <a
                href="tel:7016069441"
                className="inline-flex items-center gap-3 text-[#1a2938] font-semibold uppercase tracking-wider border-b border-[#1a2938] pb-1"
              >
                Book a call
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* RIGHT: image card + text */}
          <div className="lg:col-span-4 flex flex-col items-end">
            <div className="w-full max-w-[360px] bg-white rounded-[14px] overflow-hidden shadow-sm">
              <video
                src="/Images/about_us.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto object-cover"
              ></video>
            </div>

            <p className="mt-6 max-w-[360px] text-gray-700 text-base leading-7 text-right">
              Our services help you create digital products and solve your problems objectively — strategy, technology and analysis.
            </p>

            <div className="mt-6 self-start hidden">
              {/* reserved for optional small logo/badge like "Made in Webflow" */}
            </div>
          </div>

        </div>
      </div>

     
    </section>
  );
}
