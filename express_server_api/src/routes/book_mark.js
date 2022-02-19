const express = require("express");
const router = express.Router();


const userBookmark = (db, userId) => {
  const queryStr = `SELECT answers FROM bookmark where user_id = $1`;
  const user = [userId];

  return db
    .query(queryStr, user)
    .then((data) => {
      console.log("++++",data.rows[0].answers);
      return data.rows[0];
    })
    .catch(err => {
      console.log(err.message);
    });
};



module.exports = (db, io) => {

  router.get("/", (req, res) => {
    userBookmark(db, req.query.userId)
      .then((result) => {
        res.json(result);
      });
  });


  return router;
};
