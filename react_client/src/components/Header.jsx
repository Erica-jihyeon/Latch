import React from "react";
import './Header.css';



function Header(props) {

  return (
    <header >
      <div className='header-back-button'>
        {props.back}
      </div>
      <div className='header-title'>
        <span>{props.title}</span>
      </div>
      <div className='header-close-button'>
        {props.button}
      </div>
    </header>

  )
}

export default Header