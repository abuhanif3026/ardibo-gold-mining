//securityThe file "c:\Users\my pc\Desktop\oromo zone comminication_html\admin-login.html" cannot be found. It may have been moved, edited, or deleted.
const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'securezone', resave: false, saveUninitialized: true }));

// Dummy user data
const users = [
  { username: 'admin', password: bcrypt.hashSync('password123', 10) }
];

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (user && bcrypt.compareSync(password, user.password)) {
    req.session.user = user;
    res.redirect('/admin-dashboard');
  } else {
    res.send('Invalid username or password');
  }
});

// Admin dashboard
app.get('/admin-dashboard', (req, res) => {
  if (req.session.user) {
    res.send('<h1>Welcome to the Admin Dashboard</h1>');
  } else {
    res.redirect('/');
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
