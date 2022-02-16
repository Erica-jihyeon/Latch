import React from 'react';
import default_logo from '../img/default_logo.png'
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
      <img src={default_logo} alt="latching_logo" id='logo' />
      <p className='logo_text'>Match is found</p>
      <p>10</p>

      <Button variant="outlined" id='cancel_button' sx={styles} >Cancel</Button>
      
    </div>
  )
};

export default Matched