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

    function getChannelData(channel) {
      let callUrl = `${baseUrl}/channels/${channel}`;

      jsonp(callUrl, null, function (err, data) {
        if (err) console.error(err.message);
        else {
          let channelObj = {}

          channelObj.channelName = data.display_name;
          channelObj.game = data.game;
          channelObj.links = data._links;
          channelObj.status = data.status;
          channelObj.updated = data.updated_at;
          channelObj.logoSrc = data.logo;
          channelObj.bannerSrc = data.bannerSrc;
          channelObj.bannerColor = data.profile_banner_background_color;

          // See if stream is available
          let callUrl = `${baseUrl}/streams/${channel}`

          jsonp(callUrl, null, function(err, data) {
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

    return [channels, streams];
  }

  componentDidMount() {
    const defaultChannels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"];
    let [channels, streams] = this.getChannels(defaultChannels);
    this.setState({ channels, streams });
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
