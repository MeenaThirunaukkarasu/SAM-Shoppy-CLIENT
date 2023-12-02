import { AuthContext } from "./../context/auth.context";
import { useContext, useState, useEffect } from "react";
import { PaymentContext } from "./../context/payment.context";

import axios from "axios";

function AddrList({ pay, setPay,setSelectedAddr,selectedAddr }) {
  const { user } = useContext(AuthContext);
  const  {updateAddressStatus}=useContext(PaymentContext)

  const [address, setAddress] = useState([]);
  const [selectedView, setSelectedView] = useState(null);
  useEffect(() => {
    axios.get("http://localhost:5005/address").then((response) => {
      setAddress(response.data);
    });
  }, []);
  function getSelectedAddr(address) {
    console.log("Selected Address:", address);
    updateAddressStatus(address);
    setSelectedAddr(address);
    setSelectedView(true);
  }
  return (
    <div>
      <h1> List of {user.name}'s Addr</h1>
      <div>
        {!selectedView ? (
          pay ? (
            <div>
              {address?.map((addressItem, index) => (
                <div
                  key={addressItem._id}
                  onClick={() => {
                    getSelectedAddr(addressItem);
                  }}
                >
                  <p>
                    <strong>Address {index + 1}</strong>
                  </p>
                  <p>
                    <strong>Phone Number:</strong>
                    {addressItem.contactNumber}
                  </p>
                  {addressItem.address.map((singleAddr) => (
                    <div key={singleAddr.id}>
                      <p>
                        {singleAddr.houseNumber} {singleAddr.street}
                      </p>
                      <p>
                        {singleAddr.city} {singleAddr.postalCode}
                      </p>
                      <p>{singleAddr.country}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div>
              {address?.map((addressItem, index) => (
                <div key={addressItem._id}>
                  <p>
                    <strong>Address {index + 1}</strong>
                  </p>
                  <p>
                    <strong>Phone Number:</strong>
                    {addressItem.contactNumber}
                  </p>
                  {addressItem.address.map((singleAddr) => (
                    <div key={singleAddr.id}>
                      <p>
                        {singleAddr.houseNumber} {singleAddr.street}
                      </p>
                      <p>
                        {singleAddr.city} {singleAddr.postalCode}
                      </p>
                      <p>{singleAddr.country}</p>
                    </div>
                  ))}
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
            <p>
              <strong>Phone Number:</strong>
              {selectedAddr.contactNumber}
            </p>
            {selectedAddr.address.map((singleAddr) => (
              <div key={singleAddr.id}>
                <p>
                  {singleAddr.houseNumber} {singleAddr.street}
                </p>
                <p>
                  {singleAddr.city} {singleAddr.postalCode}
                </p>
                <p>{singleAddr.country}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AddrList;
