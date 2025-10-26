import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Components/Home/Home'
import { useEffect } from 'react'
import LandingPage from './LandingPage'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={<LandingPage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
