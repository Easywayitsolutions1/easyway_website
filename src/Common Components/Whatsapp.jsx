import React from "react";

export default function Whatsapp() {
    
    const handleButton = () => {

        const phoneNumber = "917016069441";
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const whatsappURL = isMobile
            ? `https://api.whatsapp.com/send?phone=${phoneNumber}`
            : `https://web.whatsapp.com/send?phone=${phoneNumber}`;
        window.open(whatsappURL, "_blank");
    
    };

    return (
        <div>
            <div
                onClick={handleButton}
                className="whatsapp fixed cursor-pointer bg-[#36c14a] text-white top-[90vh] right-[15px] rounded-full h-14 w-14 flex justify-center items-center shadow-lg transition-all duration-300 hover:scale-110 animate-bounce"
                style={{ zIndex: "100" }}
            >
                <img src="/Images/whatsapp.png" className="h-11 w-11" alt="WhatsApp" />
            </div>
        </div>
    );
}
