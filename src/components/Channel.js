import React from 'react';
import {Card, CardHeader} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class Channel extends React.Component {
  constructor(props) {
    super(props);

    this.channelInfo = this.props.channelInfo;
  }
  render() {
    return(
      <Card>
        <CardHeader
          title={this.channelInfo.channelName}
          subtitle={this.channelInfo.status}
          avatar={this.channelInfo.logoSrc}
        />
        <FlatButton
          label={`View - ${this.channelInfo.channelStatus}`}
          href={this.channelInfo.links.self}
        />
      </Card>
      )
  }
}

export default Channel;