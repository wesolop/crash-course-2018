import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

export default class Game extends Component {
  static propTypes = {
    user1: PropTypes.string.isRequired,
    user2: PropTypes.string.isRequired,
    onCellClicked: PropTypes.func.isRequired,
    board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  }
  render() {
    const {user1, user2} = this.props;
    return (
      <div>
        <div data-hook="input1">{user1}</div>
        <div data-hook="input2">{user2}</div>
        <table>{this.props.board.map((row, rIndex) => <tr key={rIndex}>
          {row.map((col, cIndex) => <td onClick={() => this.props.onCellClicked({rIndex, cIndex})} key={cIndex}>{col}</td>)}
        </tr>)}</table>
      </div>
    );
  }
}
