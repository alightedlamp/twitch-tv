import React, { Component } from 'react';
import axios from 'axios';
import './styles/styles.css';

import SearchBar from './components/SearchBar';
import StatusBar from './components/StatusBar';
import Channel from './components/Channel';

class App extends Component {
  constructor() {
    super();

    this.getChannel = this.getChannels.bind(this);

    this.state = {
      channels: [],
      users: []
    }
  }
  getChannels(channel) {
    const baseUrl = 'https://wind-bow.gomix.me/twitch-api';
    let callUrl = '';

    if (Array.isArray(channel)) {
      for (var i = 0; i < channel.length; i++) {
        callUrl = `${baseUrl}/channels/${channel[i]}`;

        axios.get(callUrl)
          .then(response => {
            console.log(response);
          });
      }
    }
  }
  componentDidMount() {
    const defaultChannels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

    this.getChannels(defaultChannels);
  }
  render() {
    return (
      <div className="App">
        <div className="header">
          <h1 className="title">Twitch TV Stream</h1>
        </div>
        <SearchBar />
        <StatusBar />
        <p className="channel-list">
          <Channel />
        </p>
      </div>
    );
  }
}

export default App;
