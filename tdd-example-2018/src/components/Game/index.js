import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Game extends Component {
  static propTypes = {
    p1: PropTypes.string,
    p2: PropTypes.string,
  };

  render() {
    const {p1, p2} = this.props;
    return (
      <div>
        <div className="p1Name">{p1}</div>
        <div className="p2Name">{p2}</div>
      </div>
    );
  }
}
