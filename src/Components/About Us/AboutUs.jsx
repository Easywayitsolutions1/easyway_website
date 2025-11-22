import React from 'react'
import Header from '../../Common Components/Header'
import AboutHeaderSection from './AboutUsHeaderSection'
import About from './About'
import MissionVision from './MissionVision'
import Footer from '../../Common Components/Footer'
import SEO from '../../Common Components/SEO'

export default function AboutUs() {
    return (
        <div className='h-[500px] bg-white'>
            <SEO 
                title="About Us - EasyWay IT Solutions | Best IT Company in Rajkot, Gujarat"
                description="Learn about EasyWay IT Solutions - a leading IT solutions company in Rajkot, Gujarat. We specialize in web development, software development, UI/UX design, and video editing services. Professional IT services provider in Rajkot."
                keywords="IT company in Rajkot, IT solutions in Rajkot, Best IT services in Rajkot, IT service provider in Rajkot, IT consulting company Rajkot, Professional IT solutions Rajkot, About EasyWay IT Solutions"
                canonicalUrl="https://easywayitsolutions.com/aboutUs"
            />
            <Header />
            <AboutHeaderSection />
            <About />
            <MissionVision />
            <Footer />
        </div>
    )
}
