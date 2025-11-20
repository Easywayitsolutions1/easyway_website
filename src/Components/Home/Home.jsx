import React from 'react'
import AboutUs from './AboutUs'
import WhyChooseUs from './WhyChooseUs'
import Services from './Services'
import Projects from './Projects'
import OurClients from './OurClients'
import Footer from '../../Common Components/Footer'
import Whatsapp from '../../Common Components/Whatsapp'
import { SmoothScrollHero } from './SmoothScrollHero'

export default function Home() {
    return (
        <div className='bg-white'>
            <Whatsapp />
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