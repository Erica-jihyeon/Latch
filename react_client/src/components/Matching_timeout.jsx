import React from 'react';
import latching_logo from '../img/latching_logo.png'
import Button from '@mui/material/Button';
import './Matching.css';

function Timeout() {
  return ( 
    <div className='matching_body'>
      <img src={latching_logo} alt="latching_logo" id='logo' />
      <p>Not Found</p>

      <Button variant="outlined" id='cancel_button'>Cancel</Button>
    </div>
  )
};

export default Timeout