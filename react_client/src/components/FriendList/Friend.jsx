import React, { useState, useEffect } from "react";
import './Friend.css'
import default_logo from '../../img/default_logo.png'
import { Avatar, IconButton } from '@mui/material';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';

export default function FriendListItem(props) {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [])

  return (
    <div className="item_box">
      <Avatar src={`https://avatars.dicebear.com/api/miniavs/${seed}.svg`} />
      {/* <img src={default_logo} alt="logo" id="avater" /> */}
      <div className="item_text">
        <h4>{props.friendName}</h4>
        <p className="friendList_detail" >{props.detail}</p>
      </div>
      <IconButton>
        <ChatBubbleOutlineRoundedIcon />
      </IconButton>
    </div>
  )
}