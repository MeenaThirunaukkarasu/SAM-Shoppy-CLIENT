import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ViewProductAdmin({ men }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products based on the provided category (e.g., men, women, boys, girls)
    axios
      .get("http://localhost:5005/products/men")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [men]);

  function handleUpdate(id) {
    // Handle the update logic, navigate to the update page or display a modal, etc.
    // For now, let's log a message to the console.
    console.log(`Update product with id: ${id}`);
  }

  function handleDelete(id) {
    // Handle the delete logic, send a request to delete the product, etc.
    // For now, let's log a message to the console.
    console.log(`Delete product with id: ${id}`);
  }

  return (
    <div>
      <div className="container">
        <div className="back-button">
          <button onClick={() => navigate(-1)}>Back</button>
        </div>

        <div className="card-content">
          {products.map((product) => (
            <div className="card card-details" key={product._id}>
              <img
                className="card-img-top product-img"
                src={product.img}
                alt="Card image cap"
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">Price: ${product.price}</p>
                <button onClick={() => handleUpdate(product._id)}>
                  Update
                </button>
                <button onClick={() => handleDelete(product._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewProductAdmin;
