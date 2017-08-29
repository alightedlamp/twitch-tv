import React from 'react';
import { AutoComplete } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios';

const CLIENT_ID='?x9e6ecshjrf9sx1t9m1td07n9m2hgj';
const BASE_URL = 'https://api.twitch.tv/kraken/search/channels?query='

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      inputValue: ''
    }

    this.onUpdateInput = this.onUpdateInput.bind(this);
    this.listResults = this.listResults.bind(this);
    this.getChannels = this.props.getChannels;
  }
  onUpdateInput(inputValue) {
    const self = this;
    this.setState({
      inputValue: inputValue
    }, function() {
      self.searchChannels();
    });
  }
  searchChannels() {
    const self = this;
    const url = BASE_URL + this.state.inputValue;

    if(this.state.inputValue !== '') {
      axios.get(url, {
          params: {
            client_id: CLIENT_ID
          }
        })
        .then(function(data) {
          let searchResults, retrievedSearchTerms;
          searchResults = data.data.channels;

          retrievedSearchTerms = searchResults.map(channel => channel.name);

          self.setState({
            dataSource: retrievedSearchTerms
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
  listResults() {
    this.getChannels(this.state.dataSource);
  }
  render() {
    return(
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <div>
            <AutoComplete
              hintText="Search"
              dataSource={this.state.dataSource}
              onUpdateInput={this.onUpdateInput}
              onNewRequest={this.listResults}
              fullWidth={true}
            />
          </div>
        </MuiThemeProvider>
      )
  }
}

export default SearchBar;