# GIT WORKFLOW

//command line  
git branch feature/test  
git checkout feature/test  
git add .  
git commit  
git push origin feature/test  
  
//git hub page  
1. pull request  
2. merge pull request -> delete branch (the other member)  
  
//command  
git checkout master  
git pull origin master  

//option1-when use feature/test  
git checkout feature/test  
git merge master  
  
//option2-delete branch & make new branch  
git branch -d feature/test  


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
