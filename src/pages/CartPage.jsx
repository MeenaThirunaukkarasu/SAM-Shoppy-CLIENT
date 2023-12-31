import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./../context/cart.context";
// import CartProduct from "./CartProduct"; // Import your CartProduct component

function CartPage() {
  const { cart, setCart, addProduct, deleteProduct,deleteOne, isLoading } = useContext(CartContext);
  const [groupedCart, setGroupedCart] = useState([])
  const [totalCartItems,setTotalCartItems]=useState(0)
  const [currentDate, setCurrentDate] = useState(new Date());
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState(new Date());
  // useEffect(() => {
  //   let totalItems = 0;
  // ('cart',cart)
  //   // Check if cart is not null or undefined
  //   if (cart) {
  //     cart.cartDetails?.forEach((cartDetail) => {
  //       totalItems += cartDetail.quantity;
  //     });
  //   }
  //   setTotalCartItems(totalItems);
  // }, [cart]);

  useEffect(() => {
    if (cart) {
      // If you want to use groupedCart, set its value here
      setGroupedCart(cart.cartDetails || []);
    }
  
    let totalItems = 0;
    if (cart?.cartDetails) {
      cart.cartDetails.forEach((cartDetail) => {
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
    
    deleteProduct(id,size);
   
  }
  // Calculate the total cost for each item
  const calculateItemTotal = (item) => {
    // Assuming item.product.price is the price of the individual item
    return item.product.price * item.quantity;
  };

  // Calculate the overall total
  const calculateOverallTotal = () => {
    return groupedCart?.reduce(
      (total, item) => total + calculateItemTotal(item),
      0
    );
  };
  useEffect(() => {
    if (cart) {
      setGroupedCart(cart.cartDetails || []);
    }
  
    let totalItems = 0;
    if (cart?.cartDetails) {
      cart.cartDetails.forEach((cartDetail) => {
        totalItems += cartDetail.quantity;
      });
    }
    setTotalCartItems(totalItems);
  
    // Calculate and store the overall total in localStorage
    const overallTotal = groupedCart?.reduce(
      (total, item) => total + calculateItemTotal(item),
      0
    );
    localStorage.setItem("overallTotal", overallTotal.toFixed(2));
  }, [cart, groupedCart]);
  
  useEffect(() => {
    const newExpectedDeliveryDate = new Date(currentDate);
    newExpectedDeliveryDate.setDate(currentDate.getDate() + 2); // Add one day
    setExpectedDeliveryDate(newExpectedDeliveryDate);
  }, [currentDate]);
  

  return isLoading ? <div>Loading...</div> : (
    <section className="h-100 gradient-custom">
      <div className="container ">
        <div className="row d-flex justify-content-center my-4">
          <div className="col-md-8 ">
            <div className="card mb-4 border-light-orange bg-light-orange  text-blue">
              <div className="card-header py-3">
                <h5 className="mb-0 text-green ">Cart - {totalCartItems} items</h5>
              </div>
              <div className="card-body">
                {cart.cartDetails?.map((item) => {
               return (
                  <div className="row border-bottom p-2" key={item.product._id}>
                  {/* <p>{item.product.title} - Quantity: {item.times}</p> */}
                    <div className=" col-3 col-lg-3 col-md-3 mb-4 mb-lg-0">
                      <div
                        className="bg-image hover-overlay hover-zoom ripple rounded"
                        data-mdb-ripple-color="light"
                      >
                        <img
                          src={item.product.img}
                          className="w-75"
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

                    <div className="col-9 col-lg-6 col-md-6 mb-4 mb-lg-0 text-start">
                    <h5 className="text-capitilize text-green fs-6 fw-normal">{item.product.title}</h5>

                      
                      <p className="text-blue">
                       <strong> Size: </strong> {item.size}
                      </p>
                      {/* <p>Color: blue</p> */}
                      {/* /<p>Size: M</p> */}
                      <button
                        type="button"
                        className="btn bg-base-orange text-white   btn-sm me-1 mb-2"
                        data-mdb-toggle="tooltip"
                        title="Remove item"
                        onClick={() => removeItem(item.product._id,item.size)}
                      >
                        <i className="bi bi-trash fs-6"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-light btn-sm mb-2 border"
                        data-mdb-toggle="tooltip"
                        title="Move to the wish list"
                      >
                        <i className="bi text-danger bi-heart fs-6"></i>
                      </button>
                    </div>
                    <div className="col-12 col-lg-3 col-md-3 mb-4 mb-lg-0">
                      <div
                        className="d-flex align-items-center mb-4"
                        style={{ maxWidth: "300px" }}
                      >
                        <button
                          className="btn bg-base-orange text-white increment "
                          onClick={() => decrement(item.product._id,item.size)}
                        >
                          <i className="bi bi-dash"></i>
                        </button>
                        <div className="form-outline">
                          <p className="count-number ">{item.quantity}</p>
                        </div>
                        <button
                          className="btn bg-base-orange decrement text-white"
                          onClick={() => increment(item.product._id,item.size)}
                        >
                          <i className="bi bi-plus"></i>
                        </button>
                      </div>
                      <p className="text-start text-md-center">
                        <strong>Price : </strong>${calculateItemTotal(item).toFixed(2)}
                      </p>
                    </div>
                  </div>
                )}
                )}
              
              </div>
            </div>
            <div className="card border-0 mb-4">
              <div className="card-body bg-light-orange border-light-orange  rounded">
                <p className="text-capitilize text-green fs-6 fw-normal ">
                  <strong>Expected shipping delivery</strong>
                </p>
                <p className="mb-0 text-blue"> On {`${expectedDeliveryDate.toLocaleDateString()}`}</p>
              </div>
            </div>
            <div className="card mb-4 mb-lg-0 border-0">
              <div className="card-body bg-light-orange border-light-orange  rounded">
              <p className="text-capitilize text-green fs-6 fw-normal ">
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
            
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4 border-light-green">
              <div className="card-header py-3 border-bottom-green ">
                <h5 className="mb-0 text-capitilize text-green  ">Summary</h5>
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
                {totalCartItems === 0 ? (
                <button className="btn btn-secondary btn-lg btn-block" disabled>
                   Go to checkout
                 </button>
                ) : (
                <Link to="/checkout" className="btn bg-base btn-success text-white btn-lg btn-block">
                    Go to checkout
                </Link>
               )}
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CartPage;
