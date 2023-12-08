import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios'
function UpdateProduct() {
  const location = useLocation();
  const product = location.state?.product;
  ("ProductId", product);
  const navigate = useNavigate();

  function updateProduct(e) {
    e.preventDefault();
    const updateDetails = {
        title: e.target.title.value,
        desc: e.target.desc.value,
        img: e.target.img.value,
        availability: e.target.availability.value,
        inStock: e.target.availability.value > 0 ? true : false,
        categories: e.target.categories.value,
        price: e.target.price.value,
        size:[]
      };
      if(updateDetails.categories==='women' || updateDetails.categories=== 'men'){
        updateDetails.size=[
          "S", "M", "L"
        ]
      }
      if(updateDetails.categories==='boys' || updateDetails.categories=== 'girls'){
        updateDetails.size=[
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
      (updateDetails);

  
      axios
        .put(`${import.meta.env.VITE_BASE_URL_API}/products/update/${product._id}`, updateDetails)
        .then((response) => {
          (response.data);
          navigate(-1)
        })
        .catch((err) => {
          console.error(err);
        });
  }
  return (
    <div className="update-product d-flex justify-content-center align-items-center row">
  <form className="bg-base p-3 col-10 col-sm-6 col-md-6 col-lg-5 col-xl-5 col-xxl-4 rounded" onSubmit={updateProduct}>
    <h1>Update Product</h1>

    <div className="mb-3">
      <label htmlFor="img" className="form-label">Image URL:</label>
      <input
        type="text"
        id="img"
        name="img"
        className="form-control"
        defaultValue={product.img}
      />
    </div>

    <div className="mb-3">
      <label htmlFor="title" className="form-label">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        className="form-control"
        defaultValue={product.title}
      />
    </div>

    <div className="mb-3">
      <label htmlFor="desc" className="form-label">Description:</label>
      <textarea
        id="desc"
        name="desc"
        className="form-control"
        defaultValue={product.desc}
      />
    </div>

    <div className="mb-3">
      <label htmlFor="categories" className="form-label">Category:</label>
      <select name="categories" className="form-select" defaultValue={product.categories}>
        <option value="" disabled>Select Category</option>
        <option value="boys">Boys</option>
        <option value="girls">Girls</option>
        <option value="men">Men</option>
        <option value="women">Women</option>
      </select>
    </div>

    <div className="mb-3">
      <label htmlFor="availability" className="form-label">Availability:</label>
      <input
        type="text"
        id="availability"
        name="availability"
        className="form-control"
        defaultValue={product.availability}
      />
    </div>

    <div className="mb-3">
      <label htmlFor="price" className="form-label">Price:</label>
      <input
        type="text"
        id="price"
        name="price"
        className="form-control"
        defaultValue={product.price}
      />
    </div>

    <button type="submit" className="btn btn-primary">Update</button>
    <button
      onClick={() => {
        navigate(-1);
      }}
      className="btn btn-secondary"
    >
      Cancel
    </button>
  </form>
</div>

  );
}

export default UpdateProduct;
