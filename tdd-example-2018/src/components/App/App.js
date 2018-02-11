import React from 'react';
import {translate} from 'react-i18next';
import s from './App.scss';
import Registration from '../Registration';
import Game from '../Game';

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
    if (board[0].every(cell => cell === 'X')) {
      this.setState({winner: 'X'});
    }
    const nextPlayer = this.state.currentPlayer === 'X' ? 'O' : 'X';
    this.setState({board, currentPlayer: nextPlayer});
  }

  render() {
    return (
      <div className={s.root}>
        <Registration onNewGame={(p1, p2) => this.setState({p1, p2})}/>
        <Game onCellClicked={this.handleCellClick} board={this.state.board} p1={this.state.p1} p2={this.state.p2}/>
        {this.state.winner && <div data-hook="winnerMessage">Yaniv wins!</div>}
      </div>
    );
  }
}

export default translate(null, {wait: true})(App);
