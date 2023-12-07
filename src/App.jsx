import { useState } from 'react'
import './App.css'
import SignUpPage from './pages/SignUpPage'
import { Routes,Route } from 'react-router-dom'
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
import NavBar from './components/NavBar'
/* src/index.css or src/index.scss */
import 'bootstrap-icons/font/bootstrap-icons.css';
import CheckoutPage from './pages/CheckoutPage'
import UserAccountPage from './pages/UserAccountPage'
import Payment from "./components/Payment";
import Completion from "./components/Completion";
import MyOrders from './pages/MyOrders'
import CreateProduct from './components/CreateProduct'
import CreateAdmin from './components/CreateAdmin'
import UpdateProduct from './components/UpdateProduct'
import ViewOrders from './components/ViewOrders'
import UpdateUserInfo from './components/UpdateUserInfo';
import Footer from './components/Footer';

function App() {

  return (
    <div>
    <NavBar />
    {/* <HomePage />  */}

    
     <div className='common-margin'>

   
    <Routes>
      {/* <Route path="/" element={ <HomePage />} /> */}
      <Route path="/signup" element={<IsAnon><SignUpPage /></IsAnon>} />
      <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>} />
      <Route path="/products" element={<Men />} />
      <Route path="/product/:id" element={ <SingleProductPage /> } />
      <Route path="/cart" element={ <IsPrivate><CartPage /></IsPrivate>  } />
      <Route path="/" element={ <HomePage /> } />
      <Route path="/account" element={ <IsPrivate><UserAccountPage /></IsPrivate> } />

      {/* <Route path="/category" element={ <ViewProductAdmin /> } /> */}
      <Route path="/admin" element={<IsAdmin><AdminPage /></IsAdmin>} />
      <Route path="/checkout" element={ <CheckoutPage /> } />
      {/* <Route path="/" element={<Payment />} /> */}
      <Route path="/completion" element={<Completion />} />
      <Route path="/checkout" element={<checkout />} />
      <Route path="/myorders" element={ <IsPrivate><MyOrders /></IsPrivate>} />
      <Route path="/createProduct" element={ <IsAdmin><CreateProduct /></IsAdmin>} />
      <Route path="/createAdminCredentials" element={ <IsAdmin><CreateAdmin /></IsAdmin>} />
      <Route path="/viewProduct" element={ <IsAdmin><ViewProductAdmin /></IsAdmin>} />
      <Route path="/updateProduct" element={ <IsAdmin><UpdateProduct /></IsAdmin>} />
      <Route path="/vieworders" element={ <IsAdmin><ViewOrders /></IsAdmin>} />
      <Route path="/updateInfo" element={ <IsPrivate><UpdateUserInfo /></IsPrivate>} />


    </Routes>

    </div>
   
    <Footer />

    </div>
  )
}

export default App
