import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import AddAddress from "../components/AddAddress";
import AddrList from "../components/AddrList";
// import Payment from '../components/Payment'

function UserAccountPage() {
  const { user } = useContext(AuthContext);
  const [formView, setFormView] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [showAddr,setShowAddr] = useState()
  const [pay, setPay] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5005/address/${user?._id}`).then((response) => {
      setAddresses(response.data);
      console.log("response.data", response.data);
    });
  }, []);

  function showAddrForm() {
    setFormView(true);
  }
  function showAddress(){
    setShowAddr(true)
  }
  return (
    <div className="container  position-relative">
    <div className=" d-flex justify-content-center align-items-center  row col-11 mx-auto ">

  <div className=" border-light-green rounded  col-7 p-3 ">
      <h3  className="text-green text-capitalize  m-2"> {user?.name}'s AccountPage</h3>
      <div className=" d-flex justify-content-between align-items-center ">
      <button className="btn bg-base-orange text-white " onClick={showAddrForm}>Add Address</button>
      <button className="btn bg-base-orange text-white mx-2" onClick={showAddress}>View Addressess</button>
      </div>
      <h5 className="text-green text-capitalize  m-3 text-start" >Address List</h5>
      {showAddr && <AddrList setShowAddr={setShowAddr}/>}
      {/* {addresses?.address?.map((singleaddr) => {
        return (
          <div key={singleaddr.id}>
            <p>
              <strong>Phone Number:</strong>
              {singleaddr.contactNumber}
            </p>
            <p>
              {singleaddr.houseNumber} {singleaddr.street}{" "}
            </p>
            <p>
              {singleaddr.city} {singleaddr.postalCode}{" "}
            </p>
            <p>{singleaddr.country} </p>
          </div>
        );
      })} */}

      {formView && (
        <AddAddress setFormView={setFormView} pay={pay} setPay={setPay} />
      )}

      {/* <Payment /> */}
      </div>
    </div>
    </div>
  );
}

export default UserAccountPage;
