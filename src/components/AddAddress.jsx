import axios from 'axios'
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function AddAddress({setFormView}){
  const {  user} = useContext(AuthContext);

function addAddr(e){
e.preventDefault()
console.log('function called')

const addrDetails={
  contactNumber:e.target.contactNumber.value,
  address:{
    houseNumber:e.target.houseNumber.value,
    street:e.target.street.value,
    city:e.target.city.value,
    postalCode:e.target.postalCode.value,
    country:e.target.country.value,
}
}
console.log('addrDetails',addrDetails)
axios.post(`http://localhost:5005/address/add`,{addrDetails})
.then(response=>{
  console.log(response.data)
})
.catch(error=>{
  console.log('error',error)
})
}
function goBack(){
    setFormView(false)
}
    return(
        <div>
        <button onClick={goBack}>Go Back</button>
            <form onSubmit={addAddr}>
            
        <input
          type="text"
          name="contactNumber"
          placeholder="Enter your contact number"
        />
        <br />
        <input
          type="text"
          name="houseNumber"
          placeholder="Enter your house number"
        />
        <br/>
        <input
          type="text"
          name="street"
          placeholder="Enter your street name"
        />
        <br />
        <input
          type="text"
          name="postalCode"
          placeholder="Enter your post code"
        />
        <br />
        <input
          type="text"
          name="city"
          placeholder="Enter your city"
        />
        <br />
        <input
          type="text"
          name="country"
          placeholder="Enter your country"
          />
          <br/>

                <button type='submit'>Add Address</button>
            </form>
        </div>
    )

}

export default AddAddress