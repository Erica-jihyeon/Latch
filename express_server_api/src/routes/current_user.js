const express = require("express");
const router = express.Router();


const currentUser = (db, username)  => {
  const queryStr = `select id from users WHERE username=$1`;
  const queryParam = [username];

  return db
    .query(queryStr, queryParam)
    .then((data) => {
      // const result = data.rows.map(item => item = item.username);
      console.log(data.rows[0].id);
      return data.rows[0].id;
    })
    .catch(err => {
      console.log(err.message);
    });
};



module.exports = (db, io) => {

  router.get("/", (req, res) => {
    console.log(req.query);
    currentUser(db, req.query.username)
      .then((result) => {
        console.log(result);
        res.json(result);
      });
  });


  return router;
};
