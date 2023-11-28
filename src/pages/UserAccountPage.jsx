import React, { useEffect,useState } from 'react'
import { Link } from "react-router-dom";
import { useContext } from "react";
import axios from 'axios'
import { AuthContext } from "../context/auth.context";
import AddAddress from '../components/AddAddress';
// import Payment from '../components/Payment'

function UserAccountPage(){
    const {  user } = useContext(AuthContext);
    const [formView,setFormView] = useState(false)
    const [address,setAddress] =useState([])
useEffect(()=>{
axios.get('http://localhost:5005/address')
.then(response=>{
    setAddress(response.data)
})

},[])

    function showAddrForm(){
        setFormView(true)
    }
    return(
        <div>
            <h1> {user?.name}'s AccountPage</h1>
            <button onClick={showAddrForm}>Add Address</button>
            <h4>Addressess</h4>
            {address?.map((address,index)=>{
                return(
                    <div key={address._id}>
                    <p><strong>Address {index+1}</strong></p>
                    <p><strong>Phone  Number:</strong>{address.contactNumber}</p>

                    {address.address.map(singleaddr=>{
                        return( <div key={singleaddr.id}><p>{singleaddr.houseNumber} {singleaddr.street} </p>
                    <p>{singleaddr.city} {singleaddr.postalCode} </p>
                    <p>{singleaddr.country} </p>
                    </div>)})}
                    </div>
                )
            })}
            {formView && <AddAddress setFormView={setFormView}/>}
            {/* <Payment /> */}
        </div>
    )
}

export default UserAccountPage