import React from 'react'
import Header from '../../Common Components/Header'
import ContactHeaderSection from './ContactHeaderSection'
import ContactForm from './ContactForm'
import Footer from '../../Common Components/Footer'

export default function ContactUs() {
    return (
        <div>
            <Header />
            <ContactHeaderSection />
            <ContactForm />
            <Footer />
        </div>
    )
}
