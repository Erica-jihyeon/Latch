import React, { useState, useRef } from 'react';
import './Options.css';
import logo from '../img/logo.png';
import Select from '@mui/material/Select';
import { FormControl, InputLabel, MenuItem } from '@mui/material';
import { ButtonGroup, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import io from 'socket.io-client';

const styles = {
  "&.MuiButton-root": {
    border: "2px #45acc9 solid",
  },
  "&.MuiButton-text": {
    color: "grey"
  },
  "&.MuiButton-contained": {
    color: "yellow"
  },
  "&.MuiButton-outlined": {
    color: "brown"
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
  const socketRef = useRef();



  console.log('learning ' + learning);
  console.log('speaking ' + speaking);
  console.log('chatOpt ' + chatOpt);

  // const chatOptHandle = (e) => {
  //   e.preventDefault();
  //   setChatOpt(e.target.value);
  // }

  const randomUserId = () => {
    const userId = Math.floor((Math.random() * 100) + 1);
    return userId;
  }
  const userId = randomUserId();

  const matchingStart = () => {
    const data = {
      userId: userId,
      learning: learning,
      speaking: speaking,
      option: chatOpt
    }
    console.log(data);

    if (!userId || !learning || !speaking || !chatOpt) {
      alert('please select all the matching options');
    } else {
      socketRef.current = io.connect('http://localhost:8080');
      socketRef.current.emit('matchReq', data);
      socketRef.current.on("roomId", ({ roomId }) => {
        console.log('roomId: ' + roomId);
        socketRef.current.disconnect();
      });

      // axios.post('http://localhost:8080/matching', data)
      //   .then((res) => {
      //     setTimeout(() => {
      //       console.log(res)
      //     }, 3000);

      //   })
      //   .catch(err => {
      //     console.log(err.message);
      //   })
    }
    //data send
    //change to the matching page
    //timer(5s)
    //get data
    //fail or succeed -> option 2 way
    //succeed -> timer 10sec -> join room -> mode = matchingchat


  }

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
      <div className="learning-dropdown">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">language you want to learn</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={learning}
            label="Age"
            onChange={e => setLearning(e.target.value)}
          >
            <MenuItem value={'English'}>English</MenuItem>
            <MenuItem value={'Spanish'}>Spanish</MenuItem>
            <MenuItem value={'Korean'}>Korean</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="speaking-dropdown">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">pick your first language</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={speaking}
            label="Age"
            onChange={e => setSpeaking(e.target.value)}
          >
            <MenuItem value={'English'}>English</MenuItem>
            <MenuItem value={'Spanish'}>Spanish</MenuItem>
            <MenuItem value={'Korean'}>Korean</MenuItem>
          </Select>
        </FormControl>
      </div>

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

      <div className="button-container">
        <button onClick={matchingStart}>Start Latching!</button>
      </div>

    </div>
  )
}

export default Options;