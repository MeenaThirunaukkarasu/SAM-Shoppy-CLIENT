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
    <div>
      <h1> {user?.name}'s AccountPage</h1>
      <button onClick={showAddrForm}>Add Address</button>
      <button onClick={showAddress}>View Addressess</button>
      <h4>Addressess</h4>
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
  );
}

export default UserAccountPage;
