import React from 'react';
import axios from 'axios';
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
      gameStarted: false,
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
  saveGame() {
    return axios.post('/game', {
      user1: this.state.user1,
      user2: this.state.user2,
      board: this.state.board,
      //winner: this.state.winner,
      //currentPlayer: this.state.currentPlayer,
      gameStarted: this.state.gameStarted,
    });
  }

  async loadGame() {
    const response = await axios.get('/game');
    const {user1, user2, board, /*winner, currentPlayer,*/ gameStarted} = response.data;
    this.setState({user1, user2, board, /*winner, currentPlayer,*/ gameStarted});
  }

  render() {
    return (
      <div className={s.root}>
        {!this.state.gameStarted &&
          <Registration onNewGame={({user1, user2}) => this.setState({user1, user2, gameStarted: true})}/>}
        {this.state.gameStarted && <Game
          board={this.state.board}
          onCellClicked={({cIndex, rIndex}) => this.cellClicked({cIndex, rIndex})}
          user1={this.state.user1}
          user2={this.state.user2}
          />}
        {this.state.winner && <div data-hook="winner-message">{`${this.state.winner} won!`}</div>}
        <div>
          <button data-hook="saveGame" onClick={() => this.saveGame()}>Save Game</button>
          <button data-hook="loadGame" onClick={() => this.loadGame()}>Load Game</button>
        </div>
      </div>
    );
  }
}

export default App;
