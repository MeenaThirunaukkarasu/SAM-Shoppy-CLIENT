// PaymentContext.js
import React, {  useState } from 'react';

const PaymentContext =React.createContext();

 const PaymentProvider = (props) => {
  const [selectedAddress, setSelectedAddress] = useState();

  const updateAddressStatus = (addr) => {
    // console.log(addr)
    const addrString = JSON.stringify(addr)
    const storedAddr = localStorage.setItem("storedAddr",addrString);

    setSelectedAddress(addr);
  };
  const refreshAddr = () => {
    const storedAddrString = localStorage.getItem("storedAddr");
    const storedAddr = JSON.parse(storedAddrString);
    return storedAddr;
  };

// console.log(selectedAddress)
  return (
    <PaymentContext.Provider value={{ selectedAddress, updateAddressStatus ,refreshAddr}}>
      {props.children}
    </PaymentContext.Provider>
  );
};


export { PaymentProvider, PaymentContext };
