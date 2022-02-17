import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import TextField from '@material-ui/core/TextField';
import './App.css';
import axios from 'axios';
import Home from './components/Home';
import Options from './components/Options';
import { BrowserRouter as Router, Link, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './components/SignIn';
import Main from './components/Main';
import Friend_req from './components/Friend_req';



function App() {

  return (


    <div className="app-background">

      {/* <Matching /> */}
      {/* <Login /> */}
      {/* <Home /> */}
      {/* <Options /> */}
      <Router>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/main" element={<Main />} />
          <Route path="/matching" element={<Options />} />
          <Route path="/matching/chatroom/*" element={<Home />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/addfriend" element={<Friend_req />} />

          

        </Routes>
      </Router>
    </div>

  );
}

export default App;