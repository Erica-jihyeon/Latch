const express = require("express");
const router = express.Router();

module.exports = (db, io) => {

  //user click start button
  //find matching clients
  //db save
  //opt1. get roomId from DB(matching table id)
  //opt2. uuid -> give random str
  //send roomId to the client

  // io.on('connection', function (socket) {
  //   console.log('connected!');
  // })

  const getMatchingRoomId = () => {
    const roomNum = Math.floor((Math.random() * 5) + 1);
    return `room${roomNum}`;
  }

  router.get("/", (req, res) => {
    // req.io.emit("message", "hi")
    const roomId = getMatchingRoomId();
    // const roomId = "room1"
    res.json({ roomId })
  });
  return router;
};
