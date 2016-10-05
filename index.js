const express = require('express');
const ethController = require('./ethController.js');
const bodyParser = require('body-parser');

const app = express();

const allowCrossDomain = (req, res, next) => { //CORS middlware
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.header('Access-Control-Max-Age', 10);
  // intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
};

app.use(allowCrossDomain);
app.user(bodyParser.json());

//endpoints

app.post('/api/challenge', (req, res) => {

});

app.get('/api/challenge', (req, res) => {

});

const server = app.listen(3002, () => {
  console.log('Ethereum server running on port 3002!');
});

module.exports = server;