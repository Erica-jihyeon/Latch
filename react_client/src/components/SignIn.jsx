import { React, useContext, useEffect, useState } from 'react';
import './SignIn.css';
import logo from '../img/logo.png'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { IconButton } from '@material-ui/core';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Header from './Header';


import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';


import  { loginContext } from '../Providers/LoginProviders';
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


function SignIn() {



  const {login, auth} = useContext(loginContext);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const [userId, setUserId] = useState(0);
  const classes = useStyles();
  const navigate = useNavigate();
  const back = () => {
    navigate('/')
  };



  // useEffect(() => {
  //   // const {user} = useContext(loginContext);
  //   axios.get('http://localhost:8080/api/all_users', {username: "hello"})
  //     .then((res) => {
  //       // const result = res.data.map((key) => {key.username})
  //       setData(res.data);
  //     })
  //     .catch(err => {
  //       console.log(err.message);
  //     })
  // }, [])

  function onSubmit() {

    axios.get('http://localhost:8080/api/current_user', {params: {username: username}})
      .then((res) => {
        console.log(res.data);
        // const result = res.data.map((key) => {key.username})
        return res.data;
      })
      .then((data) => {
        //data is userId
        login(username, password, data);

        if (auth) {
          navigate('/main')
        }

      })
      .catch(err => {
        console.log(err.message);
      })
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
          <Button disableElevation variant='contained' className={classes.root} onClick={onSubmit}>Submit</Button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SignIn