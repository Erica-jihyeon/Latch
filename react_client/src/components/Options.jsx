import React, { useState } from 'react';
import './Options.css';
import logo from '../img/logo.png';
import Select from '@mui/material/Select';
import { FormControl, InputLabel, MenuItem } from '@mui/material';
import { ButtonGroup, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';

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


  console.log('learning ' + learning);
  console.log('speaking ' + speaking);
  console.log('chatOpt ' + chatOpt);

  // const chatOptHandle = (e) => {
  //   e.preventDefault();
  //   setChatOpt(e.target.value);
  // }

  const matchingStart = () => {
    const data = {
      userId: 1,
      learning: { learning },
      speaking: { speaking },
      option: { chatOpt }
    }
    console.log(data);
  }

  const back = () => {
    console.log('back');
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
            <Button sx={styles} variant="multi-selection" value={1} onClick={e => setChatOpt(e.target.value)}>{learning || "Learning"}</Button>
            <Button sx={styles} variant="multi-selection-mid" value={2} onClick={e => setChatOpt(e.target.value)}>{speaking || "Speaking"}</Button>
            <Button sx={styles} variant="multi-selection" value={3} onClick={e => setChatOpt(e.target.value)}>Both</Button>
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