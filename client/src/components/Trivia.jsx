import React, { Component } from "react";
// import "./App.css";
//make calls to API
import axios from "axios";
import shuffle from "shuffle-array";
import Check_Ans from "./Check_Ans.jsx";

class Trivia extends Component {
  constructor(props) {
    super(props);
    //setting initial state
    //count is for how many questions are correct
    //completed is to track which questions have been answered
    this.state = { questions: [], answers: [], count: 0, completed: [] };
    //basically binding to this class so you can use it later
    //if this wasn't set here, user ould have to click button to get questions
    this.get_easy_questions();
  }
  //we keep this method in the class coz it deals with state

  ////////////////////////////////////////
///////// Get easy questions ////////////
////////////////////////////////////////

  get_easy_questions(e) {
    //calling api we created on back-end
    //eventually need call on back end for multiple players
    let apiURL = "/api/get-easy-questions";
    if (window.location.host === "localhost:3000") {
      apiURL = "http://localhost:3000" + apiURL;
    }
    console.log("apiURL", apiURL);

    axios.get(apiURL).then((res) => {
        var answers = [];
        var completed = [];

        //setting state with new set of questions

        //'questions' is the key, 'res.data.questions is the value
        //this.state is now all the data in questions
        res.data.questions.forEach(function(q) {
          //best practice to create a new list each iteration
          //takes all incorrect answers, adds them to an array
          var ans = [...q.incorrect_answers];
          //pushes correct answer to array
          ans.push(q.correct_answer);
          //shuffles answer choice array
          shuffle(ans);
          answers.push(ans);
          //state of all questions is not-answered in the beginning
          completed.push("not-answered");
        });
        this.setState({
          questions: res.data.questions,
          answers: answers,
          completed: completed,
          count: 0
        });
      })

      .catch((err) => {
        console.log(err)
      });
  }

  ////////////////////////////////////////
///////// Get medium questions /////////
////////////////////////////////////////

  get_medium_questions(e) {
    //calling api we created on back-end
    //eventually need call on back end for multiple players
    let apiURL = "/api/get-medium-questions";
    if (window.location.host === "localhost:3000") {
      apiURL = "http://localhost:3000" + apiURL;
    }
    console.log("apiURL", apiURL);

    axios.get(apiURL)
    .then((res) => {
        var answers = [];
        var completed = [];

        //setting state with new set of questions

        //'questions' is the key, 'res.data.questions is the value
        //this.state is now all the data in questions
        res.data.questions.forEach(function(q) {
          //best practice to create a new list each iteration
          //takes all incorrect answers, adds them to an array
          var ans = [...q.incorrect_answers];
          //pushes correct answer to array
          ans.push(q.correct_answer);
          //shuffles answer choice array
          shuffle(ans);
          answers.push(ans);
          //state of all questions is not-answered in the beginning
          completed.push("not-answered");
        });
        this.setState({
          questions: res.data.questions,
          answers: answers,
          completed: completed,
          count: 0
        });
      })

      .catch((err) => {
        console.log(err)
      });
  }

////////////////////////////////////////
///////// Get hard questions ////////////
////////////////////////////////////////
get_hard_questions(e) {
  //calling api we created on back-end
  //eventually need call on back end for multiple players
  let apiURL = "/api/get-hard-questions";
  if (window.location.host === "localhost:3000") {
    apiURL = "http://localhost:3000" + apiURL;
  }
  console.log("apiURL", apiURL);

  axios.get(apiURL)
  .then((res) => {
      var answers = [];
      var completed = [];

      //setting state with new set of questions

      //'questions' is the key, 'res.data.questions is the value
      //this.state is now all the data in questions
      res.data.questions.forEach(function(q) {
        //best practice to create a new list each iteration
        //takes all incorrect answers, adds them to an array
        var ans = [...q.incorrect_answers];
        //pushes correct answer to array
        ans.push(q.correct_answer);
        //shuffles answer choice array
        shuffle(ans);
        answers.push(ans);
        //state of all questions is not-answered in the beginning
        completed.push("not-answered");
      });
      this.setState({
        questions: res.data.questions,
        answers: answers,
        completed: completed,
        count: 0
      });
    })

    .catch((err) => {
      console.log(err)
    });
}




  check_ans(ans, qindex) {
    //creating new array of completed questions
    var completed = [...this.state.completed];
    //if correct, change value to correct
    if (ans === this.state.questions[qindex].correct_answer) {
      completed[qindex] = "correct";
      this.setState({ count: this.state.count + 1 });
    } else {
      //if incorrect, change value to incorrect
      completed[qindex] = "incorrect";
    }
    //resetting state with added status of question
    this.setState({ completed: completed });
  }

  //feed it question index
  display_answers(qindex) {
    console.log(qindex, this.state.answers[qindex]);
    return (
      //returning answers associated with each question
      <div className="ans">
        {this.state.answers[qindex].map((a, index) => {
          return (
            // if status of question is not answered, button is active
            <button
              className="btn-sm"
              disabled={
                this.state.completed[qindex] !== "not-answered"
                  ? "disabled"
                  : ""
              }
              dangerouslySetInnerHTML={{ __html: a }}
              //calls check_ans method and feeds it answer and the question index
              onClick={e => this.check_ans(a, qindex)}
            />
          );
        })}
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        <div className="header container-fluid">
          <h2>Plain Ol' Random Trivia</h2>
          <h4>Correct: {this.state.count}/10</h4>
          {/* when using an on- event the below format is recommended */}
          {/* on click event the get_questions function will run and return a new set of questions */}
          <button className="trivia-btn" onClick={e => this.get_easy_questions(e)}>
            Generate Easy Questions
          </button>

          <button className="trivia-btn" onClick={e => this.get_medium_questions(e)}>
            Generate Medium Questions
          </button>

          <button className="trivia-btn" onClick={e => this.get_hard_questions(e)}>
            Generate Hard Questions
          </button>

        </div>
        <div className="container">
          <div className="spacer" />
          {/* using map to loop through the questions in the list and return an li */}
          {/* this.state.questions is defined above in setState */}
          {this.state.questions.map((q, index) => {
            {
              /* way to stop react from automatically escaping special characters */
            }
            return (
              <div className="questions">
                {/* <p dangerouslySetInnerHTML={{ __html: q.category }} /> */}
                <p className="question-num"> Question {index + 1} </p>
                <p className="question" dangerouslySetInnerHTML={{ __html: q.question }} />
                {this.display_answers(index)}
                {/* renders incorrect and correct divs */}
                <Check_Ans status={this.state.completed[index]} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Trivia;