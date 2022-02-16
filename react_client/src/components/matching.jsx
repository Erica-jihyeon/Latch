import React from 'react';
import latching_logo from '../img/latching_logo.png'
import Button from '@mui/material/Button';
import './Matching.css';

function Matching() {
  return (

        <div className='matching_body'>
          <img src={latching_logo} alt="latching_logo" id='logo' />

          <Button variant="outlined" id='cancel_button'>Cancel</Button>
        </div>
  )
};

export default Matching