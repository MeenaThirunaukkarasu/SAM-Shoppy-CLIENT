import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";

function Men() {
  const location=useLocation()
  const [menProduct, setMenProduct] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const category=location.state?.category
    axios
      .get(`http://localhost:5005/products/${category}`)
      .then((response) => {
        setMenProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [location.state?.category]);
  function singleProduct(id) {
    navigate(`/product/${id}`);
  }


  return (
    <div>

    <div className="container">
       <div className="back-button">
    <button onClick={() => navigate(-1)}>Back</button>
    </div> 

      <div className="card-content">
        {menProduct.map((menProduct) => {
          return (
            <div
              className="card card-details"
              key={menProduct._id}
              onClick={() => {
                singleProduct(menProduct._id);
              }}
            >
              <img
                className="card-img-top product-img"
                src={menProduct.img}
                alt="Card image cap"
              />
              <div className="card-body">
                <h5 className="card-title">{menProduct.title}</h5>
                <p className="card-text">Price: ${menProduct.price}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );

}

export default Men;
