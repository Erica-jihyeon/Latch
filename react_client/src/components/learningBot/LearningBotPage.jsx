import React, { useState } from 'react';

import { IconButton } from "@material-ui/core";
import './LearningBotPage.css';
import botSaying from '../../img/bot_saying.gif';
import botAnswering from '../../img/bot_wink.gif';
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



// {
//   mode === 'answering' &&
//     <img src={botAnswering} alt="bot-wink" />
// }

function LearningBotPage() {

  const [mode, setMode] = useState('first');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState([]);
  const navigate = useNavigate();
  const classes = useStyles();

  console.log(question);
  const back = () => {
    navigate('/main');
  };

  const getBookmarkData = () => {

  };

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
      {mode === 'first' && <LearningBot botImg={botSaying} question={question} setQuestion={setQuestion} custom={classes.textField} mode={mode} setMode={setMode}/>}
    </div>
  )
}

export default LearningBotPage;
