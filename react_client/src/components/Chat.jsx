import React, { useEffect, useState, useRef, useContext } from 'react';
import { useParams } from "react-router-dom";
import default_logo from '../img/default_logo.png'

import './Chat.css';
import Header from './Header';
import MessageField from './MessageField';
import { IconButton } from '@material-ui/core';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { loginContext } from '../Providers/LoginProviders';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import TranslateIcon from '@mui/icons-material/Translate';
import TagFacesRoundedIcon from '@mui/icons-material/TagFacesRounded';
import Friend_req from './Friend_req';
import Timer from './Timer';


function Chat() {
  const [messages, setMessages] = useState([]);
  const { user, userInitial } = useContext(loginContext);
  const [message, setMessage] = useState(null);
  // const userLearning = useRef(null);
  const userSpeaking = useRef(null);

  //show and translation is for the translation feature
  const [show, setShow] = useState(false);
  const [translation, setTranslation] = useState('');

  const [mode, setMode] = useState('chat');
  const [friendshipStatus, setFriendshipStatus] = useState(false);


  const params = useParams();


  const roomIdRef = useRef();
  roomIdRef.current = params['*'];

  const socketRef = useRef();
  const navigate = useNavigate();
  const scrollpoint = useRef();

  const randomUserId = () => {
    return Math.floor((Math.random() * 10) + 1);
  }

  //get user options information for the translation feature
  useEffect(() => {
    axios.get('http://localhost:8080/api/user_options', { params: { userId: user.userId } })
      .then((res) => {
        console.log(res.data);
        // userLearning.current = res.data.learning_language;
        userSpeaking.current = res.data.first_sec_language;
      })
  }, []);


  useEffect(() => {
    socketRef.current = io.connect('http://localhost:8080/matching');
    socketRef.current.emit('joinRoom', { roomId: roomIdRef.current, userId: user.userId });

  }, []);

  useEffect(() => {
    socketRef.current.on("message", ({ message, userFromWS }) => {
      setMessage(message);
      setShow(false);
      const renderedMessage = renderMessages(message, userFromWS);
      setMessages([...messages, renderedMessage]);
    });
    socketRef.current.on('friendRequest', () => {
      navigate('/addfriend')
    })
    socketRef.current.on('leaveChat', ({ message }) => {
      setMode('endedByOtherUser');
    });
    socketRef.current.on('usersAreFriends', ({ usersAreFriends }) => {
      console.log('USERS ARE FRIENDS CHAT', usersAreFriends);
      setFriendshipStatus(usersAreFriends);
    });
    scrollpoint.current.scrollIntoView({ behavior: 'smooth' })

    return () => { socketRef.current.off("message"); };

  }, [messages]);


  const renderMessages = (message, userFromWS) => {

    if (user.userId === userFromWS) {
      return (<p className={`chat__message${user.userId === userFromWS ? '__sent' : '__received'}`}>
        <span>{message}</span>
      </p>)
    } else {
      return (<p className={`chat__message${user.userId === userFromWS ? '__sent' : '__received'}`}>
        <span>{message}<a className='matchchat-translation' onClick={() => { getTranslation(message) }}><TranslateIcon /></a></span>
      </p>)
    }

  }


  const leaveChat = () => {
    socketRef.current.emit('leaveChat', { roomId: roomIdRef.current });
    socketRef.current.disconnect();
    navigate('/main');
  }

  const backToMain = () => {
    socketRef.current.disconnect();
    navigate('/main');
  }
  const addfriend = () => {
    socketRef.current.emit('friendRequestResponse', { roomId: roomIdRef.current, userId: user.userId, friends: true });
    console.log("you add friend");
    socketRef.current.disconnect();
    navigate('/main')
  }
  const notAddfriend = () => {
    socketRef.current.emit('friendRequestResponse', { roomId: roomIdRef.current, userId: user.userId, friends: false });
    console.log("you did not add friend");
    socketRef.current.disconnect();
    navigate('/main')
  }


  const getTranslation = (message) => {
    const languages = []
    // switch (userLearning.current) {
    //   case 'English': languages.push('en'); break;
    //   case 'Korean': languages.push('ko'); break;
    //   case 'Spanish': languages.push('es'); break;
    //   case 'French': languages.push('fr'); break;
    //   default: languages.push('en');
    // }
    switch (userSpeaking.current) {
      case 'English': languages.push('en'); break;
      case 'Korean': languages.push('ko'); break;
      case 'Spanish': languages.push('es'); break;
      case 'French': languages.push('fr'); break;
      default: languages.push('en');
    }
    // console.log(languages)
    var options = {
      method: 'GET',
      url: 'https://just-translated.p.rapidapi.com/',
      params: { lang: languages[0], text: message },
      headers: {
        'x-rapidapi-host': 'just-translated.p.rapidapi.com',
        'x-rapidapi-key': ''
      }
    };

    axios.request(options).then(function (response) {
      // console.log(response.data);
      setTranslation(response.data.text[0]);
      setShow(true);
    }).catch(function (error) {
      console.error(error);
    });

  }


  return (

    <div className="chat-container">
      {mode === 'chat' &&
        <><Header title={"Latching Chat"}
          back={
            <IconButton>
              <TagFacesRoundedIcon sx={{ color: '#c3c3c3cc', fontSize: 48 }} />
            </IconButton>
          }
          button={
            <IconButton size='large' >
              <CancelRoundedIcon onClick={leaveChat} sx={{ fontSize: 48 }} color='error' />
            </IconButton>
          } />
          {<Timer chatTimeout={() => setMode('friends')} />}
          <div className="chat-main">
            {messages}
            <div className='scrollpoint' ref={scrollpoint} ></div>
            {show === true &&
              <Alert className='translation-message' onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Translation</Alert.Heading>
                <p>{translation}</p>
              </Alert>
            }
          </div>
          <MessageField socketRef={socketRef} roomId={roomIdRef.current} user={user} /></>
      }

      {mode === 'endedByOtherUser' &&
        <div className='chat-endedByOtherUser'>
          <img src={default_logo} alt="default_logo" />
          <p>Oops...I'm sorry, <br />This chat is ended by the matched user.</p>
          <button className='chat-endedByOtherUser-button' onClick={backToMain}>back to Main</button>
        </div>
      }

      {mode === 'friends' && !friendshipStatus &&
        <Friend_req addfriend={addfriend} notAddfriend={notAddfriend} />
      }
      {mode === 'friends' && friendshipStatus &&
        <div className='chat-endedByOtherUser'>
          <img src={default_logo} alt="default_logo" />
          <p>You are already friends with this user.</p>
          <button className='chat-endedByOtherUser-button' onClick={backToMain}>back to Main</button>
        </div>
      }

    </div>
  )
}

export default Chat