import React from 'react';
import { AutoComplete } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import JSONP from 'jsonp';

const CLIENT_ID='?x9e6ecshjrf9sx1t9m1td07n9m2hgj';
const BASE_URL = 'https://api.twitch.tv/kraken/search/channels?query='

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.onUpdateInput = this.onUpdateInput.bind(this);
    this.state = {
      dataSource: [],
      inputValue: ''
    }
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
    const url =  BASE_URL + this.state.inputValue;

    if(this.state.inputValue !== '') {
      JSONP(url, {
          param: `client_id=${CLIENT_ID}`,
          timeout: 5000
      }, function(err, data) {
        let searchResults, retrievedSearchTerms;

        if (err) console.log(err);
        else {
          console.log(data);
          searchResults = data[1];

          retrievedSearchTerms = searchResults.map(function(result) {
            return result.channel.name;
          });

          self.setState({
            dataSource: retrievedSearchTerms
          });
        }
      });

    }
  }
  render() {
    return(
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <div>
            <AutoComplete
              hintText="Search"
              dataSource={this.state.dataSource}
              onUpdateInput={this.onUpdateInput}
              fullWidth={true}
            />
          </div>
        </MuiThemeProvider>
      )
  }
}

export default SearchBar;