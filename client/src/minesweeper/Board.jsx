import React from 'react';
import Square from './Square.jsx';
import Number from './Number.jsx';


// var array = new Array(10);

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.amountBombs = 10;
    this.width = 10;
    this.state = {
      board: [],
      done: false,
      handleSolution: [[], [], [], [], [], [], [], [], [], []]
    }
    this.handleClick = this.handleClick.bind(this);
    this.generateGame = this.generateGame.bind(this);
    this.populateBombs = this.populateBombs.bind(this);
    this.traverseBoard = this.traverseBoard.bind(this);
    this.handleMineCounts = this.handleMineCounts.bind(this);
    this.changeClass = this.changeClass.bind(this);
  }

  componentDidMount() {
    this.setState({
      board: this.populateBombs(this.generateGame(), this.amountBombs),
    })
  }

  // all spaces are initially set to a count of 0
  generateGame() {
    const newBoard = [];
    for (var i = 0; i < this.width; i++) {
      newBoard.push([])
      for (var j = 0; j < this.width; j++) {
        newBoard[i].push(0);
      }
    }
    return newBoard;
  }



  populateBombs(board, amountMines) {
    var count = this.amountBombs;
    var boardWithBombs = board;
    if (!boardWithBombs) {
      return;
    }

    while (count) {
      var randBomb = false;
      while (!randBomb) {
        var x = Math.floor(Math.random(this.width) * this.width);
        var y = Math.floor(Math.random(this.width) * this.width);
        if (boardWithBombs[x][y] !== 'O*`' && boardWithBombs[x][y] !== 'O*`') {
          boardWithBombs[x][y] = 'O*`';
          count--;
          randBomb = true;
        }
      }
    }
    return this.traverseBoard(boardWithBombs);

  }



  traverseBoard(board) {
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {
        // call handleMineCount on spaces not mines
        if (board[i][j] !== 'O*`' && board[i][j] !== 'O*`') {
          board[i][j] = this.handleMineCounts(board, i, j);
        }
      }
    }
    return board;
  }

  handleMineCounts(board, row, col) {
    var count = '';
    // up
    if (board[row - 1] && board[row - 1][col] === 'O*`') {
      count++;
    }
    // up and to the right
    if (board[row - 1] && board[row - 1][col + 1] === 'O*`') {
      count++;
    }
    // right
    if (board[row][col + 1] === 'O*`') {
      count++;
    }
    // down and to the right
    if (board[row + 1] && board[row + 1][col + 1] === 'O*`') {
      count++;
    }
    // down
    if (board[row + 1] && board[row + 1][col] === 'O*`') {
      count++;
    }
    // down and to the left
    if (board[row + 1] && board[row + 1][col - 1] === 'O*`') {
      count++;
    }
    // left
    if (board[row] && board[row][col - 1] === 'O*`') {
      count++;
    }
    // up and to the left
    if (board[row - 1] && board[row - 1][col - 1] === 'O*`') {
      count++;
    }

    return count;

  }

  handleClick() {
    this.setState({
      done: !this.state.done
    });
  }

  changeClass(newBoard) {
    this.setState({
      handleSolution: newBoard
    });
  }

  render() {
    return (
      <div>
      {/* <div className="counter">
      <Number digit={ (this.amountBombs / 100)      } />
      <Number digit={ (this.amountBombs % 100) / 10 } />
      <Number digit={ (this.amountBombs % 10 )      } />
    </div> */}
      <table>
        <tbody>
          {[...Array(this.width)].map((item, row) => (
            <tr key={row}>
              {[...Array(this.width)].map((item, col) => (
                <Square
                  key={col}
                  location={`${row},${col}`}
                  board={this.state.board}
                  changeClass={this.changeClass}
                  handleSolution={this.state.handleSolution}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    );
  }
}

export default Board;