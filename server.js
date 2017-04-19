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




// var allowCrossDomain = function(req, res, next) {
//     if ('OPTIONS' == req.method) {
//       res.header('Access-Control-Allow-Origin', 'localhost:8080');
//       res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
//       res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//       res.send(200);
//     }
//     else {
//       next();
//     }
// };
//
// app.use(allowCrossDomain);










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

app.get('/users/*', (req, res) => {
  findUser({ _id: req.params[0] }).then((person) => {
    res.send(person);
  }).catch(() => res.send(500));
});

app.get('/login/*/*', (req, res) => {
  findUser({ username: req.params[0], password: req.params[1] }).then((person) => {
    if (person === null) {
      return res.statusCode(400);
    }
    return res.send(person);
  }).catch(() => res.statusCode(500));
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

app.put('/users/*/*/*/*/*/*', (req, res) => {
  if (req.params[5] === 'remove') {
    User.update(
      { _id: req.params[1] },
      { $pull: { trackedStocks: req.params[3] } },
      (err) => {
        if (err) {
          res.sendStatus(500);
        }
        res.sendStatus(200);
      });
  } else if (req.params[5] === 'add') {
    User.update(
      { _id: req.params[1] },
      { $push: { trackedStocks: req.params[3] } },
      (err) => {
        if (err) {
          res.sendStatus(500);
        }
        res.sendStatus(200);
      });
  } else {
    res.send(400);
  }
});

// app.delete('/users', (req, res) => {
//   User.update(
//     { username: req.body.username },
//     { $pull: { trackedStocks: req.body.stock } },
//     false,
//     (err) => {
//       if (err) {
//         res.sendStatus(500);
//       }
//       res.sendStatus(200);
//     });
// });

const request = require('request');
const Papa = require('papaparse');

app.get('/financials/*', (req, res) => {
  console.log(req.params, 'what parameters do we have to split?');
  const myParas = req.params[0].split('/');
  console.log(myParas);
  let yUrl = 'http://finance.yahoo.com/d/quotes.csv?s=';
  for (let i = 0; i < myParas.length; i += 1) {
    if (i === 0) {
      yUrl += `${myParas[i]}`;
    } else {
      yUrl += `+${myParas[i]}`;
    }
  }
  yUrl += '&f=nsabkjj4b4ep6p5rr5dj3p2yt8s6';
  request(yUrl, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const bodyWHeaders = `name,symbol,ask,bid,52wkhigh,52wklow,ebitda,bookvalue,eps,priceperbook,pricepersales,priceperearningsrat,pegratio,dividendpershare,marketcap,percentchange,dividendyield,oneyrtarget,revenue\n${body}`;
      // need to send the data back down to the component!
      Papa.parse(bodyWHeaders, {
        header: true,
        complete: objData => res.send(JSON.stringify(objData)),
      });
    }
  });
});


// const request = require('request');

// const yUrl = 'http://finance.yahoo.com/d/quotes.csv?s=AAPL+GOOG+MSFT&f=nsabkjj4b4ep6p5rr5dj3';

// request(yUrl, (error, response, body) => {
//   if (!error && response.statusCode === 200) {
//     console.log(body, 'gettter datat!!!!');
//   }
// });
