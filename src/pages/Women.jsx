import axios from "axios";
import { useEffect, useState } from "react";

function Women() {
  const [AllProduct, setAllProduct] = useState([]);
  const [wowomenProduct, setWowomenProduct] = useState([]);

  useEffect(() => {
    console.log("women product page");
    axios
      .get("https://portfolio-eshop-api.onrender.com/api/products")
      .then((response) => {
        setAllProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
  const filteredProduct=AllProduct.filter(product=>{
    console.log(product.categories)
   return product.categories[0]==="women"
  })
  setWowomenProduct(filteredProduct)
}, [AllProduct]);

  return (
    <div>
      {wowomenProduct.map((womenProduct) => {
        return (
          <div className="card-content" key={womenProduct._id}>
            <div className="card" style={{ width: "18rem" }}>
              <img
                className="card-img-top product-img"
                src={womenProduct.img}
                alt="Card image cap"
              />
              <div className="card-body">
                <h5 className="card-title">{womenProduct.title}</h5>
                <p className="card-text">{womenProduct.desc}</p>
                <p>Category: {womenProduct.categories[0]}, {womenProduct.categories[1]}, {womenProduct.categories[2]}</p> 
                 
            
                <p className="card-text">
                  Available Size: {womenProduct.size[0]},{womenProduct.size[1]},{womenProduct.size[2]}
                </p>
                <p className="card-text">
                  Color: {womenProduct.color}
                </p>
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
