import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import TextField from '@material-ui/core/TextField';
import './App.css';
import axios from 'axios';
import Home from './components/Home';
import Matching from './components/Matching';
import Matched from './components/Matched';
import MatchingTimeout from './components/Matching_timeout'
import Options from './components/Options';
import {BrowserRouter as Router, Link, Route, Routes, Navigate} from 'react-router-dom';



function App() {

  return (


    <div className="app-background">


          <div className="matchin_container">
      <span id="top_sentence">Find Latches</span>
      <div className="matching_main">
        <Router>
          {/* <nav>
            <Link to="/">Matching</Link>
            <Link to="/matched">Matched</Link>
            <Link to="/matchTimeout">Fail</Link>
          </nav> */}

          <Routes>
            <Route path="/" element={<Matching />} />
            <Route path="/matched" element={<Matched />} />
            <Route path="/matchTimeout" element={<MatchingTimeout />} />
            {/* <Route path="*" element={<h2>Wrong path</h2>} /> */}
            <Route path="*" element={<Navigate to="matchTimeout" />} />
          </Routes>
        </Router>
      </div>
    </div>

    </div>

  );
}

export default App;