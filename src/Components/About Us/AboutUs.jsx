import React from 'react'
import Header from '../../Common Components/Header'
import AboutHeaderSection from './AboutUsHeaderSection'
import About from './About'
import MissionVision from './MissionVision'
import Footer from '../../Common Components/Footer'

export default function AboutUs() {
    return (
        <div className='h-[500px] bg-white'>
            <Header />
            <AboutHeaderSection />
            <About />
            <MissionVision />
            <Footer />
        </div>
    )
}
