import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Kids() {
  const [kidsProduct, setKidsProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    //console.log("kids product page");
    axios
      .get("http://localhost:5005/products/kids/girls")
      .then((response) => {
        setKidsProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  function singleProduct(id) {
    navigate(`/product/${id}`);
  }


  return (
    <div>
    <div className="back-button">
    <button onClick={() => navigate(-1)}>Back</button>
    </div> 
      {kidsProduct.map((kidsProduct) => {
        return (
          <div className="card-content" key={kidsProduct._id} onClick={() => {
              singleProduct(kidsProduct._id);
            }}>
            <div className="card" style={{ width: "18rem" }}>
              <img
                className="card-img-top product-img"
                
                src={kidsProduct.img}
                alt="Card image cap"
              />
              <div className="card-body">
                <h5 className="card-title">{kidsProduct.title}</h5>
                
                <p className="card-text">Price: ${kidsProduct.price}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Kids;
