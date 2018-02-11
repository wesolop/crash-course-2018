import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Game extends Component {
  static propTypes = {
    p1: PropTypes.string,
    p2: PropTypes.string,
    board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    onCellClicked: PropTypes.func.isRequired,
  };

  render() {
    const {p1, p2, board, onCellClicked} = this.props;
    return (
      <div>
        <div className="p1Name">{p1}</div>
        <div className="p2Name">{p2}</div>
        <table>
          <tbody>
            {board.map((row, rIndex) =>
              <tr key={rIndex}>{row.map((cell, cIndex) =>
                <td key={cIndex} onClick={() => onCellClicked({cIndex, rIndex})}>{cell}</td>)}</tr>)}
          </tbody>
        </table>
      </div>
    );
  }
}
