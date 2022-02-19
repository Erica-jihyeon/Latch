import React from 'react';

function BottomButton(props) {
  return (
    <div className='learningbot_button'>
      <button onClick={props.onClick}>{props.buttonName}</button>
    </div>
  )
}

export default BottomButton;
