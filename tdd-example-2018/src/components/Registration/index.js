import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Registration extends Component {
  static propTypes = {
    onNewGame: PropTypes.func
  };

  constructor() {
    super();
    this.state = {
      p1: '',
      p2: '',
    };
  }
  render() {
    return (
      <div>
        <input
          data-hook="p1Input"
          onChange={e => this.setState({p1: e.target.value})}
          />
        <input
          data-hook="p2Input"
          onChange={e => this.setState({p2: e.target.value})}
          />
        <button
          data-hook="newGame"
          onClick={() => this.props.onNewGame(this.state.p1, this.state.p2)}
          >New Game</button>
      </div>
    );
  }
}
