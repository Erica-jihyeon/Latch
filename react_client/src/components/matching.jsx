import React from 'react';
import latching_logo from '../img/latching_logo.png'
import Button from '@mui/material/Button';
import './matching.css';

function matching() {
  return (
    <div className="login-container">
      <div className="matching_main">
        <img src={latching_logo} alt="latching_logo" id='logo' />

        <Button variant="outlined" id='cancel_button'>Cancel</Button>
        
      </div>
    </div>
  )
};

export default matching