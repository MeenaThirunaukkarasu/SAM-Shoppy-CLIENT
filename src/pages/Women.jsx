import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Women() {
  const [womenProduct, setWomenProduct] = useState([]);
    const navigate=useNavigate()
  useEffect(() => {
    //console.log("women product page");
    axios
      .get("http://localhost:5005/products/women")
      .then((response) => {
        setWomenProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  function singleProduct(id){
    navigate(`/product/${id}`)
  }

  return (
    <div>
      {womenProduct.map((womenProduct) => {
        return (
          <div className="card-content" key={womenProduct._id} onClick={()=>{singleProduct(womenProduct._id)}}>
            <div className="card" style={{ width: "18rem" }}>
              <img
                className="card-img-top product-img"
                src={womenProduct.img}
                alt="Card image cap"
              />
              <div className="card-body">
                <h5 className="card-title">{womenProduct.title}</h5>
               
                <p className="card-text">
                  Price: ${womenProduct.price}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Women;
