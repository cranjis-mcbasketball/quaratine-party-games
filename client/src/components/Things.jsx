import React, { Component } from "react";
import ThingsResponses from "./ThingsResponses.jsx";
//make calls to API
import axios from "axios";
import shuffle from "shuffle-array";
import $ from "jquery";



class Things extends Component {
constructor() {
  super();

  this.displayData = [];
  this.currentPrompts = [];

  this.state = {
    showdata : this.displayData,
    postVal : "",
    direction: "up",
    prompts: [],
    showPrompts: this.currentPrompts,
    clickedList: false,
    clickedRandom: false
  }

  this.appendData = this.appendData.bind(this);
  this.prependData = this.prependData.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.handleGetList = this.handleGetList.bind(this);
  this.handleGetRandomPrompt = this.handleGetRandomPrompt.bind(this);

};

  componentDidMount() {
    axios.get(`/things`)
    .then((data) => {
      let prompts = data.data.map((thingsPrompt) => {

        return thingsPrompt.prompt;
      });
      this.setState({ prompts: prompts.slice(1) });
    })
   .catch(error => {
    console.error('Error getting prompts:', error);
  });
  }


appendData() {
     this.displayData.push(<div  id="display-data"><pre>{this.state.postVal}</pre></div>);
   var responseObj = {
      response: this.state.postVal
    }
         axios.post('/thingsresponses', responseObj)
      .then((res) => {
        console.log('res.data: ', res.data);
        this.setState({
          showdata : this.displayData,
          postVal : "",
          direction: "up"
       });
      })
      .catch((err) => {
        console.log('error submitting things response: ', err);
      });

  }

prependData() {
this.displayData.unshift(<div id="display-data"><pre>{this.state.postVal}</pre></div>);
var responseObj = {
  response: this.state.postVal
}
     axios.post('/thingsresponses', responseObj)
  .then((res) => {
    console.log('res.data: ', res.data);
    this.setState({
      showdata : this.displayData,
      postVal : "",
      direction: "down"
   });
  })
  .catch((err) => {
    console.log('error submitting things response: ', err);
  });
}

handleGetList(){
  if (this.state.clickedList === false){
    for(var i = 0; i < this.state.prompts.length; i++){
      this.currentPrompts.push(<div className="things-category">{this.state.prompts[i] + '\n'}</div>)
    }
    this.setState({
      showPrompts: this.currentPrompts,
      clickedList: true
    })
  } else {
    this.currentPrompts = [];
    this.setState({
      showPrompts: this.currentPrompts,
      clickedList: false
    })
  }



}

handleGetRandomPrompt(){
  if (this.state.clickedRandom === false){
    var x = this.state.prompts.length;
    console.log('this.state.prompts.length', x);
    var i = Math.floor(Math.random() * x);
    this.currentPrompts.push(<div className="things-category">{this.state.prompts[i] + '\n'}</div>);
    this.setState({
      showPrompts: this.currentPrompts,
      clickedRandom: true
    })

  } else {
    this.currentPrompts = [];
    this.setState({
      showPrompts: this.currentPrompts,
      clickedRandom: false
    })
  }

}


handleChange(e) {
  let getTextAreaValue = e.target.value;
  this.setState({
    postVal :getTextAreaValue
  });
}

render() {
return (
      <div className="mainContainer">
              <button className="get-btn" onClick={this.handleGetRandomPrompt}>Get Random Prompt</button> <button className="get-btn" onClick={this.handleGetList}>Get List of Prompts</button>


        <ul className="things-categories">{this.currentPrompts}</ul>




         <textarea className="form-things" rows="4" cols="50" value={this.state.postVal} onChange={this.handleChange} ></textarea>
         <div >
         <input  type="submit" className="submit-btn" onClick={this.state.direction === "up" ? this.prependData : this.appendData}   value="Submit Response"/>
         </div>
         <div id="display-data-Container">
         {this.displayData}
         </div>
      </div>
  );
}
}

export default Things;


