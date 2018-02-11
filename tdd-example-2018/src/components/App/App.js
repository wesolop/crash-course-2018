import React from 'react';
import {translate} from 'react-i18next';
import s from './App.scss';
import Registration from '../Registration';
import Game from '../Game';
import BoardLogic from '../../logic/board/index.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      p1: '',
      p2: '',
      board: [['', '', ''], ['', '', ''], ['', '', '']],
      winner: '',
      currentPlayer: 'X',
    };
  }

  handleCellClick = ({cIndex, rIndex}) => {
    const board = this.state.board.map(row => [...row]);
    board[rIndex][cIndex] = this.state.currentPlayer;
    const winner = BoardLogic.getWinner(board);
    if (winner === this.state.currentPlayer) {
      this.setState({winner: this.state.currentPlayer});
    }

    const nextPlayer = this.state.currentPlayer === 'X' ? 'O' : 'X';
    this.setState({board, currentPlayer: nextPlayer});
  }

  renderWinningMessage() {
    const {winner, p1, p2} = this.state;
    if (winner) {
      return (
        <div data-hook="winnerMessage">
          {winner === 'X' ? p1 : p2} wins!
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className={s.root}>
        <Registration onNewGame={(p1, p2) => this.setState({p1, p2})}/>
        <Game onCellClicked={this.handleCellClick} board={this.state.board} p1={this.state.p1} p2={this.state.p2}/>
        {this.renderWinningMessage()}
      </div>
    );
  }
}

export default translate(null, {wait: true})(App);
