import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context";
import { CartProviderWrapper } from "./context/cart.context";
import { PaymentProvider } from "./context/payment.context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <PaymentProvider>
        <AuthProviderWrapper>
          <CartProviderWrapper>
            <App />
          </CartProviderWrapper>
        </AuthProviderWrapper>
      </PaymentProvider>
    </BrowserRouter>
  </React.StrictMode>
);
