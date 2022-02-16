import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import TextField from '@material-ui/core/TextField';
import './App.css';
import axios from 'axios';
import Login from './components/Login';
import Matching from './components/Matching';
import Matched from './components/Matched';
import MatchingTimeout from './components/Matching_timeout'
import Options from './components/Options';



function App() {

  return (

    <div className="app-background">

      {/* <Matching /> */}
      {/* <Login /> */}

          <div className="matchin_container">
      <span id="top_sentence">Find Latches</span>
      <div className="matching_main">
        <MatchingTimeout />
      </div>
    </div>
    </div>

  );
}

export default App;