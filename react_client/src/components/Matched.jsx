import React, { useState } from 'react';
import default_logo from '../img/default_logo.png'
import Button from '@mui/material/Button';
import './Matching.css';
import { useEffect } from 'react';


const styles = {
  "&.MuiButton-root": {
    minWidth: "7em"
  }
};

function Matched() {
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    let countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds (seconds - 1);
      }
      if (seconds === 0) {
        clearInterval(countdown)
      }
    }, 1000)
    return  () => {
      clearInterval(countdown)
    }
  });

  return ( 
    <div className='matching_body'>
      <img src={default_logo} alt="latching_logo" id='logo' />
      <p className='logo_text'>Match is found</p>
      <p>{seconds}</p>

      <Button variant="outlined" id='cancel_button' sx={styles} >Cancel</Button>
      
    </div>
  )
};

export default Matched