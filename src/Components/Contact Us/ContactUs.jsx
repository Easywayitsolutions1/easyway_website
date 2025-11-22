import React from 'react'
import Header from '../../Common Components/Header'
import ContactHeaderSection from './ContactHeaderSection'
import ContactForm from './ContactForm'
import Footer from '../../Common Components/Footer'
import SEO from '../../Common Components/SEO'

export default function ContactUs() {
    return (
        <div>
            <SEO 
                title="Contact Us - EasyWay IT Solutions | IT Company in Rajkot, Gujarat"
                description="Contact EasyWay IT Solutions - Best IT company in Rajkot, Gujarat. Get in touch for web development, software development, UI/UX design, and video editing services. Call +91 70160 69441 or email info@easywayitsolutions.com"
                keywords="Contact IT company Rajkot, IT solutions contact Rajkot, Web developer contact Rajkot, Software developer contact Rajkot, Video editor contact Rajkot, IT company near me, Web developer near me, Software developer near me, Video editor near me"
                canonicalUrl="https://easywayitsolutions.com/contactUs"
            />
            <Header />
            <ContactHeaderSection />
            <ContactForm />
            <Footer />
        </div>
    )
}
