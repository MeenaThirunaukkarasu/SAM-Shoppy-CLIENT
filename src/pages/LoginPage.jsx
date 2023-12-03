import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { CartContext } from "../context/cart.context";

const API_URL = "http://localhost:5005";

function LoginPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { storeToken, authenticateUser } = useContext(AuthContext);
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
    <div>
      <form onSubmit={login}>
        <label>User Name</label>
        <input type="text" name="userName"></input>
        <br />

        <label>Password</label>
        <input type="password" name="password"></input>
        <button type="submit">Log In</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
export default LoginPage;
