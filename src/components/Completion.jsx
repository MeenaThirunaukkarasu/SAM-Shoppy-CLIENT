import { PaymentContext } from "../context/payment.context";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CartContext } from "../context/cart.context";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

function Completion() {
  const { selectedAddress, refreshAddr } = useContext(PaymentContext);
  console.log("selectedAddress", selectedAddress);
  const [redirectStatus, setRedirectStatus] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState();
  const [overallTotal, setOverallTotal] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const { search } = useLocation();

  const { refreshCart } = useContext(CartContext);

  useEffect(() => {
    refreshCart();
    const params = new URLSearchParams(search);
    const paymentStatus = params.get("redirect_status");
    setRedirectStatus(paymentStatus);
    const selectedAddr = refreshAddr();
    setDeliveryAddress(selectedAddr);
    const storedOverallTotal = localStorage.getItem("overallTotal");
    setOverallTotal(storedOverallTotal ? parseFloat(storedOverallTotal) : null);
  }, []);

  useEffect(() => {
    // Order creation
    if (redirectStatus === "succeeded") {
      const storedCartObject = localStorage.getItem("cart");
      const cart = JSON.parse(storedCartObject);

      const storedUserObject = localStorage.getItem("user");
      const user = JSON.parse(storedUserObject);

      console.log("creating order");
      console.log("cart", cart);
      console.log("user", user);
      console.log("overallTotal", overallTotal);
      console.log("deliveryAddress", deliveryAddress);
      axios
        .post(`http://localhost:5005/order/create`, {
          cart,
          user,
          overallTotal,
          deliveryAddress,
        })
        .then((response) => {
          console.log(response.data);
          setOrderId(response.data._id);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [redirectStatus]);
  

  console.log("deliveryAddress", deliveryAddress);
  return (
    <div>
      {/* <ul className="bought-items">
        {cart &&
          cart.cartDetails &&
          cart.cartDetails.map((item) => (
            <li key={item.product._id}>{item.product.title}</li>
          ))}
      </ul> */}

      {redirectStatus === "succeeded" ? (
        <div>
          <h1>Thank you for the payment! 🎉</h1>
          <p>
            Your order is been placed . OrderId for reference : {orderId} 🎉
          </p>
          <button type="submit">View Orders</button>
        </div>
      ) : (
        <h1>There was a problem with your payment.</h1>
      )}
    </div>
  );
}

export default Completion;
