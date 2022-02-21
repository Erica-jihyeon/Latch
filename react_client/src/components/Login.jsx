import { React, useContext, useEffect, useState, useRef } from 'react';
import './Login.css';
import logo from '../img/logo.png'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { IconButton } from '@material-ui/core';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Header from './Header';

import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';

import { loginContext } from '../Providers/LoginProviders';
import axios from 'axios';


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




function LogIn() {

  const { login, auth } = useContext(loginContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const userIdRef = useRef(null);
  const classes = useStyles();
  const navigate = useNavigate();
  const back = () => {
    navigate('/');
  };


  useEffect(() => {
    if (auth) {
      console.log(auth);
      navigate('/main');
    }
  }, [auth, navigate]);

  const getUserId = (username) => {
    return axios.get('http://localhost:8080/api/current_user', { params: { username: username } })
      .then((res) => {
        console.log(res.data);
        userIdRef.current = res.data;
      })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    getUserId(username)
      .then(() => { login(username, password, userIdRef.current) })
      .catch(err => {
        console.log(err.message);
      })
    navigate('/main');
  }



  return (
    <div className="login-container">
      <Header title="Log in"
        back={
          <IconButton onClick={back}>
            <ArrowBackIosNewIcon sx={{ color: '#9d9d9d'}} fontSize="large" />
          </IconButton>
        } />
      <div className="login-main">

        <img className='login-logo' src={logo} alt="" />
        <div>
          <TextField
            fullWidth
            placeholder='USERNAME'
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
            placeholder='PASSWORD'
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
        <div className="login-bottom-container">
          <p>Terms & Privacy Policy</p>
          <div className="login-button-container">
            <Button disableElevation variant='contained' className={classes.root} onClick={onSubmit}>Submit</Button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default LogIn