import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

function MyOrders() {
  const { user } = useContext(AuthContext);
  const [address, setAddress] = useState([]);
  const [myOrders,setMyOrders]=useState()
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL_API}/order/${user?._id}`).then((response) => {
      console.log("orders", response.data);
      setMyOrders(response.data)
      axios.get(`${import.meta.env.VITE_BASE_URL_API}/address/${user?._id}`).then((response) => {
      setAddress(response.data);
      console.log('addr',response.data);
    });
    })
    .catch(error=>{
      console.log(error)
    })
  }, []);

  function singleProduct(id) {
    navigate(`/product/${id}`);
  }
function convertDateFormat(date){
  const originalDate = new Date(date);
  const formattedDate = originalDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  return formattedDate
}
function add30DaysAndFormat(date) {
  const originalDate = new Date(date);

  // Add 30 days
  const newDate = new Date(originalDate);
  newDate.setDate(newDate.getDate() + 30);

  // Format the new date
  const formattedNewDate = newDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return formattedNewDate;
}
console.log('address',address)
  return     <div className="container  position-relative">
    <div className=" d-flex justify-content-center align-items-center  row col-11 mx-auto ">

<div className=" border-light-green rounded  col-11 p-3 ">
<h3  className="text-green text-capitalize  m-2">My Order List</h3>


  {myOrders?.map((order,index)=>{
    const filteredAddr=address?.address?.filter(address=>{
  return address._id===order.deliveryAddress
})
console.log('filteredAddr',filteredAddr)
    return(
      <div key={order._id} className="bg-light-orange p-3 m-2 rounded text-start border-light-orange text-blue">

    <h2><strong>Order No: </strong>{index+1}</h2>
    <p><strong>Order Id: </strong> {order._id}</p>
    <p><strong>Order Placed On: </strong>{convertDateFormat(order.createdAt)}</p>
    <p><strong>Total:</strong> ${order.totalAmount}</p>
    {/* <p>Delivered To:{filteredAddr[0]?.houseNumber} {filteredAddr[0]?.street} </p>
    <p>{filteredAddr[0]?.postalCode} {filteredAddr[0]?.city} </p>
    <p>{filteredAddr[0]?.country} </p> */}
    <p><strong>Order Status :</strong>{order.status}</p>
   {order.cartDetails.map((cart,index)=>{
    return(
      <div key={index} onClick={()=>{singleProduct(cart.product._id) }} className="col-11 mx-auto border-bottom p-2 d-flex justify-content-center align-items-center">
      <div  className="row col-12 ">
      <div className="col-4 col-md-2  d-flex flex-column justify-content-center align-items-center  " >
      <img  className="w-100" src={cart.product.img} alt='error' />
      </div>
      <div className="col-8  text-start w-100% ">
      <h5 className="text-capitilize text-green fs-6 fw-normal">{cart.product.title}</h5>
      <p>Quantity : {cart.quantity}</p>
      <p>Return period expires on {add30DaysAndFormat(order.createdAt)}</p>
      </div>
     
      </div>
      </div>  
    )
   })}

    </div>
    )
  })}
  </div>
  </div>
  </div>
}

export default MyOrders;
