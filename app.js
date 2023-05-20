const express = require('express');
const http = require('http');
const app = express();
const fs=require('fs')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/login', (req, res, next) => {

  res.sendFile(__dirname + '/index.html');
  
});

app.post('/login', (req, res, next) => {
  const  username  = req.body.username;
  if (username) {
    res.redirect('/chats');
    //console.log(username)
  } else {
    res.redirect('/login');
  }
});

// app.get('/chats', (req, res, next) => {
  
//   res.sendFile(__dirname + '/chats.html');
  
// });

app.post('/mid',(req,res,next)=>{
  fs.appendFileSync('messages.txt',`${req.body.username}:${req.body.chat}`);
  res.redirect('/chats')
})

app.get('/chats', (req, res, next) => {
  let text = fs.readFileSync('messages.txt', 'utf8');
  if (text === "") {
    text = "No chat exists";
  }
  res.send(`
    <form action="/mid" method="POST" onsubmit="document.querySelector('#username').value = localStorage.getItem('username')">
      <p>${text}</p>
      <input type="text" placeholder="Chat" name="chat" id="chat">
      <input type="hidden" name="username" id="username">
      <button id="submit" type="submit">SEND</button>
    </form>
  `);
});
app.listen(5000)