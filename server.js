const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
  secret: 'd99d20eed5fb327af6d08d1037fc7bae8709bd949c9e3068999441c3af190906', 
  resave: false,
  saveUninitialized: true
}));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

const loginRoutes = require('./routes/login');
const chatRoutes = require('./routes/chat');

app.use('/login', loginRoutes);
app.use('/chat', chatRoutes); 

app.use((req, res, next) => {
  res.status(404).send('<h1>Page not found</h1>');
});

app.listen(3000);
