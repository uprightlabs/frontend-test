import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import { Route } from "react-router-dom";
import "./recording-styles.css";

class Recording extends Component {
  toggleColor = () => {
    // Toggle the record button to be red
    let element = document.getElementById("record");
    element.classList.toggle("recording");
    
    // Toggle the play buttons to fade away
    let playElement = document.getElementById("play"); 
    playElement.classList.toggle("play")
    
    // Toggle the delete buttons to fade away
    let deleteElement = document.getElementById("delete"); 
    deleteElement.classList.toggle("play")
  };

  render() {
    return (
      <div className="recordingContent">
        <div id="record" onClick={() => this.toggleColor()}>Record</div>
        <div id="play">Play</div>
        <div id="delete">Delete</div>
      </div>
    );
  }
}

export default Recording;
