import React from "react";
import './Navbar.css'
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar">
        <h1>MiniKart</h1>
        <div className="subNav">
        <Link style={{color:'white', textDecoration:'none'}} to="/home">Home</Link>
        <Link style={{color:'white', textDecoration:'none'}} to="/Cart">Cart</Link>
        <Link style={{color:'white', textDecoration:'none'}} to="/">Log out</Link>
        {/* <button>Home</button>
        <button>Cart</button> */}
        </div>
    </nav>
  );
};
