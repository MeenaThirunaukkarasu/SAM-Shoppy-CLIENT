import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateProduct({ setView }) {
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState();
const navigate=useNavigate()
  const handlecategoriesChange = (e) => {
    const categories = e.target.value;
    setCategory(categories);
  };

  const handleCancel = () => {
    // setView(null);
    navigate(-1)
  };
  const handleSave = (e) => {
    e.preventDefault();
    const productData = {
      title: e.target.title.value,
      desc: e.target.desc.value,
      img: e.target.img.value,
      availability: e.target.availability.value,
      inStock: e.target.availability.value > 0 ? true : false,
      categories: e.target.categories.value,
      price: e.target.price.value,
      size:[]
    };
    console.log(productData);
    if(productData.categories==='women' || productData.categories=== 'men'){
      productData.size=[
        "S", "M", "L"
      ]
    }
    else if(productData.categories==='boys' || productData.categories=== 'girls'){
      productData.size=[
        "3 - 4",
        "4 - 5",
        "5 - 6",
        "6 - 7",
        "7 - 8",
        "8 - 9",
        "9 - 10",
        "10 - 11",
        "11 - 12",
        "12 - 13",
        "13 - 14",
      ]
    }

    axios
      .post('http://localhost:5005/products/add', productData)
      .then((response) => {
        console.log(response.data);
        navigate(-1)
      })
      .catch((err) => {
        console.error(err);
      });
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
          // onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          // value={editedProduct.title}
          // onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="desc">Description:</label>
        <textarea
          id="desc"
          name="desc"
          // value={editedProduct.desc}
          // onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="categories">Category:</label>
        {/* <input
          type="text"
          id="categories"
          name="categories"
          // value={editedProduct.categories}
          onChange={handlecategoriesChange}
        /> */}
        <select name='categories'>
          <option>boys</option>
          <option>girls</option>
          <option>men</option>
          <option>women</option>
        </select>
      </div>
      <div>
        <label htmlFor="availability">Availability:</label>
        <input
          type="text"
          id="availability"
          name="availability"
          // value={editedProduct.availability}
          // onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="text"
          id="price"
          name="price"
          // value={editedProduct.price}
          // onChange={handleInputChange}
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
