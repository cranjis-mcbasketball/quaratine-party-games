import React, { Component } from "react";
import ThingsResponses from "./ThingsResponses.jsx";
//make calls to API
import axios from "axios";
import shuffle from "shuffle-array";
import $ from "jquery";



class Things extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // eslint-disable-next-line indent
        // names: this.props.prompts,
        prompts: [],
        prompt: null,
        responses: ['test'],
        response: '',
        submitted: false
    }
    // this.appendResponse = this.appendResponse.bind(this);
    this.handleChange= this.handleChange.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
    // this.getResponses= this.getResponses.bind(this);
    // names: 'Cranjis McBasketball and Secret Agent Randy Beans',
    // posts: ['Corporate Nuclear Warfare', 'A costco-sized pack of dildos', 'but what about feces?']
  }



  componentDidMount() {
    axios.get(`/things`)
    .then((data) => {
      let prompts = data.data.map((thingsPrompt) => {
        console.log('things.jsx prompts: ', thingsPrompt.prompt);
        return thingsPrompt.prompt;
      });
      this.setState({ prompts: prompts.slice(1) });
    })
   .then((prompts) => {
     console.log('this.state.prompts: ', this.state.prompts);
   })
   .catch(error => {
    console.error('Error getting prompts:', error);
  });
  }

  // getThings() {
  //     axios.get(`/things`)
  //     .then((data) => {
  //       let prompts = data.data.map((thingsPrompt) => {
  //         console.log('things.jsx prompts: ', thingsPrompt.prompt);
  //         return thingsPrompt.prompt;
  //       });
  //       this.setState({ prompts: prompts.slice(1) });
  //     })
  //    .then((prompts) => {
  //      console.log('get req successful', this.state.test);
  //      console.log('this.state.prompts: ', this.state.prompts);
  //    })
  //    .catch(error => {
  //     console.error('Error during service worker registration:', error);
  //   });
  //    }

     handleChange(e) {
      this.setState({ response: e.target.value })
      console.log('response', this.state.response)
    }


  var ResponseList = React.createClass({
    render : function() {
      return (
        <div className="container">
          <ul className="list-group text-center">
            {
              this.state.responses.map(function(i) {
                return <li className="list-group-item list-group-item-info">{this.state.responses[i]}</li>
              }.bind(this))
            }
          </ul>
         </div>
       );
          }
     })


  handleSubmit(e) {
    e.preventDefault();
    var currentRes = this.state.response;
    console.log('e- handlesubmit', e);
    this.setState({
      responses: this.state.responses.push(this.state.response)
    })
    console.log(this.state.responses);
    var responseObj = {
      response: this.state.response
    }
    axios.post('/thingsresponses', responseObj)
      .then((res) => {
        console.log('res.data: ', res.data);
      })
      .then(() => {
        this.refs.
        // this.setState({
        //   response: ''
        // })
      })
      .catch((err) => {
        console.log('error submitting things response: ', err);
      });


  }



  handleGet() {
    return;
     }


  render() {
      return (
        <div className="things">

        <h1>The Game of Things</h1>
        <button className="get-btn">Get Random Prompt</button> <button className="get-btn" onClick={this.handleGetList}>Get List of Prompts</button>
        <ThingsResponses/>
          <form className="things-responses" onSubmit={this.handleSubmit}><input id="things-response" response={this.state.response} onChange={this.handleChange} placeholder="record your answer here" type="text" />            <button className="submit-btn" type="submit">Submit Entry</button>
  </form>

       </div>
      )



  }
}

export default Things;



// {this.renderUserInfo()}
<ul>
        {
           this.state.responses.map((res, i) => {

              return (
                <li key={i} className="things-category">
                  <div className="response" key={i} >{res}</div>
                </li>
              );
            })}
     </ul>

