import React, { Component } from 'react';
import jsonp from 'jsonp';
import './styles/styles.css';

import SearchBar from './components/SearchBar';
import Channels from './components/Channels';

class App extends Component {
  constructor() {
    super();

    this.state = {
      channels: [],
      streams: [],
      statusChoice: 'All'
    }

    this.getChannels = this.getChannels.bind(this);
  }
  getChannels(channel) {
    const baseUrl = 'https://wind-bow.gomix.me/twitch-api';

    let channels = this.state.channels;
    let streams = this.state.streams;

    function getChannelData(callUrl) {
      jsonp(callUrl, null, function (err, data) {
        if (err) console.error(err.message);
        else {
          // console.log(data);
          let channelObj = {}

          channelObj.channelName = data.display_name;
          channelObj.game = data.game;
          channelObj.links = data._links;
          channelObj.status = data.status;
          channelObj.updated = data.updated_at;
          channelObj.logoSrc = data.logo;
          channelObj.bannerSrc = data.bannerSrc;
          channelObj.bannerColor = data.profile_banner_background_color;

          channels.push(channelObj);
        }
      });
    }

    function getStreamData(callUrl, i) {
      jsonp(callUrl, null, function(err, data) {
        if (err) console.log(err);
        else {
          // console.log(data);
          if (data.stream) {
            let streamObj = {}

            streamObj.game = data.stream.game;
            streamObj.type = data.stream.stream_type;
            streamObj.links = data.stream._links;

            streams.push(streamObj);

            if (channels[i]) {
              channels[i].channelStatus = 'Online';
            }
          }
          else {
            if (channels[i]) {
              channels[i].channelStatus = 'Offline';
            }
          }
        }
      });
    }

    if (Array.isArray(channel)) {
      for (var i = 0; i < channel.length; i++) {
        getChannelData(`${baseUrl}/channels/${channel[i]}`);
        getStreamData(`${baseUrl}/streams/${channel[i]}`, i);
      }
    }
    // Why is this not rerendering component?
    this.setState({ channels, streams });
  }

  componentDidMount() {
    const defaultChannels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"];

    this.getChannels(defaultChannels);
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <h1 className="title">Twitch TV Stream</h1>
        </div>
        <div className="controls">
          <SearchBar />
        </div>
        <div className="channels">
          <Channels channels={this.state.channels} streams={this.state.streams} />
        </div>
      </div>
    );
  }
}

export default App;
