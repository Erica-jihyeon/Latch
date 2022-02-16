import React from 'react';
import latching_logo from '../img/latching_logo.png'
import Button from '@mui/material/Button';
import './Matching.css';

const styles = {
  "&.MuiButton-root": {
    minWidth: "7em"
  }
};

function Matched() {
  return ( 
    <div className='matching_body'>
      <img src={latching_logo} alt="latching_logo" id='logo' />


    <div className= 'matched_buttons'>
      <Button variant="outlined" id='join_button' sx={styles} >Chat</Button>
      <Button variant="outlined" id='cancel_button' sx={styles} >Cancel</Button>
    </div>
      
    </div>
  )
};

export default Matched