import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

class TabBar extends React.Component {
  render() {
    return(
      <Tabs>
        <Tab
          label="All"
          onActive={() => this.props.handleUpdate('All')}
        >
        </Tab>
        <Tab
          label="Online"
          onActive={() => this.props.handleUpdate('Online')}
        >
        </Tab>
        <Tab
          label="Offline"
          onActive={() => this.props.handleUpdate('Offline')}
        >
        </Tab>
      </Tabs>
      )
  }
}

export default TabBar;