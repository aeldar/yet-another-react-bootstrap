import React from 'react';

import styles from './App.css';
import batteryImg from './images/battery.svg';

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
      <div className={styles.app}>
        Hi, {this.state.name}!
        <img src={batteryImg} alt="empty" width="64" />
      </div>
    );
  }
}
