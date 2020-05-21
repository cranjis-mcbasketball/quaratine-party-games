var Things = require('./Things.js');
// const db = require('./index.js');
var mongoose = require('mongoose');
// var thingsData = require('./things_prompts');
const data = require('./things_prompts.js');
mongoose.connect('mongodb://database/quarantine');

// populate db
const seedDb = function (data) {
  Things.insertMany(data, (err, docs) => {
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


seedDb(data);


module.exports = seedDb;