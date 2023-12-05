import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios'
function UpdateProduct() {
  const location = useLocation();
  const product = location.state?.product;
  console.log("ProductId", product);
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
      console.log(updateDetails);

  
      axios
        .put(`${import.meta.env.VITE_BASE_URL_API}/products/update/${product._id}`, updateDetails)
        .then((response) => {
          console.log(response.data);
          navigate(-1)
        })
        .catch((err) => {
          console.error(err);
        });
  }
  return (
    <div>
      <h1>Update </h1>
      <form onSubmit={updateProduct}>
        <div>
          <label htmlFor="img">Image URL:</label>
          <input
            type="text"
            id="img"
            name="img"
            defaultValue={product.img}
          />
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={product.title}
          />
        </div>
        <div>
          <label htmlFor="desc">Description:</label>
          <textarea
            id="desc"
            name="desc"
            defaultValue={product.desc}
          />
        </div>
        <div>
          <label htmlFor="categories">Category:</label>

          <select name="categories"  defaultValue={product.categories}>
            <option defaultValue="" disabled>
              {product.categories}
            </option>
            <option defaultValue="boys">boys</option>
            <option defaultValue="girls">girls</option>
            <option defaultValue="men">men</option>
            <option defaultValue="women">women</option>
          </select>
        </div>
        <div>
          <label htmlFor="availability">Availability:</label>
          <input
            type="text"
            id="availability"
            name="availability"
            defaultValue={product.availability}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            name="price"
            defaultValue={product.price}
          />
        </div>

        <button type="submit">Update</button>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default UpdateProduct;
