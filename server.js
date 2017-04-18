require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

const options = {
  server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
};

mongoose.connect(process.env.MONGOURI, options);
const conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'MongoDB error'));
conn.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const Schema = mongoose.Schema;
const Q = require('q');

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  trackedStocks: Array,
});

const User = mongoose.model('User', userSchema);
const findUser = Q.nbind(User.findOne, User);
const createUser = Q.nbind(User.create, User);

app.get('/users', (req, res) => {
  findUser({ username: req.body.username }).then((person) => {
    res.send(person);
  });
});

app.post('/users', (req, res) => {
  findUser({
    username: req.body.username,
  })
  .then((person) => {
    if (person === null) {
      return createUser({
        username: req.body.username,
        password: req.body.password,
        trackedStocks: [],
      })
        .then(newUser => res.send(newUser))
        .catch(() => res.sendStatus(400));
    }
    return res.sendStatus(500);
  })
  .catch(() => res.sendStatus(500));
});

app.put('/users', (req, res) => {
  User.update(
    { username: req.body.username },
    { $push: { trackedStocks: req.body.stock } },
    (err) => {
      if (err) {
        res.sendStatus(500);
      }
      res.sendStatus(200);
    });
});

app.delete('/users', (req, res) => {
  User.update(
    { username: req.body.username },
    { $pull: { trackedStocks: req.body.stock } },
    false,
    (err) => {
      if (err) {
        res.sendStatus(500);
      }
      res.sendStatus(200);
    });
});
