import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { Route } from "react-router-dom";
import "./recording-styles.css";

class Recording extends Component {
    constructor() {
        super();
        this.state = {
            xCoordinates: [],
            yCoordinates: [],
            recording: 0
        }
    }

    toggleRecord = () => {
    // Toggle the record button to be red
    let element = document.getElementById("record");
    element.classList.toggle("recording");

    // Check if not recording (0) or recording (1)
    if (this.state.recording === 0) {
        this.setState({ recording: 1 });
        console.log("Recording!")
    } else {
        this.setState({ recording: 0 });
        console.log("Stop Recording!")   
    }
    // While recording, track cursor coordinates and send to state
        const handleMouseMove = event => {
            if (this.state.recording === 0) {
                return null;
            } else {
            // Track the x coordinates on state 
            let newXCoordinate = this.state.xCoordinates;
            newXCoordinate.push(event.pageX);
            this.setState(() => ({
                xCoordinates: [...newXCoordinate]
            }))
            // Track the y coordinates on state 
            let newYCoordinate = this.state.yCoordinates;
            newYCoordinate.push(event.pageY);
            this.setState(() => ({
                yCoordinates: [...newYCoordinate]
            }))
            console.log("Cursor Y cordinate: ", event.pageY);
        }
    }
    document.onmousemove = handleMouseMove;
    
    // Toggle the play button to fade away
    let playElement = document.getElementById("play"); 
    playElement.classList.toggle("play")
    
    // Toggle the delete button to fade away
    let deleteElement = document.getElementById("delete"); 
    deleteElement.classList.toggle("play");

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

