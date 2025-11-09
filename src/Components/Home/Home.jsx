import React from 'react'
import Header from '../../Common Components/Header'
import Slider from './Slider'
import GraphicUIUXHero from './GraphicUIUXHero'
import VideoEditingHero from './VideoEditingHero'
import AboutSection from './AboutSection'
import Testing from '../../Common Components/Testing'
import About2 from './About2'
import Slider2 from './Slider2'

export default function Home() {
    return (
        <div className='bg-white'>
            <Header />
            {/* <Testing /> */}
            {/* <Slider /> */}
            <Slider2 />
            <About2 />
            <AboutSection />
            {/* <GraphicUIUXHero /> */}
            {/* <VideoEditingHero /> */}
        </div>
    )
}