import React, { useContext, useEffect, useState } from 'react';
import './Friends_main.css';
import Header from '../Header';
import { useNavigate } from 'react-router-dom';
import { loginContext } from '../../Providers/LoginProviders'
import SimpleBottomNavigation from '../bottom_nav';
import { IconButton } from '@material-ui/core';
import LogoutIcon from '@mui/icons-material/Logout';
import FriendListItem from './Friend';
import axios from 'axios';


function Main() {
  const [friends, setFriends] = useState([])
  
  const { user, logout, userInitial } = useContext(loginContext);
  console.log(user);
  
  const navigate = useNavigate();
  // const back = () => {
  //   navigate('/login');
  // };
  const handleClick = () => {
    logout();
    navigate('/login')
  }

  //request to the server only once
  useEffect(() => {
    return axios.get('http://localhost:8080/api/friendlist', {params: {userId: user.userId}})
    .then((res) => {
      setFriends(res.data)
      })
  },[])


  //this is the rendering friend itme
  const renderFriend = () => {
    // console.log(friends)
    return friends.map((item) => {
      return <FriendListItem friendName={item} key={item} detail="Hello!!"/>
    })
  }
  
  return (
    <div className="mainpage_container">
      <Header title="Friends"
      button={
        <IconButton onClick={handleClick} >
          <LogoutIcon fontSize='large' color='error' variant="filled"/>
        </IconButton>
      }

      />

      {/* body */}
      <div className='friend_body'>
        <FriendListItem friendName='Yun' detail="Hello? How are you?"/>
        <FriendListItem friendName='Erica' detail="Hi, nice to meet you!"/>
        <FriendListItem friendName='Michael' detail="How are you doing?"/>
        {renderFriend()}

      </div>

      <div className="bottom_nav_bar">
        <SimpleBottomNavigation location='2'/>
      </div>
    </div>
  )
};

export default Main