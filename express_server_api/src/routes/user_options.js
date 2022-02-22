const express = require("express");
const router = express.Router();


const getUserOptions = (db, userId)  => {
  const queryStr = `select * from user_option WHERE user_id=$1`;
  const queryParam = [userId];

  return db
    .query(queryStr, queryParam)
    .then((data) => {
      // const result = data.rows.map(item => item = item.username);
      console.log(data.rows[0]);
      return data.rows[0];
    })
    .catch(err => {
      console.log(err.message);
    });
};



module.exports = (db, io) => {

  router.get("/", (req, res) => {
    console.log(req.query);
    getUserOptions(db, req.query.userId)
      .then((result) => {
        // console.log(result);
        res.json(result);
      });
  });


  return router;
};
