import axios from "axios";
import React, { useState } from "react";

function CreateProduct({setView}) {
    const [product, setProduct] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };


  const handleCancel = () => {
setView(null)
  };
  const handleSave = (e) => {
    e.preventDefault();
    const productData = {
      title: e.target.title.value,
      desc: e.target.desc.value,
      img: e.target.img.value,
      availability: e.target.availability.value,
      // inStock: e.target.inStock.value,
      categories: e.target.categories.value,
      // size: e.target.size.value,
      price: e.target.price.value,
    };
    console.log(productData)

    axios.post(`http://localhost:5005/products/add`, productData)
      .then(response => {
        console.log(response.data)
        setView(null);

      })
      .catch(err => {
        console.error(err)
      })

  };



  return (
    <form onSubmit={handleSave}>
      <div>
        <label htmlFor="img">Image URL:</label>
        <input
          type="text"
          id="img"
          name="img"
          // value={editedProduct.img}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          // value={editedProduct.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="desc">Description:</label>
        <textarea
          id="desc"
          name="desc"
          // value={editedProduct.desc}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="categories">Category:</label>
        <input
          type="text"
          id="categories"
          name="categories"
          // value={editedProduct.categories}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="availability">Availability:</label>
        <input
          type="text"
          id="availability"
          name="availability"
          // value={editedProduct.availability}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="text"
          id="price"
          name="price"
          // value={editedProduct.price}
          onChange={handleInputChange}
        />
      </div>

      {/* Add other editable fields as needed */}
      <button type="submit">Create</button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
}
export default CreateProduct;