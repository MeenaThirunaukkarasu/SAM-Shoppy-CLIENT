import React, { useState, useEffect } from "react";


const CartContext = React.createContext();

function CartProviderWrapper(props) {
  const [cart, setCart] = useState([]);

  // Add a function to add a product to the cart
  const addProduct = (product) => {
    // Create a copy of the current cart state
    const newCart = [...cart];

    // Check if the product is already in the cart
    const existingProduct = newCart.find((item) => item.id === product.id);

    if (existingProduct) {
      // If the product is already in the cart, update its quantity
      existingProduct.quantity += 1;
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      newCart.push({ ...product, quantity: 1 });
    }

    // Update the cart state with the new cart
    setCart(newCart);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addProduct, // Include the addProduct function in the context
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

export { CartProviderWrapper, CartContext };
