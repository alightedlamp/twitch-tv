import React from 'react';
// import FontIcon from 'material-ui/FontIcon';
import {Card, CardHeader, CardMedia, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class Channel extends React.Component {
  constructor(props) {
    super(props);

    this.channelInfo = this.props.channelInfo;
    this.statusColor = this.props.channelInfo.channelStatus === 'Online' ? { color: 'green' } : { color: '#888' };
  }
  render() {
    let banner = null;
    if (this.channelInfo.bannerSrc) {
      banner = <img src={this.channelInfo.bannerSrc} alt="Channel Banner"/>;
    }
    else {
      banner = <div className="default-banner"></div>;
    }
    return(
      <Card>
        <CardHeader
          title={this.channelInfo.channelName}
          subtitle={`Updated: ${this.channelInfo.updated}`}
          avatar={this.channelInfo.logoSrc}
        />
        <CardMedia
          overlay={<CardTitle title={this.channelInfo.game} subtitle={this.channelInfo.status}/>}
        >
          {banner}
        </CardMedia>
        <FlatButton
          label={`View - ${this.channelInfo.channelStatus}`}
          href={this.channelInfo.links.self}
        />
      </Card>
      )
  }
}

export default Channel;