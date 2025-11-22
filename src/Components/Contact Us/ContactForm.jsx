import React from "react";
import Phone from "../../Common Components/FloatingPhone";

export default function ContactForm() {
    return (
        <div className="min-h-screen w-full border grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
            {/* LEFT SIDE — FORM */}
            <div className="flex flex-col justify-center w-full">
                <h2 className="text-sm font-medium mb-2">Name (required)</h2>

                <div className="flex gap-4 w-full mb-4">
                    <input
                        type="text"
                        placeholder="First Name"
                        className="border-b border-black w-full outline-none py-2"
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        className="border-b border-black w-full outline-none py-2"
                    />
                </div>

                {/* Service Dropdown */}
                <select className="border-b border-black w-full outline-none py-2 mb-4 bg-transparent">
                    <option>Service</option>
                    <option>Web Development</option>
                    <option>UI/UX Design</option>
                    <option>Graphic Design</option>
                    <option>Video Editing</option>
                </select>

                {/* Email */}
                <input
                    type="email"
                    placeholder="Email (required)"
                    className="border-b border-black w-full outline-none py-2 mb-4"
                />

                {/* Checkbox */}
                <label className="flex items-center gap-2 mb-4 cursor-pointer select-none">
                    <input type="checkbox" className="accent-black" />
                    <span className="text-sm">Sign up for news and updates</span>
                </label>

                {/* Project Description */}
                <input
                    type="text"
                    placeholder="Project description"
                    className="border-b border-black w-full outline-none py-2 mb-6"
                />

                {/* Submit Button */}
                <button className="px-6 py-2 bg-black text-white rounded-full text-sm hover:opacity-80 transition">
                    Submit
                </button>
            </div>

            {/* RIGHT SIDE — TEXT */}
            <div className="flex flex-col justify-center text-left text-sm">
                <Phone />
            </div>
        </div>
    );
}
