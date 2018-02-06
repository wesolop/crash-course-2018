import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import Input from 'wix-style-react/Input';

export default class Registration extends Component {
  constructor() {
    super();
    this.state = {
      user1: '',
      user2: '',
    };
  }

  static propTypes = {
    onNewGame: PropTypes.func.isRequired,
  }
  render() {
    return (
      <div>
        <Input dataHook="user1" onChange={e => this.setState({user1: e.target.value})}/>
        <Input dataHook="user2" onChange={e => this.setState({user2: e.target.value})}/>
        <button data-hook="start" onClick={() => this.props.onNewGame({user1: this.state.user1, user2: this.state.user2})}>start</button>
      </div>
    );
  }
}
