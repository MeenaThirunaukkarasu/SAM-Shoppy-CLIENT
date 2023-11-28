import { AuthContext } from "./../context/auth.context";
import { useContext, useState, useEffect } from "react";
import axios from 'axios'

function AddrList(){
    const { user } = useContext(AuthContext);
    const [address,setAddress] =useState([])


    useEffect(()=>{
        axios.get('http://localhost:5005/address')
        .then(response=>{
            setAddress(response.data)
        })
        
        },[])
return(
    <div>
       <h1> List of  {user.name}'s Addr</h1>
       <div>
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
            </div>
    </div>
)
}

export default AddrList