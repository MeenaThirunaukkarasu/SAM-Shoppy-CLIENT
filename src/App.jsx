import { useState } from 'react'
import './App.css'
import SignUpPage from './pages/SignUpPage'
import { Routes,Route } from 'react-router-dom'
import  NavBar from './components/NavBar'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import IsPrivate from './components/IsPrivate'
import IsAnon from './components/IsAnon'
import Men from './pages/Men'
import SingleProductPage from './pages/SingleProductPage'
import CartPage from './pages/CartPage'
import AdminPage from './pages/AdminPage'
import ViewProductAdmin from './components/ ViewProductAdmin'
import IsAdmin from './components/IsAdmin';


function App() {

  return (
    <div>
    <NavBar />
    
 
    
    <Routes>
      <Route path="/" element={ <HomePage />} />
      <Route path="/signup" element={<IsAnon><SignUpPage /></IsAnon>} />
      <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>} />
      <Route path="/products" element={<Men />} />
      <Route path="/product/:id" element={ <SingleProductPage /> } />
      <Route path="/cart" element={ <CartPage /> } />
      {/* <Route path="/category" element={ <ViewProductAdmin /> } /> */}
      <Route path="/admin" element={<IsAdmin><AdminPage /></IsAdmin>} />

    </Routes>
    
   
    

    </div>
  )
}

export default App
