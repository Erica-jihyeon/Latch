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

const checkUsersAreFriends = (queryParam, roomId, matchingIo, db) => {
  const queryStr = `
  SELECT * FROM friends_list WHERE user1_id = $1 AND user2_id = $2
  UNION
  SELECT * FROM friends_list WHERE user1_id = $2 AND user2_id = $1`

  return db
    .query(queryStr, queryParam)
    .then((data) => {
      console.log('DATA', data);
      if (data.rows.length === 0) {
        return matchingIo.in(roomId).emit('usersAreFriends', ({ usersAreFriends: false }));
      }
      return matchingIo.in(roomId).emit('usersAreFriends', ({ usersAreFriends: true }));

    })
    .catch(err => {
      console.log(err);
    })
}

module.exports = {addUsersToFriendsList, checkUsersAreFriends};