import React, { useContext } from "react";
import { CartContext } from "./../context/cart.context";
// import CartProduct from "./CartProduct"; // Import your CartProduct component

function CartPage() {
  // const { cart } = useContext(CartContext);

  return (
    <div>
      <h2>Cart Page</h2>
      {/* {cart.map((product) => (
        <CartProduct key={product.id} product={product} />
      ))} */}
    </div>
  );
}

export default CartPage;
