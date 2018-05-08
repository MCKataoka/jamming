import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [
    ],
    playlistName: 'New Playlist',
    playlistTracks: [
    ]
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  savePlaylist(){
    const trackUri = this.state.playlistTracks.map(track => track.URI);
    console.log(trackUri);
    Spotify.savePlaylist(this.state.playlistName, trackUri).then(() =>{

      this.setState({playlistName: 'New Playlist'});
      this.setState({playlistTracks: []});

    });
  }

  search(searchTerm){
    console.log(searchTerm);
    Spotify.getAccessToken();
    Spotify.search(searchTerm).then(tracks => {
       this.setState({searchResults: tracks});
    });
  }

  addTrack(track){
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }else{
      this.state.playlistTracks.push(track);
    }
    this.setState({playlistTracks: this.state.playlistTracks});
  }

  removeTrack(track){
    let newArray = this.state.playlistTracks.filter(savedTrack => savedTrack.id !== track.id);
    this.setState({playlistTracks: newArray});
  }

  updatePlaylistName(name){
    this.setState({playlistName: name});

  }


  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mm</span>ing</h1>
        <div className="App">
            <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
