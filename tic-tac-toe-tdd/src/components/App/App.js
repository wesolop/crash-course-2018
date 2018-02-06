import React from 'react';
import Game from '../Game';
import Registration from '../Registration';
import s from './App.scss';
import {gameStatus} from '../../gameService';
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user1: '',
      user2: '',
      board: [['', '', ''], ['', '', ''], ['', '', '']],
      winner: '',
      currentPlayer: 'X',
    };
  }
  cellClicked({cIndex, rIndex}) {
    const board = this.state.board.map(r => [...r]);
    board[rIndex][cIndex] = this.state.currentPlayer;
    const winnerSymbol = gameStatus(board);
    if (winnerSymbol) {
      const winner = winnerSymbol === 'X' ? this.state.user1 : this.state.user2;
      this.setState({winner});
    }
    const nextPlayer = this.state.currentPlayer === 'X' ? 'O' : 'X';
    this.setState({board, currentPlayer: nextPlayer});
  }
  render() {
    return (
      <div className={s.root}>
        <Registration onNewGame={({user1, user2}) => this.setState({user1, user2})}/>
        <Game
          board={this.state.board}
          onCellClicked={({cIndex, rIndex}) => this.cellClicked({cIndex, rIndex})}
          user1={this.state.user1}
          user2={this.state.user2}
          />
        {this.state.winner && <div data-hook="winner-message">{`${this.state.winner} won!`}</div>}
      </div>
    );
  }
}

export default App;
