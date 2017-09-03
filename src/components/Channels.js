import React from 'react';
import Channel from './Channel';

class Channels extends React.Component {
  componentDidMount() {
    if (this.props.channels.length === 0) {
      const defaultChannels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"];
      this.props.getChannels(defaultChannels);
    }
  }

  render() {
    return(
      <div>
        <div className="channels-list">
          {this.props.channels.map(channel => {
            if (channel.channelStatus === this.props.selectedTab || this.props.selectedTab === 'All') {
              return <Channel key={channel.updated} channelInfo={channel} />;
            }
          })}
        </div>
      </div>
    )
  }
}

export default Channels;