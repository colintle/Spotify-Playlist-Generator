import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';

function TrackList(props) {
  return (
    <div className="TrackList">
      {
        props.tracks.map(element => <Track track={element} key={element.id} 
          onAdd={props.onAdd} onRemoval={props.onRemoval} isRemoval={props.isRemoval} />)
      }
    </div>
  );
}

export default TrackList