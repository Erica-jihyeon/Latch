import React, { useEffect, useState } from 'react';
import './MessageField.css';
import { TextField } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import SendIcon from '@mui/icons-material/Send';
import { makeStyles } from "@material-ui/core";
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';

function MessageField(props) {
  const socketRef = props.socketRef;
  const roomId = props.roomId;
  const user = props.user
  const [message, setMessage] = useState("");


  const sendMessage = (e) => {
    e.preventDefault();
    socketRef.current.emit('message', { message, roomId, user });
    setMessage('');
  }

  const useStyles = makeStyles({
    root: {
      background: '#45acc9',
      color: 'white',
      padding: '13px 35px',
      borderRadius: 50,
      width: '100%'
    },
    textField: {
      ['& fieldset']: {
        borderRadius: 50

      }
    }
  })

  const classes = useStyles();

  return (

    <div className="message-container" >
      <div>
        {/* <TextField fullWidth
          variant="outlined"
          size="small"
          placeholder="message"
          className={classes.textField}
          value={message}
          onChange={e => setMessage(e.target.value)} /> */}
        <form>
          <input value={message} onChange={e => setMessage(e.target.value)} type="text" placeholder="Type a message" />
          <IconButton onClick={sendMessage} type="submit">
            <SendIcon sx={{ color: '#45acc9' }} fontSize='medium' />
          </IconButton>
        </form>
      </div>
    </div>

  )
}

export default MessageField