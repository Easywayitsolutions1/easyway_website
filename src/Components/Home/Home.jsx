import React from 'react'
import Header from './Header'
import Slider from './Slider'
import GraphicUIUXHero from './GraphicUIUXHero'
import VideoEditingHero from './VideoEditingHero'

export default function Home() {
    return (
        <div className='bg-[#101c27]'>
            <Header />
            <Slider />   
            {/* <GraphicUIUXHero /> */}
            {/* <VideoEditingHero /> */}
        </div>
    )
}