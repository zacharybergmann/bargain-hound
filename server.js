require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const MongoClient = require('mongodb').MongoClient;

let db;
MongoClient.connect(process.env.MONGOURI, (err, database) => {
  if (err) {
    console.error(err);
  } else {
    database = db;
    app.listen(PORT, function() {
      console.log(`Server is running on ${PORT}`);
    });
  }
});

app.use(bodyParser.urlencoded( { extended: true } ));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
