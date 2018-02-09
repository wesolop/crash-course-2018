import React from 'react';
import Input from 'wix-style-react/Input';
import Button from 'wix-style-react/Button';
import {translate} from 'react-i18next';
import s from './App.scss';
import PropTypes from 'prop-types';


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
        <div>
          User 1: <Input dataHook="user1" onChange={e => this.setState({user1: e.target.value})}/>
          User 2: <Input dataHook="user2" onChange={e => this.setState({user2: e.target.value})}/>
          <Button dataHook="newGame">New Game</Button>
        </div>
        <div>
          <label data-hook="user1Title">{this.state.user1}</label>
          <label data-hook="user2Title">{this.state.user2}</label>
        </div>
      </div>
    );
  }
}

export default translate(null, {wait: true})(App);
