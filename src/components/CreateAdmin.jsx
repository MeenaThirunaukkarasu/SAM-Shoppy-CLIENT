import { useNavigate } from "react-router-dom";
import axios from 'axios'
import {useState} from 'react'
const API_URL = "http://localhost:5005";

function CreateAdmin(){
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [showPassword, setShowPassword] = useState(false);
    
    const navigate=useNavigate()
    function signup(e) {
        e.preventDefault();
        const data = {
          name: e.target.userName.value,
          email: e.target.email.value,
          password: e.target.password.value,
          role:e.target.role.value
        };
        console.log(data);
        axios
          .post(`${API_URL}/auth/signup`, data)
          .then((response) => {
            console.log("Admin created successfully", response.data);
            navigate(-1);
          })
          .catch((error) => {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
          });
      }

    return(
        <div>
        <button onClick={()=>{navigate(-1)}}>Back</button>
            <h1>Create new Admin</h1>
            <div className="signup d-flex justify-content-center align-items-center row ">

      <form className="bg-base p-3 col-10  col-sm-6  col-md-6 col-lg-5 col-xl-5 col-xxl-4 rounded  " onSubmit={signup}>
      <h2 className="mb-5" >Sign up your Account</h2>
      <div className="form-group">

    <label htmlFor="exampleInputEmail1" className="d-flex text-left  mb-1">Email address</label>
     <input type="email" className="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your Email"/>
  </div>
  <div className="form-group  mt-3">
    <label htmlFor="exampleInputusername" className="d-flex  text-left  mb-1" >User Name</label>
   
    <input type="text" className="form-control" name="userName" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder=" Enter your Name "/>
  </div>
  <div className="form-group  mt-3">
    <label htmlFor="exampleInputusername" className="d-flex  text-left  mb-1" >Role</label>
   
    <input type="text" className="form-control" name="role" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder=" Enter your Name " value='admin'/>
  </div>
{/*       
   <div className="form-group  mt-3"  >
    <label htmlFor="exampleInputPassword1" className="d-flex text-left mb-1">Password</label>
    <input type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
  </div> */}
  <div className="form-group  mt-3"  >
        <label htmlFor="password" className="d-flex text-left mb-1">
          Password
        </label>
        <div className="position-relative">
        <input
        id="exampleInputPassword1" 
          type={showPassword ? "text" : "password"}
          name="password"
          className="form-control"
          required
          placeholder="Password"
        />
       <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="position-absolute p-1 eye-button bg-light"
          >
            {showPassword ? (
              
              <i className="bi bi-eye text-dark"></i>
            ) : (
              <i className="bi bi-eye-slash text-dark"></i>
            )}
          </button>
          </div>
      </div>



        <button type="submit" className="btn btn-blue mt-4">Sign Up</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
        </div>
    )

}

export default CreateAdmin