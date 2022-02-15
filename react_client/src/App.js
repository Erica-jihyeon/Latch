import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import TextField from '@material-ui/core/TextField';
import './App.css';
import axios from 'axios';
import Login from './components/Login';
import Options from './components/Options';




function App() {

  return (

    <div className="app-background">
      {/* <Login /> */}
      <Options />
    </div>

  );
}

export default App;