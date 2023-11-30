import React, { useState, useEffect } from "react";
import axios from "axios";

function EditProduct({ idToUpdate, category, setView }) {
  const [productToUpdate, setProductToUpdate] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5005/products/${idToUpdate}`)
      .then((response) => {
        setProductToUpdate(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleSave = () => {
    // onSave(productId, editedProduct);
  };

  const handleCancel = () => {
    // onCancel();
    setView(category)
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <form>
        <div>
          <label htmlFor="img">Image URL:</label>
          <input
            type="text"
            id="img"
            name="img"
            // value={editedProduct.img || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            // value={editedProduct.title || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="desc">Description:</label>
          <textarea
            id="desc"
            name="desc"
            // value={editedProduct.desc || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="categories">Category:</label>
          <input
            type="text"
            id="categories"
            name="categories"
            // value={editedProduct.categories || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="availability">Availability:</label>
          <input
            type="text"
            id="availability"
            name="availability"
            // value={editedProduct.availability || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            // value={editedProduct.price || ""}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            // value={editedProduct.stock || ""}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Add other editable fields as needed */}
        <button type="button" onClick={handleSave}>
          Save
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}
export default EditProduct;