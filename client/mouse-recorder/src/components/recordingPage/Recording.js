import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { Route } from "react-router-dom";
import "./recording-styles.css";

class Recording extends Component {
    constructor() {
        super();
        this.state = {
            coordinates: [],
            recording: 0
        }
    }

    toggleRecord = () => {
    // Toggle the record button to be red
    let element = document.getElementById("record");
    element.classList.toggle("recording");
    if (this.state.recording === 0) {
        this.setState({ recording: 1 });
        console.log("Recording!")
    } else {
        this.setState({ recording: 0 });
        console.log("Stop Recording!")   
    }
        // Function for recording
        const handleMouseMove = event => {
            if (this.state.recording === 0) {
                return null;
            } else {
            console.log(event.pageX);
            console.log(event.pageY);
        }
    }
    document.onmousemove = handleMouseMove;
    
    // Toggle the play button to fade away
    let playElement = document.getElementById("play"); 
    playElement.classList.toggle("play")
    
    // Toggle the delete button to fade away
    let deleteElement = document.getElementById("delete"); 
    deleteElement.classList.toggle("play")



  };

  togglePlay = () => {
        // Toggle the record button to fade away
    let element = document.getElementById("record");
    element.classList.toggle("play");

        // Toggle the play button to fade away
    let playElement = document.getElementById("play"); 
    playElement.classList.toggle("play")

        // Toggle the delete button to fade away
    let deleteElement = document.getElementById("delete"); 
    deleteElement.classList.toggle("play")

        // Function to grab the recording by Id

        // function to play the recording

        // reset styling at the end
    // element.classList.remove("play");
    // playElement.classList.remove("play")
    // deleteElement.classList.remove("play")

  };

  deleteRecording = () => {
    // Delete recording by Id in DB
  };

  render() {
    return (
      <div className="recordingContent">
        <div id="record" onClick={() => this.toggleRecord()}>Record</div>
        <div id="play" onClick={() => this.togglePlay()}>Play</div>
        <Link to="/"><div id="delete" onClick={() => this.deleteRecording()}>Delete</div></Link>
      </div>
    );
  }
}

export default Recording;

