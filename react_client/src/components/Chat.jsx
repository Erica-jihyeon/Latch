import React, { useEffect, useState, useRef } from 'react';
import { useParams } from "react-router-dom";

import './Chat.css';
import login_pic from '../img/login_pic.png';
import Header from './Header';
import MessageField from './MessageField';
import { IconButton } from '@material-ui/core';
import CallEndIcon from '@mui/icons-material/CallEnd';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { io } from 'socket.io-client';

function Chat() {
  const [seed, setSeed] = useState("");
  // const { roomId } = useParams();
  // const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  // const [{ user }, dispatch] = useStateValue();

  const params = useParams();
  console.log(params);
  const randomId = () => {
    const id = Math.floor((Math.random() * 3) + 1);
    return id;
  }

  const roomIdRef = useRef(null);
  const socketRef = useRef;

  useEffect(() => {
    socketRef.current = io.connect('http://localhost:8080/matching');
    roomIdRef.current = randomId();
    console.log(roomIdRef);
    socketRef.current.emit('joinRoom', { roomId: roomIdRef.current });
  }, [])

  useEffect(() => {
    socketRef.current.on("message", ({ message }) => {
      setMessages([...messages, { message }])
    });
    socketRef.current.on('usercount', (data) => {
      console.log(data);
    })
  }, [messages]);

  const renderMessages = () => {
    return messages.map(({ message }, index) => (
      <div key={index}>
        <h3><span>{message}</span></h3>
      </div>
    ))
  }

  return (
    <div className="chat-container">
      <Header title="Latching Chat"
        button={
          <IconButton >
            <CancelRoundedIcon onClick={() => console.log("Leave chat")} sx={{ fontSize: 50 }} color='error' />
          </IconButton>
        } />
      <div className="chat-main">
        {/* {messages.map((message) => (
          <p className={`chat__message ${message.name === user.displayName && 'chat__receiver'}`}>
          <p className='chat__message'>
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))} */}
        {renderMessages()}
      </div>
      <MessageField socketRef={socketRef} roomIdRef={roomIdRef} />
    </div>
  )
}

export default Chat