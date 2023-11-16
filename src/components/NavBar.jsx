import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function NavBar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <div>
      <nav className="navbar navbar-expand-lg fixed-top bg-body-tertiary">
        <div className="container">
          {/* <a className="navbar-brand" href="#">
            Navbar
          </a> */}
          <img
            src="/logo.png"
            className="logo"
            alt="Description of the image"
          ></img>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                
                <Link to="/" className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
              <Link to="/feature" className="nav-link " aria-current="page">
              Features
                </Link>
               
              </li>
              <li className="nav-item">
              <Link to="/pricing" className="nav-link " aria-current="page">
              Pricing
                </Link>
               
              </li>
              <li className="nav-item dropdown">
              <Link to="/pricing"  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
              Categories
                </Link>
               
             
                <ul className="dropdown-menu">
                  <li>
                     <Link to='/men' className="dropdown-item">Men</Link>
                  </li>
                  <li>
                    <Link to='/women' className="dropdown-item" >Women</Link>
                  </li>
                  {/* <li>
                    <Link to='/kids' className="dropdown-item" >kids</Link>
                  </li>  */}
                  <li>
                    <Link to='/boys' className="dropdown-item" >Boys</Link>
                  </li>
                  <li>
                    <Link to='/girls' className="dropdown-item" >Girls</Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                
              </li>
              {!isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link to="/signup" className="nav-link">
                      Sign Up
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                // If user is logged in, show user's name and logout button
                <>
                  <li>
                  <a href="">
                 
                    <img
                      src="/login.png"
                      className="human-icon"
                      alt="human icon"
                    ></img>
                     </a>
                    <span className="user">{user && user.name}</span>
                  </li>
                <li> <i className="bi bi-bag"></i></li>
                
                 
               

                  <li>
                    <button onClick={logOutUser}>Logout</button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
