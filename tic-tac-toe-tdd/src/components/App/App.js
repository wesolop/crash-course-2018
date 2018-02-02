import React from 'react';
import Game from '../Game';
import Registration from '../Registration';
import s from './App.scss';

class App extends React.Component {
  constructor() {
    super();
    this.state = {user1: '', user2: ''};
  }
  render() {
    return (
      <div className={s.root}>
        <Registration onNewGame={({user1, user2}) => this.setState({user1, user2})}/>
        <Game user1={this.state.user1} user2={this.state.user2}/>
      </div>
    );
  }
}

export default App;
