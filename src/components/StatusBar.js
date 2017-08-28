import React from 'react';
import { Dropdown } from 'semantic-ui-react';

class StatusBar extends React.Component {
  render() {
    const statusOptions = ['All', 'Online', 'Offline'];

    return(
      <div className="status-bar">
        <Dropdown text="Status">
          <Dropdown.Menu>
            {statusOptions.map(item => <Dropdown.Item text={item} key={item} onClick={() => this.props.setStatus(item)}/>)}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      )
  }
}

export default StatusBar;