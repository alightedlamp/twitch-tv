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
      streams: []
    }
  }

  getChannels(channel) {
    const baseUrl = 'https://wind-bow.gomix.me/twitch-api';

    let channels = this.state.channels;
    let streams = this.state.streams;

    let self = this; // this seems ugly, but works

    function getChannelData(callUrl, channels) {

      jsonp(callUrl, null, function (err, data) {
        if (err) console.error(err.message);
        else {
          console.log(data);
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

          self.setState({ channels });
        }
      });
    }

    function getStreamData(callUrl) {
      jsonp(callUrl, null, function(err, data) {
        if (err) console.log(err);
        else {
          console.log(data);

          if (data.stream) {
            let streamObj = {}

            streamObj.type = data.stream.stream_type;
            streamObj.links = data.stream._links;

            streams.push(streamObj);

            self.setState({ streams });
          }
        }
      })
    }

    if (Array.isArray(channel)) {
      for (var i = 0; i < channel.length; i++) {
        getChannelData(`${baseUrl}/channels/${channel[i]}`, channels);
        getStreamData(`${baseUrl}/streams/${channel[i]}`, channels);
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
        <div className="controls">
          <SearchBar />
          <StatusBar />
        </div>
        <div className="channel-list">
          {this.state.channels.map(channel => {
            return <Channel key={channel.updated} channelInfo={channel}/>
          })}
        </div>
      </div>
    );
  }
}

export default App;
