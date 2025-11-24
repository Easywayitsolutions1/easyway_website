import React from 'react'
import AboutUs from './AboutUs'
import WhyChooseUs from './WhyChooseUs'
import Services from './Services'
import Projects from './Projects'
import OurClients from './OurClients'
import Footer from '../../Common Components/Footer'
import Whatsapp from '../../Common Components/Whatsapp'
import { SmoothScrollHero } from './SmoothScrollHero'
import SEO from '../../Common Components/SEO'
import ScrollToTop from '../../Common Components/ScrollToTop'

export default function Home() {
    return (
        <div className='bg-white'>
            <SEO
                title="EasyWay IT Solutions - Best IT Company in Rajkot | Web Development, Software Development, UI/UX Design Services"
                description="EasyWay IT Solutions is a leading IT solutions company in Rajkot, Gujarat. We provide professional IT services, custom web development, software development, UI/UX design, and video editing services. Best IT service provider for businesses in Rajkot."
                canonicalUrl="https://easywayitsolutions.com/"
            />
            <Whatsapp />
            <ScrollToTop />
            {/* <Header /> */}
            {/* <Testing /> */}

            <SmoothScrollHero />
            <AboutUs />
            <Services />
            <WhyChooseUs />
            <Projects />
            {/* <OurClients /> */}
            <Footer />
        </div>
    )
}