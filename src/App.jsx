import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Components/Home/Home'
import { useEffect } from 'react'
import LandingPage from './LandingPage'
import CustomCursor from './Common Components/CustomCursor'
import BackgroundLayer from './Common Components/BackgroundLayer'
import AboutUs from './Components/About Us/AboutUs'

function App() {


  return (
    <>
      {/* <CustomCursor /> */}
      {/* <BackgroundLayer /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          {/* <Route path="/" element={<LandingPage />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
