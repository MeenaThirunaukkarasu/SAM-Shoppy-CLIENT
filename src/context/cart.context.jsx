import React, { useState, useEffect } from "react";
import axios from "axios";

const CartContext = React.createContext();

function CartProviderWrapper(props) {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5005/cart").then((cart) => {
      setCart(cart.data);
    });
  }, []);
  // Add a function to add a product to the cart
  const addProduct = (productId) => {
    console.log(productId);
    // // Create a copy of the current cart state
    axios
      .post("http://localhost:5005/cart/add", { productId })
      .then((addedProducts) => {
        console.log(addedProducts);
        window.location.reload();
      })
      .catch((error) => {
        console.log("error", error);
      });
    // // Check if the product is already in the cart
    // const existingProduct = newCart.find((item) => item.id === product.id);

    // if (existingProduct) {
    //   // If the product is already in the cart, update its quantity
    //   existingProduct.quantity += 1;
    // } else {
    //   // If the product is not in the cart, add it with a quantity of 1
    //   newCart.push({ ...product, quantity: 1 });
    // }

    // // Update the cart state with the new cart
  };
  // delete a function to delete a product to the cart
  const deleteProduct = (productId) => {
    console.log(productId);
    // // Create a copy of the current cart state
    axios
      .delete(`http://localhost:5005/cart/delete/${productId}`)
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
        addProduct, // Include the addProduct function in the context
        deleteProduct, // Include the deleteProduct function in the context
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

export { CartProviderWrapper, CartContext };
