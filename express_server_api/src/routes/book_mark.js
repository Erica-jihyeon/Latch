const express = require("express");
const router = express.Router();


const getBookmark = (db, userId) => {
  const queryStr = `SELECT answers FROM bookmark where user_id = $1`;
  const user = [userId];

  return db
    .query(queryStr, user)
    .then((data) => {
      console.log("++++",data.rows[0].answers);
      return data.rows;
    })
    .catch(err => {
      console.log(err.message);
    });
};

const addBookmark = (db, userId, answer) => {
  const queryStr = `INSERT INTO bookmark (user_id, answers) VALUES ($1, $2) RETURNING*`;
  const queryParam = [userId, answer];

  return db
    .query(queryStr, queryParam)
    .then((data) => {
      console.log(data);
      console.log('add answer to the bookmark')
      return data;
    })
    .catch(err => {
      console.log(err.message);
    });
};


module.exports = (db) => {

  router.get("/", (req, res) => {
    getBookmark(db, req.query.userId)
      .then((result) => {
        res.json(result);
      });
  });

  router.post("/", (req, res) => {
    const userId = req.body.userId;
    const answer = req.body.answer;
    console.log(userId, answer);
    
    addBookmark(db, userId, answer)
      .then((result) => {
        res.json(result);
      });
  });


  return router;
};
