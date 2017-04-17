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
app.use(express.static('public'));

// app.get('/', (req, res) => {
//   res.sendFile(`${__dirname}/public/index.html`);
// });

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err) => {
    if (err) {
      return console.error(err);
    }
    return res.redirect('/');
  });
});
