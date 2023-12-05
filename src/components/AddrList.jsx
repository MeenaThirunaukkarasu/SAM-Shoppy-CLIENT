import { AuthContext } from "./../context/auth.context";
import { useContext, useState, useEffect } from "react";
import { PaymentContext } from "./../context/payment.context";

import axios from "axios";

function AddrList({ pay, setPay, setSelectedAddr, selectedAddr, setShowAddr }) {
  const { user } = useContext(AuthContext);
  const { updateAddressStatus } = useContext(PaymentContext);

  const [address, setAddress] = useState([]);
  const [selectedView, setSelectedView] = useState(null);
  useEffect(() => {
    axios.get(`http://localhost:5005/address/${user?._id}`).then((response) => {
      setAddress(response.data);
      console.log(response.data);
    });
  }, []);
  console.log('user',user)
  function getSelectedAddr(address) {
    console.log("Selected Address:", address);
    updateAddressStatus(address);
    setSelectedAddr(address);
    setSelectedView(true);
  }
  return (
    <div>
      {/* <h1> List of {user.name}'s Addr</h1> */}
      <div className="" >
        {!selectedView ? (
          pay ? (
            <div >
              {address?.address?.map((singleaddr) => {
                return (
                  <div  className="bg-light-orange p-2 m-2 rounded text-start border-light-orange" 
                    key={singleaddr.id}
                    onClick={() => {
                      getSelectedAddr(singleaddr);
                    }}
                  >
                    <p>
                      <strong>Phone Number:</strong>
                      {singleaddr.contactNumber}
                    </p>
                    <p>
                    <strong>Address:</strong>
                    <ul className="list-group">
                      <li className="" >
                      {singleaddr.houseNumber} {singleaddr.street}{" "}

                      </li>
                      <li className="">
                      {singleaddr.city} {singleaddr.postalCode}{" "}

                          </li>
                          <li className="">
                          {singleaddr.country}
                          </li>
                    </ul>
                     </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>

            <button  className="position-absolute btn bg-base-orange text-white  back-btn" onClick={()=>{setShowAddr(false)}}><i className="bi bi-chevron-double-left"></i></button>
              {address?.address?.map((singleaddr, index) => (
                <div key={singleaddr._id} className="bg-light-orange p-3 m-2 rounded text-start border-light-orange text-blue">
                  <p>
                    <strong>Address {index + 1}</strong>
                  </p>
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
              ))}
            </div>
          )
        ) : null}

        {selectedView && selectedAddr && (
          <div key={selectedAddr._id}  className="bg-light-orange p-2 m-2 mb-4 rounded text-start border-light-orange" >
            <p>
              <strong>Selected Address </strong>
            </p>
            <p>
              <strong>Phone Number:</strong>
              {selectedAddr.contactNumber}
            </p>
            {/* {selectedAddr.address.map((singleAddr) => ( */}
            <div>
              <p>
                {selectedAddr.houseNumber} {selectedAddr.street}
              </p>
              <p>
                {selectedAddr.city} {selectedAddr.postalCode}
              </p>
              <p>{selectedAddr.country}</p>
            </div>
            {/* ))} */}
          </div>
        )}
      </div>
    </div>
  );
}

export default AddrList;
