// src/components/IsAdmin.jsx

import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsAdmin( { children } ) {
  
  const { user, isLoading } = useContext(AuthContext);

  // If the authentication is still loading 
  if (isLoading) return <p>Loading ...</p>;
    if (!user){
        return  <Navigate to="/login" />;
    }
    
  else if (user.role!="admin") {
  // If the user is not logged in 
    return <Navigate to="/" />;
  } else {
  // If the user is logged in, allow to see the page 
    return children;
  }
}

export default IsAdmin;
