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
        {props.back}
      </div>
      <span>
        <p>{props.title}</p>
      </span>
      <div>
        {props.button}
      </div>
    </header>

  )
}

export default Header