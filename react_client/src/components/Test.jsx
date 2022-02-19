import React from 'react';
import './Test.css';
import Header from './Header';
import axios from 'axios';

function Test(username) {
  return (
    axios.get('http://localhost:8080/api/bookmark', { params: { username: username } })
      .then((res) => {
        console.log(res.data);
      })
  )
}
Test('hello')

export default Test