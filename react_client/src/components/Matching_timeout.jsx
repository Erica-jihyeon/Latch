import React from 'react';
import default_logo from '../img/default_logo.png'
import Button from '@mui/material/Button';
import './matching.css';
// import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function Timeout() {

  const navigate = useNavigate();
  // useEffect(() => {
  //   setTimeout(() => {
  //     navigate('/');
  //   }, 3000);
  // },[navigate])

  return (

    <div className="matching_main">
      <div className='matching_body'>
        <img src={default_logo} alt="default_logo" id='logo' />
        <p className='logo_text'>Not found...</p>

        <Button variant="outlined" id='cancel_button' onClick={() => { navigate('/') }}>Close</Button>
      </div>
    </div>

  )
};

export default Timeout