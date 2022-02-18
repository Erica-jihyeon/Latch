import React from 'react';
import TextField from '@material-ui/core/TextField';
import BottomButton from './BottomButton';



function LearningBot(props) {


  return (
    <div className='learningbot-main-container'>
      <div className='learningbot'>
        <p className='learningbot-message'>
          Hi, I’m a Learning Bot!<br />Do you have any questions?
        </p>
        <img src={props.botImg} alt="bot-saying" />
        <TextField
          id="outlined-multiline-flexible"
          label="Please enter your question."
          multiline
          maxRows={4}
          className={props.custom}
          value={props.question}
          onChange={(e) => {
            props.setQuestion(e.target.value);
          }}
        />
      </div>
      <BottomButton onClick={() => { }} buttonName={'next >'} />
    </div>
  )
}

export default LearningBot;
