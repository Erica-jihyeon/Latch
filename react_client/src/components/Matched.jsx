import React, { useState, useRef, useEffect } from 'react';
import default_logo from '../img/default_logo.png'
import Button from '@mui/material/Button';
import './matching.css';
import { useNavigate } from 'react-router-dom';



const styles = {
  "&.MuiButton-root": {
    minWidth: "7em"
  }
};

//starts chat in 5 sec
function Matched(props) {
  const roomId = useRef(props.roomId);
  const optionReset = props.optionReset;
  const socketRef = props.socketRef;

  // setRoomId(props.roomId);
  const [seconds, setSeconds] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    let countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        clearInterval(countdown);
      }
    }, 1000)
    return () => {
      clearInterval(countdown);
    }
  });

  useEffect(() => {
    if (seconds === 0) {
      navigate(`/matching/chatroom/${roomId.current}`);
      // optionReset();
    }
  }, [seconds, navigate])


  const clickHandler = () => {
    // send status to the server to show the alert to the other user(matched)
    socketRef.current.emit("cancelMatchChat", { userId: props.userId });
    // props.setMode('options');
  }

  useEffect(() => {
    socketRef.current.on("cancelMatchChat", ({ message, cancelUser }) => {
      if (cancelUser !== props.userId) {
        alert(message);
      }
      optionReset();
    })
  }, [])


  return (

    <div className="matching_main">
      <div className='matching_body'>
        <img src={default_logo} alt="latching_logo" id='logo' />
        <p className='matching_logo_text'>We found your latch!</p>
        <p className='matching_found_text'>Chat starts in <span className='matching_found_timer'>{seconds}</span> seconds</p>
        <Button variant="outlined" id='cancel_button' sx={styles} onClick={clickHandler}>Cancel</Button>
      </div>
    </div>
  )
};

export default Matched;