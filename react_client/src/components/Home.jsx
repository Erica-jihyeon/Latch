import React from 'react';
import './Home.css';
import login_pic from '../img/login_pic.png';

function Home() {
  return (
    <div className="home-container">
      <div className="home-main">

        <img className='homepage-logo' src={login_pic} alt="login_pic" />

        <p>Find your language<br />exchange partner today</p>

        <div className="home-bottom-container">
          <p>Terms & Privacy Policy</p>
          <div className="home-button-container">
            <button>SIGN UP</button>
            <button>SIGN IN</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Home