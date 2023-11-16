import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Men() {
  const [menProduct, setMenProduct] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // console.log("men product page");
    axios
      .get("http://localhost:5005/products/men")
      .then((response) => {
        setMenProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  function singleProduct(id) {
    navigate(`/product/${id}`);
  }


  return (
    <div className="container">
      <div className="card-content">
        {menProduct.map((menProduct) => {
          return (
            <div
              className="card"
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
  );

//   return (
//     <div>
//       {menProduct.map((menProduct) => {
//         return (
//           <div
//             className="card-content"
//             key={menProduct._id}
//             onClick={() => {
//               singleProduct(menProduct._id);
//             }}
//           >
//             <div className="card" style={{ width: "18rem" }}>
//               <img
//                 className="card-img-top product-img"
//                 src={menProduct.img}
//                 alt="Card image cap"
//               />
//               <div className="card-body">
//                 <h5 className="card-title">{menProduct.title}</h5>
               
//                 <p className="card-text">Price: ${menProduct.price}</p>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
}

export default Men;
