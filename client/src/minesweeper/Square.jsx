import React from 'react';

class Square extends React.Component {
  constructor(props) {
    super(props);

    this.revealedCount = 0;
    this.handleReveal = this.handleReveal.bind(this);
  }

  handleReveal() {
    console.log('this.revealedCount', this.revealedCount)
    // eslint-disable-next-line radix
    const row = parseInt(this.props.location.split(',')[0]);
    // eslint-disable-next-line radix
    const col = parseInt(this.props.location.split(',')[1]);

    if (this.props.board[row][col] === 'O*`') {
      alert('you just got wrecked');
    } else {

      const newBoard = [...this.props.board];
      const handleSolution = [...this.props.handleSolution];


      // up
      if (newBoard && newBoard[row][col] !== 'O*`' && newBoard[row][col] !== '') {
        handleSolution[row][col] = 'revealed';
        this.revealedCount++;
      } else {
        handleSolution[row][col] = 'revealed';
        this.revealedCount++;

        if (newBoard[row - 1] && newBoard[row - 1][col] !== 'O*`') {
          handleSolution[row - 1][col] = 'revealed';
          this.revealedCount++;
        }

        // // up and to the right
        if (newBoard[row - 1] && newBoard[row - 1][col + 1] !== 'O*`') {
          handleSolution[row - 1][col + 1] = 'revealed';
          this.revealedCount++;
        }

        // right
        if (newBoard[row][col + 1] !== 'O*`') {
          handleSolution[row][col + 1] = 'revealed';
          this.revealedCount++;
        }

        // // down and to the right
        if (newBoard[row + 1] && newBoard[row + 1][col + 1] !== 'O*`') {
          handleSolution[row + 1][col + 1] = 'revealed';
          this.revealedCount++;
        }

        // // down
        if (newBoard[row + 1] && newBoard[row + 1][col] !== 'O*`') {
          handleSolution[row + 1][col] = 'revealed';
          this.revealedCount++;
        }

        // down and to the left
        if (newBoard[row + 1] && newBoard[row + 1][col - 1] !== 'O*`') {
          handleSolution[row + 1][col - 1] = 'revealed';
          this.revealedCount++;
        }

        // // left
        if (newBoard[row] && newBoard[row][col - 1] !== 'O*`') {
          handleSolution[row][col - 1] = 'revealed';
          this.revealedCount++;
        }

        // up and to the left
        if (newBoard[row - 1] && newBoard[row - 1][col - 1] !== 'O*`') {
          handleSolution[row - 1][col - 1] = 'revealed';
          this.revealedCount++;
        }
      }

      this.props.changeClass(handleSolution);
    }
  }

  render() {
    const row = this.props.location.split(',')[0];
    const col = this.props.location.split(',')[1];
    if (this.props.handleSolution[row] && this.props.handleSolution[row][col] === 'revealed'){
      return (
        <td className="revealed" className={(this.props.board[row][col]) <= 3 ? ((this.props.board[row][col] === 1) ? "one" : ((this.props.board[row][col] === 2) ? "two" : "three")) : "four"} onClick={this.handleReveal}>
        {this.props.board[row][col]}
      </td>
      )
    } else {
      return (
        <td className="hidden" onClick={this.handleReveal}>

        </td>
      );
    }

  }
}


export default Square;