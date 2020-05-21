const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const diyTriviaSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  category: String,
  type: String,
  question: String,
  correct_answer: String,
  incorrect_answers: Array
}
);



const DIYTrivia = mongoose.model('DIYTrivia', diyTriviaSchema);
module.exports = DIYTrivia;