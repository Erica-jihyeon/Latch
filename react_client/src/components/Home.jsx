import React from 'react';
import './Home.css';
import login_pic from '../img/login_pic.png';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <div className="home-main">

        <img className='homepage-logo' src={login_pic} alt="login_pic" />

        <p>Find your language<br />exchange partner today</p>

        <div className="home-bottom-container">
          <p>Terms & Privacy Policy</p>
          <div className="home-button-container">
            <button>SIGN UP</button>
            <button onClick={() => {navigate('/login')}}>SIGN IN</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Home