import React from 'react';

import styles from './App.css';

export default class App extends React.Component {

  static propTypes = {
    name: React.PropTypes.string,
  };

  // just a stub to make eslint happy
  setState(state) {
    return state;
  }

  render() {
    return (
      <div className={styles.app}>Hi, dude!</div>
    );
  }
}
