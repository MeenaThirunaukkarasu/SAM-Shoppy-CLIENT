import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProviderWrapper } from "./context/auth.context";
import { CartProviderWrapper } from "./context/cart.context";
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
    <AuthProviderWrapper>
      <CartProviderWrapper>
            <App />
      </CartProviderWrapper>
    </AuthProviderWrapper>
  </BrowserRouter>
  </React.StrictMode>
)
