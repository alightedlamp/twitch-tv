import React, { Component } from 'react';
import JSONP from 'jsonp';
import './styles/styles.css';

import AppBar from 'material-ui/AppBar';
import TabBar from './components/TabBar';
import SearchBar from './components/SearchBar';

import Channels from './components/Channels';

class App extends Component {
  constructor() {
    super();

    this.state = {
      channels: [],
      streams: [],
      selectedTab: ''
    }

    this.getChannels = this.getChannels.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.loadDefault = this.loadDefault.bind(this);

    this.defaultChannels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"];
  }

  getChannels(channelsToDisplay) {
    const baseUrl = 'https://wind-bow.gomix.me/twitch-api';

    let channels = [];
    let streams = [];

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

    try {
      console.log('getting channel data');
      for (var i = 0; i < channelsToDisplay.length; i++) {
        getChannelData(channelsToDisplay[i]);
      }
    }
    catch (e) {
      if (e instanceof TypeError) {
        getChannelData(channelsToDisplay);
      }
      else {
        console.log('invalid data input');
      }
    }
    this.setState({ channels, streams });
  }

  loadDefault() {
    this.getChannels(this.defaultChannels);
  }

  handleUpdate(tab) {
    if (tab !== this.state.selectedTab) {
      this.setState({ selectedTab: tab });
    }
  }

  render() {
    return (
      <div className="App">
        <AppBar title="Twitch TV Stream" />
        <div className="search-bar">
          <SearchBar
            getChannels={this.getChannels}
            selectedTab={this.selectedTab}
          />
        </div>
        <div className="App-Content">
          <TabBar
            handleUpdate={this.handleUpdate}
            selectedTab={this.selectedTab}
          />
          <div className="channels">
            <Channels
              getChannels={this.getChannels}
              loadDefault={this.loadDefault}
              selectedTab={this.state.selectedTab}
              channels={this.state.channels}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
