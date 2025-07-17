import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand bg-black px-3 py-2 w-100" style={{ minHeight: 72 }}>
      <div className="container-fluid d-flex align-items-center justify-content-between">
        {/* <Link to="/" className="navbar-brand d-flex align-items-center">
          <img src={logo} alt="Orion Stars Logo" style={{ height: 48, width: "auto", maxWidth: 200 }} />
        </Link> */}
        <div className="d-flex gap-2">
            <Link to="/login" className="btn btn-warning fw-bold px-4">Login</Link>
          <Link to="/signup" className="btn btn-warning fw-bold px-4 text-dark">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 