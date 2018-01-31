import React from 'react';
import s from './App.scss';

class App extends React.Component {
  constructor() {
    super();
    this.state = {user1: '', user2: ''};
  }
  render() {
    return (
      <div className={s.root}>
        <input className="user1" onChange={e => this.setState({user1: e.target.value})}/>
        <input className="user2" onChange={e => this.setState({user2: e.target.value})}/>
        <button className="start">start</button>
        <div className="input1">{this.state.user1}</div>
        <div className="input2">{this.state.user2}</div>
      </div>
    );
  }
}

export default App;
