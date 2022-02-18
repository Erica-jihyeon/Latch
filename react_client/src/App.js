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
<<<<<<< HEAD
import LoginProvider from './Providers/LoginProviders';
=======
import Chat from './components/Chat';

>>>>>>> master


function App() {

  return (


    <div className="app-background">

      {/* <Matching /> */}
      {/* <Login /> */}
      {/* <Home /> */}
      {/* <Options /> */}
      {/* <LoginProvider>
        <SignIn />
      </LoginProvider> */}
      <Router>
<<<<<<< HEAD
        <LoginProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/main" element={<Main />} />
            <Route path="/matching" element={<Options />} />
            <Route path="/matching/chatroom/*" element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/addfriend" element={<Friend_req />} />

          </Routes>
        </LoginProvider>
=======

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/main" element={<Main />} />
          <Route path="/matching" element={<Options />} />
          <Route path="/matching/chatroom/:roomId" element={<Chat />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/addfriend" element={<Friend_req />} />
          {/* <Route path="/chat" element={<Chat />} /> */}

          

        </Routes>
>>>>>>> master
      </Router>
    </div>

  );
}

export default App;