import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import React, {useState} from 'react';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState();
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  }
  
  // Use useState eventually
  const addTrack = (track) => {
    setPlaylistTracks(oldPlaylistTracks => {
      if (oldPlaylistTracks.includes(track)) {
        return oldPlaylistTracks;
      }
      else {
        return [...oldPlaylistTracks, track];
      }
    });
  }

  const removeTrack = (track) => {
    setPlaylistTracks(oldPlaylistTracks => oldPlaylistTracks.filter((t => track !== t)));
  }

  const savePlaylist = async() => {
    const trackURIs = playlistTracks.map(element => element.uri);
    await Spotify.save(playlistName,trackURIs);
    console.log("Save");
  }
  
  const searchHandler = async (lookUp) => {
    console.log(lookUp);
    const results = await Spotify.search(lookUp);
    setSearchResults(results);
  }

  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={searchHandler}/>
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAdd={addTrack}/>
          <PlayList playlistName={playlistName} playlistTracks ={playlistTracks} onRemove={removeTrack}
          onNameChange={updatePlaylistName} onSave={savePlaylist}/>
        </div>
      </div>
    </div>
  );
}

export default App;
