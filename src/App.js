import React, { Component } from 'react';
import BalanceTracker from './containers/balance-tracker/BalanceTracker';
import './App.css';

class App extends Component {
  render() {
    return (
        <div className="App">
            <BalanceTracker/>
        </div>
    );
  }
}

export default App;
