import React from 'react';
import default_logo from '../img/default_logo.png'
import Button from '@mui/material/Button';
import './Matching.css';

function Matching() {
  return (

        <div className='matching_body'>
          <img src={default_logo} alt="latching_logo" id='logo' />
          <p className='logo_text'>Latching...</p>

          <Button variant="outlined" id='cancel_button'>Cancel</Button>
        </div>
  )
};

export default Matching