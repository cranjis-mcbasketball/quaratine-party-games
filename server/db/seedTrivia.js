var DIYTrivia = require('./DIYTrivia.js');
// const db = require('./index.js');
var mongoose = require('mongoose');
// var thingsData = require('./things_prompts');
const triviadata = require('./DIY_trivia.js');
mongoose.connect('mongodb://database/quarantine');

// populate db
const seedTriviaDb = function (triviadata) {


  DIYTrivia.insertMany(triviadata, (err, docs) => {
    if (err) {
      console.log(`Error populating db ${err}`);
      return;
    }
    console.log('Done populating db!');
  });
};

// const insertOne = function (data, callback) {
//   Things.create(data, (err, res) => {
//     if (err) {
//       console.log('error seedjs ', err);
//       return;
//     }
//     console.log('success seed')
//   });
// };


seedTriviaDb(triviadata);


module.exports = seedTriviaDb;