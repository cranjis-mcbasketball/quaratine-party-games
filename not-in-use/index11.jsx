import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import App from "./App.jsx";
import registerServiceWorker from "./registerServiceWorker.jsx";

ReactDOM.render(<App />, document.getElementById("root"));
// registerServiceWorker();





import React from "react";
import axios from 'axios';
import Data from './Data.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: '2020-01-01',
      end: '2020-04-01',
      data: {},
      selecteStart: '',
      selectedEnd: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get(
        `https://api.coindesk.com/v1/bpi/historical/close.json?start=${this.state.start}&end=${this.state.end}`
      )
      .then((data) => {
        this.setState({ data: data.data.bpi });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  handleChange(e, target) {
    this.setState({
      [target]: e.target.value
    });
  }


  handleSubmit(e) {
    // same api request
    //https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2013-09-05
    e.preventDefault();
    axios.get( `https://api.coindesk.com/v1/bpi/historical/close.json?start=${this.state.start}&end=${this.state.end}`)
      .then((data) => {
        this.setState({ data: data.data.bpi });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (
      <div>
        <div>App component</div>
        <div>Cryptocurrency Charting Tool</div>

        <form onSubmit={handleSubmit}>
          <fieldset>
            <div>Choose Dates for closing prices</div>
            <label>
              Start:
              <input
                type="date"
                id="start"
                name="start"
                placeholder="2020-01-01"
                onChange={e => {
                  handleChange(e, "start");
                }}
              />
            </label>
            <label>
              End:
              <input
                type="date"
                id="end"
                name="end"
                placeholder="2020-04-01"
                onChange={e => handleChange(e, "end")}
              />
            </label>
            <input type="submit" value="Submit" />
          </fieldset>
        </form>



        <p>{this.state.data}</p>
      </div>
    );
  }
}

export default App;

{/* <Dates
handleChange={this.handleChange}
handleSubmit={this.handleSubmit}
/> */}

import React from "react";


class Data extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      priceData: [],
      dates: ['2020-January-01', '2020-April-01']
    }
  }


  // for (var key in props.data) {
  //   dates.push(key);
  //   prices.push(props.data[key]);
  // }
  // let charData = {
  //   labels: dates,
  //   datasets: [
  //     {
  //       data: prices
  //     }
  //   ]
  // };
  // let charOptions = {
  //   pointRadius: 0
  // };

  render(){
    return (
      <div>
        <Line data={charData} options={charOptions} />
      </div>
    );
  }

};

export default Data;