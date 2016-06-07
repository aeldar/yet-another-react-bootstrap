import React from 'react';

import styles from './App.css';

export default class App extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  getInitialState() {
    return {
      name: this.props.name || 'Dude',
    };
  }

  render() {
    return (
      <div className={styles.app}>Hi, {this.state.name}!</div>
    );
  }
}
