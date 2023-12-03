import React, { useEffect,useState,useContext } from 'react'
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { CartContext } from "../context/cart.context";
function NavBar() {
    const { isLoggedIn, user, logOutUser} = useContext(AuthContext);
    const { cart, setCart } = useContext(CartContext);
    const [totalCartItems,setTotalCartItems]=useState(0)
    useEffect(() => {
      let totalItems = 0;
    
      // Check if cart is not null or undefined
      if (cart) {
        cart.cartDetails?.forEach((cartDetail) => {
          totalItems += cartDetail.quantity;
        });
      }
    
      setTotalCartItems(totalItems);
    }, [cart]);
    

    useEffect(() => {
      const handleClick = (event) => {
        const dropdownToggle = event.target.closest('.dropdown-toggle');
  
        if (dropdownToggle) {
          dropdownToggle.classList.toggle('toggle-change');
        }
      };
  
      document.addEventListener('click', handleClick);
  
      return () => {
        document.removeEventListener('click', handleClick);
      };
    }, []);

    const logout = () => {

      setCart([])
      logOutUser()

    }
  

  return (
    <div><nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
    <div className="container">
      <a className="navbar-brand" href="#"> <img
            src="/logo.png"
            className="logo"
            alt="Description of the image"
          ></img></a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
          <Link to="/" className="nav-link active" aria-current="page">Home</Link>
           
          </li>
          {user?.role==='admin'&& (<>
        
          <li className="nav-item">
            <Link className="nav-link" to="/admin">products</Link>
        
          </li>
        
          </>)}
          {user && <li className="nav-item dropdown">
          <p className="nav-link">{user.name} ({user.role})</p>

          </li>}
          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" to="/categories" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Categories
            </Link>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
                     <Link to='/products' state={{category:'men'}} className="dropdown-item">Men</Link>
                  </li>
                  <li>
                    <Link to='/products' state={{category:'women'}} className="dropdown-item" >Women</Link>
                  </li>
                
                  <li>
                    <Link to='/products' state={{category:'boys'}} className="dropdown-item" >Boys</Link>
                  </li>
                  <li>
                    <Link to='/products' state={{category:'girls'}} className="dropdown-item" >Girls</Link>
                  </li>

            </ul>
          </li>
        </ul>
        <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 profile-menu"> 
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {isLoggedIn ? (
                <>
              <div className="profile-pic">
                  <img src="/account-logo.png" alt="Profile Picture"/>
                  <span className="user">{user && user.name}</span>
               </div>
               </>
            ):(
                <div className="profile-pic not-login">
                  <img src="/account-logo.png" alt="Profile Picture"/>
                  <span className="user">Guest</span>
               </div>
            )}
{/*          
             <!--  <i className="fas fa-user"></i> --> */}
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              
              {!isLoggedIn ? (
                <>
              <li><Link className="dropdown-item" to="/signup"><i className="fas fa-cog fa-fw"></i> Sign Up</Link></li>
              <li><Link className="dropdown-item" to="/login"><i className="fas fa-cog fa-fw"></i> Login</Link></li>
              </>
              ):(

                <>
                <li><Link className="dropdown-item" to='/account'><i className="fas fa-sliders-h fa-fw"></i> {user.name}'s Account</Link></li>
              <li><Link className="dropdown-item" href="#"><i className="fas fa-cog fa-fw"></i> Settings</Link></li>
              <li><Link className="dropdown-item" to="/myorders"><i className="fas fa-cog fa-fw"></i> My Orders</Link></li>
              
              <li><hr className="dropdown-divider"/></li>
                <li onClick={logout} ><Link className="dropdown-item"  ><i className="fas fa-sign-out-alt fa-fw"></i> Log Out</Link></li>

                </>

              )}
            </ul>
          </li>
       </ul>
       
       <button>
       <Link to="/cart" className="nav-link">
                    <i className="bi bi-bag-fill"></i> {totalCartItems} items
                    </Link>
                    </button>
      </div>
    </div>
  </nav>
  </div>
  )
}

export default NavBar;