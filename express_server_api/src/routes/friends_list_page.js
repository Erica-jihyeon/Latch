const express = require('express');
const router = express.Router();


const selectFriendList = (db, userId) => {
  const query = `SELECT username FROM friends_list JOIN users ON users.id = user1_id WHERE user2_id = $1
  UNION
  SELECT username FROM friends_list JOIN users ON users.id = user2_id WHERE user1_id = $1`;
  const queryParam = [userId];

  

  return db
    .query(query, queryParam)
    .then((data) => {
      // console.log(data.rows)

      let result = [];
      for (let i = 0; i < data.rows.length; i++) {
        result.push(data.rows[i].username);
      }
      return result;
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
        console.log('++',result);
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
