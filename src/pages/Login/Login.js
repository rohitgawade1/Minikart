import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
const Login = () => {

  sessionStorage.setItem('user', '123');
  sessionStorage.setItem('pass', '123');

  const [userEmail, setUserEmail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')


  const navigate = useNavigate();

  const validateEmail = (e) => {
    setUserEmail(e.target.value)
  }

  const validatePassword = (e) => {
    setPass(e.target.value)
  }

  const mainEmail = sessionStorage.getItem('user');
  const mainPass = sessionStorage.getItem('pass')

  const validateForm = (e) => {
    e.preventDefault();
    if (userEmail === mainEmail && pass === mainPass) {
      // alert('yes')
      navigate('/home')
      sessionStorage.setItem('Auth', 'asdfghjklk');
    }
    else {
      setError('Invalid Email and Password');
    }

    console.log(mainEmail, mainPass, userEmail, pass)
  }

  return (
    <div className="login-main-container">
      <div>
        <p><strong>Login Id:</strong> 123</p>
        <strong>Pass:</strong> 123
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
          <div style={{ color: 'red', fontSize: 'small ' }}>
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
