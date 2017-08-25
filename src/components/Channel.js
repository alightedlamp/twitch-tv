import React from 'react';

class Channel extends React.Component {
  constructor(props) {
    super(props);

    this.channelInfo = this.props.channelInfo;
  }
  render() {
    return(
      <div className="channel">
        <div className="channel-avatar">
          <a href={this.channelInfo.links.self}>
            <img src={this.channelInfo.logoSrc} alt="Channel Logo"/>
          </a>
        </div>
        <div className="channel-info">
          <h2><a href={this.channelInfo.links.self}>{this.channelInfo.channelName}</a></h2>
          <p>Status: {this.channelInfo.status}</p>
        </div>
      </div>
      )
  }
}

export default Channel;