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
      <div>
        {!selectedView ? (
          pay ? (
            <div>
              {address?.address?.map((singleaddr) => {
                return (
                  <div
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
                      {singleaddr.houseNumber} {singleaddr.street}{" "}
                    </p>
                    <p>
                      {singleaddr.city} {singleaddr.postalCode}{" "}
                    </p>
                    <p>{singleaddr.country} </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
            <button onClick={()=>{setShowAddr(false)}}>Back</button>
              {address?.address?.map((singleaddr, index) => (
                <div key={singleaddr._id}>
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
          <div key={selectedAddr._id}>
            <p>
              <strong>Selected Address </strong>
            </p>
            {/* <p>
              <strong>Phone Number:</strong>
              {selectedAddr.contactNumber}
            </p> */}
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
