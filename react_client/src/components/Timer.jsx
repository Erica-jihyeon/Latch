import React, { useEffect, useState } from 'react'
import './Timer.css';

function Timer(props) {
  const [time, setTime] = useState({
    m: 2,
    s: 0,
  });

  const [timer, setTimer] = useState(null);

  const startTimer = () => {
    let myInterval = setInterval(() => {
      setTime((time) => {
        const updatedTime = { ...time };
        if (time.s > 0) {
          updatedTime.s--;
        }

        if (time.s === 0) {
          if (time.m === 0) {
            clearInterval(myInterval);
            props.chatTimeout();
          } else if (time.m > 0) {
            updatedTime.m--;
            updatedTime.s = 59;
          }
        }

        return updatedTime;
      });
    }, 1000);
    setTimer(myInterval);
  };

  useEffect(() => {
    startTimer();
  }, [])

  return (
    <div className='matched-chat-counter'>
      <p className='matched-chat-counter-text'>
      Chat will be ended in <span className='matched-chat-counter'>
        {time.h < 10 && time.h !== 0
          ? `0${time.h}:`
          : time.h >= 10 && `${time.h}:`}
        {time.m < 10 ? `0${time.m}` : time.m}:
        {time.s < 10 ? `0${time.s}` : time.s}
        </span>.
      </p>
    </div>
  );
}

export default Timer