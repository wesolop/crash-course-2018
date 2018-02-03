import React from 'react';
import Game from '../Game';
import Registration from '../Registration';
import s from './App.scss';

class App extends React.Component {
  constructor() {
    super();
    this.state = {user1: '', user2: '', board: [['', '', ''], ['', '', ''], ['', '', '']]};
  }
  cellClicked({cIndex, rIndex}) {
    const board = this.state.board.map(r => [...r]);
    board[rIndex][cIndex] = 'X';
    this.setState({board});
  }
  render() {
    return (
      <div className={s.root}>
        <Registration onNewGame={({user1, user2}) => this.setState({user1, user2})}/>
        <Game
          board={this.state.board}
          onCellClicked={({cIndex, rIndex}) => this.cellClicked({cIndex, rIndex})}
          user1={this.state.user1} user2={this.state.user2}
                                   />
      </div>
    );
  }
}

export default App;
