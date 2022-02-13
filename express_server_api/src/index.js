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




io.on('connection', (socket) => {
  // socket is the object of the current connected client

  //socket.emit => to current connected client
  //io.emit => to all clients
  io.emit('usercount', io.engine.clientsCount);
  console.log(io.engine.clientsCount);

  socket.on('message', ({ name, message }) => {
    console.log('Message received: ' + message);
    io.emit('message', ({ name, message }))
    // socket.emit('message', ({ name, message }))
  })

  // get the message
  // socket.on('message', (msg) => {
  //     console.log('Message received: ' + msg);
  //     // send message to all sockets
  //     io.emit('message', msg);
  // });


  socket.on('disconnect', function () {
    console.log('user disconnected')
    //update user count
    io.emit('usercount', io.engine.clientsCount);
  })
});




const matchingIo = io.of('/matching')
matchingIo.on('connection', (socket) => {


  matchingIo.emit('usercount', io.engine.clientsCount);
  // socket.join('room1');
  console.log(io.engine.clientsCount);

  // socket.on('message', ({ name, message }) => {
  //   console.log('Message received: ' + message);
  //   matchingIo.emit('message', ({ name, message }))
  //   // socket.emit('message', ({ name, message }))
  // })

  socket.on('joinRoom', ({roomId}) => {
    console.log('Room joined: ' + roomId);
    socket.join(roomId);
  })

  socket.on('message', ({ name, message, roomId }) => {
    matchingIo.in(roomId).emit('message', ({ name, message }))
  })

  socket.on('disconnect', function () {
    console.log('user disconnected')
    //update user count
    matchingIo.emit('usercount', io.engine.clientsCount);
  })

})


server.listen(port, function () {
  console.log(`Listening on http://localhost: ${port}`);
});