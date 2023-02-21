import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { Route, Routes } from "react-router-dom"
function App() {


  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  )
}

export default App
