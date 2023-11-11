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

function App() {

  return (
    <div>
    <NavBar />
    <Menu />
    
    <Routes>
      <Route path="/" element={ <IsAnon><HomePage /> </IsAnon>} />
      <Route path="/signup" element={<IsAnon><SignUpPage /></IsAnon>} />
      <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>} />
    </Routes>
    
    
    
    </div>
  )
}

export default App
