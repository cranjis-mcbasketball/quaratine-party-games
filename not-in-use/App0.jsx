import React, { Component } from "react";
// import "./App.css";
//make calls to API
import axios from "axios";
import shuffle from "shuffle-array";
import Check_Ans from "./components/Check_Ans.jsx";
import Things from "./components/Things.jsx";
import Trivia from "./components/Trivia.jsx";
import FrontBottomsLyricsGenerator from "./components/FrontBottomsLyricsGenerator.jsx";

import { Switch, Route } from 'react-router-dom';
import { PostPage, PostListPage, EditorPage, NotFoundPage } from 'pages';
import LoginContainer from 'containers/LoginContainer'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as authActions from "store/modules/auth";
import OAuth2RedirectHandler from 'components/Login/oauth2/OAuth2RedirectHandler';

class App extends Component {
  constructor() {
    super();

    this.state = {
      view: 'home',
      test: 'hello'
    };
    this.changeView = this.changeView.bind(this);
  }
  // this will change the view based on what game the user clicks or home
  changeView(option, e) {
    this.setState({
      view: option
    });
    this.setState({
      current: e
    });
  }

  componentDidMount() {
      axios.get(`/things/?id=2`)
      .then((data) => {
       this.setState({
         test: data.data.prompt
       })
      })
     .then( () => (
       console.log('get req successful', this.state.test)
     ))
     .catch(err => console.log(err));
     }

  // renderView() {
  //   const {view} = this.state;
  //   // we show the view with all posts
  //   // if (this.state.view === 'home') {
  //     console.log('home');
  //     return <App handleClick={(e) => this.changeView('selectview', e)}/>;
  //   // } else if (this.state.view === 'things') {
  //   //   console.log('things');
  //   //   return <Things handleClick={(e) => this.changeView('selectview', e)} />;
  //   // } else if (this.state.view === 'trivia') {
  //   //   console.log('trivia');
  //   //   return <Trivia handleClick={(e) => this.changeView('selectview', e)} />;
  //   // } else if (this.state.view === 'tfb'){
  //   //   console.log('tfb');
  //   //   return <FrontBottomsLyricsGenerator current={this.state.current} handleClick={(e) => this.changeView('selectview', e)} />;
  //   }
  render() {
    return (
      <div>
        <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}/>
        <Route path="/login" component={LoginContainer} />
        <Switch>
          <Route path="/pages/:page" component={PostListPage} />
          <Route path="/posts/:id" component={PostPage} />
          <Route path="/editor/:id?" component={EditorPage} />
          <Route path="/" component={PostListPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }


  // render() {
  //     return (
  // <div>
  //         <div className="nav">
  //           <span className="logo"
  //             onClick={(e) => this.changeView('home')}>
  //             QuackHouse
  //           </span>

  //           {/* <span className='home-nav'
  //           onClick={(e) => this.changeView('home')}>
  //             Home
  //           </span> */}

  //           <span className='things-nav'
  //           onClick={(e) => this.changeView('things')}>
  //             Play Things
  //           </span>

  //           <span className='trivia-nav'
  //           onClick={(e) => this.changeView('trivia')}>
  //             Play Trivia
  //           </span>

  //           <span className='tfb-nav'
  //           onClick={(e) => this.changeView('tfb-nav')}>
  //             Front Bottoms Lyrics Generator
  //           </span>

  //         </div>

  //         {/* <div className="main">
  //           {this.renderView()}
  //         </div> */}
  //       </div>
  //     );
  //   }
  }





export default App;