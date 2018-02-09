import React from 'react';
import {translate} from 'react-i18next';
import s from './App.scss';
import PropTypes from 'prop-types';
import Registration from '../Registration';
import Game from '../Game';

class App extends React.Component {
  static propTypes = {
    t: PropTypes.func
  };

  constructor() {
    super();
    this.state = {
      user1: '',
      user2: '',
      board: [['', '', ''], ['', '', ''], ['', '', '']],
      winner: '',
    };
  }

  handleCellClicked({cIndex, rIndex}) {
    const board = this.state.board.map(row => [...row]);
    board[rIndex][cIndex] = 'X';
    if (board[0].every(cell => cell === 'X')) {
      this.setState({winner: 'X'});
    }
    this.setState({board});
  }

  render() {
    return (
      <div className={s.root}>
        <Registration onNewGame={({user1, user2}) => this.setState({user1, user2})}/>
        <Game
          user1={this.state.user1}
          user2={this.state.user2}
          board={this.state.board}
          onCellClicked={({cIndex, rIndex}) => this.handleCellClicked({cIndex, rIndex})}
          />
        {this.state.winner && <div data-hook="winner">Yaniv wins!</div>}
      </div>
    );
  }
}

export default translate(null, {wait: true})(App);
