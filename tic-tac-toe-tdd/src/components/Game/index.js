import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

export default class Game extends Component {
  static propTypes = {
    user1: PropTypes.string.isRequired,
    user2: PropTypes.string.isRequired,
  }
  render() {
    const {user1, user2} = this.props;
    return (
      <div>
        <div className="input1">{user1}</div>
        <div className="input2">{user2}</div>
      </div>
    );
  }
}
