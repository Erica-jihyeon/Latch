import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';


function MatchingStartButton(props) {

  const { userId, learning, speaking, chatOpt } = props.matchingData;
  const [matchRoomId, setMatchRoomId] = useState(null);
  const socketRef = useRef();

  useEffect(() => {
    if (matchRoomId) {
      setTimeout(() => {
        console.log('will go to the match room after 5sec');
      }, 5000)
      setMatchRoomId(null);
    }
  }, [matchRoomId]);

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
        setMatchRoomId(roomId);
        // socketRef.current.disconnect();
      });
    }
  }


  return (
    <div className="options-button-container">
      <button onClick={matchingStart}>Start Latching!</button>
    </div>
  )
}

export default MatchingStartButton;
