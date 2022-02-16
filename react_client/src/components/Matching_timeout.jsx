import React from 'react';
import default_logo from '../img/default_logo.png'
import Button from '@mui/material/Button';
import './Matching.css';

function Timeout() {
  return ( 
    <div className='matching_body'>
      <img src={default_logo} alt="default_logo" id='logo' />
      <p className='logo_text'>Not found...</p>

      <Button variant="outlined" id='cancel_button'>Close</Button>
    </div>
  )
};

export default Timeout