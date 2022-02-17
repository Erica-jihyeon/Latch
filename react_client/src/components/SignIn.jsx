import { React, useState } from 'react';
import './SignIn.css';
import logo from '../img/logo.png'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { borderRadius, borders } from '@mui/system';
import { FilledInput } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Header from './Header';


import { makeStyles } from '@material-ui/core/styles'
import { withStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    background: '#45acc9',
    color: 'white',
    padding: '13px 35px',
    borderRadius: 50,
    width: '100%'
  },
  textField: {
    marginTop: 10,
    marginBottom: 10,
    ['& fieldset']: {
      borderRadius: 50

    }
  }
})

function Submit() {
  const navigate = useNavigate();
  const classes = useStyles();
  return <Button disableElevation variant='contained' className={classes.root} onClick={() => {navigate('/main')}}>Submit</Button>
}


function SignIn() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const classes = useStyles();
  const back = () => {
    console.log('back');
  }


  return (
    <div className="login-container">
      <Header title="Sign in"
        back={
          <IconButton onClick={back}>
            <ArrowBackIosNewIcon fontSize="large" />
          </IconButton>
        } />
      <div className="signin-main">

        <img className='signin-logo' src={logo} alt="" />
        <div>
          <TextField
            fullWidth
            placeholder='username'
            variant='outlined'
            size='small'
            className={classes.textField}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
            }}
          />
          <TextField
            fullWidth
            placeholder='password'
            type='password'
            variant='outlined'
            size='small'
            className={classes.textField}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
        <div className="bottom-container">
          <p>Terms & Privacy Policy</p>
          <div className="button-container">
            <Submit />
          </div>
        </div>

      </div>
    </div>
  )
}

export default SignIn