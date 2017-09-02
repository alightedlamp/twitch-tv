import React, { Component } from 'react';
import JSONP from 'jsonp';
import './styles/styles.css';

import AppBar from 'material-ui/AppBar';
import SearchBar from './components/SearchBar';

import Channels from './components/Channels';

class App extends Component {
  constructor() {
    super();

    this.state = {
      channels: [],
      streams: [],
      selectedTab: 'All',
      searching: true
    }

    this.getChannels = this.getChannels.bind(this);
  }
  getChannels(channel) {
    const baseUrl = 'https://wind-bow.gomix.me/twitch-api';

    let channels = this.state.channels;
    let streams = this.state.streams;

    function getChannelData(channel) {
      let callUrl = `${baseUrl}/channels/${channel}`;

      JSONP(callUrl, null, function (err, data) {
        if (err) console.error(err.message);
        else {
          let channelObj = {}

          channelObj.channelName = data.display_name;
          channelObj.game = data.game;
          channelObj.links = data._links;
          channelObj.status = data.status;
          channelObj.updated = data.updated_at;
          channelObj.logoSrc = data.logo;
          channelObj.bannerSrc = data.profile_banner;
          channelObj.bannerColor = data.profile_banner_background_color;

          // See if stream is available
          let callUrl = `${baseUrl}/streams/${channel}`

          JSONP(callUrl, null, function(err, data) {
            if (err) console.log(err);
            else {
              if (data.stream) {
                let streamObj = {}

                streamObj.game = data.stream.game;
                streamObj.type = data.stream.stream_type;
                streamObj.links = data.stream._links;

                streams.push(streamObj);

                channelObj.channelStatus = 'Online'
              }
              else {
                channelObj.channelStatus = 'Offline'
              }
            }
          });
          channels.push(channelObj);
        }
      });
    }

    if (Array.isArray(channel)) {
      for (var i = 0; i < channel.length; i++) {
        getChannelData(channel[i]);
      }
    }
    else {
      getChannelData(channel);
    }

    this.setState({ channels, streams });
  }

  componentDidMount() {
    const defaultChannels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"];
    this.getChannels(defaultChannels);
  }

  render() {
    return (
      <div className="App">
        <AppBar title="Twitch TV Stream" />
        <div className="search-bar">
          <SearchBar getChannels={this.getChannels} selectedTab={this.state.selectedTab} />
        </div>
        <div className="App-Content">
          <div className="channels">
            <Channels channels={this.state.channels} streams={this.state.streams} selectedTab={this.state.selectedTab} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
