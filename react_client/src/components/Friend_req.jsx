import React from 'react';
import Friend_yes from '../img/Friend_yes.png';
import Friend_no from '../img/Friend_no.png';
import './Friend_req.css';
import Header from './Header';
import { useNavigate} from 'react-router-dom';
import { IconButton } from '@material-ui/core';

function Friend_req() {
  const navigate = useNavigate()
  const addfriend = () => {
    console.log("you add friend");
    navigate('/main')
  }
  const notAddfriend = () => {
    console.log("you did not add friend");
    navigate('/main')
  }
  return (
    <div className="login-container">
    <Header title="Add Friends" />

    <div className="Friend_req_container">
      <div id='Friend_sentence'>
      <h4>Would you like to be friends?</h4>
      </div>

      <div id='images'>
        <div className ="img_with_text">
          <IconButton>
          <img src={Friend_no} alt="no" onClick={notAddfriend} />
          </IconButton>
          <h4>No</h4>
        </div>
        <div className ="img_with_text">
        <IconButton>
          <img src={Friend_yes} alt="yes" onClick={addfriend}/>
        </IconButton>
          <h4>yes</h4>
        </div>
      </div>

    </div>
    </div>
  )
};

export default Friend_req