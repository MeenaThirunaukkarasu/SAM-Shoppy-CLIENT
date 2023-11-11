import { useState } from 'react'
import './App.css'
import SignUpPage from './pages/SignUpPage'
import { Routes,Route } from 'react-router-dom'
import  NavBar from './components/NavBar'
import LoginPage from './pages/LoginPage'
import Menu from './components/Menu'
import HomePage from './pages/HomePage'
import IsPrivate from './components/IsPrivate'
import IsAnon from './components/IsAnon'
import Men from './pages/Men'
import Women from './pages/Women'
import Kids from './pages/Kids'

function App() {

  return (
    <div>
    <NavBar />
    <Menu />
    
    <Routes>
      <Route path="/" element={ <HomePage />} />
      <Route path="/signup" element={<IsAnon><SignUpPage /></IsAnon>} />
      <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>} />
      <Route path="/men" element={<Men />} />
      <Route path="/women" element={ <Women /> } />
      <Route path="/kids" element={ <Kids /> } />
    </Routes>
    
   
    
    </div>
  )
}

export default App
