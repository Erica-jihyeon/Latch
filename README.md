# Latch
Latch is an app that allows users to quickly and easily find language exchange partners to practice learning the language or languages of their choice. For users who may want to learn on their own, we have a learning bot that allows users to ask how to say things in different languages and quickly receive answers in the app. Latch was built on PostgreSQL, Express, React, and Node, and also uses Socket.io for websockets as well as two APIs for translations and the learning bot.

# App Demo


https://user-images.githubusercontent.com/83943027/155615652-351b8f4d-3575-443a-bc6d-1d4708601f0c.mp4


# Demo WebSocket

WebSockets are fun!  This repo contains a websockets enabled  demo Express Server with a built-in jquery websockets chat app as well as a demo React websockets chat app 

Run each as a separate node project with:

```
npm install
npm start
```

Try running both client apps at the same time in different browser windows to watch what happens.

Browse to http://localhost:8080 for the built-in jQuery App

The React App does an auto-connect when it renders.  The jQuery App hse a manual connect.  Both methods are used in apps so it really depends on your particular design.
