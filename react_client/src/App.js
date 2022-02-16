import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import TextField from '@material-ui/core/TextField';
import './App.css';
import axios from 'axios';
import Home from './components/Home';
import Matching from './components/Matching';
import Options from './components/Options';



function App() {

  return (

    <div className="app-background">

      {/* <Matching /> */}
      {/* <Home /> */}
      <Options />
    </div>

  );
}

export default App;