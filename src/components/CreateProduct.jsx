import React, { useState } from "react";

function EditProduct({ product, onCreate, onCancel }) {
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleCreate = () => {
    onCreate(editedProduct);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <form>
      <div>
        <label htmlFor="img">Image URL:</label>
        <input
          type="text"
          id="img"
          name="img"
          value={editedProduct.img}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={editedProduct.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="desc">Description:</label>
        <textarea
          id="desc"
          name="desc"
          value={editedProduct.desc}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="categories">Category:</label>
        <input
          type="text"
          id="categories"
          name="categories"
          value={editedProduct.categories}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="availability">Availability:</label>
        <input
          type="text"
          id="availability"
          name="availability"
          value={editedProduct.availability}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="text"
          id="price"
          name="price"
          value={editedProduct.price}
          onChange={handleInputChange}
        />
      </div>

      {/* Add other editable fields as needed */}
      <button type="button" onClick={handleSave}>
        Create
      </button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
}

export default EditProduct;
