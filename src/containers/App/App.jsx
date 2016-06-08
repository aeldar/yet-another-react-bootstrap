import React from 'react';

import styles from './App.css';

// require instead import is used to make eslint calm. That is more an exception than rule (I hope).
require('static/styles/base.css');
require('normalize.css');

export default class App extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
    killme: React.PropTypes.any,
  };

  state = {
    name: this.props.name || 'Dude',
  };

  render() {
    return (
      <div className={styles.app}>Hi, {this.state.name}!</div>
    );
  }
}
