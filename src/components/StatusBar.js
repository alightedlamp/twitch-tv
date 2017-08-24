import React from 'react';

class StatusBar extends React.Component {
  render() {
    return(
      <div className="status-bar">
        <div>
          Online
        </div>
        <div>
          Offline
        </div>
      </div>
      )
  }
}

export default StatusBar;