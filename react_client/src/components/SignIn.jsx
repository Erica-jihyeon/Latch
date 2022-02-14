import React from 'react';
import './Login.css';
import login_pic from '../img/login_pic.png';
import Button from '@material-ui/core/Button'

function SignIn() {
  return (
    <div className="login-container">
      <div className="main">

          <img src={login_pic} alt="login_pic" />
          <p>Find your language<br />exchange partner today</p>

          <div className="bottom-container">
          <p>Terms & Privacy Policy</p>
          <div>
            <Button>Submit</Button>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default SignIn