import React, {useState, useEffect} from 'react';
import './Counter.css';

function Counter(props) {

  const [seconds, setSeconds] = useState(120);

  useEffect(() => {
    let countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        clearInterval(countdown);
        props.chatTimeout();
      }
    }, 1000)
    return () => {
      clearInterval(countdown);
    }
  });
  return (
    <div className='matched-chat-counter'>
      <p className='matched-chat-counter-text'>Chat will be ended in <span className='matched-chat-counter'>{seconds}</span> seconds.</p>
    </div>
  )
}

export default Counter
