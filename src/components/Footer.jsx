import React from "react";


function Footer(){
    return(
        <div>
            <footer className="bg-base text-white text-center p-4 fixed-bottom">
  <div className="container">
    <div className="row">
      <div className="col-md-6">
        <p className="mb-0">&copy; 2023 SAM Shoppy. All rights reserved.</p>
      </div>
      <div className="col-md-6">
        <a href="#" className="text-white mx-2"><i className="bi bi-facebook"></i></a>
        <a href="#" className="text-white mx-2"><i className="bi bi-twitter"></i></a>
        <a href="#" className="text-white mx-2"><i className="bi bi-instagram"></i></a>
        <a href="#" className="text-white mx-2"><i className="bi bi-linkedin"></i></a>
      </div>
    </div>
  </div>
</footer>
        </div>
    )
}
export default Footer;