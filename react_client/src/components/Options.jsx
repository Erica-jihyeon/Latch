import React, { useState, useRef, useEffect } from 'react';
import './Options.css';
import logo from '../img/logo.png';
import { ButtonGroup, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';
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

  const randomUserId = () => {
    const userId = Math.floor((Math.random() * 5) + 1);
    return userId;
  }
  const userId = randomUserId();

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
      
    </div>
  )


}

export default Options;