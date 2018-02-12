import React from 'react';
import {translate} from 'react-i18next';
import s from './App.scss';
import Registration from '../Registration';
import Game from '../Game';
import {getWinner} from '../../logic/board';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      p1: '',
      p2: '',
      board: [['', '', ''], ['', '', ''], ['', '', '']],
      winner: '',
      currentPlayer: 'X',
      leaderBoard: undefined,
    };
  }

  componentDidMount() {
    axios.get('/leader-board').then(response => {
      const {data: leaderboard} = response;
      this.setState({
        leaderboard
      });
    });
  }

  handleCellClick = ({cIndex, rIndex}) => {
    const board = this.state.board.map(row => [...row]);
    board[rIndex][cIndex] = this.state.currentPlayer;
    const winner = getWinner(board);
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

  renderGame() {
    if (this.gameStarted()) {
      return (
        <div data-hook="game-board">
          <Game
            onCellClicked={this.handleCellClick}
            board={this.state.board}
            p1={this.state.p1}
            p2={this.state.p2}
            />
        </div>
      );
    } else {
      return null;
    }
  }

  renderLeaderBoard() {
    const {p1, p2} = this.state;
    return (
      <div data-hook="leader-board">
        <div data-hook="leader-board-row">
          <div data-hook="leader-board-name">
            {p1}
          </div>
          <div data-hook="leader-board-score">
            0
          </div>
        </div>
        <div data-hook="leader-board-row">
          <div data-hook="leader-board-name">
            {p2}
          </div>
          <div data-hook="leader-board-score">
            0
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={s.root}>
        {!this.gameStarted() && (
          <Registration dataHook="registration" onNewGame={(p1, p2) => this.setState({p1, p2})}/>
        )}
        {this.renderGame()}
        {this.renderWinningMessage()}
        {this.renderLeaderBoard()}
      </div>
    );
  }

  gameStarted() {
    return Boolean(this.state.p1);
  }
}

export default translate(null, {wait: true})(App);
