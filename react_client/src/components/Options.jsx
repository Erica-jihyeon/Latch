import React, { useState, useRef, useEffect } from 'react';
import './Options.css';
import logo from '../img/logo.png';
import { ButtonGroup, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';
import io from 'socket.io-client';
import LanguageInput from './LanguageInput';
import MatchingStartButton from './MatchingStartButton';


const styles = {
  "&.MuiButton-root": {
    border: "2px #45acc9 solid",
  },
  "&.MuiButton-multi-selection": {
    color: "#45acc9",
    borderRadius: "20px",
    width: "105px"
  },
  "&.MuiButton-multi-selection-mid": {
    color: "#45acc9",
    width: "105px"
  }
};



function Options() {

  const [learning, setLearning] = useState('');
  const [speaking, setSpeaking] = useState('');
  const [chatOpt, setChatOpt] = useState('');
  const [matchRoomId, setMatchRoomId] = useState(null);
  const socketRef = useRef();

  // useEffect(() => {
  //   if (matchRoomId) {
  //     setTimeout(() => {
  //       console.log('will go to the match room after 5sec');
  //     }, 5000)
  //     setMatchRoomId(null);
  //   }
  // }, [matchRoomId])

  const randomUserId = () => {
    const userId = Math.floor((Math.random() * 5) + 1);
    return userId;
  }
  const userId = randomUserId();

  // const matchingStart = () => {
  //   const data = {
  //     userId: userId,
  //     learning: learning,
  //     speaking: speaking,
  //     option: chatOpt
  //   }
  //   console.log(data);

  //   if (!userId || !learning || !speaking || !chatOpt) {
  //     alert('please select all the matching options');
  //   } else {
  //     socketRef.current = io.connect('http://localhost:8080');
  //     socketRef.current.emit('matchReq', data);
  //     socketRef.current.on("roomId", ({ roomId }) => {
  //       console.log('roomId: ' + roomId);
  //       setMatchRoomId(roomId);
  //       // socketRef.current.disconnect();
  //     });
  //   }
  //   // data send
  //   // change to the matching page
  //   // timer(5s)
  //   // get data
  //   // fail or succeed -> option 2 way
  //   // succeed -> timer 10sec -> join room -> mode = matchingchat
  // }

  const back = () => {
    console.log('back');
  }

  const chatOptHandler = (e) => {
    setChatOpt(e.target.value);
  }


  return (
    <div className="options-container">
      <div className="options-header">
        <IconButton onClick={back}>
          <ArrowBackIosIcon />
        </IconButton>
        <p>Match Options</p>
      </div>
      <img src={logo} alt="logo" />

      <LanguageInput purpose={learning} onChange={setLearning} label={'language you want to learn'}/>
      <LanguageInput purpose={speaking} onChange={setSpeaking} label={'pick your first language'}/>

      <div className="chat-option-selection">
        <p>Which language would you like to chat in?</p>
        <div className="chat-option-buttons">
          <ButtonGroup size="large" aria-label="large button group">
            <Button sx={styles} variant="multi-selection" value={1} onClick={chatOptHandler}>{learning || "Learning"}</Button>
            <Button sx={styles} variant="multi-selection-mid" value={2} onClick={chatOptHandler}>{speaking || "Speaking"}</Button>
            <Button sx={styles} variant="multi-selection" value={3} onClick={chatOptHandler}>Both</Button>
          </ButtonGroup>
        </div>
      </div>

      <MatchingStartButton matchingData={{userId, learning, speaking, chatOpt}}/>
      {/* <div className="options-button-container">
        <button onClick={matchingStart}>Start Latching!</button>
      </div> */}

    </div>
  )


}

export default Options;