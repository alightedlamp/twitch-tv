import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

import Channel from './Channel';

class Channels extends React.Component {
  constructor(props) {
    super(props);

    this.channels = this.props.channels;
    this.streams = this.props.streams;

    this.renderChannels = this.renderChannels.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);

    this.defaultTab = this.props.defaultTab;

    this.state = {
      channelComponents: [],
      statusChoice: ''
    }
  }
  renderChannels(tab) {
    let activeTab = tab ? tab.props.label : this.state.statusChoice;
    let channelComponentsArr = [];

    if (activeTab === 'All') {
      channelComponentsArr = this.channels.map(channel => {
        return <Channel key={channel.updated} channelInfo={channel} />
      });
    }
    else {
      channelComponentsArr = this.channels.map(channel => {
        if (channel.channelStatus === activeTab) {
          return <Channel key={channel.updated} channelInfo={channel} />;
        }
      });
    }
    this.setState({ channelComponents: channelComponentsArr });
  }
  handleUpdate(tab) {
    if (tab.props.label !== this.state.statusChoice) {
      this.setState({ statusChoice: tab.props.label });
      this.renderChannels(tab);
    }
  }
  componentDidMount() {
    this.renderChannels();
    if (this.state.statusChoice.length === 0) {
      this.setState({ statusChoice: this.defaultTab });
    }
  }
  render() {
    return(
      <div>
        <Tabs>
          <Tab
            label="All"
            onActive={this.handleUpdate}
          >
          </Tab>
          <Tab
            label="Online"
            onActive={this.handleUpdate}
          >
          </Tab>
          <Tab
            label="Offline"
            onActive={this.handleUpdate}
          >
          </Tab>
        </Tabs>
        <div className="channels-list">
          {this.state.channelComponents}
        </div>
      </div>
    )
  }
}

export default Channels;