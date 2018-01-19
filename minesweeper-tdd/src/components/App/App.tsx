import * as React from 'react';
import {translate, InjectedTranslateProps} from 'react-i18next';
import * as s from './App.scss';
import * as PropTypes from 'prop-types';

interface AppProps extends InjectedTranslateProps {}

class App extends React.Component<AppProps, null> {
  static propTypes = {
    t: PropTypes.func
  };

  render() {
    const {t} = this.props;
    return (
      <div className={s.root}>
        <div className={s.header}>
          <h2>{t('app.title')}</h2>
        </div>
        <p className={s.intro}>
          {t('app.intro')}
        </p>
      </div>
    );
  }
}

export default translate(null, {wait: true})(App);
