import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Men() {
  const location = useLocation();
  const [menProduct, setMenProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const category = location.state?.category;
    axios
      .get(`${import.meta.env.VITE_BASE_URL_API}/products/${category}`)
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
    
    <section className="container text-center Men">
      <div className="row row-cols-4">
        {menProduct.map((menProduct) => {
          return (
            <>
          <div className="col d-flex">
            
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
         
          </div>
          </>
          )}
        )}
      </div>
      </section>
  )
}

export default Men;
      {/* <div className="row">
    <div className="col-8">col-8</div>
    <div className="col-4">col-4</div>
  </div> */}

      {/* <div className="container">
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
      </div> */}
   

