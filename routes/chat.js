const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res, next) => {
  // Retrieve the username from the session
  const username = req.session.username;

  // Check if the user is logged in
  if (!username) {
    res.redirect('/login');
    return;
  }

  // Read the content of the username.txt file
  fs.readFile('username.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // Split the content into lines and filter out empty lines
      const lines = data.split('\n').filter(line => line.trim() !== '');

      // Render the chat history and chat input form to the user
      res.send(`
        <h1>Chat History</h1>
        <ul>${lines.map(line => `<li>${line}</li>`).join('')}</ul>
        <form action="/chat" method="POST">
          <input type="text" name="chat" placeholder="Enter your message">
          <button type="submit">Send</button>
        </form>
      `);
    }
  });
});

router.post('/', (req, res, next) => {
  // Retrieve the username from the session
  const username = req.session.username;
  
  const chatData = req.body.chat;

  const fileName = 'username.txt';

  // Append the chat data to the file with a newline character
  fs.appendFile(fileName, `${username} : ${chatData}\n`, (err) => {
    if (err) {
      console.error(err);
    } else {
      res.redirect('/chat');
    }
  });
});

module.exports = router;
