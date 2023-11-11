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
    <div>
      <form onSubmit={signup}>
        <label>Email</label>
        <input type="text" name="email"></input>
        <br />

        <label>User Name</label>
        <input type="text" name="userName"></input>
        <br />

        <label>Password</label>
        <input type="password" name="password"></input>
        <button type="submit">Sign Up</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
export default SignUpPage;
