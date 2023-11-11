import axios from "axios";
import { useEffect, useState } from "react";

function Men() {
  const [AllProduct, setAllProduct] = useState([]);
  const [menProduct, setMenProduct] = useState([]);
  useEffect(() => {
    console.log("men product page")
    axios
      .get("https://portfolio-eshop-api.onrender.com/api/products")
      .then((response) => {
        setAllProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);
  
useEffect(() => {
    const filteredProduct = AllProduct.filter(product => {
        console.log(product.categories)
        return product.categories[0]==="men"
    })
    setMenProduct(filteredProduct)
}, [AllProduct])

  return (
    <div>
      {menProduct.map((menProduct) => {
        return (
          <div className= "card-content" key={menProduct._id}>
            <div className="card" style={{width: "18re"}}>
              <img className="card-img-top product-img" src={menProduct.img} alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">{menProduct.title}</h5>
                <p className="card-text">
                  {menProduct.desc}
                </p>
                <p className="card-text">
                <p>Category: {menProduct.categories[0]}, {menProduct.categories[1]}, {menProduct.categories[2]}</p> 
                 
                </p>
                <p className="card-text">
                  Available Size: {menProduct.size[0]},{menProduct.size[1]},{menProduct.size[2]}
                </p>
                <p className="card-text">
                  Color: {menProduct.color}
                </p>
                <p className="card-text">
                  Price: ${menProduct.price}
                </p>
                
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Men;
