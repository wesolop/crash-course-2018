import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Game extends Component {
  static propTypes = {
    user1: PropTypes.string,
    user2: PropTypes.string,
    board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    onCellClicked: PropTypes.func.isRequired,
  };

  render() {
    const {user1, user2} = this.props;
    return (
      <div>
        <div>
          <label data-hook="user1Title">{user1}</label>
          <label data-hook="user2Title">{user2}</label>
        </div>
        <table>
          <tbody>
            {this.props.board.map((row, rIndex) =>
              <tr key={rIndex}>{row.map((cell, cIndex) =>
                <td
                  key={cIndex} onClick={() =>
                  this.props.onCellClicked({cIndex, rIndex})}
                               >{cell}
                </td>)}
              </tr>)}
          </tbody>
        </table>
      </div>
    );
  }
}
