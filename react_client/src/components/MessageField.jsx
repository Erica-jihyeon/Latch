import React, { useEffect, useState } from 'react';
import './MessageField.css';
import { TextField } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import SendIcon from '@mui/icons-material/Send';
import { makeStyles } from "@material-ui/core";
function MessageField(props) {
  const [input, setInput] = useState("");

  const sendMessage = () => {
    console.log(`Sent: ${input}`);
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
        <TextField fullWidth
          variant="outlined"
          size="small"
          placeholder="message"
          className={classes.textField}
          value={input}
          onChange={e => setInput(e.target.value)} />
        <IconButton onClick={sendMessage}>
          <SendIcon sx={{ color: '#45acc9' }} fontSize='medium' />
        </IconButton>
      </div>
    </div>

  )
}

export default MessageField