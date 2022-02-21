import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import TextField from '@material-ui/core/TextField';
import './App.css';
import axios from 'axios';
import Home from './components/Home';
import Options from './components/Options';
import { BrowserRouter as Router, Link, Route, Routes, Navigate } from 'react-router-dom';
import LogIn from './components/Login';
import Main from './components/Main';
import Friend_req from './components/Friend_req';
import LoginProvider, { loginContext } from './Providers/LoginProviders';
import Chat from './components/Chat';
import BottomNav from './components/bottom_nav';
import LearningBotPage from './components/learningBot/LearningBotPage';
import FriendList from './components/FriendList/Friends_main';


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
        <LoginProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/main" element={<Main />} />
            <Route path="/matching" element={<Options />} />
            <Route path="/matching/chatroom/*" element={<Chat />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/addfriend" element={<Friend_req />} />
            {/* <Route path="/bottom" element={<BottomNav />} /> */}
            <Route path="/learningbot" element={<LearningBotPage />} />
            <Route path="/friendlist" element={<FriendList />} />

          </Routes>
        </LoginProvider>

      </Router>
    </div>

  );
}

export default App;