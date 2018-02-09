import React, {Component} from 'react';
import Input from 'wix-style-react/Input';
import Button from 'wix-style-react/Button';
import PropTypes from 'prop-types';

export default class Registration extends Component {
  static propTypes = {
    onNewGame: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      user1Input: '',
      user2Input: '',
    };
  }

  render() {
    return (
      <div>
        User 1: <Input dataHook="user1" onChange={e => this.setState({user1Input: e.target.value})}/>
        User 2: <Input dataHook="user2" onChange={e => this.setState({user2Input: e.target.value})}/>
        <Button dataHook="newGame" onClick={() => this.props.onNewGame({user1: this.state.user1Input, user2: this.state.user2Input})}>New Game</Button>
      </div>
    );
  }
}
