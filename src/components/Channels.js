import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

import Channel from './Channel';

class Channels extends React.Component {
  constructor(props) {
    super(props);

    this.channels = this.props.channels;
    this.streams = this.props.streams;
    this.selectedTab = this.props.selectedTab;

    this.state = {
      channelComponents: [],
      selectedTab: this.selectedTab
    }
  }
  renderChannels = (tab) => {
    let activeTab = tab ? tab.props.label : this.state.selectedTab;
    let channelComponents = this.channels.map(channel => {
      if (channel.channelStatus === activeTab || activeTab === 'All') {
        return <Channel key={channel.updated} channelInfo={channel} />;
      }
    });
    this.setState({ channelComponents });
  }
  handleUpdate = (tab) => {
    if (tab.props.label !== this.state.selectedTab) {
      this.setState({ selectedTab: tab.props.label });
      this.renderChannels(tab);
    }
  }
  componentDidMount() {
    if (this.channels.length) {
      this.renderChannels();
    }
    else {
      console.log('channels list is empty')
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