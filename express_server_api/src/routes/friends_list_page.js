const express = require('express');
const router = express.Router();


const selectFriendList = (db, userId) => {
  const query = `SELECT * FROM friends_list WHERE user1_id = $1 UNION SELECT * FROM friends_list WHERE user2_id = $1`;
  const queryParam = [userId];

  return db
    .query(query, queryParam)
    .then((data) => {
      let result = [];
      console.log('selecting', data.rows);

      
      return data.rows;
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = (db) => {

  router.get("/", (req, res) => {
    console.log(req.query.userId);
    selectFriendList(db, req.query.userId)
      .then((result) => {
        res.json(result);
      });
  });

  // router.post("/", (req, res) => {
  //   const userId = req.body.userId;
  //   console.log(userId)
  //   selectFriendList(db, userId)
  //     .then((result) => {
  //       res.json(result);
  //     });
  // });


  return router;
};
