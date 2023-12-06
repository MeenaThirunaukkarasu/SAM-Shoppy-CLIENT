import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ViewOrders({ setViewOrders }) {
  const [orderList, setOrderList] = useState();
const navigate=useNavigate()
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL_API}/order`).then((response) => {
      console.log(response.data);
      setOrderList(response.data);
    });
  }, []);

  function convertDateFormat(date) {
    const originalDate = new Date(date);
    const formattedDate = originalDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    return formattedDate;
  }

  const updateOrderStatus = (id) => {
    axios.patch(`http://localhost:5005/order/update/${id}`).then((response) => {
      console.log(response.data);
      window.location.reload();
    });
  };

  return (
    <div>
      <h1>List of Orders</h1>
      <button onClick={()=>{navigate(-1)}}>Back</button>
      {orderList?.map((order, index) => {
        return (
          <div className="container" key={order._id}>
          <h2><strong>Order No: </strong>{order.orderNumber}</h2>
            <div className="bg-light-orange p-3 m-2 rounded text-start border-light-orange text-blue">
              {/* <h2><strong>Order No: </strong>{order.orderNumber}</h2> */}
              <p>
                <strong>Order Placed On: </strong>
                {convertDateFormat(order.createdAt)}
              </p>
              <p>
                <strong>Total:</strong> ${order.totalAmount}
              </p>
              <p>
                <strong>Order Status :</strong>
                {order.status}
              </p>
              {order.status==='processing' &&  <button
                type="submit"
                onClick={() => {
                  updateOrderStatus(order._id);
                }}
                value={order.orderNumber}
              >
                Dispatch
              </button>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ViewOrders;
