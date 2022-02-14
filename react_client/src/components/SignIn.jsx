import React from 'react';
import './Login.css';
import login_pic from '../img/login_pic.png';

function Login() {
  return (
    <div className="login-container">
      <div className="main">

          <img src={login_pic} alt="login_pic" />
          <p>Find your language<br />exchange partner today</p>

          <div className="bottom-container">
          <p>Terms & Privacy Policy</p>
          <div className="button-container">
            <button>Sign up</button>
            <button>Sign In</button>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Login