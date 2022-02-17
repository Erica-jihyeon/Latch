import React from 'react';
import default_logo from '../img/default_logo.png'
import Button from '@mui/material/Button';
import './main.css';
import Header from './Header';
import { useNavigate} from 'react-router-dom';

function Main() {
  const navigate = useNavigate()
  return (
    <div className="login-container">
    <Header title="Find Matches" />

    <div className="matching_container">
      <div className='logo_with_text'>
          <img src={default_logo} alt="default_logo" id='main_logo' />
          <p className='logo_text'>Ready?</p>
      </div>

          <Button variant="outlined" id='start_button' onClick={() => {navigate('/matching')}}>Start</Button>
    </div>
    </div>
  )
};

export default Main