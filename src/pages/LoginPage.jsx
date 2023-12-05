import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { CartContext } from "../context/cart.context";

const API_URL = `${import.meta.env.VITE_BASE_URL_API}`;

function LoginPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const { refreshCart } = useContext(CartContext);
  
  function login(e) {
      e.preventDefault();
      const data = {
          name: e.target.userName.value,
          password: e.target.password.value,
        };
        axios
      .post(`${API_URL}/auth/login`, data)
      .then((response) => {
        console.log("login  done successfully");
        console.log("login  done successfully", response.data);
        console.log("JWT token", response.data.authToken);
        // Save the token in the localStorage.
        storeToken(response.data.authToken);
        localStorage.setItem("user",JSON.stringify(response.data.user))
        // Verify the token by sending a request
        // to the server's JWT validation endpoint.
        authenticateUser();
        refreshCart();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  }

  return (
    <div className="signup d-flex justify-content-center align-items-center row ">
      <form className="bg-base p-3 col-10  col-sm-6  col-md-6 col-lg-5 col-xl-5 col-xxl-4 rounded  " onSubmit={login}>
      <h2 className="mb-5" >Login your Account</h2>
      <div className="form-group  mt-3">
    <label htmlFor="exampleInputusername" className="d-flex  text-left  mb-1" >User Name</label>
   
    <input type="text" className="form-control" name="userName" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder=" Enter your Name "/>
  </div>

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
      <button type="submit" className="btn btn-blue mt-4">Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
export default LoginPage;
