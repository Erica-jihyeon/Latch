import React, { useState, useRef, useEffect } from 'react';
import './Options.css';
import logo from '../img/logo.png';
import { ButtonGroup, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';
import LanguageInput from './LanguageInput';
import MatchingStartButton from './MatchingStartButton';
import './matching.css';
import Matching from './matching';
import Matched from './Matched';
import MatchingTimeout from './Matching_timeout';
import Header from './Header';


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
  const [mode, setMode] = useState('options');
  const [matchRoomId, setMatchRoomId] = useState(null);
  const socketRef = useRef();
  const [matchingResult, setMatchingResult] = useState('matching');

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

  // useEffect(() => {
  //   if (matchRoomId) {
  //     setTimeout(() => {
  //       console.log('will go to the match room after 5sec');
  //     }, 5000)
  //     setMatchRoomId(null);
  //   }
  // }, [matchRoomId]);
  
  const optionReset = () => {
    setLearning('');
    setSpeaking('');
    setChatOpt('');
    setMode('options');
    setMatchRoomId(null);
    socketRef.current.disconnect();
    socketRef.current = null;
    setMatchingResult('matching');
  }

  return (
    <div className="options-container">
      {mode === 'options' &&
        <> <Header title={'Match Options'} />
          <img src={logo} alt="logo" /><LanguageInput purpose={learning} onChange={setLearning} label={'language you want to learn'} /><LanguageInput purpose={speaking} onChange={setSpeaking} label={'pick your first language'} />
          <div className="chat-option-selection">
            <p>Which language would you like to chat in?</p>
            <div className="chat-option-buttons">
              <ButtonGroup size="large" aria-label="large button group">
                <Button sx={styles} variant="multi-selection" value={1} onClick={chatOptHandler}>{learning || "Learning"}</Button>
                <Button sx={styles} variant="multi-selection-mid" value={2} onClick={chatOptHandler}>{speaking || "Speaking"}</Button>
                <Button sx={styles} variant="multi-selection" value={3} onClick={chatOptHandler}>Both</Button>
              </ButtonGroup>
            </div>
          </div><MatchingStartButton matchingData={{ setMatchingResult, matchRoomId, setMatchRoomId, socketRef, setMode, userId, learning, speaking, chatOpt }} /></>
      }
      {mode === 'matching' &&
        <div className="matching_container">
          <span id="top_sentence">Find Latches</span>
          {matchingResult === 'matching' && <Matching optionReset={optionReset} />}
          {matchingResult === 'matched' && <Matched roomId={matchRoomId} optionReset={optionReset} />}
          {matchingResult === 'noMatch' && <MatchingTimeout optionReset={optionReset} />}
        </div>
      }
    </div>
  )
}

export default Options;