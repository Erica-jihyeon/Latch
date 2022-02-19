import React, { useState, useRef, useEffect, useContext } from 'react';

import { IconButton } from "@material-ui/core";
import './LearningBotPage.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useNavigate } from 'react-router-dom';
import LearningBot from './LearningBot';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { loginContext } from '../../Providers/LoginProviders';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';


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
    width: 280,
    ['& fieldset']: {
      borderRadius: 10
    }
  },
  bookmark: {
    marginRight: 15,
    color: '#f48080',
  }
});

function LearningBotPage() {

  const [mode, setMode] = useState('first');
  const [answer, setAnswer] = useState([]);
  const [answerIndex, setAnswerIndex] = useState(0);
  const navigate = useNavigate();
  const classes = useStyles();

  const { user } = useContext(loginContext);

  const back = () => {
    navigate('/main');
  };

  const getBookmarkData = () => {
    return axios.get('http://localhost:8080/api/bookmark', { params: { userId: user.userId } })
      .then((res) => {
        console.log(res.data);
        setMode('bookmark');
      })
  };

  useEffect(() => {
    if (mode === "noLikeAnswer") {
      const timer = setTimeout(() => {
        setMode('answer')
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [mode]);

  return (
    <div className='learningbot-container'>
      <div className='learningbot-header'>
        <IconButton onClick={back}>
          <ArrowBackIosNewIcon fontSize="large" />
        </IconButton>
        <h4>Learning Bot</h4>
        <IconButton onClick={getBookmarkData}>
          <BookmarkIcon className={classes.bookmark} />
        </IconButton>
      </div>
      {mode === 'bookmark' &&
        <Alert variant="primary" dismissible>
        <Alert.Heading>Translation</Alert.Heading>
        <p>alert</p>
      </Alert>
      }
      {mode !== 'bookmark' &&
        <LearningBot
          mode={mode}
          answer={answer}
          answerIndex={answerIndex}
          custom={classes.textField}
          setMode={setMode}
          setAnswer={setAnswer}
          setAnswerIndex={setAnswerIndex}
        />
      }
    </div>
  )
}

export default LearningBotPage;
