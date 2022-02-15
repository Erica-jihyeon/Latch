const express = require("express");
const router = express.Router();
const { findMatching, queue, paired } = require('./helper');


module.exports = (db, io) => {

  //user click start button
  //find matching clients
  //db save
  //opt1. get roomId from DB(matching table id)
  //opt2. uuid -> give random str
  //send roomId to the client


  // const getMatchingRoomId = () => {
  //   const roomNum = Math.floor((Math.random() * 5) + 1);
  //   return `room${roomNum}`;
  // }



  router.get("/", (req, res) => {
    // req.io.emit("message", "hi")
    const roomId = getMatchingRoomId();
    // const roomId = "room1"
    res.json({ roomId })
  });



  router.post("/", (req, res) => {
    // req.io.emit("message", "hi")


    // console.log(req.body);
    const client = req.body;

    findMatching(client);


    setTimeout(() => {

      const indexOfPair = paired.findIndex(pair => pair.match1.userId === client.userId || pair.match2.userId === client.userId);

      // console.log(indexOfPair)

      if (indexOfPair + 1) {
        res.json({ matchingResult: paired[indexOfPair].roomId });
        //after pair remove data from pair array, all matching history are in DB
        setTimeout(() => {
          if (paired[indexOfPair]) {
            // console.log(paired);
            paired.splice(indexOfPair, 1);
          }
          // console.log(paired);
        }, 6000);
      } else {
        const clientIndex = queue.findIndex((queueUser => queueUser.userId === client.userId));
        queue.splice(clientIndex, 1);
        // console.log(queue);
        res.json({ matchingResult: false });
      }

    }, 6000);


    // findMatching(client);


    // setTimeout(() => {
    //   res.json({ text: 'hi' });
    //   //remove from the que
    // }, 3000);

  });




  return router;
};
