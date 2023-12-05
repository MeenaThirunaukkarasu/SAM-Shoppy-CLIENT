import React, { useContext, useState, useEffect } from "react";
import AddrList from "../components/AddrList";
import { CartContext } from "./../context/cart.context";
import Payment from "../components/Payment";

function CheckoutPage() {
  const { cart } = useContext(CartContext);
  const [groupedCart, setGroupedCart] = useState([]);
  const [addrList, setAddrList] = useState(false);
  const [totalCartItems, setTotalCartItems] = useState(0);
  const [paymentView,setPaymentView]=useState(false)
  const  [pay,setPay] =useState(false)
  const [selectedAddr, setSelectedAddr] = useState(null);

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
    <div className="container ">
    <div className="row d-flex col-11  justify-content-center align-items-start my-4">
    <h3 className="mb-3 text-green " >Checkout Page</h3>
      {/* Render checkout form or other checkout-related elements */}
      <div className="card mb-4 col-7 py-3 border-light-green text-blue">

      <p  className="text-blue mb-5 fw-semibold">Total Items in Cart: {totalCartItems}</p>
      <div className="d-flex justify-content-around">
      <button className="btn bg-base-orange  text-white " onClick={()=>{setAddrList(true); setPay(true)} }>Select Address</button>
      {/* Add other checkout-related information */}


      </div>
      <div className="mt-4">
      {addrList && <AddrList pay={pay} setPay={setPay} setSelectedAddr={setSelectedAddr} selectedAddr={selectedAddr}/>}
      <button className="btn bg-base-orange  text-white " onClick={()=>{setPaymentView(true)}}>Pay</button>

</div>
     {paymentView && <Payment selectedAddr={selectedAddr}/>}

      </div>
    </div>
    </div>
  );
}

export default CheckoutPage;
