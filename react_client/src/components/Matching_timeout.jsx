import React from 'react';
import default_logo from '../img/default_logo.png'
import Button from '@mui/material/Button';
import './matching.css';

function Timeout(props) {

  const optionReset = props.optionReset;
  
  const clickHandler = () => {
    optionReset();
  }

  return (

    <div className="matching_main">
      <div className='matching_body'>
        <img src={default_logo} alt="default_logo" id='logo' />
        <p className='matching_logo_text--fail'>We couldn't find your latch,<br />Please try it again later!</p>

        <Button variant="outlined" id='cancel_button' onClick={clickHandler}>Close</Button>
      </div>
    </div>

  )
};

export default Timeout