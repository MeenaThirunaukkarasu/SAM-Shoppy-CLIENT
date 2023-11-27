import { useEffect, useState,useContext } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import axios from "axios";
import { CartContext } from "./../context/cart.context";


function SingleProductPage() {
  const [singleProduct, setSingleProduct] = useState([]);
  const productId = useParams();
  const navigate = useNavigate();
  const { addProduct } =  useContext(CartContext)
  const defaultSize= singleProduct.size && singleProduct.size.length > 0 ? singleProduct.size[0] : '';
  const  [size,setSize]=useState()
  
useEffect(() => {
  setSize(defaultSize);
}, [defaultSize]);

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
    <div className="container text-center" key={singleProduct._id}>
    <div className="row row-cols-2">
      <div className="col" > 
         <div className="back-button d-flex">
    <button onClick={() => navigate(-1)}>Back</button>
    </div>

      <div className="product-image">
        <img
          className="card-img-top product-img"
          src={singleProduct.img}
          alt="Card image cap"
        />
      </div>  
       </div>
      <div className="col">
      <div className="product-details">
        <div className="card border-0" >
          <div className="card-body">
            <h5 className="card-title">{singleProduct.title}</h5>
            <p className="card-text">{singleProduct.desc}</p>
            <p className="card-text">Category: {singleProduct.categories}</p>
            
          <label htmlFor="sizeSelect">Size:</label>
          <select id="sizeSelect" name='size' onChange={(e)=>{setSize(e.target.value )}} value={size} >
            {
              singleProduct.size?.map((sizeOption, index) => (
              <option  key={index} value={sizeOption}>
                {sizeOption}
              </option>
            ))}
          </select>
            <p className="card-text">Price: ${singleProduct.price}</p>
            <p className="card-text">Availability: {singleProduct.availability}</p>
            {singleProduct.availability>0 ?<p className="card-text" style={{color: "green"}}> InStock</p>:<p className="card-text" style={{color:"red"}}> Out Of Stock</p>}
            {singleProduct.inStock ? <button onClick={()=>{addProduct(singleProduct._id,size)}}  >Add to Cart</button>: <></>}
         

          </div>
        </div>
      </div></div>
    </div>
  </div>

    
  );

}
export default SingleProductPage;
