import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import TextField from '@material-ui/core/TextField';
import './App.css';
import axios from 'axios';
import Home from './components/Home';
import Matching from './components/matching';
import Matched from './components/Matched';
import MatchingTimeout from './components/Matching_timeout'
import Options from './components/Options';
import { BrowserRouter as Router, Link, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './components/SignIn';
// import Main from './components/Main';



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
          {/* <Route path="/main" element={<Main />} /> */}
          <Route path="/matching" element={<Options />} />
          <Route path="*" element={<Navigate to="/home" />} />
          <Route path="/matching/finding" element={<Matching />} />
          <Route path="/matching/found" element={<Matched />} />
          <Route path="/matching/notfound" element={<MatchingTimeout />} />

        </Routes>
      </Router>
    </div>

  );
}

export default App;