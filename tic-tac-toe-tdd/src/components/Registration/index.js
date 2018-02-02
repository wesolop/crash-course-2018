import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

export default class Registration extends Component {
  static propTypes = {
    onNewGame: PropTypes.func.isRequired,
  }
  render() {
    return (
      <div>
        <input className="user1" onChange={e => this.setState({user1: e.target.value})}/>
        <input className="user2" onChange={e => this.setState({user2: e.target.value})}/>
        <button className="start" onClick={() => this.props.onNewGame({user1: this.state.user1, user2: this.state.user2})}>start</button>
      </div>
    );
  }
}
