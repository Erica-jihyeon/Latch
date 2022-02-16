import React from 'react';
import default_logo from '../img/default_logo.png'
import Button from '@mui/material/Button';
import './matching.css';

function Matching() {
  return (
    <div className="matchin_container">
      <span id="top_sentence">Find Latches</span>
      <div className="matching_main">
        <div className='matching_body'>
          <img src={default_logo} alt="latching_logo" id='logo' />
          <p className='logo_text'>Latching...</p>

          <Button variant="outlined" id='cancel_button' onClick={() => console.log("hello")}>Cancel</Button>
        </div>
      </div>
    </div>
  )
};

export default Matching