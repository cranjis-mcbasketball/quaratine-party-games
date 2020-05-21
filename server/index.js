const express = require("express");
const axios = require("axios");
// const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const PORT = 3003;
const Things = require('./db/Things.js');
const ThingsResponses = require('./db/ThingsResponses.js');
const DIYTrivia = require('./db/DIYTrivia.js');
const db = require('./db/index.js');
const mongoUri = 'mongodb://localhost/quarantine';
const mongoose = require('mongoose');
// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

//cors is inserted to allow the two servers(front-end and back-end) to run together, may want to add extra security for deployment
//adds header to let any url access your API
//to make more specific, add react app url instead of star to say only that url can use API

// app.use(express.static("build"));
// open the default mongo connection
mongoose.connect(mongoUri, {useUnifiedTopology: true, useNewUrlParser: true}, function(err, success) {
  if (err) {
    console.log(err, 'error connecting to mongoDB');
  } else {
    console.log("connected to mongoDB");
  }
});

// app.use(cors());
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


////////////////////////////////////////
///////// Get things prompts ////////////
////////////////////////////////////////

app.get('/things', (req, res) => {
  Things.find({}, (err, data) => {
    res.send(data)
    if (err) {
      return console.log('error getting from db: ', err)
    }

    console.log('results: ', data)
  })
})


////////////////////////////////////////
///////// Get DIYTrivia prompts ////////////
////////////////////////////////////////

app.get('/DIYTrivia', (req, res) => {
  DIYTrivia.find({}, (err, data) => {
    res.send(data)
    if (err) {
      return console.log('error getting from db: ', err)
    }

    console.log('results: ', data)
  })
})


////////////////////////////////////////
///////// store a things response ///////
////////////////////////////////////////

app.post('/thingsresponses', (req, res) => {
  console.log('req.body', req.body)
  ThingsResponses.create({
    response: req.body.response
  })
  .then((data) => {
    res.json(data);
  })
    .catch(function(err) {
      res.status(404);
      console.log(`Could not add new things response entry to db, err: ${err}`);
      res.send(err);
    });
});


////////////////////////////////////////
///////// Get easy questions ////////////
////////////////////////////////////////

app.get("/api/get-easy-questions", function(req, res, next) {
  // use axios to make api call
  axios
    .get("https://opentdb.com/api.php?amount=10&difficulty=easy")
    .then(function(response) {
      //.data is built into axios which returns JSON from API call
      //.json is used because we are sending out JSON
      //response.data.results is taking the response from the API call, calling the data method to get the data, and then targeting the results section of the JSON
      console.log('response.data.results: ', response.data.results)
      res.json({ questions: response.data.results });
    })
    .catch(next);
});



////////////////////////////////////////
///////// Get medium questions /////////
////////////////////////////////////////

app.get("/api/get-medium-questions", function(req, res, next) {
  // use axios to make api call
  axios
    .get("https://opentdb.com/api.php?amount=10&difficulty=medium")
    .then(function(response) {
      //.data is built into axios which returns JSON from API call
      //.json is used because we are sending out JSON
      //response.data.results is taking the response from the API call, calling the data method to get the data, and then targeting the results section of the JSON
      console.log('response.data.results: ', response.data.results)
      res.json({ questions: response.data.results });
    })
    .catch(next);
});

////////////////////////////////////////
///////// Get hard questions ////////////
////////////////////////////////////////

app.get("/api/get-hard-questions", function(req, res, next) {
  // use axios to make api call
  axios
    .get("https://opentdb.com/api.php?amount=10&difficulty=hard")
    .then(function(response) {
      //.data is built into axios which returns JSON from API call
      //.json is used because we are sending out JSON
      //response.data.results is taking the response from the API call, calling the data method to get the data, and then targeting the results section of the JSON
      console.log('response.data.results: ', response.data.results)
      res.json({ questions: response.data.results });
    })
    .catch(next);
});

app.get("*", (req, res) => {
  res.sendFile(__dirname, + "client/dist/index.html");
});

// const port = process.env.PORT || 3000;



app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app