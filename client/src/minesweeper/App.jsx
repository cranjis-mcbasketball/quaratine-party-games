import React, { Component } from 'react';
import Board from './Board.jsx';
// import './index.css';

class Minesweeper extends Component {
  render() {
    return (
      <div className="App">
        <Board />
      </div>
    );
  }
}

export default Minesweeper;
