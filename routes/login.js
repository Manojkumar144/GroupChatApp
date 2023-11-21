const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('<form action="/login" method="POST"><input type="text" name="username" placeholder="Enter your username"><button type="submit">login</button></form>');
});

router.post('/', (req, res, next) => {
  const username = req.body.username;

  // Store the username in the session
  req.session.username = username;
  
  res.redirect('/chat');
});

module.exports = router;
