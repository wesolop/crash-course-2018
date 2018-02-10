import React from 'react';
import axios from 'axios';
import {translate} from 'react-i18next';
import s from './App.scss';
import PropTypes from 'prop-types';
import queryString from 'query-string';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      comments: []
    };
  }

  static propTypes = {
    t: PropTypes.func
  };

  async componentDidMount() {
    const {siteId} = queryString.parse(location.search);
    const response = await axios.get(`/comments/${siteId}`);
    this.setState({comments: response.data});
  }

  render() {
    return (
      <div className={s.root}>
        <ul>
          {this.state.comments.map((comment, index) => <li key={index}>{`${comment.text} | ${comment.author}`}</li>)}
        </ul>
      </div>
    );
  }
}

export default translate(null, {wait: true})(App);
