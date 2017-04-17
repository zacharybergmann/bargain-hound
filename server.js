require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const PORT = process.env.PORT || 3000;

let db;
MongoClient.connect(process.env.MONGOURI, (err, database) => {
  if (err) {
    console.error(err);
  } else {
    db = database;
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  }
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});
