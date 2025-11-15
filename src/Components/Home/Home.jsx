import React from 'react'
import Header from '../../Common Components/Header'
import AboutSection from './AboutSection'
import About2 from './About2'
import Slider2 from './Slider2'
import Services from './Services'

export default function Home() {
    return (
        <div className='bg-white'>
            <Header />
            {/* <Testing /> */}
            {/* <Slider /> */}
            <Slider2 />
            <About2 />
            <Services />
            <AboutSection />
        </div>
    )
}