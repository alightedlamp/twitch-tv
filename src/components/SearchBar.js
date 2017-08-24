import React from 'react';

class SearchBar extends React.Component {
  searchChannels(e) {
    e.preventDefault();
    console.log('searching');
  }
  render() {
    return(
      <div className="search-bar">
        <form onSubmit={(e) => this.searchChannels}>
          <input type="text"/>
          <button type="submit">Search</button>
        </form>
      </div>
      )
  }
}

export default SearchBar;