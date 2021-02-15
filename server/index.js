const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// temp, fake data
const posts = require('./db/postsDb');
const areas = require('./db/areasDb');
const users = require('./db/usersDb');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'App Running' });
});

app.get('/api/posts', (req, res) => {
  res.status(200).json(posts);
});

app.get('/api/areas', (req, res) => {
  res.status(200).json(areas);
});

app.get('/api/users', (req, res) => {
  res.status(200).json(users);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server running on port ${PORT}`));
