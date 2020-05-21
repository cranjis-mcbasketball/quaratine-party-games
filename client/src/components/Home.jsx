import React, { Component } from 'react';
// import "./App.css";
// make calls to API
import axios from 'axios';
import shuffle from 'shuffle-array';
import $ from 'jquery';


class Home extends Component {
  constructor(props) {
    console.log('props:', props);
    super(props);
    this.displayLyrics = [];
    this.state = {
      // eslint-disable-next-line indent
        // names: this.props.prompts,
      guys: ['Travis Barker!', 'Mark Twain!', 'Gordon Ramsey!'],
      clicked: false,
      int: null,
      // tfb lyrics generator
      selectedLyrics: this.displayLyrics,
      allLyrics: [],
    };

    // random british guy
    this.appendGuy = this.appendGuy.bind(this);

    // tfb bot
    this.randomMessage = this.randomMessage.bind(this);
    this.prependData = this.prependData.bind(this);
    this.getData = this.getData.bind(this);
  }


  // invoke "randomMessage" to ask the generator to put together some tasty TFB lyrics for you

  componentDidMount() {
    this.getData();
  }

  appendGuy() {
    if (this.state.clicked === false) {
      this.setState({
        int: Math.floor(Math.random() * (3)),
        clicked: true,
      });
    } else if (this.state.clicked === true) {
      this.setState({
        int: null,
        clicked: false,
      });
    }
  }


  randomMessage() {
    const randomElement = function (array) {
      const randomIndex = Math.floor(Math.random() * array.length);
      return array[randomIndex];
    };
    const beginning = ['New Jersey is like', "I\'ll spend this summer", 'Currently', "I\'m about to be", "Ask me why I\'m", 'Totally', "In West Virginia I'd be", 'I wish I were', '', 'Last night I was', 'I can see me', "One year ago at this time I'd be", "My parents think I'm", 'My friends are', 'Reluctantly', 'I miss', 'I am', 'I suck at'];
    const verbs = ['doing corporate nuclear warfare', 'shoplifting at Whole Foods', 'cutting my pants into shorts', "proving that my real name is 'Cranjis McBasketball by showing them my membership card with the 'Church of Satan'", 'getting arrested for peeing in the Holy Water', 'peeing in the Holy Water at the party', 'peeing in the Holy Water', 'losing my iPhone 11', 'cosplaying as Beavis and Butthead', 'getting kicked out of Whole Foods', 'skateboarding inside of Whole Foods', 'drinking shitty Icelandic schnapps', 'sitting there smiling as if it were a picture but turns out it was a video', "walking into the bar dressed like I'm going to the fjords", 'finding out my best friend is a flat earther', 'refusing to move to Pennsylvania', 'washing my hair with handsoap', 'playing scrabble without the vowels', 'smoking menthol cigarettes', 'getting my surfboard stolen', 'hating New Jersey', 'an awkward guy walking into a party', 'navigating around the fjords with an actual compass', 'blasting christian satanic death metal', 'mowing the lawn at midnight', 'majoring in vitamin water', 'misusing airquotes', 'misusing airquotes', 'peeing in the Holy Water', 'skateboarding inside of Whole Foods', 'peeing in the Holy Water', 'leaving unpopular Icelandic schnapps in the fridge for 3 years', 'listening to ROCK N ROLL MCDONALDS on full-crank mode'];

    const places = ['on an airplane', 'in a public bathroom', 'at church', 'in a porta potty', 'while crying', '', '', 'without a ballpoint pen', 'on a twin size mattress', 'after midnight', 'with the windows open'];

    const explanations = ['because corporate nuclear warfare', "because I can\'t afford not to", 'because the most difficult part of doing Tom Delonge cosplay is getting rid of my eyebrows and I already have light colored eyebrows', 'because I am locked out of my apartment', 'because expensive things are more expensive in New Jersey', 'because the audience was only there to see blink-182 and not us', "but I don\'t even like the fjords", 'as the audience looks at their phones instead of me', 'with people from California', 'because expensive &%$# is more expensive in New Jersey', 'instead of going to the party', 'because the most difficult part of doing Tom Delonge cosplay is getting rid of my eyebrows and I already have light colored eyebrows', 'because I have no money', 'instead of doing the things I should be', 'because the DJ just threw up on the dance floor', 'because I still drink Jim Beam unironically', "because I'm thrift store underwear and she still has the tags on", 'since I was too embarrassed to try on underwear on my head at Walmart for my Beavis and Butthead cosplay', "coz she\'s never heard of my band", 'because my band still sucks', 'coz nobody likes me', "because I can\'t make up my mind"];
    const result = [randomElement(beginning), randomElement(verbs), randomElement(places), randomElement(explanations)].join(' ');
    return result;
  }


  getData() {
    const arrayOfLines = [];
    for (let i = 0; i < 200; i++) {
      const line = this.randomMessage();
      arrayOfLines.push(line);
    }
    this.setState({
      allLyrics: arrayOfLines,
    });
  }

  prependData(e) {
  // e.preventDefault();
    const i = Math.floor(Math.random() * 199);
    this.displayLyrics.unshift(<div className="tfb-lyric">{this.state.allLyrics[i]}</div>);
    console.log('tthis.state.allLyrics[i]', this.state.allLyrics[i]);
    this.setState({
      selectedLyrics: this.displayLyrics,
    });
  }


  render() {
    return (
      <div className="Home">
        <h1>Fire up them Zoom rooms and come play some party games with your friends!</h1>

        <input type="submit" className="submit-btn" onClick={this.prependData} value="Can't think of a good 'things' response? Get one here!" />

        <div className="tfb-container">
          {this.displayLyrics}
        </div>

        <button className="generate-btn" onClick={this.appendGuy}>Which random British guy am I?</button>
        <p className="british-guy">{this.state.guys[this.state.int]}</p>
      </div>
    );
  }
}

export default Home;
