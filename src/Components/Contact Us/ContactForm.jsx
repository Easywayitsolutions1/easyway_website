import React, { useEffect, useState } from "react";
import Phone from "../../Common Components/FloatingPhone";
import { ArrowRight } from "lucide-react";
import { useScrollTheme } from '../../Common Components/ScrollContext';

export default function ContactForm() {

    const { setTheme } = useScrollTheme();

    useEffect(() => {
        // Agar black background hai to 'dark' set karo
        setTheme('light');
    }, [setTheme]);

    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [service, setService] = useState("");
    const [email, setEmail] = useState("");
    const [details, setDetails] = useState("");

    const handleButton = () => {
        const phoneNumber = "919724076944";

        const message = `
Hello EasyWay IT Solutions,
I would like to discuss my project.

Here are my details:
• Name: ${fullName}
• Phone: ${phone}
• Email: ${email}
• Service Required: ${service}

Project Details:
${details}

Please get back to me at your earliest convenience.
        `;

        const encodedMessage = encodeURIComponent(message);
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        const whatsappURL = isMobile
            ? `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`
            : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

        window.open(whatsappURL, "_blank");
    };

    return (
        <div className="w-[95%] ms-[2.5%] grid grid-cols-1 md:grid-cols-2 py-10 gap-10">

            {/* LEFT SIDE — FORM GRAPHIC */}
            <div className="flex flex-col justify-center text-left text-sm">
                <Phone />
            </div>

            {/* RIGHT SIDE — FORM */}
            <div className="flex flex-col justify-center w-full max-w-2xl mx-auto px-4">

                {/* HEADING */}
                <div className="mb-16 relative">
                    <div className="overflow-hidden">
                        <h1 className="heading-text text-6xl font-bold leading-none">
                            Let's Work Together
                        </h1>
                    </div>
                    <p className="text-sm text-gray-600 mt-6 tracking-wide">
                        Fill out the form below and let's start your project journey
                    </p>
                </div>

                {/* NAME + PHONE */}
                <div className="flex items-start gap-8 mb-6">

                    {/* Full Name */}
                    <div className="w-1/2">
                        <label className="text-xs font-bold mb-3 block tracking-widest uppercase text-gray-800">
                            Full Name <span className="text-black">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="border-b-2 border-black w-full outline-none py-3 px-1 
                            focus:border-gray-600 transition-colors placeholder:text-gray-400 bg-transparent"
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="w-1/2">
                        <label className="text-xs font-bold mb-3 block tracking-widest uppercase text-gray-800">
                            Phone No. <span className="text-black">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Phone No"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="border-b-2 border-black w-full outline-none py-3 px-1 
                            focus:border-gray-600 transition-colors placeholder:text-gray-400 bg-transparent"
                        />
                    </div>

                </div>

                {/* SERVICE DROPDOWN */}
                <div className="mb-6 relative">
                    <label className="text-xs font-bold mb-3 block tracking-widest uppercase text-gray-800">
                        Select Service
                    </label>
                    <div className="relative">
                        <select
                            value={service}
                            onChange={(e) => setService(e.target.value)}
                            className="border-b-2 border-black w-full outline-none py-3 px-1 pr-8 bg-transparent 
                            focus:border-gray-600 transition-colors cursor-pointer appearance-none text-gray-700 font-medium"
                        >
                            <option value="">Choose your service...</option>
                            <option value="Web Development">Web Development</option>
                            <option value="UI/UX Design">UI/UX Design</option>
                            <option value="Graphic Design">Graphic Design</option>
                            <option value="Video Editing">Video Editing</option>
                            <option value="Branding">Branding</option>
                            <option value="Digital Marketing">Digital Marketing</option>
                        </select>

                        {/* Custom Arrow */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg width="20" height="20" fill="none" className="text-black">
                                <path
                                    d="M5 7.5L10 12.5L15 7.5"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* EMAIL */}
                <div className="mb-6">
                    <label className="text-xs font-bold mb-3 block tracking-widest uppercase text-gray-800">
                        Email Address <span className="text-black">*</span>
                    </label>
                    <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-b-2 border-black w-full outline-none py-3 px-1 
                        focus:border-gray-600 transition-colors placeholder:text-gray-400 bg-transparent"
                    />
                </div>

                {/* DETAILS */}
                <div className="mb-6">
                    <label className="text-xs font-bold mb-3 block tracking-widest uppercase text-gray-800">
                        Project Details
                    </label>
                    <textarea
                        placeholder="Tell us about your vision, goals, and requirements..."
                        rows="5"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        className="border-b-2 border-black w-full outline-none py-3 px-1 
                        focus:border-gray-600 transition-colors placeholder:text-gray-400 resize-none bg-transparent"
                    />
                </div>

                {/* SUBMIT BUTTON */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleButton}
                        className="group relative inline-block w-full px-8 py-3 rounded-[10px]
                        text-[17px] font-medium border-2 border-black
                        bg-[#101c28] text-white overflow-hidden transition-all duration-500 z-10
                        hover:bg-transparent hover:text-[#101c28] hover:border-[#101c28]"
                    >
                        <span className="relative z-10 flex justify-between items-center gap-3">
                            Send Message <ArrowRight size={20} />
                        </span>

                        {/* Hover Animation */}
                        <span
                            className="absolute top-full left-full w-[300px] h-[150px]
                            bg-[#101c28] rounded-full transition-all duration-700 ease-in-out
                            group-hover:top-[-30px] group-hover:left-[-400px]"
                        />
                    </button>
                </div>

            </div>
        </div>
    );
}
