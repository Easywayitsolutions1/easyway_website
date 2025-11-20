import React from 'react'
import Header from '../../Common Components/Header'
import AboutSection from './WhyChooseUs'
import AboutUs from './AboutUs'
import Slider from './Slider'
import WhyChooseUs from './WhyChooseUs'
import Services from './Services'
import Projects from './Projects'
import OurClients from './OurClients'
import Footer from '../../Common Components/Footer'
import { SmoothScrollHero } from './SmoothScrollHero'

export default function Home() {
    return (
        <div className='bg-white'>
            <Header />
            {/* <Testing /> */}
            <SmoothScrollHero />
            {/* <Slider /> */}
            <AboutUs />
            <Services />
            <WhyChooseUs />
            <Projects />
            {/* <OurClients /> */}
            <Footer />
        </div>
    )
}