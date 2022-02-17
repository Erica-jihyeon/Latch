import React from "react";
import './Header.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { IconButton } from "@material-ui/core";
function Header(props) {
  const back = () => {
    console.log('back');
  }

  return (
    <header >
      <div className='header-back-button'>
        <IconButton onClick={back}>
          <ArrowBackIosNewIcon fontSize="large" />
        </IconButton>
      </div>
      <div className='header-title'>
        <p>{props.title}</p>
      </div>
      <div className='header-close-button'>
        {props.button}
      </div>
    </header>

  )
}

export default Header