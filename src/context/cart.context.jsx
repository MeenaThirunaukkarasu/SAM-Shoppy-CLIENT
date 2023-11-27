import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartContext = React.createContext();

function CartProviderWrapper(props) {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const refreshCart = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get("http://localhost:5005/cart", {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("***");
        console.log(response.data);
        setCart(response.data.product);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    refreshCart();
  }, []);

  // Add a function to add a product to the cart
  const addProduct = (productId) => {
    const storedToken = localStorage.getItem("authToken");
    // // Create a copy of the current cart state
    if (!storedToken) {
      navigate("/login");
      return;
    }
    axios
      .post(
        "http://localhost:5005/cart/add",
        { productId },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((addedProducts) => {
        console.log(addedProducts);
        window.location.reload();
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  // delete a function to delete a product to the cart
  const deleteOne = (productId) => {
    console.log(productId);
    setCart((prevCart) =>
      prevCart.filter((item) => item.product._id !== productId)
    );
    // // Create a copy of the current cart state
    const storedToken = localStorage.getItem("authToken");
    if (!storedToken) {
      navigate("/login");
      return;
    }
    axios
      .delete(`http://localhost:5005/cart/delete/${productId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((deletedProducts) => {
        console.log(deletedProducts);
        window.location.reload();
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const deleteProduct = (productId) => {
    console.log(productId);
    setCart((prevCart) =>
      prevCart.filter((item) => item.product._id !== productId)
    );
    // // Create a copy of the current cart state
    const storedToken = localStorage.getItem("authToken");
    if (!storedToken) {
      navigate("/login");
      return;
    }
    axios
      .delete(`http://localhost:5005/cart/deleteProduct/${productId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((deletedProducts) => {
        console.log(deletedProducts);
        window.location.reload();
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        refreshCart,
        addProduct, // Include the addProduct function in the context
        deleteProduct, // Include the deleteProduct function in the context
        isLoading,
        deleteOne
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

export { CartProviderWrapper, CartContext };
