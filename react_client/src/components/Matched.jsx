import React, { useState } from 'react';
import default_logo from '../img/default_logo.png'
import Button from '@mui/material/Button';
import './matching.css';
import { useEffect } from 'react';


const styles = {
  "&.MuiButton-root": {
    minWidth: "7em"
  }
};

//starts chat in 10 sec
function Matched() {
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    let countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        clearInterval(countdown)
      }
    }, 1000)
    return () => {
      clearInterval(countdown)
    }
  });

  return (
    <div className="matchin_container">
      <span id="top_sentence">Find Latches</span>
      <div className="matching_main">
        <div className='matching_body'>
          <img src={default_logo} alt="latching_logo" id='logo' />
          <p className='logo_text'>Match is found</p>
          <p>{seconds}</p>

          <Button variant="outlined" id='cancel_button' sx={styles} >Cancel</Button>

        </div>
      </div>
    </div>
  )
};

export default Matched;