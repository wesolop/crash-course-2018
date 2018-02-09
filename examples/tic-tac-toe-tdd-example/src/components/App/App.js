import React from 'react';
import {translate} from 'react-i18next';
import s from './App.scss';
import PropTypes from 'prop-types';
import Registration from '../Registration';
import Game from '../Game';

class App extends React.Component {
  static propTypes = {
    t: PropTypes.func
  };

  constructor() {
    super();
    this.state = {
      user1: '',
      user2: '',
    };
  }

  render() {
    return (
      <div className={s.root}>
        <Registration onNewGame={({user1, user2}) => this.setState({user1, user2})}/>
        <Game user1={this.state.user1} user2={this.state.user2}/>
      </div>
    );
  }
}

export default translate(null, {wait: true})(App);
