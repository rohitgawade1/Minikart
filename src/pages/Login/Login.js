import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
const Login = () => {

  sessionStorage.setItem('email', 'rohitgawade0102@gmail.com');
  sessionStorage.setItem('password', 'Rohit@123');

  const [userEmail, setUserEmail] =  useState('')
  const [pass, setPass] =  useState('')
  const [error, setError] =  useState('')


  const navigate = useNavigate();

  const validateEmail = (e) => {
    setUserEmail(e.target.value)
  }

  const validatePassword = (e) => {
    setPass(e.target.value)
  }

  const mainEmail = sessionStorage.getItem('email');
  const mainPass = sessionStorage.getItem('password')

  const validateForm = (e) => {
    e.preventDefault();
    if(userEmail === mainEmail && pass === mainPass){
      // alert('yes')
      navigate('/home')
    }
    else{
      setError('Invalid Email and Password');
    }
  }

  return (
    <div className="login-main-container">
      <div>
        <p><strong>Login Id:</strong> rohitgawade0102@gmail.com</p>
        <strong>Pass:</strong> Rohit@123
      </div>
      <form type='submit'>
      <div className="login-container">
        <div className="login-heading-container">
          <h1 className="login-heading">Login</h1>
        </div>
        <div className="email-conainer">
          <input
            id="email-input"
            type="email"
            placeholder="Enter your email address"
            onChange={validateEmail}
          />
        </div>
        <div className="pass-container">
          <input id="pass-input" type="password" placeholder="Password" onChange={validatePassword} />
        </div>
        <div style={{color:'red', fontSize: 'small '}}>
            <span>{error}</span>
        </div>
        <div className="recovery-container">
          <span id="recovery-span">
            <input id="check-input" type="checkbox" />
            Keep me login
          </span>
          <span id="recovery-pass">Recovery Password</span>
        </div>
        <div className="signin-btn-container">
          <button onClick={validateForm} type="submit" id="signin-btn">Sign In</button>
        </div>
      </div>
      </form>
    </div>
  );
};

export default Login;
