require("dotenv").config();

var app = require('express')();
const express = require("express");
var server = require('http').createServer(app);
const port = process.env.PORT || 8080;
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieSession = require('cookie-session');
const { Pool } = require('pg');
const { v1: uuidv1 } = require('uuid');
const { findMatching, queue, paired } = require('./routes/helper');
const { AddUserOptionsToDB } = require('./matching_dbquery.js');


const io = require("socket.io")(server, {
  cors: {
    //where the request is coming from
    origin: `*`,
    credentials: true,
  },
});

app.use(cors({ origin: `*`, credentials: true }));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(morgan('dev'));
app.use(cookieSession({
  name: 'session',
  keys: ['this is the key', 'key2']
}));

const db = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect()
  .then(() => console.log('db connected'))
  .catch(err => console.error('db connection error', err.stack));

//login
// app.get('/login/:id', (req, res) => {
//   req.session.user_id = req.params.id;
//   console.log('login')
//   res.redirect('/');
// });

//

//TEST
// const clientTest = {userId:5, learning:'Korean', speaking:'English', option:'3'}
// AddUserOptionsToDB(clientTest, db);

const langList = require("./routes/lang_list");
app.use("/api/lang_list", langList(db));

const user = require("./routes/current_user");
app.use("/api/current_user", user(db));


// using router for matching
const matching = require("./routes/matching_router(ref)");
app.use("/matching", matching(db, io));


// using websocket for matching
io.on('connection', (socket) => {
  console.log('usercount', io.engine.clientsCount);


  socket.on('matchReq', (client) => {
    // Track socket.id and matching result
    client.socketId = socket.id;
    client.isMatched = false;
    // console.log(client);

    AddUserOptionsToDB(client, db);

    /**
     * Found matching?
     * client will be paired array with matched client : client will be  in queue array
     */
    findMatching(client, db);

    const indexOfPair = paired.findIndex(pair => pair.match1.userId === client.userId || pair.match2.userId === client.userId);

    if (indexOfPair >= 0) {
      paired[indexOfPair].match1.isMatched = true;
      paired[indexOfPair].match2.isMatched = true;
      io.to(paired[indexOfPair].match1.socketId).emit('roomId', { roomId: paired[indexOfPair].roomId });
      io.to(paired[indexOfPair].match2.socketId).emit('roomId', { roomId: paired[indexOfPair].roomId });
      // paired.splice(indexOfPair, 1);
      // console.log(paired);
    }

    //cancel from the client before starting a match chat
    socket.on('cancelMatchChat', function () {
      paired[indexOfPair].match1.socketId === socket.id ? io.to(paired[indexOfPair].match2.socketId).emit('cancelMatchChat', { message: 'this chat is canceled by other user' }) : io.to(paired[indexOfPair].match1.socketId).emit('cancelMatchChat', { message: 'this chat is canceled by other user' });
    })

    //if client cancel the matching, then remove from the queue
    socket.on('cancelMatching', () => {
      const clientIndex = queue.findIndex((queueUser => queueUser.userId === client.userId));
      if (clientIndex >= 0) {
        queue.splice(clientIndex, 1);
      }
    })

    setTimeout(() => {

      if (!client.isMatched) {
        // console.log(queue);
        const clientIndex = queue.findIndex((queueUser => queueUser.userId === client.userId));
        queue.splice(clientIndex, 1);
        // console.log(queue);
        io.to(client.socketId).emit('roomId', { roomId: false });
      } else {
        const indexOfPair = paired.findIndex(pair => pair.match1.userId === client.userId || pair.match2.userId === client.userId);
        if (indexOfPair >= 0) {
          paired.splice(indexOfPair, 1);
          // console.log(paired);
        }
      }
      socket.disconnect();
    }, 5000);

  });

  socket.on('disconnect', function (client) {
    console.log('user disconnected');
  })


});










const matchingIo = io.of('/matching')
matchingIo.on('connection', (socket) => {

  matchingIo.emit('usercount', io.engine.clientsCount);
  // socket.join('room1');
  // console.log(io.engine.clientsCount);

  // socket.on('message', ({ name, message }) => {
  //   console.log('Message received: ' + message);
  //   matchingIo.emit('message', ({ name, message }))
  //   // socket.emit('message', ({ name, message }))
  // })

  var numClients = {};
  socket.on('joinRoom', ({ roomId, userId }) => {

    console.log('Room joined: ' + roomId);
    socket.join(roomId);

    // socket.roomId = roomId;
    // if (!numClients[roomId]) {
    //     numClients[roomId] = 1;
    // } else {
    //     numClients[roomId]++;
    // }
    // console.log(numClients);

    // if (clients === 2) {
      setTimeout(() => {
        matchingIo.in(roomId).emit('friendRequest');
        socket.disconnect();
      }, 10000);
    // }

  })
  socket.on('leaveChat', ({roomId}) => {
    matchingIo.in(roomId).emit('leaveChat', ({ message: "matched user left the chat" }));
  })
  // socket.on('message', ({ name, message, roomId }) => {
  //   matchingIo.in(roomId).emit('message', ({ name, message }))
  // })

  socket.on('message', ({ message, roomId, user }) => {
    console.log('message received');
    matchingIo.in(roomId).emit('message', ({ message, user }));
  })



  socket.on('disconnect', function () {
    console.log('matchingIo user disconnected');
    //update user count
    matchingIo.emit('usercount', io.engine.clientsCount);
  })

})


server.listen(port, function () {
  console.log(`Listening on http://localhost: ${port}`);
});