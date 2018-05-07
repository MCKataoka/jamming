import React, { Component } from 'react';
import './Track.css';

class Track extends Component {
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  renderAction(isRemoval){
    return isRemoval ? <a className="Track-action" onClick={this.removeTrack.bind(this, this.props.track)}>-</a> : <a className="Track-action" onClick={this.addTrack.bind(this, this.props.track)}>+</a>;
  }

  addTrack(e){
    this.props.onAdd(e);
  }

  removeTrack(e){
    this.props.onRemove(e);
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3> {this.props.track.name}</h3>
          <p> {this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.renderAction(this.props.isRemoval)}
      </div>
      );
  }
}


export default Track;
