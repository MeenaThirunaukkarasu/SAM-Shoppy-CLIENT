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
    axios.get(`http://localhost:5005/order/${user?._id}`).then((response) => {
      console.log("orders", response.data);
      setMyOrders(response.data)
      axios.get(`http://localhost:5005/address/${user?._id}`).then((response) => {
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
  return <div>
  <h1>My Order List</h1>
  {myOrders?.map((order,index)=>{
    const filteredAddr=address?.address?.filter(address=>{
  return address._id===order.deliveryAddress
})
console.log('filteredAddr',filteredAddr)
    return(
      <div key={order._id}>
      <hr />

    <h2>Order No:{index+1}</h2>
    <p>Order Id:{order._id}</p>
    <p>Order Placed On:{convertDateFormat(order.createdAt)}</p>
    <p>Total:${order.totalAmount}</p>
    {/* <p>Delivered To:{filteredAddr[0]?.houseNumber} {filteredAddr[0]?.street} </p>
    <p>{filteredAddr[0]?.postalCode} {filteredAddr[0]?.city} </p>
    <p>{filteredAddr[0]?.country} </p> */}
    <p>Order Status :{order.status}</p>
   {order.cartDetails.map((cart,index)=>{
    return(
      <div key={index} onClick={()=>{singleProduct(cart.product._id) }} className="col-10 mx-auto border p-1 d-flex justify-content-center align-items-center">
      <div  className="row col-12">
      <div className="col-1  d-flex flex-column justify-content-center align-items-center" >
      <img  className="w-100" src={cart.product.img} alt='error' />
      </div>
      <div className="col-10 d-flex flex-column justify-content-center align-items-center">
      <h5 className="cap">{cart.product.title}</h5>
      <p><strong>Quantity :</strong> {cart.quantity}</p>
      <p>Return period expires on {add30DaysAndFormat(order.createdAt)}</p>
      </div>
     
      </div>
      </div>  
    )
   })}
   <hr />

    </div>
    )
  })}
  </div>;
}

export default MyOrders;
