import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect ,useContext} from "react";
const API_URL = import.meta.env.VITE_BASE_URL_API;
import { AuthContext } from "../context/auth.context";

function UpdateUserInfo() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [showPassword, setShowPassword] = useState(false);
  const { user ,logOutUser} = useContext(AuthContext);

 
  function signup(e) {
    e.preventDefault();
    const updatedUserInfo = {
      name: e.target.userName.value,
      email: e.target.email.value,
      password: e.target.password.value,
      newPassword: e.target.newPassword.value,
      role: user.role,
    };
    console.log(user._id);
    axios
      .put(`${API_URL}/auth/update/${user._id}`, updatedUserInfo)
      .then((response) => {
        console.log("update  done successfully", response.data);
        logOutUser()
        navigate('/login')
      })
      .catch((error) => {
        console.log('error',error.response.data)
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  }

  return (
    <div>
      <h1>User Info Update Form</h1>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        back
      </button>
      <div className="signup d-flex justify-content-center align-items-center row ">
        <form
          className="bg-base p-3 col-10  col-sm-6  col-md-6 col-lg-5 col-xl-5 col-xxl-4 rounded  "
          onSubmit={signup}
        >
          <h2 className="mb-5">Sign up your Account</h2>
          <div className="form-group">
            <label
              htmlFor="exampleInputEmail1"
              className="d-flex text-left  mb-1"
            >
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              defaultValue={user.email}
              placeholder="Enter your Email"
            />
          </div>
          <div className="form-group  mt-3">
            <label
              htmlFor="exampleInputusername"
              className="d-flex  text-left  mb-1"
            >
              User Name
            </label>

            <input
              type="text"
              className="form-control"
              name="userName"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              defaultValue={user.name}
              placeholder=" Enter your Name "
            />
          </div>
          <div className="form-group  mt-3">
            <label htmlFor="password" className="d-flex text-left mb-1">
              Old Password
            </label>
            <div className="position-relative">
              <input
                id="exampleInputPassword1"
                type={showPassword ? "text" : "password"}
                name="password"
                className="form-control"
                required
                placeholder="Old Password"
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
          <div className="form-group  mt-3">
            <label htmlFor="password" className="d-flex text-left mb-1">
              New Password
            </label>
            <div className="position-relative">
              <input
                id="exampleInputPassword1"
                type={showPassword ? "text" : "newPassword"}
                name="newPassword"
                className="form-control"
                placeholder="New Password"
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

          <button type="submit" className="btn btn-blue mt-4">
            Update Info{" "}
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default UpdateUserInfo;
