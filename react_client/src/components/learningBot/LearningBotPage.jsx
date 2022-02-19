import React, { useState, useRef, useEffect } from 'react';

import { IconButton } from "@material-ui/core";
import './LearningBotPage.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useNavigate } from 'react-router-dom';
import LearningBot from './LearningBot';
import { makeStyles } from '@material-ui/core/styles';


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
    marginRight: 15
  }
});

function LearningBotPage() {

  const [mode, setMode] = useState('first');
  const [answer, setAnswer] = useState([]);
  const [answerIndex, setAnswerIndex] = useState(0);
  const navigate = useNavigate();
  const classes = useStyles();

  const back = () => {
    navigate('/main');
  };

  const getBookmarkData = () => {

  };

  // useEffect(() => {
  //   if (answer.length !== 0) {
  //     setMode('answer');
  //     console.log(answer);
  //     console.log('hi');
  //   }
  // },[answer])

  useEffect(() => {
    if (mode === "noLikeAnswer") {
      const timer = setTimeout(() => {
        setMode('answer')
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [mode]);

  // const reset = () => {
  //   setQuestion('');
  //   setAnswer([]);
  //   setAnswerIndex(0);
  // }

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
      <LearningBot
        mode={mode}
        answer={answer}
        answerIndex={answerIndex}
        custom={classes.textField}
        setMode={setMode}
        setAnswer={setAnswer}
        setAnswerIndex={setAnswerIndex}
        />
    </div>
  )
}

export default LearningBotPage;
