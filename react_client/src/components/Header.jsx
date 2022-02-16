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
      <div>
        <IconButton onClick={back}>
          <ArrowBackIosNewIcon fontSize="large" />
        </IconButton>
      </div>
      <div>
        <p>{props.title}</p>
      </div>
      <div>
        {props.button}
      </div>
    </header>

  )
}

export default Header