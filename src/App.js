import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      // state here
    }
  }
  componentDidMount() {
    // API calls here

    // Update state
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Twitch TV</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
