import React, { useContext } from 'react';
import default_logo from '../img/default_logo.png'
import Button from '@mui/material/Button';
import './main.css';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { loginContext } from '../Providers/LoginProviders';
import SimpleBottomNavigation from './bottom_nav';
import { IconButton } from '@material-ui/core';
import LogoutIcon from '@mui/icons-material/Logout';

function Main() {

  const { user, logout } = useContext(loginContext);
  console.log(user);

  const navigate = useNavigate();
  const handleClick = () => {
    logout();
    navigate('/login')
  }

  return (
    <div className="mainpage_container">
      <Header title="Find Matches"
        button={
          <IconButton onClick={handleClick} >
            <LogoutIcon fontSize='large' color='error' variant="filled" />
          </IconButton>
        }
      />

      <div className="mainpage_container">
        <div className='logo_with_text'>
          <img src={default_logo} alt="default_logo" id='main_logo' />
          <p className='mainpage_logo_text'>Ready?</p>
        </div>

        <Button variant="outlined" id='start_button' onClick={() => { navigate('/matching') }}>Start</Button>

        <SimpleBottomNavigation location='1' />
      </div>
    </div>
  )
};

export default Main