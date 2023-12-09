import axios from 'axios'
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function AddAddress({setFormView}){
  const {  user} = useContext(AuthContext);

function addAddr(e){
e.preventDefault()

const addrDetails={
  user:user._id,
  address:{
    contactNumber:e.target.contactNumber.value,
    houseNumber:e.target.houseNumber.value,
    street:e.target.street.value,
    city:e.target.city.value,
    postalCode:e.target.postalCode.value,
    country:e.target.country.value,
}
}

axios.post(`${import.meta.env.VITE_BASE_URL_API}/address/add`,{addrDetails})
.then(response=>{
  setFormView(false)
})
.catch(error=>{
})
}
function goBack(){
    setFormView(false)
}
    return(
      <div className=" d-flex justify-content-center align-items-center row ">
      <button  onClick={goBack} className="w-auto btn bg-base-orange text-white  back-btn" ><i className="bi bi-chevron-double-left"></i></button>


            <form className="bg-light-orange border-light-orange p-3 col-11 "  onSubmit={addAddr}>
            <h5 className="mb-2  text-green text-capitalize" >Add address</h5>
            <input className="form-control"
          type="text"
          name="email"
          placeholder="Enter your email"
          />
          <br/>
        <input className="form-control"
          type="text"
          name="contactNumber"
          placeholder="Enter your contact number"
        />
        <br />
        <input className="form-control"
          type="text"
          name="houseNumber"
          placeholder="Enter your house number"
        />
        <br/>
        <input className="form-control"
          type="text"
          name="street"
          placeholder="Enter your street name"
        />
        <br />
        <input className="form-control"
          type="text"
          name="postalCode"
          placeholder="Enter your post code"
        />
        <br />
        <input className="form-control"
          type="text"
          name="city"
          placeholder="Enter your city"
        />
        <br />
        <input className="form-control"
          type="text"
          name="country"
          placeholder="Enter your country"
          />
          <br/>
        

                <button type='submit'  className='btn text-white bg-base-orange'>Add Address</button>
            </form>
        </div>
    )

}

export default AddAddress