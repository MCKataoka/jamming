import React, { Component } from 'react';
import './SearchResults.css';
import TrackList from '/Users/mariokataoka/Documents/Projects/jamming/src/Components/TrackList/TrackList';

class SearchResults extends Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false}/>
      </div>
    );
  }
}


export default SearchResults;
