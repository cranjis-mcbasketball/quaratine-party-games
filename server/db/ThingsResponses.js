const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;



const thingsResponseSchema = new mongoose.Schema({
  // id: { type: Number, unique: true },
  response: String
}
);

const ThingsResponses = mongoose.model('ThingsResponses', thingsResponseSchema);
module.exports = ThingsResponses;