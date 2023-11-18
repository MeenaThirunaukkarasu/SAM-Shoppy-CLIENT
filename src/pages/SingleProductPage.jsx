import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "./../context/cart.context";

function SingleProductPage() {
  const [singleProduct, setSingleProduct] = useState([]);
  const productId = useParams();
  // const { addProduct } = useContext(CartContext);
  const handleAddToCart = () => {
    // Call the addProduct function with the current product
    // addProduct(product);
  };
//   const availableSizes = singleProduct.size || [];
  useEffect(() => {
    axios
      .get(`http://localhost:5005/products/${productId.id}`)
      .then((response) => {
        setSingleProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="product-container" key={singleProduct._id}>
      <div className="product-image">
        <img
          className="card-img-top product-img"
          src={singleProduct.img}
          alt="Card image cap"
        />
      </div>
      <div className="product-details">
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">{singleProduct.title}</h5>
            <p className="card-text">{singleProduct.desc}</p>
            <p className="card-text">Category: {singleProduct.categories}</p>
            
          <label htmlFor="sizeSelect">Size:</label>
          <select id="sizeSelect" onChange={(e) => console.log(e.target.value)}>
            {singleProduct.size?.map((size, index) => (
              <option key={index} >
                {size}
              </option>
            ))}
          </select>

            <p className="card-text">Price: ${singleProduct.price}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>

          </div>
        </div>
      </div>
      {/* Add to Cart button */}
     
    </div>
  );

  //   return (
  //    <div
  //       className="card-content"
  //       key={singleProduct._id}>
  //       <div className="card" style={{ width: "18rem" }}>
  //         <img
  //           className="card-img-top product-img"
  //           src={singleProduct.img}
  //           alt="Card image cap"
  //         />
  //         <div className="card-body">
  //           <h5 className="card-title">{singleProduct.title}</h5>
  //           <p className="card-text">{singleProduct.desc}</p>
  //           <p className="card-text">Category: {singleProduct.categories}</p>

  //            {/* <p className="card-text">
  //                 Available Size: {singleProduct.size.map} */}
  //                 {/* {singleProduct.size[1]},
  //                 {singleProduct.size[2]} */}
  //               {/* </p>  */}
  //               <p>
  //               Size: {singleProduct.size?.map((size,index)=>{
  //                return(<p key={index}> {size} </p>)
  //               })}
  //               </p>
  //           <p className="card-text">Price: ${singleProduct.price}</p>
  //         </div>
  //       </div>
  //     </div>
  //   );
}
export default SingleProductPage;
