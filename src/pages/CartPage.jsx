import{ useContext,useState } from "react";
import { CartContext } from "./../context/cart.context";
// import CartProduct from "./CartProduct"; // Import your CartProduct component

function CartPage() {
   const { cart,setCart ,addProduct, deleteProduct} = useContext(CartContext);
let groupedCart = cart.reduce((acc, current) => {
  const existingItem = acc.find(item => deepEqual(item.product, current.product[0]));

  if (existingItem) {
    existingItem.times += 1;
  } else {
    acc.push({ product: current.product[0], times: 1 });
  }

  return acc;
}, []);


function deepEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }

  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}
function decrement(id){
  deleteProduct(id)
}
function increment(id){
  addProduct(id)
}
  return (
    <div className="cartImage">
      <h2>Cart Page</h2>
       {groupedCart.map(item=>{
        return(
          <div className="prod-detail" key={item.id}>
            <h5>{item.product.title}</h5>
            <img src={item.product.img} />
            <div className="count">
            <button onClick={()=>{decrement(item.product._id)}}>-</button>
            <p className="count-number">{item.times}</p>
            <button onClick={()=>{increment(item.product._id)}}>+</button>
        </div>
        </div>
        )
       })
       }
    </div>
  );
}

export default CartPage;
