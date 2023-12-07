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
      .post(`${import.meta.env.VITE_BASE_URL_API}/products/add`, productData)
      .then((response) => {
        console.log(response.data);
        navigate(-1)
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="signup d-flex justify-content-center align-items-center row ">

    <form className="bg-base p-3 col-10 col-sm-6 col-md-6 col-lg-5 col-xl-5 col-xxl-4 rounded" onSubmit={handleSave}>
  <h2 className="mb-5">Create Your Product</h2>
  <div className="mb-3">
    <label htmlFor="img" className="d-flex text-left mb-1">Image</label>
    <input
      type="text"
      className="form-control"
      id="img"
      name="img"
      placeholder="Image"
      required
    />
  </div>
  <div className="mb-3">
    <label htmlFor="title" className="d-flex text-left mb-1">Title</label>
    <input
      type="text"
      className="form-control"
      id="title"
      name="title"
      placeholder="Title"
      required
    />
  </div>
  <div className="mb-3">
    <label htmlFor="desc" className="d-flex text-left mb-1">Description</label>
    <textarea
      className="form-control"
      id="desc"
      name="desc"
      placeholder="Description"
      required
    />
  </div>
  <div className="mb-3">
    <label htmlFor="categories" className="d-flex text-left mb-1">Category</label>
    <select className="form-select" name="categories">
      <option value="boys">Boys</option>
      <option value="girls">Girls</option>
      <option value="men">Men</option>
      <option value="women">Women</option>
    </select>
  </div>
  <div className="mb-3">
    <label htmlFor="availability" className="d-flex text-left mb-1">Availability</label>
    <input
      type="text"
      className="form-control"
      id="availability"
      name="availability"
      placeholder="Availability"
      required
    />
  </div>
  <div className="mb-3">
    <label htmlFor="price" className="d-flex text-left mb-1">Price</label>
    <input
      type="text"
      className="form-control"
      id="price"
      name="price"
      placeholder="Price"
      required
    />
  </div>
  <div className="mb-3">
    <button type="submit" className="btn btn-blue">Create</button>
    <button type="button" className="btn btn-blue" onClick={handleCancel}>Cancel</button>
  </div>
</form>
    </div>

  );
}
export default CreateProduct;
