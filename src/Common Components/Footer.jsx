import React, { useState, useEffect } from "react";
import { ArrowUpRight, Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import CircularText from "./CircularText";
import { useNavigate } from "react-router-dom";

export default function Footer() {
    const navigate = useNavigate("");
    const [isMobile, setIsMobile] = useState(false);

    // Detect if mobile device
    useEffect(() => {
        setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    }, []);

    const handleWhatsapp = () => {
        const phoneNumber = "917016069441";
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const whatsappURL = isMobile
            ? `https://api.whatsapp.com/send?phone=${phoneNumber}`
            : `https://web.whatsapp.com/send?phone=${phoneNumber}`;
        window.open(whatsappURL, "_blank");
    };

    // Email links
    const email = "info@easywayitsolutions.com";
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
    const mailtoLink = `mailto:${email}`;

    return (
        <div className="p-3 rounded-[15px] overflow-hidden">
            <footer className="bg-[#0b1521] rounded-[15px] text-gray-300 py-14 px-6">
                <div className="rounded-2xl w-[95%] ms-[2.5%] flex flex-row justify-between items-center gap-8 mb-12">
                    <h2 
                        className="heading-text uppercase text-3xl sm:text-5xl lg:text-7xl font-black text-white leading-tight" 
                        data-aos="fade-right" 
                        data-aos-duration="1500"
                    >
                        Let's Connect<br />With Us
                    </h2>

                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                        <div 
                            onClick={handleWhatsapp} 
                            className="relative cursor-pointer rounded-full flex items-center justify-center w-40 h-40" 
                            data-aos="fade-left" 
                            data-aos-duration="1500"
                        >
                            <CircularText
                                text="Let`s Connect ● Let`s Connect ● "
                                onHover="speedUp"
                                spinDuration={20}
                                className="custom-class uppercase heading-text text-white h-[100px] sm:h-[150px] md:h-[180px] w-[100px] sm:w-[150px] md:w-[180px]"
                            />

                            <p className="heading-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white flex items-center justify-center font-bold">
                                <ArrowUpRight className='h-10 sm:h-20 w-10 sm:w-20' />
                            </p>
                        </div>
                    </div>
                </div>

                <div className="w-[95%] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* LOGO + ABOUT */}
                    <div>
                        <img className="h-[70px]" src="/Images/logo.png" alt="EasyWay IT Solutions" />

                        {/* Social Icons */}
                        <div className="flex mt-5 gap-3">
                            {[
                                { Icon: Instagram, link: "https://www.instagram.com/easyway_it.solutions?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
                                { Icon: Facebook, link: "https://facebook.com/your-profile" },
                                { Icon: Linkedin, link: "https://www.linkedin.com/company/easyway-it-solutions/" }
                            ].map(({ Icon, link }, i) => (
                                <a
                                    key={i}
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition"
                                >
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* QUICK LINKS */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-3 text-sm">
                            <li 
                                className="opacity-50 hover:opacity-100 text-white cursor-pointer transition" 
                                onClick={() => { navigate("/"); window.scrollTo(0, 0); }}
                            >
                                Home
                            </li>
                            <li 
                                className="opacity-50 hover:opacity-100 text-white cursor-pointer transition" 
                                onClick={() => { navigate("/aboutUs"); window.scrollTo(0, 0); }}
                            >
                                About Us
                            </li>
                            <li 
                                className="opacity-50 hover:opacity-100 text-white cursor-pointer transition" 
                                onClick={() => { navigate("/projects"); window.scrollTo(0, 0); }}
                            >
                                Projects
                            </li>
                            <li 
                                className="opacity-50 hover:opacity-100 text-white cursor-pointer transition" 
                                onClick={() => { navigate("/service"); window.scrollTo(0, 0); }}
                            >
                                Services
                            </li>
                            <li 
                                className="opacity-50 hover:opacity-100 text-white cursor-pointer transition" 
                                onClick={() => { navigate("/contactUs"); window.scrollTo(0, 0); }}
                            >
                                Contact Us
                            </li>
                        </ul>
                    </div>

                    {/* SERVICES */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Services</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="opacity-50 hover:opacity-100 text-white cursor-pointer transition">UI/UX Design</li>
                            <li className="opacity-50 hover:opacity-100 text-white cursor-pointer transition">Web Development</li>
                            <li className="opacity-50 hover:opacity-100 text-white cursor-pointer transition">React Development</li>
                            <li className="opacity-50 hover:opacity-100 text-white cursor-pointer transition">Front-End Animations</li>
                            <li className="opacity-50 hover:opacity-100 text-white cursor-pointer transition">Portfolio Websites</li>
                        </ul>
                    </div>

                    {/* CONTACT */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Contact</h3>
                        <ul className="space-y-3 text-sm">
                            {/* Phone */}
                            <li className="flex items-center gap-2">
                                <Phone size={18} />
                               <a
                                    href="tel:+917016069441"
                                    className="opacity-50 hover:opacity-100 transition-colors duration-200 cursor-pointer hover:underline"
                                >
                                    +91 70160 69441
                                </a>
                            </li>

                            {/* Email */}
                            <li className="flex items-center gap-2">
                                <Mail size={18} />
                                 <a
                                    href={isMobile ? mailtoLink : gmailLink}
                                    target={isMobile ? "_self" : "_blank"}
                                    rel={isMobile ? "" : "noopener noreferrer"}
                                    className="opacity-50 hover:opacity-100 transition-colors duration-200 cursor-pointer hover:underline"
                                >
                                    {email}
                                </a>
                            </li>

                            {/* Location */}
                            <li className="flex items-center gap-2">
                                <MapPin size={18} />
                                <a
                                    href="https://www.google.com/maps/search/?api=1&query=Rajkot,+Gujarat,+India"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="opacity-50 hover:opacity-100 transition-colors duration-200 cursor-pointer hover:underline"
                                >
                                    Rajkot, Gujarat, India
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 mt-6 pt-6 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} EasyWay IT Solutions. All rights reserved.
                </div>
            </footer>
        </div>
    );
}