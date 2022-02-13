import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import TextField from '@material-ui/core/TextField';
import './App.css';
import axios from 'axios';

function App() {
  const [state, setState] = useState({ message: '', name: '' });
  const [chat, setChat] = useState([]);
  const socketRef = useRef();
  // const [socket, setSocket] = useState("");

  const roomIdRef = useRef(null);

  useEffect(() => {
    socketRef.current = io.connect('http://localhost:8080/matching');

    axios.get('http://localhost:8080/test')
      .then((res) => {
        // console.log(res.data.roomId);
        roomIdRef.current = res.data.roomId;
      })
      .then(() => {
        // console.log(roomIdRef.current);
        socketRef.current.emit('joinRoom', { roomId: roomIdRef.current });
      })
      .catch(err => {
        console.log(err.message);
      })
      // return () => socketRef.current.disconnect();
  }, [])

  useEffect(()=>{

    socketRef.current.on("message", ({ name, message, roomId }) => {
      setChat([ ...chat, { name, message } ])
    });

    socketRef.current.on('usercount', (data) => {
      console.log(data);
    })
    // return () => socketRef.current.disconnect();

  }, [chat])

  // when matching chat is done => socketRef.current.disconnect();
  // roomIdRef.current = null;

  const onTextChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const onMessageSubmit = (e) => {
    e.preventDefault();
    //name = state.name, message = state.message
    const { name, message } = state;
    socketRef.current.emit('message', { name, message, roomId: roomIdRef.current });
    setState({ message: '', name });
  }


  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>{name}:<span>{message}</span></h3>
      </div>
    ))
  }

  return (
    <div className='card'>
      <form onSubmit={onMessageSubmit}>
        <h1>Message</h1>
        <div className="name-field">
          <TextField
            name="name"
            onChange={e => onTextChange(e)}
            value={state.name}
            label="Name" />
        </div>
        <div >
          <TextField
            name="message"
            onChange={e => onTextChange(e)}
            value={state.message}
            id="outlined-multiline-static"
            variant="outlined"
            label="Message" />
        </div>
        <button>Send Message</button>
      </form>
      <div className="render-chat">
        <h1>Chat log</h1>
        {renderChat()}
      </div>
    </div>
  );
}

export default App;