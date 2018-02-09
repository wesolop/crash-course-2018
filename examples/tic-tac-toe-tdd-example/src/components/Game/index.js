import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Game extends Component {
  static propTypes = {
    user1: PropTypes.string,
    user2: PropTypes.string,
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
            <tr>
              <td>X</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
