import React, { Component } from 'react';
import jsonp from 'jsonp';
import './styles/styles.css';

import SearchBar from './components/SearchBar';
import StatusBar from './components/StatusBar';
import Channel from './components/Channel';

class App extends Component {
  constructor() {
    super();

    this.getChannels = this.getChannels.bind(this);

    this.state = {
      channels: [],
      users: []
    }
  }

  getChannels(channel) {
    const baseUrl = 'https://wind-bow.gomix.me/twitch-api';

    let channels = this.state.channels;
    let callUrl = '';
    let self = this; // this seems ugly, but works

    function getData(callUrl, channels) {

      jsonp(callUrl, null, function (err, data) {
        if (err) {
          console.error(err.message);
        }
        else {
          let channelObj = {}

          channelObj.channelName = data.display_name;
          channelObj.game = data.game;
          channelObj.status = data.status;
          channelObj.updated = data.updated_at;
          channelObj.logoSrc = data.logo;
          channelObj.bannerSrc = data.bannerSrc;

          channels.push(channelObj);

          self.setState({ channels });
        }
      });
    }

    if (Array.isArray(channel)) {
      for (var i = 0; i < channel.length; i++) {
        callUrl = `${baseUrl}/channels/${channel[i]}`;
        getData(callUrl, channels);
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
        <div className="channel-list">
          {this.state.channels.map(channel => <Channel key={channel.updated} channelInfo={channel}/>)}
        </div>
      </div>
    );
  }
}

export default App;
