import React, { Component } from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker.jsx";
import axios from "axios";
import shuffle from "shuffle-array";
import Check_Ans from "./components/Check_Ans.jsx";
import Things from "./components/Things.jsx";
import Home from "./components/Home.jsx";
import Trivia from "./components/Trivia.jsx";
import DIYTrivia from "./components/DIYTrivia.jsx";
import Minesweeper from "./minesweeper/App.jsx";
// import ImageCarousel from './components/ImageCarousel.jsx';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'home',
      current:[]
    };
    this.changeView = this.changeView.bind(this);
  }
  // this will change the view based on what game the user clicks or home
  changeView(option) {
    this.setState({
      view: option
    });
  }

  componentDidMount() {
    this.renderView()

  }

  // getThings() {
  //     axios.get(`/things`)
  //     .then((data) => {
  //       let thingsPrompts = data.data.map((thingsPrompt) => {
  //         console.log('thingsPrompt.prompt: ', thingsPrompt.prompt);
  //         return thingsPrompt.prompt;
  //       });
  //       this.setState({ thingsPrompts: thingsPrompts.slice(1) });
  //     })
  //    .then((thingsPrompts) => {
  //     console.log('GET req successful, got prompts, this.state.prompts', this.state.thingsPrompts);
  //      console.log('get req successful', this.state.test);
  //      console.log('this.state.thingsPrompts: ', this.state.thingsPrompts);
  //    })
  //    .catch(error => {
  //     console.error('Error during service worker registration:', error);
  //   });
  //    }

  renderView() {
    const {view} = this.state;
    // we show the view with all posts
    if (this.state.view === 'home') {
      return <Home handleClick={(e) => this.changeView('selectview')}/>;
    } else if (this.state.view === 'things') {
      return <Things  handleClick={(e) => this.changeView('selectview')} />;
    } else if (this.state.view === 'minesweeper') {
      return <Minesweeper handleClick={(e) => this.changeView('selectview')} />;
    } else if (this.state.view === 'trivia') {
      return <Trivia handleClick={(e) => this.changeView('selectview')} />;
    } else {
      return <DIYTrivia handleClick={(e) => this.changeView('selectview')} />;
    }
  }


  render() {
      return (
  <div>
          <div className="nav">
            <span className="logo"
              onClick={(e) => this.changeView('home')}>
              The QuackHouse
            </span>

            <span className={this.state.view === 'home'
            ? 'selectedActivity'
            : 'unselectedActivity'}
            onClick={(e) => this.changeView('home')}>
              Home
            </span>

            <span className={this.state.view === 'things'
            ? 'selectedActivity'
            : 'unselectedActivity'}
            onClick={(e) => this.changeView('things')}>
              Things
            </span>

            <span className={this.state.view === 'trivia'
            ? 'selectedActivity'
            : 'unselectedActivity'}
            onClick={(e) => this.changeView('trivia')}>
              Trivia
            </span>

            <span className={this.state.view === 'minesweeper'
            ? 'selectedActivity'
            : 'unselectedActivity'}
            onClick={(e) => this.changeView('minesweeper')}>
              Minesweeper
            </span>

            <span className={this.state.view === 'tfb'
            ? 'selectedActivity'
            : 'unselectedActivity'}
            onClick={(e) => this.changeView('tfb')}>
              DIY Trivia
            </span>

          </div>

          <div className="main">
            {this.renderView()}
          </div>
        </div>
      );
    }
  }





  ReactDOM.render(<App />, document.getElementById('root'));