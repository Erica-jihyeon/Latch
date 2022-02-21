import React, { useState, useRef, useEffect, useContext } from 'react';
import './Options.css';
import logo from '../img/logo.png';
import { ButtonGroup, Button } from '@mui/material';
import LanguageInput from './LanguageInput';
import MatchingStartButton from './MatchingStartButton';
import './matching.css';
import Matching from './matching';
import Matched from './Matched';
import MatchingTimeout from './Matching_timeout';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { loginContext } from '../Providers/LoginProviders';
import { IconButton } from '@material-ui/core';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


// const styles = {
//   "&.MuiButton-root": {
//     border: "2px #45acc9 solid",
//   },
//   "&.MuiButton-multi-selection": {
//     color: "#45acc9",
//     borderRadius: "20px",
//     width: "105px"
//   },
//   "&.MuiButton-multi-selection-mid": {
//     color: "#45acc9",
//     width: "105px"
//   },
// };

function Options() {

  const [learning, setLearning] = useState('');
  const [speaking, setSpeaking] = useState('');
  const [chatOpt, setChatOpt] = useState('');
  const [mode, setMode] = useState('options');
  const [matchRoomId, setMatchRoomId] = useState(null);
  const socketRef = useRef();
  const [matchingResult, setMatchingResult] = useState('matching');
  const navigate = useNavigate();

  const [formats, setFormats] = useState(() => ['bold', 'italic']);
  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  // const randomUserId = () => {
  //   const userId = Math.floor((Math.random() * 5) + 1);
  //   return userId;
  // }

  const { user } = useContext(loginContext);
  const userId = user.userId;

  const back = () => {
    //reset options and go to main page
    navigate('/main');
    console.log('back');
  }

  const chatOptHandler = (e) => {
    setChatOpt(e.target.value);
  }

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
        <> <Header title='Match Options' back={
          <IconButton onClick={back}>
            <ArrowBackIosNewIcon sx={{ color: '#9d9d9d' }} fontSize="large" />
          </IconButton>
        } />
          <img src={logo} alt="logo" /><LanguageInput purpose={learning} onChange={setLearning} label={'language you want to learn'} /><LanguageInput purpose={speaking} onChange={setSpeaking} label={'pick your first language'} />
          <div className="chat-option-selection">
            <p>Which language would you like to chat in?</p>
            <div className="chat-option-buttons">
              {/* <ButtonGroup size="large" aria-label="large button group">
                <Button sx={styles} variant="multi-selection" value={1} onClick={chatOptHandler}>{learning || "Learning"}</Button>
                <Button sx={styles} variant="multi-selection-mid" value={2} onClick={chatOptHandler}>{speaking || "Speaking"}</Button>
                <Button sx={styles} variant="multi-selection" value={3} onClick={chatOptHandler}>Both</Button>
              </ButtonGroup> */}

              <ToggleButtonGroup
                value={formats}
                onChange={handleFormat}
                aria-label="text formatting"
              >
                <ToggleButton sx={{
                  border: "2px #45acc9 solid", borderRadius: "20px", width: "105px"}}
                  value={1} onClick={chatOptHandler}>{learning || "Learning"}</ToggleButton>
                <ToggleButton sx={{ border: "2px #45acc9 solid", width: "105px" }}
                  value={2} onClick={chatOptHandler}>{speaking || "Speaking"}</ToggleButton>
                <ToggleButton sx={{ border: "2px #45acc9 solid", borderRadius: "20px", width: "105px" }}
                  value={3} onClick={chatOptHandler}>Both</ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div><MatchingStartButton matchingData={{ setMatchingResult, matchRoomId, setMatchRoomId, socketRef, setMode, userId, learning, speaking, chatOpt, optionReset }} /></>
      }
      {mode === 'matching' &&
        <div className="matching_container">
          <span id="top_sentence">Find Latches</span>
          {matchingResult === 'matching' && <Matching optionReset={optionReset} socketRef={socketRef} />}
          {matchingResult === 'matched' && <Matched roomId={matchRoomId} optionReset={optionReset} socketRef={socketRef} userId={userId} />}
          {matchingResult === 'noMatch' && <MatchingTimeout optionReset={optionReset} />}
        </div>
      }
    </div>
  )
}

export default Options;