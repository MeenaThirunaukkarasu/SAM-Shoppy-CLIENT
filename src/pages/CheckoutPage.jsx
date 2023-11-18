import React, { useContext } from "react";
import { CartContext } from "./../context/cart.context";

function CheckoutPage() {
  const { cart } = useContext(CartContext);

  return (
    <div>
      <h2>Checkout Page</h2>
      {/* Render checkout form or other checkout-related elements */}
      <p>Total Items in Cart: {cart.length}</p>
      {/* Add other checkout-related information */}
    </div>
  );
}

export default CheckoutPage;
