import { useState, useEffect } from "react";
import axios from "axios";
import EditProduct from "./EditProduct";

function ViewProductAdmin({ setShowList, category, setView, view }) {
  const [products, setProducts] = useState([]);
  const [editView, setEditview] = useState(null);
  const [idToUpdate, setIdToUpdate] = useState(null);
  useEffect(() => {
    // Fetch products based on the provided category (e.g., men, women, boys, girls)
    axios
      .get(`http://localhost:5005/products/${category}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [category]);

  function handleUpdate(id) {
    console.log(`Update product with id: ${id}`);
    setEditview(true);
    setIdToUpdate(id);
    setView(null)
  }

  function handleDelete(id) {
    axios
      .delete(`http://localhost:5005/products/delete/${id}`)
      .then((response) => {
        // setProducts(response.data);
        setView(category);
        window.location.reload();
        console.log("product deleted");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <div className="container">
        <div className="back-button">
          {  view !=='create product' && <button
            onClick={() => {
              setView(null);
              setShowList(true);
            }}
          >
            Back
          </button>}
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
      { editView && (
          <EditProduct
            setView={setView}
            setEditview={setEditview}
            category={category}
            idToUpdate={idToUpdate}
          />
        )}
    </div>
  );
}
export default ViewProductAdmin;
