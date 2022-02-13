import React, {useState, useContext, useEffect} from 'react';
import {SocketContext} from './context/socket';

export default function Child({userId}) {
  const [response, setResponse] = useState("");
  const socket = useContext(SocketContext);

  const handleJoinChat = () => {
    socket.emit("SEND_JOIN_REQUEST", {userId});
  }


  useEffect(() => {
    // as soon as the component is mounted, do the following tasks:
    socket.on('usercount', data => {
      console.log(data);
      setResponse(data);
    });

    return () => socket.disconnect();
  }, [socket]);

  return (
    <div>
      <button type="button" onClick={handleJoinChat}>
        Join Chat
      </button>
      <p>
      It's {response}
    </p>
    </div>
  );
};

