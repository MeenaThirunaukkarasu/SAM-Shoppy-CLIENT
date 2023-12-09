import React, { useState, useEffect ,useContext} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./auth.context";

const CartContext = React.createContext();

function CartProviderWrapper(props) {
  const navigate = useNavigate();
  const { user} = useContext(AuthContext);

  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const refreshCart =  async () => {
    const storedToken = localStorage.getItem("authToken");
   axios
    .get(`${import.meta.env.VITE_BASE_URL_API}/cart`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then((response) => {
      setCart(response.data);
      setIsLoading(false);
      localStorage.setItem("cart",JSON.stringify(response.data))
      return response.data;
    });
  };

  useEffect(() => {
   refreshCart();
  }, []);

  // Add a function to add a product to the cart
  const addProduct = (productId,size) => {
    const storedToken = localStorage.getItem("authToken");
    // // Create a copy of the current cart state
    if (!storedToken) {
      navigate("/login");
      return;
    }
    const cartDetails={
      product:productId,
      user:user._id,
      size:size
    }
    
    axios
      .post(
        `${import.meta.env.VITE_BASE_URL_API}/cart/add`,
        {cartDetails},
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((addedProducts) => {
        
        window.location.reload();
      })
      .catch((error) => {
       
      });
  };
  // delete a function to delete a product to the cart
  const deleteOne = (productId,size) => {
    
    setCart((prevCart) =>
      prevCart.filter((item) => item.product._id !== productId)
    );
    // // Create a copy of the current cart state
    const storedToken = localStorage.getItem("authToken");
    if (!storedToken) {
      navigate("/login");
      return;
    }
    axios.delete(`${import.meta.env.VITE_BASE_URL_API}/cart/delete/${productId}?size=${size}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    // rest of the code...
          .then((deletedProducts) => {
        
        window.location.reload();
      })
      .catch((error) => {
      
      });
  };
  const deleteProduct = (productId,size) => {
   
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
      .delete(`${import.meta.env.VITE_BASE_URL_API}/cart/deleteProduct/${productId}?size=${size}`, {
        headers: { Authorization: `Bearer ${storedToken}` }, data: { size: size },
      })
      .then((deletedProducts) => {
      
        window.location.reload();
      })
      .catch((error) => {
       
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
