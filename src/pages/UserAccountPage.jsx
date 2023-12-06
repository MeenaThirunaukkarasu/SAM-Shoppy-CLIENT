import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import AddAddress from "../components/AddAddress";
import AddrList from "../components/AddrList";
// import Payment from '../components/Payment'

function UserAccountPage() {
  const { user ,logOutUser} = useContext(AuthContext);
  const [formView, setFormView] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [showAddr,setShowAddr] = useState()
  const [pay, setPay] = useState(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL_API}/address/${user?._id}`).then((response) => {
      setAddresses(response.data);
      console.log("response.data", response.data);
    });
  }, []);

  function showAddrForm() {
    setFormView(true);
    setShowAddr(false)

  }
  function showAddress(){
    setShowAddr(true)
    setFormView(false);

  }
  return (
    <div className="container  position-relative">
    <div className=" d-flex justify-content-center align-items-center  row col-11 mx-auto user-page ">

      <h3  className="text-green text-capitalize  m-2"> {user?.name}'s AccountPage</h3>
  <div className=" border-light-green rounded  col-7 p-3 ">
      <div className=" d-flex justify-content-between align-items-center ">
      <button className="btn bg-base-orange text-white " onClick={showAddrForm}>Add Address</button>
      <button className="btn bg-base-orange text-white mx-2" onClick={showAddress}>View Addressess</button>
      </div>
      {showAddr && <AddrList setShowAddr={setShowAddr}/>}
      

      {formView && (
        <AddAddress setFormView={setFormView} pay={pay} setPay={setPay} />
      )}

      </div>
      <div className=" border-light-green rounded  col-7 p-3 ">
      <div className=" d-flex justify-content-between align-items-center ">
      <h5 className="text-green text-capitalize  m-3 text-start" >User-Info</h5>
      <button className="btn bg-base-orange text-white "><Link to='/updateInfo' >Update User Info</Link></button>
      </div>
      <p className="text-orange"><strong className="text-green">email:</strong>{user.email}</p>
      <p className="text-orange"><strong className="text-green">User Name:</strong>{user.name}</p>
      

      
      {/* <Payment /> */}
      </div>
    </div>
    </div>
  );
}

export default UserAccountPage;
