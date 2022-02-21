const express = require("express");
const router = express.Router();

const addUsersToFriendsList = (user1, user2, db) => {
  const queryStr = `INSERT INTO friends_list (user1_id, user2_id) VALUES ($1, $2)`;
  const queryParam = [user1, user2];

  return db
    .query(queryStr, queryParam)
    .then((data) => {
      console.log(data);
      console.log('users added to friends_list');
    })
    .catch(err => {
      console.log(err);
    })
}

module.exports = addUsersToFriendsList;