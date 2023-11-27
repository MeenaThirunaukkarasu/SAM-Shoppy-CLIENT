import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./../context/cart.context";
// import CartProduct from "./CartProduct"; // Import your CartProduct component

function CartPage() {
  const { cart, setCart, addProduct, deleteProduct,deleteOne, isLoading } = useContext(CartContext);
  const [groupedCart, setGroupedCart] = useState([])
  const [totalCartItems,setTotalCartItems]=useState(0)
  useEffect(() => {
    let totalItems = 0;
  console.log('cart',cart)
    // Check if cart is not null or undefined
    if (cart) {
      cart.cartDetails?.forEach((cartDetail) => {
        totalItems += cartDetail.quantity;
      });
    }
    setTotalCartItems(totalItems);
  }, [cart]);

  
  
  function decrement(id,size) {
    deleteOne(id,size);
  }
  function increment(id,size) {
    addProduct(id,size);
  }
  function removeItem(id,size) {
    console.log('size',size)
    deleteProduct(id,size);
    console.log("Updated Cart:", cart);
  }
  // Calculate the total cost for each item
  const calculateItemTotal = (item) => {
    // Assuming item.product.price is the price of the individual item
    return item.product.price * item.quantity;
  };

  // Calculate the overall total
  // const calculateOverallTotal = () => {
  //   return groupedCart?.reduce(
  //     (total, item) => total + calculateItemTotal(item),
  //     0
  //   );
  // };

  return isLoading ? <div>Loading...</div> : (
    <section className="h-100 gradient-custom">
      <div className="container py-5">
        <div className="row d-flex justify-content-center my-4">
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Cart - {totalCartItems} items</h5>
              </div>
              <div className="card-body">
                {cart.cartDetails?.map((item) => {
               return (
                  <div className="row" key={item.product._id}>
                  {/* <p>{item.product.title} - Quantity: {item.times}</p> */}
                    <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                      <div
                        className="bg-image hover-overlay hover-zoom ripple rounded"
                        data-mdb-ripple-color="light"
                      >
                        <img
                          src={item.product.img}
                          className="w-100"
                          alt="No Image for this product"
                        />
                        <a href="#!">
                          <div
                            className="mask"
                            style={{
                              backgroundColor: "rgba(251, 251, 251, 0.2)",
                            }}
                          ></div>
                        </a>
                      </div>
                    </div>

                    <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                      <p>
                        <strong>{item.product.title}</strong>
                      </p>
                      <p>
                        Size:{item.size}
                      </p>
                      {/* <p>Color: blue</p> */}
                      {/* /<p>Size: M</p> */}
                      <button
                        type="button"
                        className="btn btn-primary btn-sm me-1 mb-2"
                        data-mdb-toggle="tooltip"
                        title="Remove item"
                        onClick={() => removeItem(item.product._id,item.size)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm mb-2"
                        data-mdb-toggle="tooltip"
                        title="Move to the wish list"
                      >
                        <i className="bi bi-heart"></i>
                      </button>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                      <div
                        className="d-flex mb-4"
                        style={{ maxWidth: "300px" }}
                      >
                        <button
                          className="btn btn-primary px-3 me-2"
                          onClick={() => decrement(item.product._id,item.size)}
                        >
                          <i className="bi bi-dash"></i>
                        </button>
                        <div className="form-outline">
                          <p className="count-number">{item.quantity}</p>
                        </div>
                        <button
                          className="btn btn-primary px-3 ms-2"
                          onClick={() => increment(item.product._id,item.size)}
                        >
                          <i className="bi bi-plus"></i>
                        </button>
                      </div>
                      <p className="text-start text-md-center">
                        <strong>${calculateItemTotal(item).toFixed(2)}</strong>
                      </p>
                    </div>
                  </div>
                )}
                )}
                <hr className="my-4" />
              </div>
            </div>
            <div className="card mb-4">
              <div className="card-body">
                <p>
                  <strong>Expected shipping delivery</strong>
                </p>
                <p className="mb-0">12.10.2020 - 14.10.2020</p>
              </div>
            </div>
            <div className="card mb-4 mb-lg-0">
              <div className="card-body">
                <p>
                  <strong>We accept</strong>
                </p>
                <img
                  className="me-2"
                  width="45px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                  alt="Visa"
                />
                <img
                  className="me-2"
                  width="45px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                  alt="American Express"
                />
                <img
                  className="me-2"
                  width="45px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                  alt="Mastercard"
                />
                <img
                  className="me-2"
                  width="45px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.webp"
                  alt="PayPal acceptance mark"
                />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products
                    {/* <span>${calculateOverallTotal()?.toFixed(2)}</span> */}
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Shipping
                    <span>Gratis</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                      <strong>
                        <p className="mb-0">(including VAT)</p>
                      </strong>
                    </div>
                    <span>
                      {/* <strong>${calculateOverallTotal()?.toFixed(2)}</strong> */}
                    </span>
                  </li>
                </ul>
                <Link to="/checkout" className="btn btn-primary btn-lg btn-block">
              Go to checkout
            </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CartPage;
