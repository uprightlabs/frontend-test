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
    };
  }

  toggleRecord = () => {
    // Toggle the record button to be red
    let element = document.getElementById("record");
    element.classList.toggle("recording");

    // Check if not recording (0) or recording (1)
    if (this.state.recording === 0) {
      this.setState({ recording: 1, xCoordinates: [], yCoordinates: [] });
      console.log("Recording!");
    } else {
      this.setState({ recording: 0 });
      console.log("Stop Recording!");

      // let dbCounter = 0;
      // for (let i = 0; i < this.state.xCoordinates.length; i++) {
      //     db.run(`INSERT INTO test(id, x, y) VALUES(${dbCounter}, ${this.state.xCoordinates[i]}, ${this.state.yCoordinates[i]})`, err => {
      //     if (err) return console.log(err.message);
      //     console.log(dbCounter);
      // });
      // dbCounter += 1;
      // }
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
        }));
        // Track the y coordinates on state
        let newYCoordinate = this.state.yCoordinates;
        newYCoordinate.push(event.pageY);
        this.setState(() => ({
          yCoordinates: [...newYCoordinate]
        }));
      }
    };
    document.onmousemove = handleMouseMove;

    // Toggle the play button to fade away
    let playElement = document.getElementById("play");
    playElement.classList.toggle("play");

    // Toggle the delete button to fade away
    let deleteElement = document.getElementById("delete");
    deleteElement.classList.toggle("play");
  };

  togglePlay = () => {
    let x = this.state.xCoordinates;
    let y = this.state.yCoordinates;
    // Toggle the record button to fade away
    let element = document.getElementById("record");
    element.classList.toggle("play");

    // Toggle the play button to fade away
    let playElement = document.getElementById("play");
    playElement.classList.toggle("play");

    // Toggle the delete button to fade away
    let deleteElement = document.getElementById("delete");
    deleteElement.classList.toggle("play");

    // Toggle display on red dot div in window
    let dot = document.getElementById("cursor");
    dot.classList.toggle("display");
    console.log(document.getElementById("record").getBoundingClientRect().top, document.getElementById("record").getBoundingClientRect().left)
    dot.style.left = "95px";
    dot.style.top = "84px";

    // Function to grab the recording by Id
    // iterate over x cordinates array, for each item, set the x coordintate of the div to x[i]
    let i = 0;
    let positionChange = setInterval(function() {
        
        dot.style.left = x[i] + "px";
        dot.style.top = y[i] + "px";
        console.log("x" + dot.style.left + " y" + dot.style.top);
        
        i++;
        if (i >= x.length) {
            clearInterval(positionChange);
            // toggle back the button colors
        }
    }, 10)
}
      


    // Wait function
    // within, nest another iteration that sets the y coordinate to y[i]

    // reset styling at the end
    // element.classList.remove("play");
    // playElement.classList.remove("play")
    // deleteElement.classList.remove("play")

  deleteRecording = () => {
    // Delete recording by Id in DB
  };

  render() {
    return (
      <div>
        <div className="recordingContent">
          <div id="record" onClick={() => this.toggleRecord()}>
            Record
          </div>
          <div id="play" onClick={() => this.togglePlay()}>
            Play
          </div>
          <Link to="/">
            <div id="delete" onClick={() => this.deleteRecording()}>
              Delete
            </div>
          </Link>
        </div>
        <div id="cursor" className="display" />
      </div>
    );
  }
}

export default Recording;
