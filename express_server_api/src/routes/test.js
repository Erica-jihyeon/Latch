const express = require("express");
const router = express.Router();
const { v1: uuidv1 } = require('uuid');


const client1 = { speaking: 'ko', learning: 'en', option: 2 };
const client2 = { speaking: 'en', learning: 'ko', option: 1 };


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

  let queue = []; //all the playlist who pressed the start button
  let paired = [];


  const findMatching = (user) => {

    let expectedOption = 0;
    let expectedLanguageKey = 0;
    let selectedLanguage = '';

    if (user.option === '1') {
      expectedOption = '2';
      expectedLanguageKey = 'learning';
      selectedLanguage = user.speaking;

    } else if (user.option === '2') {
      expectedOption = '1';
      expectedLanguageKey = 'speaking';
      selectedLanguage = user.learning;

    } else if (user.option === '3') {
      expectedOption = '3';
      expectedLanguageKey = 'speaking';
      selectedLanguage = user.learning;

    } else {
      //send error to the client
      expectedOption = null;
      expectedLanguageKey = null;
      selectedLanguage = null;
    }

    const matchedUser = queue.find(client => client.option === expectedOption && client[expectedLanguageKey] === selectedLanguage);



    if (matchedUser) {
      // if find the matched user, creat the room

      let roomId = uuidv1();
      paired.push({ match1: user, match2: matchedUser, roomId: roomId });
      const userIndex = queue.findIndex((index => index === matchedUser));
      queue.splice(userIndex, 1);
      // add to the DB!!!

      // console.log(paired);
    } else {
      // if can not find matched user, add to the queue
      console.log('no matching')
      queue.push(user);
    }

  }




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
