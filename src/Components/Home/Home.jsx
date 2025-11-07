import React from 'react'
import Header from './Header'
import Slider from './Slider'
import GraphicUIUXHero from './GraphicUIUXHero'
import VideoEditingHero from './VideoEditingHero'
import AboutSection from './AboutSection'
import Testing from '../../Common Components/Testing'

export default function Home() {
    return (
        <div className='bg-[#101c27]'>
            <Header />
            {/* <Testing /> */}
            <Slider />
            <AboutSection />
            {/* <GraphicUIUXHero /> */}
            {/* <VideoEditingHero /> */}
        </div>
    )
}