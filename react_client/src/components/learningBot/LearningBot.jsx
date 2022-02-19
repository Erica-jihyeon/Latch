import React, { useEffect, useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import botSaying from '../../img/bot_saying.gif';
import botAnswering from '../../img/bot_wink.gif';
import botNoLikeAnswer from '../../img/bot_sad.gif';
import botLast from '../../img/bot_happy.gif';
import BottomButton from './BottomButton';
import axios from 'axios';
import { IconButton } from "@material-ui/core";
import './LearningBotPage.css';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { makeStyles } from '@material-ui/core/styles';
import  { loginContext } from '../../Providers/LoginProviders';


const useStyles = makeStyles({
  bookmark: {
    color: 'white',
  }
});


function LearningBot(props) {

  const [botImg, setBotImg] = useState(null);
  const [message, setMessage] = useState(null)
  const [question, setQuestion] = useState('');
  const classes = useStyles();

  const {user} = useContext(loginContext);


  useEffect(() => {
    const { answer, answerIndex, mode } = props;
    if (mode === 'first') {
      setBotImg(botSaying);
      setMessage(<p className='learningbot-message'>Hi, I’m a Learning Bot!<br />Do you have any questions?</p>)
    } else if (mode === 'answer') {
      setBotImg(botAnswering);
      setMessage(<p className="learningbot-message"><span className="learningbot-addbookmark"><IconButton onClick={addBookmark}>
      <BookmarkIcon className={classes.bookmark} />
    </IconButton></span><br />{answer[answerIndex] === ' ' ||  answer[answerIndex] === ''? "I'm sorry, I don't know now" : answer[answerIndex]}</p>)
    } else if (mode === "noLikeAnswer") {
      setBotImg(botNoLikeAnswer);
      setMessage(<p className='learningbot-message'>Oh...I'm sorry,<br />I'll find another answer!<br />Please give me one second!</p>)
    } else if (mode === 'last') {
      setBotImg(botLast);
      setMessage(<p className='learningbot-message'>Thanks!<br />Do you have any other questions?</p>)
    }
  }, [props.mode]);



  const getAnswerFromAPI = () => {
    var options = {
      method: 'GET',
      url: 'https://question-answer.p.rapidapi.com/question-answer',
      params: { question: question },
      headers: {
        'x-rapidapi-host': 'question-answer.p.rapidapi.com',
        'x-rapidapi-key': 'b33bf5d7f4msh256f184d8a1960ep11ae96jsnd29609668e33'
      }
    };

    axios.request(options).then(function (response) {
      console.log(response.data)
      if (response) {
        props.setAnswer(response.data);
        props.setMode('answer');
      }
    }).catch(function (error) {
      console.error(error);
    });
  }

  const addBookmark = () => {
    return axios.post('http://localhost:8080/api/bookmark', { userId: user.userId, message:message })
      .then((res) => {
        console.log(res.data);
        alert('added to the bookmark');
      })
  }



  return (
    <div className='learningbot-main-container'>
      <div className='learningbot'>
        {/* {props.mode === 'answer' &&
          <div className="learningbot-addbookmark">
            <button onClick={addBookmark}>add bookmark</button>
          </div>
        } */}
        {message}
        <img src={botImg} alt="bot-saying" />


        {props.mode === 'first' &&
          <>
            <TextField
              id="outlined-multiline-flexible"
              label="Please enter your question."
              multiline
              maxRows={4}
              className={props.custom}
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
              }}
            />
            <BottomButton onClick={() => { getAnswerFromAPI() }} buttonName={'next >'} />
          </>
        }

        {props.mode === 'answer' &&
          <div className='learningbot-answer'>
            <p>Do you like my answer?</p>
            <div className='learningbot-answer-buttons'>
              <button className='learningbot-answer-no' onClick={() => {
                switch (props.answerIndex) {
                  case 0: props.setAnswerIndex(1); break;
                  case 1: props.setAnswerIndex(2); break;
                  case 2: props.setAnswerIndex(3); break;
                  default: props.setAnswerIndex(0);
                }
                props.setMode('noLikeAnswer');
              }}>No</button>
              <button onClick={() => { setQuestion(''); props.setMode('last') }}>Yes</button>
            </div>
          </div>
        }

        {props.mode === 'last' &&
          <>
            <TextField
              id="outlined-multiline-flexible"
              label="Please enter your question."
              multiline
              maxRows={4}
              className={props.custom}
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
              }}
            />
            <BottomButton onClick={() => { getAnswerFromAPI() }} buttonName={'next >'} />
          </>
        }

      </div>
    </div>
  )
}

export default LearningBot;
