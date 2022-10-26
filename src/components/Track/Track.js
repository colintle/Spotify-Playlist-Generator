import React, {useState} from 'react';
import "./Track.css";

function Track(props) {
  const [removal, setRemoval] = useState(props.isRemoval);

  const renderAction  = () => setRemoval(!removal);

  const addTrack = () => {
    console.log("Add");
    props.onAdd(props.track);
  }

  const removeTrack = () => {
    props.onRemoval(props.track);
  }
  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{props.track.name}</h3>
        <p>{props.track.artist} | {props.track.album}</p>
      </div>
      <button className="Track-action" onClick={removal ? removeTrack : addTrack}>
        {removal ? "-" : "+"}
      </button>
    </div>
  );
}

export default Track