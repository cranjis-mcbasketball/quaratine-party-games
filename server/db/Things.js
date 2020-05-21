const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const thingsSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  prompt: String,
  author: String
}
);



const Things = mongoose.model('Things', thingsSchema);
module.exports = Things;