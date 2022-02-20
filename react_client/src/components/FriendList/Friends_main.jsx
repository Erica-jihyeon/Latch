import React, { useContext } from 'react';
import './Friends_main.css';
import Header from '../Header';
import { useNavigate } from 'react-router-dom';
import { loginContext } from '../../Providers/LoginProviders'
import SimpleBottomNavigation from '../bottom_nav';
import { IconButton } from '@material-ui/core';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FriendListItem from './Friend';

function Main() {

  const { user } = useContext(loginContext);
  console.log(user);

  const navigate = useNavigate();
  const back = () => {
    navigate('/login');
  };

  return (
    <div className="mainpage_container">
      <Header title="Friends"
        back={
          <IconButton onClick={back}>
            <ArrowBackIosNewIcon fontSize="large" />
          </IconButton>
          
        }
      />

      {/* body */}
      <div className='friend_body'>
        <FriendListItem />
        <FriendListItem />
        <FriendListItem />
      </div>

      <div className="bottom_nav_bar">
        <SimpleBottomNavigation location='2'/>
      </div>
    </div>
  )
};

export default Main