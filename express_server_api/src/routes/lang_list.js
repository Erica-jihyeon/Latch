const express = require("express");
const router = express.Router();


const getAllLangs = (db) => {
  const queryStr = `SELECT language_name FROM languages`

  return db
    .query(queryStr)
    .then((data) => {
      const result = data.rows.map(item => item = item.language_name);
      return result;
    })
    .catch(err => {
      console.log(err.message); 
    });
};



module.exports = (db, io) => {

  router.get("/", (req, res) => {
    getAllLangs(db)
      .then((result) => {
        res.json(result);
      })
  });


  return router;
};
