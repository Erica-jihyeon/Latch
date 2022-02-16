import React from 'react';
import default_logo from '../img/default_logo.png'
import Button from '@mui/material/Button';
import './matching.css';

function Matching(props) {
  const optionReset = props.optionReset;
  
  const clickHandler = () => {
    optionReset();
  }

  return (
    // <div className="matching_container">
    //   <span id="top_sentence">Find Latches</span>
      <div className="matching_main">
        <div className='matching_body'>
          <img src={default_logo} alt="latching_logo" id='logo' />
          <p className='logo_text'>Latching...</p>

          <Button variant="outlined" id='cancel_button' onClick={clickHandler}>Cancel</Button>
        </div>
      </div>
    // </div>
  )
};

export default Matching