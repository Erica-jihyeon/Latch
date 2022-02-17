import React from 'react';
import io from 'socket.io-client';


function MatchingStartButton(props) {

  const { setMatchingResult, setMatchRoomId, socketRef, setMode, userId, learning, speaking, chatOpt } = props.matchingData;

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
      setMode('matching');

      socketRef.current.on("roomId", ({ roomId }) => {
        console.log('roomId: ' + roomId);
        setMatchRoomId(roomId);
        socketRef.current.disconnect();
        if (roomId) {
          setMatchingResult('matched');
        } else {
          setMatchingResult('noMatch');
        }
      })
    }
  }

  return (
    <div className="options-button-container">
      <button onClick={matchingStart}>Start Latching!</button>
    </div>
  )
}

export default MatchingStartButton;
