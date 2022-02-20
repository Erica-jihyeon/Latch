import React, { useEffect, useState, useRef, useContext } from 'react';
import { useParams } from "react-router-dom";

import './Chat.css';
import Header from './Header';
import MessageField from './MessageField';
import { IconButton } from '@material-ui/core';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { loginContext } from '../Providers/LoginProviders';


function Chat() {
  const [messages, setMessages] = useState([]);
  const { user } = useContext(loginContext);
  const [message, setMessage] = useState([]);
  const [messageUser, setMessageUser] = useState({});
  const [endMessage, setEndMessage] = useState(null);
  const countSecond = 1000;
  const [seconds, setSeconds] = useState(countSecond);


  const params = useParams();


  const roomIdRef = useRef();
  roomIdRef.current = params['*'];

  const socketRef = useRef();
  const navigate = useNavigate();
  const scrollpoint = useRef();

  const randomUserId = () => {
    return Math.floor((Math.random() * 10) + 1);
  }

  useEffect(() => {
    socketRef.current = io.connect('http://localhost:8080/matching');
    socketRef.current.emit('joinRoom', { roomId: roomIdRef.current, userId: randomUserId() });

  }, [])

  useEffect(() => {
    socketRef.current.on("message", ({ message, user }) => {
      setMessage(message);
      setMessageUser(user);
    });
    socketRef.current.on('friendRequest', () => {
      navigate('/addfriend')
    })
    socketRef.current.on('leaveChat', ({ message }) => {
      setEndMessage(message);
      console.log(message);
      // alert(message);
      // leaveChat();
    });
  }, [messages]);

  useEffect(() => {
    const renderedMessage = renderMessages(message)
    setMessages([...messages, renderedMessage])
    // console.log(messages);
    setTimeout(() => {
      scrollpoint.current.scrollIntoView({ behavior: 'smooth' })
    }, 100);
  }, [messageUser]);


  useEffect(() => {
    if(endMessage) {
      alert(endMessage);
      leaveChat();
    }
  }, [endMessage])

  useEffect(() => {
    let countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        clearInterval(countdown);
      }
    }, countSecond)
    return () => {
      clearInterval(countdown);
    }
  });


  const renderMessages = (message) => {
    if (!message || messages.length === 0) {
      return
    }
    return (
      <p className={`chat__message${user.userId === messageUser.userId ? '__sent' : '__received'}`}>
        <span>{message}</span>
      </p>
    )
  }


  const leaveChat = () => {
    socketRef.current.emit('leaveChat', { roomId: roomIdRef.current });
    socketRef.current.disconnect();
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
        <p>{seconds}</p>
      <div className="chat-main">
        {messages}
        <div className='scrollpoint' ref={scrollpoint} ></div>
      </div>
      <MessageField socketRef={socketRef} roomId={roomIdRef.current} user={user} />
    </div>
  )
}

export default Chat