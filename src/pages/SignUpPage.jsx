import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

function SignUpPage() {
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  function signup(e) {
    e.preventDefault();
    const data = {
      name: e.target.userName.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    console.log(data);
    axios
      .post(`${API_URL}/auth/signup`, data)
      .then((response) => {
        console.log("signup  done successfully");
        console.log("signup  done successfully", response.data);
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  }
  return (
    <div className="signup d-flex justify-content-center align-items-center ">

      <form onSubmit={signup}>
      <h2>Sign up your Account</h2>
      <div className="form-group row  mt-4">

    <label htmlFor="exampleInputEmail1 " className="col-sm-2 col-form-label">Email address</label>
     <div className="col-sm-10">
     <input type="email" className="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
  </div>
  </div>
  <div className="form-group row mt-4">
    <label htmlFor="exampleInputusername" className="col-sm-2 col-form-label">User Name</label>
    <div className="col-sm-10">
    <input type="text" className="form-control" name="userName" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
  </div>
  </div>
       
      
        <div className="form-group row mt-4">
    <label htmlFor="exampleInputPassword1" className="col-sm-2 col-form-label" >Password</label>
    <div className="col-sm-10">
    <input type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
 </div>
  </div>



        <button type="submit" className="btn btn-primary mt-5">Sign Up</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
export default SignUpPage;

    