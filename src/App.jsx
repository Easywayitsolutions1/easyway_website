import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import './App.css'
import BackgroundLayer from './Common Components/BackgroundLayer'
import ClickSpark from './Common Components/ClickSpark'
import ScrollToTop from './Common Components/ScrollToTop'
import { ScrollThemeProvider } from './Common Components/ScrollContext'

// Code splitting - lazy load routes for better performance
const Home = lazy(() => import('./Components/Home/Home'))
const AboutUs = lazy(() => import('./Components/About Us/AboutUs'))
const ComingSoon = lazy(() => import('./Common Components/CommingSoon'))
const Services = lazy(() => import('./Components/Services/Service').then(module => ({ default: module.Services })))
const ContactUs = lazy(() => import('./Components/Contact Us/ContactUs'))
const Projects = lazy(() => import('./Components/Projects/Projects'))

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-white">
    <div className="animate-pulse text-[#101c27]">Loading...</div>
  </div>
)

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
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/aboutUs" element={<AboutUs />} />
                <Route path="/comingSoon" element={<ComingSoon />} />
                <Route path="/service" element={<Services />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contactUs" element={<ContactUs />} />
              </Routes>
            </Suspense>
          </BrowserRouter>

        </ClickSpark>
      </ScrollThemeProvider>
    </>
  )
}

export default App