import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import './Chat.css';
import login_pic from '../img/login_pic.png';
import Header from './Header';
import MessageField from './MessageField';
import { IconButton } from '@material-ui/core';
import CallEndIcon from '@mui/icons-material/CallEnd';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
function Chat() {
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  // const [{ user }, dispatch] = useStateValue();

  return (
    <div className="chat-container">
      <Header title="Latching Chat"
        button={
          <IconButton >
            <CancelRoundedIcon onClick={() => console.log("Leave chat")} sx={{ fontSize: 50 }} color='error' />
          </IconButton>
        } />
      <div className="chat-main">
        {messages.map((message) => (
          <p className={`chat__message ${message.name === user.displayName && 'chat__receiver'}`}>
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <MessageField />
    </div>
  )
}

export default Chat