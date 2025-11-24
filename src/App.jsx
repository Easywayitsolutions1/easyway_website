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
import Projects from './Components/Projects/Projects'
import ScrollToTop from './Common Components/ScrollToTop'
import { ScrollThemeProvider } from './Common Components/ScrollContext'

function App() {
  return (
    <>
      <ScrollThemeProvider>
        <ClickSpark
          sparkColor='#120f0f'
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
          <BackgroundLayer />
          <BrowserRouter>

            {/* Scroll To Top - Sabhi pages pe visible */}
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/aboutUs" element={<AboutUs />} />
              <Route path="/comingSoon" element={<ComingSoon />} />
              <Route path="/service" element={<Services />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contactUs" element={<ContactUs />} />
            </Routes>
          </BrowserRouter>

        </ClickSpark>
      </ScrollThemeProvider>
    </>
  )
}

export default App