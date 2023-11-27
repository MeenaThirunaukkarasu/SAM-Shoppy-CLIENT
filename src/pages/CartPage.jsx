import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./../context/cart.context";
// import CartProduct from "./CartProduct"; // Import your CartProduct component

function CartPage() {
  const { cart, setCart, addProduct, deleteProduct,deleteOne, isLoading } = useContext(CartContext);
  const [groupedCart, setGroupedCart] = useState([])
  

  useEffect(() => {
    console.log(cart);

    // if (!Array.isArray("cart:", cart)) {
    //   console.error("Error: Cart is not an array.");
    //   return;
    // }
    if(!isLoading){
      console.log("testing", cart )
      let tempGroupedCart = cart?.reduce((acc, current) => {
        if (!current || current.length === 0) {
          console.error("Error: Current item has no product property or an empty product array", current);
          return acc;
        }

        const existingItem = acc.find((item) =>
          deepEqual(item.product, current)
        );

          if (existingItem) {
            existingItem.times += 1;
          } else {
            acc.push({ product: current, times: 1 });
          }

          return acc;
        }, [])
      setGroupedCart(tempGroupedCart);
    console.log("Grouped Cart:", groupedCart);}
  }, [isLoading]);

  function deepEqual(obj1, obj2) {
    if (obj1 === obj2) {
      return true;
    }

    if (
      typeof obj1 !== "object" ||
      obj1 === null ||
      typeof obj2 !== "object" ||
      obj2 === null
    ) {
      return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }

    return true;
  }
  function decrement(id) {
    deleteOne(id);
  }
  function increment(id) {
    addProduct(id);
  }
  function removeItem(id) {
    deleteProduct(id);
    console.log("Updated Cart:", cart);
  }
  // Calculate the total cost for each item
  const calculateItemTotal = (item) => {
    // Assuming item.product.price is the price of the individual item
    return item.product.price * item.times;
  };

  // Calculate the overall total
  const calculateOverallTotal = () => {
    return groupedCart?.reduce(
      (total, item) => total + calculateItemTotal(item),
      0
    );
  };

  return isLoading ? <div>Loading...</div> : (
    <section className="h-100 gradient-custom">
      <div className="container py-5">
        <div className="row d-flex justify-content-center my-4">
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Cart - {cart?.length} items</h5>
              </div>
              <div className="card-body">
                {groupedCart?.map((item) => (
                  <div className="row" key={item.product._id}>
                  <p>{item.product.title} - Quantity: {item.times}</p>
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
                      {/* <p>Color: blue</p> */}
                      <p>Size: M</p>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm me-1 mb-2"
                        data-mdb-toggle="tooltip"
                        title="Remove item"
                        onClick={() => removeItem(item.product._id)}
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
                          onClick={() => decrement(item.product._id)}
                        >
                          <i className="bi bi-dash"></i>
                        </button>
                        <div className="form-outline">
                          <p className="count-number">{item.times}</p>
                        </div>
                        <button
                          className="btn btn-primary px-3 ms-2"
                          onClick={() => increment(item.product._id)}
                        >
                          <i className="bi bi-plus"></i>
                        </button>
                      </div>
                      <p className="text-start text-md-center">
                        <strong>${calculateItemTotal(item).toFixed(2)}</strong>
                      </p>
                    </div>
                  </div>
                ))}
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
                    <span>${calculateOverallTotal()?.toFixed(2)}</span>
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
                      <strong>${calculateOverallTotal()?.toFixed(2)}</strong>
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
