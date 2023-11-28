import React, { useContext, useState, useEffect } from "react";
import AddrList from "../components/AddrList";
import { CartContext } from "./../context/cart.context";
import NewPayment from "../components/Payment";

function CheckoutPage() {
  const { cart } = useContext(CartContext);
  const [groupedCart, setGroupedCart] = useState([]);
  const [addrList, setAddrList] = useState(false);
  const [totalCartItems, setTotalCartItems] = useState(0);
  useEffect(() => {
    if (cart) {
      // If you want to use groupedCart, set its value here
      setGroupedCart(cart.cartDetails || []);
    }

    let totalItems = 0;
    if (cart?.cartDetails) {
      cart.cartDetails.forEach((cartDetail) => {
        totalItems += cartDetail.quantity;
      });
    }
    setTotalCartItems(totalItems);
  }, [cart]);
  return (
    <div>
      <h2>Checkout Page</h2>
      {/* Render checkout form or other checkout-related elements */}
      <p>Total Items in Cart: {totalCartItems}</p>
      <button onClick={()=>{setAddrList(true)}}>Select Address</button>
      {/* Add other checkout-related information */}

      {addrList && <AddrList />}
      <NewPayment />
      
    </div>
  );
}

export default CheckoutPage;
