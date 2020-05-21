const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

// import samplePosts from '../../../sample_data.js';
const thingsSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  prompt: String,
  author: String
}
);


const thingsResponseSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  response: String
}
);

const carouselSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  app_description: String,
  additional_text: String,
  images: Array
});

const diyTriviaSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  category: String,
  type: String,
  question: String,
  correct_answer: String,
  incorrect_answers: Array
});




const Carousels = mongoose.model( 'Carousel', carouselSchema );


const Things = mongoose.model('Things', thingsSchema);

const ThingsResponses = mongoose.model('ThingsResponses', thingsResponseSchema);

const DIYTrivia = mongoose.model('DIYTrivia', diyTriviaSchema);


exports.Things = Things;
exports.Carousels = Carousels;
exports.ThingsResponses = ThingsResponses;
exports.DIYTrivia = DIYTrivia;