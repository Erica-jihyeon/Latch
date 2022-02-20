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
import Counter from './Counter';
import Friend_req from './Friend_req';


function Chat() {
  const [messages, setMessages] = useState([]);
  const { user } = useContext(loginContext);
  const [message, setMessage] = useState([]);
  const [messageUser, setMessageUser] = useState({});
  const [userLearning, setUserLearning] = useState(null);
  const [userSpeaking, setUserSpeaking] = useState(null);
  //show and translation is for the translation feature
  const [show, setShow] = useState(false);
  const [translation, setTranslation] = useState('');

  const [mode, setMode] = useState('chat');


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
        setUserLearning(res.data.learning_language);
        setUserSpeaking(res.data.first_sec_language);
      })
  }, []);


  useEffect(() => {
    socketRef.current = io.connect('http://localhost:8080/matching');
    socketRef.current.emit('joinRoom', { roomId: roomIdRef.current, userId: randomUserId() });

  }, []);

  useEffect(() => {
    socketRef.current.on("message", ({ message, user }) => {
      setMessage(message);
      setMessageUser(user);
      setShow(false);
    });
    socketRef.current.on('friendRequest', () => {
      navigate('/addfriend')
    })
    socketRef.current.on('leaveChat', ({ message }) => {
      setMode('endedByOtherUser');
    });
  }, [messages]);

  useEffect(() => {
    const renderedMessage = renderMessages(message)
    setMessages([...messages, renderedMessage])
    setTimeout(() => {
      scrollpoint.current.scrollIntoView({ behavior: 'smooth' })
    }, 100);
  }, [messageUser]);


  const renderMessages = (message) => {
    if (!message || messages.length === 0) {
      return
    }
    return (
      <p className={`chat__message${user.userId === messageUser.userId ? '__sent' : '__received'}`}>
        <span>{message}<a className='matchchat-translation' onClick={() => { getTranslation(message) }}><TranslateIcon /></a></span>
      </p>
    )
  }


  const leaveChat = () => {
    socketRef.current.emit('leaveChat', { roomId: roomIdRef.current });
    socketRef.current.disconnect();
    navigate('/main');
  }

  const endedChatByOtherUser = () => {
    socketRef.current.disconnect();
    navigate('/main');
  }
  const addfriend = () => {
    console.log("you add friend");
    navigate('/main')
  }
  const notAddfriend = () => {
    console.log("you did not add friend");
    navigate('/main')
  }


  const getTranslation = (message) => {
    const languages = []
    switch (userLearning) {
      case 'English': languages.push('en'); break;
      case 'Korean': languages.push('ko'); break;
      case 'Spanish': languages.push('es'); break;
      case 'French': languages.push('fr'); break;
      default: languages.push('en');
    }
    switch (userSpeaking) {
      case 'English': languages.push('en'); break;
      case 'Korean': languages.push('ko'); break;
      case 'Spanish': languages.push('es'); break;
      case 'French': languages.push('fr'); break;
      default: languages.push('en');
    }
    console.log(languages)

    var options = {
      method: 'POST',
      url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        'content-type': 'application/json',
        'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
        'x-rapidapi-key': 'e8d6c2fd03msh66bf61617e980abp136823jsn6a763ce3d902'
      },
      data: { q: message, source: languages[0], target: languages[1] }
    };

    axios.request(options).then(function (response) {
      setTranslation(response.data.data.translations.translatedText);
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
              <TagFacesRoundedIcon sx={{ color: '#c3c3c3cc', fontSize: 40 }} />
            </IconButton>
          }
          button={
            <IconButton >
              <CancelRoundedIcon onClick={leaveChat} sx={{ fontSize: 40 }} color='error' />
            </IconButton>
          } />
          <Counter chatTimeout={() => setMode('friends')} />
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
        <button className='chat-endedByOtherUser-button' onClick={endedChatByOtherUser}>back to Main</button>
      </div>
      }

      {mode === 'friends' &&
      <Friend_req addfriend notAddfriend/>
      }

    </div>
  )
}

export default Chat