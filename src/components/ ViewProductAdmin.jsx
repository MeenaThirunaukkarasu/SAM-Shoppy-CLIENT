import { useState, useEffect } from "react";
import axios from "axios";
import EditProduct from "./EditProduct";
import { Link } from "react-router-dom";

function ViewProductAdmin({ setShowList, category, setView, view }) {
  const [products, setProducts] = useState([]);
  const [editView, setEditview] = useState(null);
  const [idToUpdate, setIdToUpdate] = useState(null);
  ('category',category)
  useEffect(() => {
    // Fetch products based on the provided category (e.g., men, women, boys, girls)
    axios
      .get(`${import.meta.env.VITE_BASE_URL_API}/products`)
      .then((response) => {
        const filteredData=response.data.filter(data=>{
          return data.categories===category
        })
        ('filteredData',filteredData)

        setProducts(filteredData);
      })
      .catch((error) => {
        (error);
      });
  }, [category]);

  function handleUpdate(id) {
    (`Update product with id: ${id}`);

    setEditview(true);
    setIdToUpdate(id);
    setView(null)
  }

  function handleDelete(id) {
    axios
      .delete(`${import.meta.env.VITE_BASE_URL_API}/products/delete/${id}`)
      .then((response) => {
        // setProducts(response.data);
        setView(category);
        window.location.reload();
        ("product deleted");
      })
      .catch((error) => {
        (error);
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
                <button >
                <Link to='/updateProduct' state={{product}}>

                  Update
                </Link>
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
