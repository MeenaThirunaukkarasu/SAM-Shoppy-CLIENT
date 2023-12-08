import { useState, useEffect } from "react";
import axios from "axios";

function EditProduct({ idToUpdate, category, setView,setEditview }) {
  const [productToUpdate, setProductToUpdate] = useState(null);

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
          />
        </div>
        <div>
          <label htmlFor="desc">Description:</label>
          <textarea
            id="desc"
            name="desc"
            // value={editedProduct.desc || ""}
          />
        </div>
        <div>
          <label htmlFor="categories">Category:</label>
          <input
            type="text"
            id="categories"
            name="categories"
            // value={editedProduct.categories || ""}
          />
        </div>
        <div>
          <label htmlFor="availability">Availability:</label>
          <input
            type="text"
            id="availability"
            name="availability"
            // value={editedProduct.availability || ""}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            // value={editedProduct.price || ""}
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
            required
          />
        </div>

        {/* Add other editable fields as needed */}
        <button type="button" >
          Save
        </button>
        <button type="button" >
          Cancel
        </button>
      </form>
    </div>
  );
}
export default EditProduct;


