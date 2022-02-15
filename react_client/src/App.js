import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import TextField from '@material-ui/core/TextField';
import './App.css';
import axios from 'axios';
import Login from './components/Login';
import Matching from './components/matching';

function App() {

  return (
    <div className="app-background">
      <Matching />
    </div>
  );
}

export default App;