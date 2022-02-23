import React from "react";
import './Header.css';
import { useContext } from "react";
import { loginContext } from '../Providers/LoginProviders'
import Avatar from '@mui/material/Avatar';




function Header(props) {
  const { userInitial } = useContext(loginContext);


  return (
    <header >
      <div className='header-back-button'>
        {props.back}
      </div>
      <div className='header-title'>
        <span>{props.title}</span>
      </div>
      {props.button &&
        <div className='header-close-button'>
          {props.button}
        </div>
      }
      <div className="header-avatar">
        <Avatar sx={{ bgcolor: '#45acc9' }}>{userInitial()}</Avatar>
      </div>

    </header>

  )
}

export default Header