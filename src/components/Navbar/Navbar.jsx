import React from "react";
import './Navbar.css'
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {

  const navigate = useNavigate()

  const handleLogOut = () => {
    navigate('/')
    sessionStorage.removeItem('Auth');
    sessionStorage.clear()
  }

  return (
    <nav className="navbar">
        <h1>MiniKart</h1>
        <div className="subNav">
        <Link style={{color:'white', textDecoration:'none'}} to="/home">Home</Link>
        <Link style={{color:'white', textDecoration:'none'}} to="/Cart">Cart</Link>
        <span style={{color:'white', textDecoration:'none'}} onClick={handleLogOut}>Log out</span>
        {/* <button>Home</button>
        <button>Cart</button> */}
        </div>
    </nav>
  );
};
