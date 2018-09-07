import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { Route } from "react-router-dom";
import "./recording-styles.css";

class Recording extends Component {
  
    toggleRecord = () => {
    // Toggle the record button to be red
    let element = document.getElementById("record");
    element.classList.toggle("recording");
    
    // Toggle the play buttons to fade away
    let playElement = document.getElementById("play"); 
    playElement.classList.toggle("play")
    
    // Toggle the delete buttons to fade away
    let deleteElement = document.getElementById("delete"); 
    deleteElement.classList.toggle("play")

    // Function for recording

  };

  togglePlay = () => {
        // Toggle the record button to fade away
    let element = document.getElementById("record");
    element.classList.add("play");

        // Toggle the play button to fade away
    let playElement = document.getElementById("play"); 
    playElement.classList.add("play")

        // Toggle the delete button to fade away
    let deleteElement = document.getElementById("delete"); 
    deleteElement.classList.add("play")

        // Function to grab the recording by Id

        // function to play the recording

        // reset styling at the end
    element.classList.remove("play");
    playElement.classList.remove("play")
    deleteElement.classList.remove("play")

  };

  deleteRecording = () => {
    // Delete recording by Id in DB
  };

  render() {
    return (
      <div className="recordingContent">
        <div id="record" onClick={() => this.toggleRecord()}>Record</div>
        <div id="play" onClick={() => this.togglePlay()}>Play</div>
        <div id="delete" onClick={() => this.deleteRecording()}><Link to="/">Delete</Link></div>
      </div>
    );
  }
}

export default Recording;
