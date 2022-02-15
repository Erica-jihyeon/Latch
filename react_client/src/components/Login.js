import React from 'react';
import './Login.css';
import login_pic from '../img/login_pic.png';

function Login() {
  return (
    <div className="login-container">
      <div className="main">

        <img className='homepage-logo' src={login_pic} alt="login_pic" />

        <p>Find your language<br />exchange partner today</p>

        <div className="bottom-container">
          <p>Terms & Privacy Policy</p>
          <div className="button-container">
            <button>SIGN UP</button>
            <button>SIGN IN</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login