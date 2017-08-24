import React from 'react';

class Channel extends React.Component {
  constructor(props) {
    super(props);

    this.channelInfo = this.props.channelInfo;
  }
  render() {
    return(
      <div className="channel">
        <p>Channel: {this.channelInfo.channelName}</p>
        <p>Status: {this.channelInfo.status}</p>
      </div>
      )
  }
}

export default Channel;