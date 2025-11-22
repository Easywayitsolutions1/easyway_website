import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Components/Home/Home'
import { useEffect } from 'react'
import BackgroundLayer from './Common Components/BackgroundLayer'
import AboutUs from './Components/About Us/AboutUs'
import ClickSpark from './Common Components/ClickSpark'
import ComingSoon from './Common Components/CommingSoon'
import { Services } from './Components/Services/Service'
import ContactUs from './Components/Contact Us/ContactUs'

function App() {


  return (
    <>
      <ClickSpark
        sparkColor='#120f0f'
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        {/* Your content here */}

        {/* <CustomCursor /> */}
        <BackgroundLayer />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/aboutUs" element={<AboutUs />} /> */}
            <Route path="/comingSoon" element={<ComingSoon />} />
            <Route path="/service" element={<Services />} />
            <Route path="/contactUs" element={<ContactUs />} />
            {/* <Route path="/" element={<LandingPage />} /> */}
          </Routes>
        </BrowserRouter>
      </ClickSpark>
    </>
  )
}

export default App
