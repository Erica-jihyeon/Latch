import React, { useEffect, useState, useRef, useContext } from 'react';
import { useParams } from "react-router-dom";

import './Chat.css';
import login_pic from '../img/login_pic.png';
import Header from './Header';
import MessageField from './MessageField';
import { IconButton } from '@material-ui/core';
import CallEndIcon from '@mui/icons-material/CallEnd';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import  { loginContext } from '../Providers/LoginProviders';


function Chat() {
  const [seed, setSeed] = useState("");
  // const { roomId } = useParams();
  // const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  // const [{ user }, dispatch] = useStateValue();
  const {user} = useContext(loginContext);
  console.log("USER", user);

  const params = useParams();
  // console.log(params);

  const roomIdRef = useRef(params);
  const socketRef = useRef();
  const navigate = useNavigate();

  const randomUserId = () => {
    return Math.floor((Math.random() * 10) + 1);
  }

  useEffect(() => {
    socketRef.current = io.connect('http://localhost:8080/matching');
    // roomIdRef.current = params;
    console.log(roomIdRef);
    socketRef.current.emit('joinRoom', { roomId: roomIdRef.current.roomId, userId: randomUserId() });
  }, [])
let messageUser;
  useEffect(() => {
    socketRef.current.on("message", ({ message, user }) => {
      console.log("USER LINE 45", user);
      messageUser = user;
      setMessages([...messages, { message }])
      console.log(messages);
    });
    socketRef.current.on('usercount', (data) => {
      console.log(data);
    });
    socketRef.current.on('leaveChat', ({ message }) => {
      console.log(message);
      alert(message);
      leaveChat();
    });
    socketRef.current.on('friendRequest', () => {
      navigate('/addfriend')
    })
  }, [messages]);

  const renderMessages = () => {
    return messages.map(({ message }, index) => (
      <p className={`chat__message`} key={index}>
        <span>{message}</span>
      </p>
      // <p className={`chat__message${user.userId === messageUser.userId ? '__sent' : '__received'}`} key={index}>
      //   <span>{message}</span>
      // </p>
    ))
  }

  // socketRef.current.on('leaveChat', ({message}) => {
  //   alert(message);
  // })

  const leaveChat = () => {

    socketRef.current.emit('leaveChat', {roomId: roomIdRef.current.roomId});
    socketRef.current.disconnect();
    // socketRef.current = null;
    navigate('/main');

  }

  return (
    <div className="chat-container">
      <Header title="Latching Chat"
        button={
          <IconButton >
            <CancelRoundedIcon onClick={leaveChat} sx={{ fontSize: 50 }} color='error' />
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
      <MessageField socketRef={socketRef} roomIdRef={roomIdRef} user={user} />
    </div>
  )
}

export default Chat