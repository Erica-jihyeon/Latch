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

// database test
// const testQuery = `SELECT id, first_name FROM users`;
// db.query(testQuery)
//     .then((result) => {
//       console.log(`db test: ${result.rows}`);
//     })
//     .catch((err) => {
//       console.log(err.message)
//     })



//login
app.get('/login/:id', (req, res) => {
  req.session.user_id = req.params.id;
  console.log('login')
  res.redirect('/');
});


// using router
const test = require("./routes/test");

app.use("/test", test(db, io));


const queue = [];
const paired = [];
let expectedOption = 0;
let expectedLanguageKey = 0;
let selectedLanguage = '';



io.on('connection', (socket) => {
  io.emit('usercount', io.engine.clientsCount);

  console.log(socket.id)


  socket.on('matchReq', (client) => {
    queue.push(client);
    console.log(client);
    io.to(socket.id).emit({roomId: roomId});


    setTimeout(() => {
      let roomId = uuidv1();
      io.to(socket.id).emit({roomId: roomId});
      // io.emit('roomId', ({ roomId: 1 }));
    }, 3000)
  });

  socket.on('disconnect', function () {
    console.log('user disconnected')
    // //update user count
    // io.emit('usercount', io.engine.clientsCount);
  })

});










// const matchingIo = io.of('/matching')
// matchingIo.on('connection', (socket) => {



//   socket.on('matchReq', (client) => {

//     queue.push(client);
//     console.log(queue);

//     // if (user.option === 1) {
//     //   expectedOption = 2;
//     //   expectedLanguageKey = 'learning';
//     //   selectedLanguage = user.speaking;

//     // } else if (user.option === 2) {
//     //   expectedOption = 1;
//     //   expectedLanguageKey = 'speaking';
//     //   selectedLanguage = user.learning;

//     // } else if (user.option === 3) {
//     //   expectedOption = 3;
//     //   expectedLanguageKey = 'speaking';
//     //   selectedLanguage = user.learning;

//     // } else {
//     //   //send error to the client
//     //   expectedOption = null;
//     //   expectedLanguageKey = null;
//     //   selectedLanguage = null;
//     // }

//     // //const expectedOption = user.option === 1 ? 2 : 1;
//     // //const expectedLanguageKey = user.option === 1 ? 'learning' : 'speaking';
//     // // const selectedLanguage = user.option === 1 ? user.speaking : user.learning;

//     // const matchedUser = queue.find(client => client.option === expectedOption && client[expectedLanguageKey] === selectedLanguage);


//     // if (matchedUser) {
//     //   // if find the matched user send them to created room
//     //   paired.push([user, matchedUser]);

//     //   const userIndex = queue.findIndex((index => index === matchedUser));

//     //   queue.splice(userIndex, 1);


//     // } else {
//     //   // if can not find matched user, add to the queue
//     //   queue.push(user);
//     // }

//     setTimeout(() => {

//       let roomId = uuidv1();
//       matchingIo.emit('roomId', ({ roomId: 1 }));
//     }, 3000)


//   })


// matchingIo.emit('usercount', io.engine.clientsCount);
// // socket.join('room1');
// console.log(io.engine.clientsCount);

// // socket.on('message', ({ name, message }) => {
// //   console.log('Message received: ' + message);
// //   matchingIo.emit('message', ({ name, message }))
// //   // socket.emit('message', ({ name, message }))
// // })

// socket.on('joinRoom', ({roomId}) => {
//   console.log('Room joined: ' + roomId);
//   socket.join(roomId);
// })

// socket.on('message', ({ name, message, roomId }) => {
//   matchingIo.in(roomId).emit('message', ({ name, message }))
// })

// socket.on('disconnect', function () {
//   console.log('user disconnected')
//   //update user count
//   matchingIo.emit('usercount', io.engine.clientsCount);
// })

// })


server.listen(port, function () {
  console.log(`Listening on http://localhost: ${port}`);
});